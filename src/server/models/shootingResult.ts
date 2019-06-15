import { createTimestamps, pg } from './utils';

export class ShootingResult {
    static batchCreate(results) {
        const resultsWithTimestamp = createTimestamps(results);

        return pg.batchInsert('shootingResults', resultsWithTimestamp)
            .returning('shootingResultId');
    }
}