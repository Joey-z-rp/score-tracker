import { convertDateString } from '../redux/utils';
import {
    GET_GROUP_SIZES,
    GET_GROUP_SIZES_FAILURE,
    GET_GROUP_SIZES_SUCCESS,
} from './shooterStatisticsActions';
import {
    IAction,
    IConvertedGroupSizes,
    IGroupSizeWithDate,
    IShooterStatistics,
} from '../redux/types';

const initialState = {
    error: null,
    groupSizes: {},
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
                groupSizes: convertGroupSizes(groupSizes),
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


function convertGroupSizes(groupSizes: IGroupSizeWithDate[]): IConvertedGroupSizes {
    return groupSizes.sort((a, b) => +a.date - +b.date)
        .reduce((acc, groupSize) => {
            const groupSizeInMM = Number(groupSize.groupSizeInMM);
            if (groupSizeInMM === 0) return acc;

            if (!acc[groupSize.distance]) acc[groupSize.distance] = [];

            acc[groupSize.distance].push({ ...groupSize, index: acc[groupSize.distance].length + 1});

            return acc;
        }, {});
}