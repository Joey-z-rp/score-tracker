import * as cheerio from 'cheerio';
import fetch from 'cross-fetch';

import {
    HEX_SYSTEM_BASE_URL,
} from './constants';
import { is404 } from './utils';

export const getResultIds = (shooterId: number, pageNumber: number): Promise<any> => {
    const url = `${HEX_SYSTEM_BASE_URL}/shooting?shooterId=${shooterId}&page=${pageNumber}`;

    return fetch(url)
        .then(response => response.text())
        .then(html => {
            const $ = cheerio.load(html);

            if (is404($)) {
                throw new Error(`Error retrieving result ids for shooter ${shooterId}`);
            }

            const resultTable = $('tbody', 'div#shooting-grid');
            const resultRows = resultTable.find('tr');
            const resultIds: number[] = resultRows.map(
                    (index, row) => Number($(row).attr('data-key'))
                ).get();

            const hasNaN = resultIds.some(id => typeof id !== 'number');
            if (hasNaN) throw new Error('Not all result ids are number');
            
            return resultIds;
        });
};
