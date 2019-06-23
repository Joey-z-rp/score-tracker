import { combineReducers } from 'redux';

import shooter from './shooter';
import shooterStatistics from './shooterStatistics';
import synchronizeData from './synchronizeData';

export default combineReducers({
    shooter,
    shooterStatistics,
    synchronizeData,
});
