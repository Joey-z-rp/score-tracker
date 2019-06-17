import { createTimestamp, pg } from './utils';
import {
    SHOOTER_ID_KEY,
    SHOOTERS_TABLE,
    SYNC_STATUS_KEY,
    SyncStatus,
} from '../../common/constants/database';

export class Shooter {
    static create(shooter) {
        const shooterWithTimestamp = createTimestamp(shooter);
        return pg(SHOOTERS_TABLE).insert(shooterWithTimestamp, [SHOOTER_ID_KEY]);
    }

    static get(shooterId: number) {
        return pg(SHOOTERS_TABLE).where({ [SHOOTER_ID_KEY]: shooterId });
    }

    static setSyncStatus(shooterId: number, status: SyncStatus) {
        return pg(SHOOTERS_TABLE).where({ [SHOOTER_ID_KEY]: shooterId })
            .update({ [SYNC_STATUS_KEY]: status});
    }
}
