import cheerio from 'cheerio';
import fetch from 'cross-fetch';

const SHOOTER_INFO_DESCRIPTION_MAP = {
    'nick name': 'nickName',
    club: 'club',
    'default discipline': 'defaultDiscipline',
    'number of results': 'numberOfResult',
    'grade (club) t-rifle': 'gradeClubTRifle',
    'grade (club) f-std': 'gradeClubFStd',
    'grade (club) f-open': 'gradeClubFOpen',
    'grade (club) f-tr': 'gradeClubFTR',
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
            
            return {
                name,
                ...shooterInfo,
            };
        });
};

export default fetcher;