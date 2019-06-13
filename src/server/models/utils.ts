import * as knex from 'knex';

export const pg = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'joey',
        password : '123456',
        database : 'devdb',
    },
    debug: true,
});