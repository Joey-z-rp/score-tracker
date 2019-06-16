import { createTimestamps, pg } from './utils';
import {
    RESULT_DETAILS_NUMBER_KEY,
    SHOOTING_RESULT_DETAILS_TABLE,
    SHOOTING_RESULT_ID_KEY,
} from '../../common/constants/database';

export class ShootingResultDetail {
    static batchCreate(resultDetails) {
        const resultDetailsWithTimestamp = createTimestamps(resultDetails);

        return pg.batchInsert(SHOOTING_RESULT_DETAILS_TABLE, resultDetailsWithTimestamp)
            .returning([SHOOTING_RESULT_ID_KEY, RESULT_DETAILS_NUMBER_KEY]);
    }
}