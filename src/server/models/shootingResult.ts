import { format } from 'date-fns';
import { pg } from './utils';
import { STANDARD_DATE_TIME_FORMAT } from '../../common/constants/date';

export class ShootingResult {
    static batchCreate(results) {
        const resultsWithTimestamp = results.map(result => ({
            createdAt: format(Date.now(), STANDARD_DATE_TIME_FORMAT),
            ...result,
        }));

        return pg.batchInsert('shootingResults', resultsWithTimestamp)
            .returning('shootingResultId');
    }
}