import * as cheerio from 'cheerio';
import fetch from 'cross-fetch';

import {
    HEX_SYSTEM_BASE_URL,
    BERDAN_STRING_IN_MM_KEY,
    EDGE_SHOT_ONE_KEY,
    EDGE_SHOT_TWO_KEY,
    GROUP_SIZE_IN_MM_KEY,
    GROUP_SIZE_RAW_DATA_KEY,
    SHOOTING_INFO_DESCRIPTION_MAP,
    SHOTS_COUNT_KEY,
    SIGHTERS_COUNT_KEY,
    STAGE_KEY,
    TARGET_NUMBER_KEY,
    X_SIZE_IN_MM_KEY,
    Y_SIZE_IN_MM_KEY,
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
    const rawShootingInfo = {};

    shootingInfoTableRows.each((index, row) => {
        const description = $(row).children('th').text().trim().toLowerCase();

        if (!SHOOTING_INFO_DESCRIPTION_MAP[description]) return;

        const key = SHOOTING_INFO_DESCRIPTION_MAP[description];
        const value = $(row).children('td').text();
        rawShootingInfo[key] = value;
    });

    return getProcessedShootingInfo(rawShootingInfo);
}

function getProcessedShootingInfo(rawShootingInfo) {
    const shootingInfo = {};

    Object.keys(rawShootingInfo).forEach(key => {
        switch (key) {
            case BERDAN_STRING_IN_MM_KEY:
            case X_SIZE_IN_MM_KEY:
            case Y_SIZE_IN_MM_KEY:
                const numberWithoutUnit = (rawShootingInfo[key].match(/(.*) mm/) || [])[1];
                shootingInfo[key] = Number(numberWithoutUnit);
                break;

            case SHOTS_COUNT_KEY:
            case SIGHTERS_COUNT_KEY:
            case STAGE_KEY:
            case TARGET_NUMBER_KEY:
                shootingInfo[key] = parseInt(rawShootingInfo[key], 10);
                break;

            case GROUP_SIZE_RAW_DATA_KEY:
                const rawData = rawShootingInfo[key];
                const groupSizeInMM = (rawData.match(/(.*) mm.*/) || [])[1];
                const edgeShotOne = (rawData.match(/.*shots (.*) \&.*/) || [])[1];
                const edgeShotTwo = (rawData.match(/.*shots.*\& (.*)/) || [])[1];
                shootingInfo[GROUP_SIZE_IN_MM_KEY] = Number(groupSizeInMM);
                shootingInfo[EDGE_SHOT_ONE_KEY] = Number(edgeShotOne);
                shootingInfo[EDGE_SHOT_TWO_KEY] = Number(edgeShotTwo);
                break;
                    
            default:
                shootingInfo[key] = rawShootingInfo[key];
        }
    });

    return shootingInfo;
}
