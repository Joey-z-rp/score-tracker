import { createTimestamps, pg } from './utils';

export class ShootingResultDetail {
    static batchCreate(resultDetails) {
        const resultDetailsWithTimestamp = createTimestamps(resultDetails);

        return pg.batchInsert('shootingResultDetails', resultDetailsWithTimestamp)
            .returning(['shootingResultId', 'resultNumber']);
    }
}