import { CALL_API } from '../redux/apiMiddleware';

export const GET_ALL_SHOOTERS = 'GET_ALL_SHOOTERS';
export const GET_ALL_SHOOTERS_SUCCESS = 'GET_ALL_SHOOTERS_SUCCESS';
export const GET_ALL_SHOOTERS_FAILURE = 'GET_ALL_SHOOTERS_FAILURE';

export const getAllShooters = () => ({
    [CALL_API]: {
        types: [GET_ALL_SHOOTERS, GET_ALL_SHOOTERS_SUCCESS, GET_ALL_SHOOTERS_FAILURE],
        endpoint: '/shooters',
        onSuccess: (response) => { console.log({ GET_ALL_SHOOTERS_SUCCESS: response }) },
        onFailure: (error) => { console.log({ GET_ALL_SHOOTERS_FAILURE: error }) },
    },
});
