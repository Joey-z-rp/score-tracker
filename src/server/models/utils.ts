import * as knex from 'knex';

import { format } from 'date-fns';
import { STANDARD_DATE_TIME_FORMAT } from '../../common/constants/date';

export const pg = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'joey',
        password : '123456',
        database : 'devdb',
    },
    debug: false,
});

export const createTimestamp = (item: any): any => ({
    ...item,
    createdAt: format(Date.now(), STANDARD_DATE_TIME_FORMAT),
});

export const createTimestamps = (items: any[]): any[] => items.map(item => createTimestamp(item));
