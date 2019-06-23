import { CALL_API } from '../redux/apiMiddleware';

export const GET_GROUP_SIZES = 'GET_GROUP_SIZES';
export const GET_GROUP_SIZES_SUCCESS = 'GET_GROUP_SIZES_SUCCESS';
export const GET_GROUP_SIZES_FAILURE = 'GET_GROUP_SIZES_FAILURE';

export const getGroupSizes = (shooterId: number) => ({
    [CALL_API]: {
        types: [GET_GROUP_SIZES, GET_GROUP_SIZES_SUCCESS, GET_GROUP_SIZES_FAILURE],
        endpoint: `/api/shooter/${shooterId}/groupSizes`,
        onSuccess: (response) => { console.log({ GET_GROUP_SIZES_SUCCESS: response }) },
        onFailure: (error) => { console.log({ GET_GROUP_SIZES_FAILURE: error }) },
    },
});
