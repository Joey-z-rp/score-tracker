import { format } from 'date-fns';
import { pg } from './utils';

export class Shooter {
    static create(shooter) {
        const shooterWithTimestamp = {
            createdAt: format(Date.now()),
            ...shooter,
        };
        return pg('shooters').insert(shooterWithTimestamp, ['id']);
    }
}