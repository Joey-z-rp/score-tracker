import * as compression from 'compression';
import * as express from 'express';
import expressPromiseRouter from 'express-promise-router';
import * as knex from 'knex';
import * as path from 'path';
import { syncShooter } from './api/synchronizeData';

const app = express();
const port = process.env.PORT || 3000;

const router = expressPromiseRouter({
    caseSensitive: true,
    strict: true,
});

app.use(router);

app.listen(port);

router.use(compression());

// API
router.get('/api/syncShooterData', syncShooter);

router.use('/public', express.static(path.join(__dirname, 'public')));
router.use('*', express.static(path.join(__dirname, 'public')));

// tslint:disable-next-line
console.info(`Server is running on port: ${port}`);

const pg = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'joey',
        password : '123456',
        database : 'devdb',
    },
    debug: true,
});

pg.raw("SELECT VERSION()").then(res => console.log(res));
