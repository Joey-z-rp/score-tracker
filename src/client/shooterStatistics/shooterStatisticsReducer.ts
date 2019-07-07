import { convertDateString } from '../redux/utils';
import {
    GET_GROUP_SIZES,
    GET_GROUP_SIZES_FAILURE,
    GET_GROUP_SIZES_SUCCESS,
    GET_H_EYES,
    GET_H_EYES_FAILURE,
    GET_H_EYES_SUCCESS,
} from './shooterStatisticsActions';
import {
    IAction,
    IConvertedGroupSizes,
    IGroupSizeWithDate,
    IShooterStatistics,
} from '../redux/types';

const initialState = {
    groupSizes: {},
    groupSizesError: null,
    hEyes: [],
    hEyesError: null,
    isFetchingGroupSizes: false,
    isFetchingHEyes: false,
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
                groupSizesError: null,
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
                groupSizesError: action.payload,
            };

        case GET_H_EYES:
            return {
                ...state,
                isFetchingHEyes: true,
                hEyesError: null,
            };

        case GET_H_EYES_SUCCESS:
            return {
                ...state,
                isFetchingHEyes: false,
                hEyes: action.payload.map(hEye => convertDateString(hEye)),
            };

        case GET_H_EYES_FAILURE:
            return {
                ...state,
                isFetchingHEyes: false,
                hEyesError: action.payload,
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