import {
    attachInfoAndThrow,
    pg,
    withCreatedAtTimestamps,
} from './utils';
import {
    RESULT_DETAILS_NUMBER_KEY,
    SHOOTER_ID_KEY,
    SHOOTING_RESULT_DETAILS_TABLE,
    SHOOTING_RESULT_ID_KEY,
} from '../../common/constants/database';

export class ShootingResultDetail {
    static batchCreate(resultDetails: object[]): Promise<any> {
        const resultDetailsWithTimestamp = withCreatedAtTimestamps(resultDetails);

        return pg.batchInsert(SHOOTING_RESULT_DETAILS_TABLE, resultDetailsWithTimestamp)
            .returning([SHOOTING_RESULT_ID_KEY, RESULT_DETAILS_NUMBER_KEY])
            .catch(attachInfoAndThrow('ShootingResultDetail.batchCreate', arguments));
    }

    static batchUpdateShooterId(resultDetails: object[]): Promise<any> {
        return pg.transaction(trx => {
            const queries: any[] = [];
            resultDetails.forEach(detail => {
                const query = pg(SHOOTING_RESULT_DETAILS_TABLE)
                    .where({ [SHOOTING_RESULT_ID_KEY]: detail[SHOOTING_RESULT_ID_KEY]})
                    .update({ [SHOOTER_ID_KEY]: detail[SHOOTER_ID_KEY] })
                    .transacting(trx);
                
                    queries.push(query);
            });

            Promise.all(queries)
                .then(trx.commit)
                .catch(trx.rollback);
        })
            .catch(attachInfoAndThrow('ShootingResultDetail.batchUpdate', arguments));
    }

    static getAll(): Promise<any[]> {
        return pg(SHOOTING_RESULT_DETAILS_TABLE).select()
        .catch(attachInfoAndThrow('ShootingResultDetail.getAll', arguments));
    }

    static getAllForShooter(shooterId: number): Promise<any[]> {
        return pg(SHOOTING_RESULT_DETAILS_TABLE)
            .select()
            .where({ [SHOOTER_ID_KEY]: shooterId })
            .catch(attachInfoAndThrow('ShootingResultDetail.getAllForShooter', arguments));
    }
}