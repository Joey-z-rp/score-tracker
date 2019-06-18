import * as cheerio from 'cheerio';
import fetch from 'cross-fetch';

import {
    HEX_SYSTEM_BASE_URL,
    SHOOTER_INFO_DESCRIPTION_MAP,
} from './constants';
import { is404 } from './utils';
import {
    NAME_KEY,
    NUMBER_OF_RESULTS_KEY,
} from '../../common/constants/database';

export const getShooterInfo = (shooterId: number): Promise<any> => {
    const url = `${HEX_SYSTEM_BASE_URL}/shooter/${shooterId}`;

    return fetch(url)
        .then(response => response.text())
        .then(html => {
            const $ = cheerio.load(html);

            if (is404($)) {
                throw new Error('Error retrieving shooter information');
            }

            const name = $('h1', 'header').text();
            const shooterInfo = getDataFromShooterInfoTable($);
            
            return {
                [NAME_KEY]: name,
                ...shooterInfo,
            };
        })
        .catch(error => {
            throw new Error(`An error happened with shooter id ${shooterId}: ${error.message}`);
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
