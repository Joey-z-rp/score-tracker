import { convertDateString } from './utils';
import {
    GET_GROUP_SIZES,
    GET_GROUP_SIZES_FAILURE,
    GET_GROUP_SIZES_SUCCESS,
} from '../actions/shooterStatistics';
import { IAction } from '../interfaces/actions';
import { IShooterStatistics } from '../interfaces/store';

const initialState = {
    error: null,
    groupSizes: [],
    isFetchingGroupSizes: false,
};

export default function reducer(
    state: IShooterStatistics = initialState,
    action: IAction,
): IShooterStatistics {
    switch (action.type) {

        case GET_GROUP_SIZES:
            return {
                ...state,
                isFetchingGroupSizes: true,
                error: null,
            };

        case GET_GROUP_SIZES_SUCCESS:
            const groupSizes = action.payload.map(groupSize => convertDateString(groupSize));
            return {
                ...state,
                groupSizes,
                isFetchingGroupSizes: false,
            };

        case GET_GROUP_SIZES_FAILURE:
            return {
                ...state,
                isFetchingGroupSizes: false,
                error: action.payload,
            };

        default:
            return state;
    }
}
