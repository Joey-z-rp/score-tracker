import { createTimestamps, pg } from './utils';
import {
    SHOOTER_ID_KEY,
    SHOOTING_RESULT_ID_KEY,
    SHOOTING_RESULTS_TABLE,
} from '../../common/constants/database';

export class ShootingResult {
    static batchCreate(results) {
        const resultsWithTimestamp = createTimestamps(results);

        return pg.batchInsert(SHOOTING_RESULTS_TABLE, resultsWithTimestamp)
            .returning(SHOOTING_RESULT_ID_KEY);
    }

    static getResultCount(shooterId: number) {
        return pg(SHOOTING_RESULTS_TABLE)
            .count(SHOOTING_RESULT_ID_KEY)
            .where({ [SHOOTER_ID_KEY]: shooterId });
    }

    static getRestultIds(shooterId: number) {
        return pg(SHOOTING_RESULTS_TABLE)
            .where({ [SHOOTER_ID_KEY]: shooterId })
            .select(SHOOTING_RESULT_ID_KEY)
            .then(items => items.map(item => item[SHOOTING_RESULT_ID_KEY]));
    }
}
