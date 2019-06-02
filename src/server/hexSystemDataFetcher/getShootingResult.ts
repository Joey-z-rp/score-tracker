import * as cheerio from 'cheerio';
import fetch from 'cross-fetch';
import { parse } from 'date-fns';

import {
    HEX_SYSTEM_BASE_URL,
    SHOOTING_INFO_DESCRIPTION_MAP,
} from './constants';

export const getShootingResult = (resultId: number): Promise<any> => {
    const url = `${HEX_SYSTEM_BASE_URL}/shooting/${resultId}`;

    return fetch(url)
        .then(response => response.text())
        .then(html => {
            const $ = cheerio.load(html);
            const headerInfo = getHeaderInfo($);
            const shootingInfo = getShootingInfo($);

            
            return {
                ...headerInfo,
                ...shootingInfo,
            };
        });
};

function getHeaderInfo($: CheerioStatic) {
    const [date, name, distance, disciplineAndGrade] =
        $('h1', 'header').contents()[0].nodeValue.split(';').map(item => item.trim());

    const [discipline, grade] = disciplineAndGrade.split('/');
    
    return {
        date,
        discipline,
        distance,
        grade,
        name,
    };
}

function getShootingInfo($: CheerioStatic) {
    const shootingInfoTableRows = $('table#w0').find('tr');
    const shootingInfo = {};

    shootingInfoTableRows.each((index, row) => {
        const description = $(row).children('th').text().trim().toLowerCase();

        if (!SHOOTING_INFO_DESCRIPTION_MAP[description]) return;

        const key = SHOOTING_INFO_DESCRIPTION_MAP[description];
        const value = $(row).children('td').text();
        shootingInfo[key] = value;
    });

    return shootingInfo;
}