import { createTimestamp, pg } from './utils';

export class Shooter {
    static create(shooter) {
        const shooterWithTimestamp = createTimestamp(shooter);
        return pg('shooters').insert(shooterWithTimestamp, ['id']);
    }
}