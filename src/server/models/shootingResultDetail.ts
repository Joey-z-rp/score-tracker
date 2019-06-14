import { format } from 'date-fns';
import { pg } from './utils';
import { STANDARD_DATE_TIME_FORMAT } from '../../common/constants/date';

export class ShootingResultDetail {
    static batchCreate(resultDetails) {
        const resultDetailsWithTimestamp = resultDetails.map(resultDetail => ({
            createdAt: format(Date.now(), STANDARD_DATE_TIME_FORMAT),
            ...resultDetail,
        }));

        return pg.batchInsert('shootingResultDetails', resultDetailsWithTimestamp)
            .returning(['shootingResultId', 'resultNumber']);
    }
}