import * as cheerio from 'cheerio';
import fetch from 'cross-fetch';

import {
    HEX_SYSTEM_BASE_URL,
    NUMBER_OF_RESULTS_KEY,
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
            
            const numberOfResults = shooterInfo[NUMBER_OF_RESULTS_KEY];
            
            if (numberOfResults !== resultIds.length) {
                throw new Error(`Number of results(${numberOfResults}) does not 
                match the length of result ids(${resultIds.length})`);
            }
            
            return {
                name,
                resultIds,
                ...shooterInfo,
            };
        });
};

function getDataFromShooterInfoTable($: CheerioStatic) {
    const shooterInfoTableRows = $('table#w0').find('tr');
    const shooterInfo = {};

    shooterInfoTableRows.each((index, row) => {
        const description = $(row).children('th').text().trim().toLowerCase();

        if (!SHOOTER_INFO_DESCRIPTION_MAP[description]) return;

        const key = SHOOTER_INFO_DESCRIPTION_MAP[description];
        const value = $(row).children('td').text();
        shooterInfo[key] = value;
    });

    const numberOfResults = parseInt(
        shooterInfo[NUMBER_OF_RESULTS_KEY],
        10,
    );
    shooterInfo[NUMBER_OF_RESULTS_KEY] = numberOfResults;

    return shooterInfo;
}

function getResultIds($: CheerioStatic) {
    const resultTable = $('tbody', 'div#short-shootings-list');
    const resultRows = resultTable.find('tr');
    const resultIdsInString: string[] = resultRows.map((index, row) =>
        ($(row).attr('id').match(/shooting-(.*)/) || [])[1])
        .get();
    const resultIds = resultIdsInString.map(id => Number(id))
        .filter(id => !isNaN(id));
    
    return resultIds;
}
