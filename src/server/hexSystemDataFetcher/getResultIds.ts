import * as cheerio from 'cheerio';
import fetch from 'cross-fetch';

import {
    HEX_SYSTEM_BASE_URL,
} from './constants';

export const getResultIds = (shooterId: number, pageNumber: number): Promise<any> => {
    const url = `${HEX_SYSTEM_BASE_URL}/shooting?shooterId=${shooterId}&page=${pageNumber}`;

    return fetch(url)
        .then(response => response.text())
        .then(html => {
            const $ = cheerio.load(html);
            const resultTable = $('tbody', 'div#shooting-grid');
            const resultRows = resultTable.find('tr');
            const resultIds: string[] = resultRows.map((index, row) => $(row).attr('data-key'))
                .get();
            
            return resultIds;
        });
};
