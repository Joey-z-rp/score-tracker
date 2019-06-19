import * as knex from 'knex';
import { format } from 'date-fns';

import { CREATED_AT_KEY, UPDATED_AT_KEY } from '../../common/constants/database';
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

export const withCreatedAtTimestamp = (item: any): any => ({
    ...item,
    [CREATED_AT_KEY]: format(Date.now(), STANDARD_DATE_TIME_FORMAT),
});

export const withUpdatedAtTimestamp = (item: any): any => ({
    ...item,
    [UPDATED_AT_KEY]: format(Date.now(), STANDARD_DATE_TIME_FORMAT),
});

export const withCreatedAtTimestamps = (items: any[]): any[] =>
    items.map(item => withCreatedAtTimestamp(item));

export const attachInfoAndThrow = (functionName: string, args) => (error: Error) => {
    const message = `Function ${functionName} errored with args: 
        ${JSON.stringify(args, null, 4)}.Message: ${error.message}`;
    throw new Error(message);
}
