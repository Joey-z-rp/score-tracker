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

export const getCurrentTime = () => format(Date.now(), STANDARD_DATE_TIME_FORMAT);

export const withCreatedAtTimestamp = (item: object): object => ({
    ...item,
    [CREATED_AT_KEY]: getCurrentTime(),
});

export const withUpdatedAtTimestamp = (item: object): object => ({
    ...item,
    [UPDATED_AT_KEY]: getCurrentTime(),
});

export const withCreatedAtTimestamps = (items: object[]): object[] =>
    items.map(item => withCreatedAtTimestamp(item));

export const attachInfoAndThrow = (functionName: string, args) => (error: Error) => {
    const message = `Function ${functionName} errored with args: 
        ${JSON.stringify(args, null, 4)}.Message: ${error.message}`;
    throw new Error(message);
}
