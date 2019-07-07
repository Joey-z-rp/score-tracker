import {
    attachInfoAndThrow,
    pg,
    withCreatedAtTimestamps,
} from './utils';
import { IGroupSize } from '../../common/types/model';
import {
    DATE_KEY,
    DISCIPLINE_KEY,
    DISTANCE_KEY,
    GROUP_SIZE_IN_MM_KEY,
    SHOOTER_ID_KEY,
    SHOOTING_RESULT_ID_KEY,
    SHOOTING_RESULTS_TABLE,
    STAGE_KEY,
} from '../../common/constants/database';

export class ShootingResult {
    static batchCreate(results: object[]): Promise<number[]> {
        const resultsWithTimestamp = withCreatedAtTimestamps(results);

        return pg.batchInsert(SHOOTING_RESULTS_TABLE, resultsWithTimestamp)
            .returning(SHOOTING_RESULT_ID_KEY)
            .catch(attachInfoAndThrow('ShootingResult.batchCreate', arguments));
    }

    static getAll(): Promise<any[]> {
        return pg(SHOOTING_RESULTS_TABLE)
        .select()
        .catch(attachInfoAndThrow('ShootingResult.getAll', arguments));
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

    static getGroupSizes(shooterId: number): Promise<IGroupSize[]> {
        return pg(SHOOTING_RESULTS_TABLE)
            .where({ [SHOOTER_ID_KEY]: shooterId })
            .select([DATE_KEY, DISTANCE_KEY, GROUP_SIZE_IN_MM_KEY])
            .catch(attachInfoAndThrow('ShootingResult.getGroupSizes', arguments));
    }

    static getInfoForHEyes(shooterId: number): Promise<any[]> {
        return pg(SHOOTING_RESULTS_TABLE)
            .where({ [SHOOTER_ID_KEY]: shooterId })
            .select([
                DATE_KEY,
                DISCIPLINE_KEY,
                DISTANCE_KEY,
                SHOOTING_RESULT_ID_KEY,
                STAGE_KEY,
            ])
            .catch(attachInfoAndThrow('ShootingResult.getInfoForHEyes', arguments));
    }
}
