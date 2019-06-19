import {
    attachInfoAndThrow,
    pg,
    withCreatedAtTimestamp,
    withUpdatedAtTimestamp,
} from './utils';
import {
    SHOOTER_ID_KEY,
    SHOOTERS_TABLE,
    SYNC_STATUS_KEY,
    SyncStatus,
} from '../../common/constants/database';

export class Shooter {
    static create(shooter) {
        const shooterWithTimestamp = withCreatedAtTimestamp(shooter);
        return pg(SHOOTERS_TABLE).insert(shooterWithTimestamp, [SHOOTER_ID_KEY])
            .catch(attachInfoAndThrow('Shooter.create', arguments));
    }

    static get(shooterId: number) {
        return pg(SHOOTERS_TABLE).where({ [SHOOTER_ID_KEY]: shooterId })
            .catch(attachInfoAndThrow('Shooter.get', arguments));
    }

    static setSyncStatus(shooterId: number, status: SyncStatus) {
        return pg(SHOOTERS_TABLE).where({ [SHOOTER_ID_KEY]: shooterId })
            .update(withUpdatedAtTimestamp({ [SYNC_STATUS_KEY]: status }))
            .catch(attachInfoAndThrow('Shooter.setSyncStatus', arguments));
    }
}
