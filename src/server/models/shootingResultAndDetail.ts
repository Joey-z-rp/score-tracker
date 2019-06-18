import { pg, withCreatedAtTimestamps } from './utils';
import {
    SHOOTING_RESULT_DETAILS_TABLE,
    SHOOTING_RESULTS_TABLE,
} from '../../common/constants/database';

export class ShootingResultAndDetail {
    static batchCreate(results, resultDetails) {
        const resultsWithTimestamp = withCreatedAtTimestamps(results);
        const resultDetailsWithTimestamp = withCreatedAtTimestamps(resultDetails);

        return pg.transaction((trx) =>
            trx.insert(resultsWithTimestamp).into(SHOOTING_RESULTS_TABLE)
                .then(() => trx(SHOOTING_RESULT_DETAILS_TABLE).insert(resultDetailsWithTimestamp))
        ).then(() => {
            console.log('results saved.');
        }).catch((error) => {
            console.error(error);
            throw error;
        });
    }
}