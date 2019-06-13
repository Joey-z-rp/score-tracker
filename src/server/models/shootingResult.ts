import { format } from 'date-fns';
import { pg } from './utils';

export class ShootingResult {
    static batchCreate(results) {
        const resultsWithTimestamp = results.map(result => ({
            createdAt: format(Date.now()),
            ...result,
        }));

        return pg.batchInsert('shootingResults', resultsWithTimestamp).returning('shooterId');
    }
}