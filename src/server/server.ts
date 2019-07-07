import * as compression from 'compression';
import * as express from 'express';
import expressPromiseRouter from 'express-promise-router';
import * as path from 'path';
import { getAllShooters } from './api/shooter';
import { getGroupSizes, getHEyes } from './api/shooterStatistics';
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
router.get('/api/shooters', getAllShooters);
router.get('/api/shooter/:shooterId/groupSizes', getGroupSizes);
router.get('/api/shooter/:shooterId/hEyes', getHEyes);

router.use('/public', express.static(path.join(__dirname, 'public')));
router.use('*', express.static(path.join(__dirname, 'public')));

// tslint:disable-next-line
console.info(`Server is running on port: ${port}`);
