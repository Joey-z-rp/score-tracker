import { format } from 'date-fns';
import { pg } from './utils';
import { STANDARD_DATE_TIME_FORMAT } from '../../common/constants/date';

export class Shooter {
    static create(shooter) {
        const shooterWithTimestamp = {
            createdAt: format(Date.now(), STANDARD_DATE_TIME_FORMAT),
            ...shooter,
        };
        return pg('shooters').insert(shooterWithTimestamp, ['id']);
    }
}