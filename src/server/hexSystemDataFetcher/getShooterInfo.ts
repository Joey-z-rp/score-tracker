import cheerio from 'cheerio';
import fetch from 'cross-fetch';

import {
    HEX_SYSTEM_BASE_URL,
    NUMBER_OF_RESULTS_DESC,
    SHOOTER_INFO_DESCRIPTION_MAP,
} from './constants';

export const getShooterInfo = (shooterId: number): Promise<any> => {
    const url = `${HEX_SYSTEM_BASE_URL}/shooter/${shooterId}`;

    return fetch(url)
        .then(response => response.text())
        .then(html => {
            const $ = cheerio.load(html);

            const name = $('h1', 'header').text();
            const shooterInfo = getDataFromShooterInfoTable($);
            const resultIds = getResultIds($);
            
            const numberOfResults = parseInt(
                shooterInfo[SHOOTER_INFO_DESCRIPTION_MAP[NUMBER_OF_RESULTS_DESC]],
                10,
            );
            if (numberOfResults !== resultIds.length) {
                throw new Error('Number of results does not match the length of result ids');
            }
            
            return {
                name,
                resultIds,
                ...shooterInfo,
            };
        });
};

function getDataFromShooterInfoTable(cheerioDOM) {
    const $ = cheerioDOM;

    const shooterInfoTableRows = $('table#w0').find('tr');
    const shooterInfo = {};

    shooterInfoTableRows.each((index, row) => {
        const description = $(row).children('th').text().toLowerCase();

        if (!SHOOTER_INFO_DESCRIPTION_MAP[description]) return;

        const key = SHOOTER_INFO_DESCRIPTION_MAP[description];
        const value = $(row).children('td').text();
        shooterInfo[key] = value;
    });

    return shooterInfo;
}

function getResultIds(cheerioDOM) {
    const $ = cheerioDOM;

    const resultTable = $('tbody', 'div#short-shootings-list');
    const resultRows = resultTable.find('tr');
    const resultIds: string[] = resultRows.map((index, row) =>
        ($(row).attr('id').match(/shooting-(.*)/) || [])[1])
        .get();
    
    return resultIds;
}
