import { CALL_API } from '../redux/apiMiddleware';

export const GET_GROUP_SIZES = 'GET_GROUP_SIZES';
export const GET_GROUP_SIZES_SUCCESS = 'GET_GROUP_SIZES_SUCCESS';
export const GET_GROUP_SIZES_FAILURE = 'GET_GROUP_SIZES_FAILURE';
export const GET_H_EYES = 'GET_H_EYES';
export const GET_H_EYES_SUCCESS = 'GET_H_EYES_SUCCESS';
export const GET_H_EYES_FAILURE = 'GET_H_EYES_FAILURE';

export const getGroupSizes = (shooterId: number) => ({
    [CALL_API]: {
        types: [GET_GROUP_SIZES, GET_GROUP_SIZES_SUCCESS, GET_GROUP_SIZES_FAILURE],
        endpoint: `/shooter/${shooterId}/groupSizes`,
        onSuccess: (response) => { console.log({ GET_GROUP_SIZES_SUCCESS: response }) },
        onFailure: (error) => { console.log({ GET_GROUP_SIZES_FAILURE: error }) },
    },
});

export const getHEyes = (shooterId: number) => ({
    [CALL_API]: {
        types: [GET_H_EYES, GET_H_EYES_SUCCESS, GET_H_EYES_FAILURE],
        endpoint: `/shooter/${shooterId}/hEyes`,
        onSuccess: (response) => { console.log({ GET_H_EYES_SUCCESS: response }) },
        onFailure: (error) => { console.log({ GET_H_EYES_FAILURE: error }) },
    },
});
