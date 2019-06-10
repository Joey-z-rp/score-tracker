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
            
            return {
                name,
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