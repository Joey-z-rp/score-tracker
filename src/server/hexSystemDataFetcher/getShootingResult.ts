import * as cheerio from 'cheerio';
import fetch from 'cross-fetch';
import { parse, format } from 'date-fns';

import {
    BERDAN_STRING_IN_MM_KEY,
    DATE_KEY,
    DISCIPLINE_KEY,
    DISTANCE_KEY,
    EDGE_SHOT_ONE_KEY,
    EDGE_SHOT_TWO_KEY,
    GRADE_KEY,
    GROUP_SIZE_IN_MM_KEY,
    GROUP_SIZE_RAW_DATA_KEY,
    NAME_KEY,
    RESULT_DETAILS_TEMPERATURE_KEY,
    RESULT_DETAILS_X_KEY,
    RESULT_DETAILS_Y_KEY,
    SHOOTER_ID_KEY,
    SHOTS_COUNT_KEY,
    SIGHTERS_COUNT_KEY,
    STAGE_KEY,
    TARGET_NUMBER_KEY,
    X_SIZE_IN_MM_KEY,
    Y_SIZE_IN_MM_KEY,
} from '../../common/constants/database';

import {
    HEX_DATE_TIME_PARSE_FORMAT,
    STANDARD_DATE_TIME_FORMAT,
} from '../../common/constants/date';

import {
    HEX_SYSTEM_BASE_URL,
    RESULT_DETAILS_DESCRIPTION_MAP,
    SHOOTING_INFO_DESCRIPTION_MAP,
} from './constants';
import { is404 } from './utils';

export const getShootingResult = (resultId: string): Promise<any> => {
    const url = `${HEX_SYSTEM_BASE_URL}/shooting/${resultId}`;

    return fetch(url)
        .then(response => response.text())
        .then(html => {
            const $ = cheerio.load(html);

            if (is404($)) {
                throw new Error('Error retrieving shooting result');
            }

            const headerInfo = getHeaderInfo($);
            const shootingInfo = getShootingInfo($);
            const shootingResultDetails = getShootingResultDetails($);

            return {
                ...headerInfo,
                ...shootingInfo,
                ...shootingResultDetails,
            };
        })
        .catch(error => {
            throw new Error(`An error happened with result id ${resultId}: ${error.message}`);
        });
};

function getHeaderInfo($: CheerioStatic) {
    const [date, name, distance, disciplineAndGrade] =
        $('h1', 'header').contents()[0].nodeValue.split(';').map(item => item.trim());

    const [discipline, grade] = disciplineAndGrade.split('/');
    
    return {
        [DISCIPLINE_KEY]: discipline,
        [DISTANCE_KEY]: distance,
        [GRADE_KEY]: grade,
        [NAME_KEY]: name,
        [DATE_KEY]: format(
            parse(date, HEX_DATE_TIME_PARSE_FORMAT, new Date()),
            STANDARD_DATE_TIME_FORMAT,
        ),
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

            case SHOOTER_ID_KEY:
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

function getShootingResultDetails($: CheerioStatic) {
    const scoreString = $('#score-string', 'h2').text();
    const scoreNumber = $('#score-num', 'h2').text();
    const scoreDetails = getShootingScoreDetails($);
    const totalItems = Number($('b', 'div.summary').text());
    
    if (scoreDetails.length !== totalItems) {
        throw new Error('Length of score details does not match total number');
    }

    return {
        scoreDetails,
        scoreNumber,
        scoreString,
    };
}

function getShootingScoreDetails($: CheerioStatic) {
    const tableHeaders = $('th', '#shots-grid thead:first-of-type tr');
    const keysFromTableHead: string[] = tableHeaders.map((index, th) => {
        const description = $(th).text().toLocaleLowerCase();

        return RESULT_DETAILS_DESCRIPTION_MAP[description];
    }).get();
    const convertToNumberKeys = [
        RESULT_DETAILS_TEMPERATURE_KEY,
        RESULT_DETAILS_X_KEY,
        RESULT_DETAILS_Y_KEY,
    ];
    const resultRows = $('tr', '#shots-grid tbody');

    return resultRows.map((index, row) => {
        const result = {};

        $(row).find('td').each((index, td) => {
            const key = keysFromTableHead[index];
            const rawValue = $(td).text();
            const value = convertToNumberKeys.includes(key)
                ? Number(rawValue)
                : rawValue;
            result[key] = value;
        });

        return result;
    }).get();
}
