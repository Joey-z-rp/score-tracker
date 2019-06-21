import {
    attachInfoAndThrow,
    pg,
    withCreatedAtTimestamps,
} from './utils';
import {
    SHOOTER_ID_KEY,
    SHOOTING_RESULT_ID_KEY,
    SHOOTING_RESULTS_TABLE,
} from '../../common/constants/database';

export class ShootingResult {
    static batchCreate(results: object[]): Promise<number[]> {
        const resultsWithTimestamp = withCreatedAtTimestamps(results);

        return pg.batchInsert(SHOOTING_RESULTS_TABLE, resultsWithTimestamp)
            .returning(SHOOTING_RESULT_ID_KEY)
            .catch(attachInfoAndThrow('ShootingResult.batchCreate', arguments));
    }

    static getResultCount(shooterId: number): Promise<number> {
        return pg(SHOOTING_RESULTS_TABLE)
            .count(SHOOTING_RESULT_ID_KEY)
            .where({ [SHOOTER_ID_KEY]: shooterId })
            .then(result => Number(result[0].count))
            .catch(attachInfoAndThrow('ShootingResult.getResultCount', arguments));
    }

    static getRestultIds(shooterId: number): Promise<number[]> {
        return pg(SHOOTING_RESULTS_TABLE)
            .where({ [SHOOTER_ID_KEY]: shooterId })
            .select(SHOOTING_RESULT_ID_KEY)
            .then(items => items.map(item => item[SHOOTING_RESULT_ID_KEY]))
            .catch(attachInfoAndThrow('ShootingResult.getRestultIds', arguments));
    }
}
