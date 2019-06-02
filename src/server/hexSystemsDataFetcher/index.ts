import cheerio from 'cheerio';
import fetch from 'cross-fetch';

const NICK_NAME_DESC = 'nick name';
const CLUB_DESC = 'club';
const DEFAULT_DISCIPLINE_DESC = 'default discipline';
const NUMBER_OF_RESULTS_DESC = 'number of results';
const GRADE_CLUB_T_RIFLE_DESC = 'grade (club) t-rifle';
const GRADE_CLUB_F_STD_DESC = 'grade (club) f-std';
const GRADE_CLUB_F_OPEN_DESC = 'grade (club) f-open';
const GRADE_CLUB_F_TR_DESC = 'grade (club) f-tr';


const SHOOTER_INFO_DESCRIPTION_MAP = {
    [NICK_NAME_DESC]: 'nickName',
    [CLUB_DESC]: 'club',
    [DEFAULT_DISCIPLINE_DESC]: 'defaultDiscipline',
    [NUMBER_OF_RESULTS_DESC]: 'numberOfResult',
    [GRADE_CLUB_T_RIFLE_DESC]: 'gradeClubTRifle',
    [GRADE_CLUB_F_STD_DESC]: 'gradeClubFStd',
    [GRADE_CLUB_F_OPEN_DESC]: 'gradeClubFOpen',
    [GRADE_CLUB_F_TR_DESC]: 'gradeClubFTR',
};

const fetcher = () => {
    return fetch('http://shooting.hexsystems.com.au/shooter/18565')
        .then(response => response.text())
        .then(html => {
            const $ = cheerio.load(html);

            const name = $('h1', 'header').text();
            const shooterInfoTableRows = $('table#w0').find('tr');
            const shooterInfo = {};

            shooterInfoTableRows.each((index, row) => {
                const description = $(row).children('th').text().toLowerCase();

                if (!SHOOTER_INFO_DESCRIPTION_MAP[description]) return;

                const key = SHOOTER_INFO_DESCRIPTION_MAP[description];
                const value = $(row).children('td').text();
                shooterInfo[key] = value;
            });

            const resultTable = $('tbody', 'div#short-shootings-list');
            const resultRows = resultTable.find('tr');
            const resultIds: string[] = resultRows.map((index, row) => ($(row).attr('id').match(/shooting-(.*)/) || [])[1]).get();
            
            const numberOfResult = parseInt(shooterInfo[SHOOTER_INFO_DESCRIPTION_MAP[NUMBER_OF_RESULTS_DESC]], 10);
            if (numberOfResult !== resultIds.length) {
                throw new Error('Number of result rows does not match result ids');
            }
            
            return {
                name,
                resultIds,
                ...shooterInfo,
            };
        });
};

export default fetcher;