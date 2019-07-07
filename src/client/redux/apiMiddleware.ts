import fetch from '../../common/utils/fetch';

export const CALL_API = 'call_api';

const apiMiddleware = ({ getState, dispatch }) => next => action => {
    if (!action[CALL_API]) return next(action);

    const {
        baseUrl = '/api',
        endpoint,
        onFailure = () => {},
        onSuccess = () => {},
        types,
    } = action[CALL_API];
    
    const [requestType, successType, failureType] = types;

    next({ type: requestType });

    fetch(baseUrl + endpoint)
        .then(response => {
            next({
                type: successType,
                payload: response,
            });
            onSuccess(response);
        })
        .catch(error => {
            next({ type: failureType });
            onFailure(error);
        });
};

export default apiMiddleware;
