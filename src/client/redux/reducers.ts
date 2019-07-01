import { combineReducers } from 'redux';

import shooterList from '../shooterList/shooterListReducer';
import shooterStatistics from '../shooterStatistics/shooterStatisticsReducer';
import synchronize from '../synchronize/synchronizeReducer';

export default combineReducers({
    shooterList,
    shooterStatistics,
    synchronize,
});
