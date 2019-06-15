import { createTimestamps, pg } from './utils';

export class ShootingResult {
    static batchCreate(results) {
        const resultsWithTimestamp = createTimestamps(results);

        return pg.batchInsert('shootingResults', resultsWithTimestamp)
            .returning('shootingResultId');
    }

    static getResultCount(shooterId: number) {
        return pg('shootingResults').count('shootingResultId').where({ shooterId });
    }

    static getRestultIds(shooterId: number) {
        return pg('shootingResults').where({ shooterId }).select('shootingResultId')
            .then(items => items.map(item => item.shootingResultId));
    }
}
