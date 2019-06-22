import { combineReducers } from 'redux';

import shooter from './shooter';
import synchronizeData from './synchronizeData';

export default combineReducers({
    shooter,
    synchronizeData,
});
