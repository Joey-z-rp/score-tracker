import {
    attachInfoAndThrow,
    getCurrentTime,
    pg,
    withCreatedAtTimestamp,
    withUpdatedAtTimestamp,
} from './utils';
import { IShooter } from '../../common/types/model';
import {
    SHOOTER_ID_KEY,
    SHOOTERS_TABLE,
    SYNC_STATUS_KEY,
    SYNCHRONIZED_AT_KEY,
    SyncStatus,
} from '../../common/constants/database';

export class Shooter {
    static create(shooter: object): Promise<number[]> {
        const shooterWithTimestamp = withCreatedAtTimestamp(shooter);
        return pg(SHOOTERS_TABLE).insert(shooterWithTimestamp, [SHOOTER_ID_KEY])
            .catch(attachInfoAndThrow('Shooter.create', arguments));
    }

    static get(shooterId: number): Promise<IShooter[]> {
        return pg(SHOOTERS_TABLE).where({ [SHOOTER_ID_KEY]: shooterId })
            .catch(attachInfoAndThrow('Shooter.get', arguments));
    }

    static setSyncStatus(shooterId: number, status: SyncStatus): Promise<any> {
        const columnsToUpdate = status === SyncStatus.Succeeded
            ? {
                [SYNC_STATUS_KEY]: status,
                [SYNCHRONIZED_AT_KEY]: getCurrentTime(),
            }
            : { [SYNC_STATUS_KEY]: status };

        return pg(SHOOTERS_TABLE).where({ [SHOOTER_ID_KEY]: shooterId })
            .update(withUpdatedAtTimestamp(columnsToUpdate))
            .catch(attachInfoAndThrow('Shooter.setSyncStatus', arguments));
    }
}
