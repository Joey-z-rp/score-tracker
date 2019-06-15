import { createTimestamps, pg } from './utils';

export class ShootingResultAndDetail {
    static batchCreate(results, resultDetails) {
        const resultsWithTimestamp = createTimestamps(results);
        const resultDetailsWithTimestamp = createTimestamps(resultDetails);

        return pg.transaction((trx) =>
            trx.insert(resultsWithTimestamp).into('shootingResults')
                .then(() => trx('shootingResultDetails').insert(resultDetailsWithTimestamp))
        ).then(() => {
            console.log('results saved.');
        }).catch((error) => {
            console.error(error);
            throw error;
        });
    }
}