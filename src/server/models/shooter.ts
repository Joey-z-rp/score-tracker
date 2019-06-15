import { createTimestamp, pg } from './utils';

export class Shooter {
    static create(shooter) {
        const shooterWithTimestamp = createTimestamp(shooter);
        return pg('shooters').insert(shooterWithTimestamp, ['id']);
    }

    static get(shooterId: number) {
        return pg('shooters').where({ id: shooterId });
    }
}