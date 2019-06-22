import fetch from '../../common/utils/fetch';

export const CALL_API = 'call_api';

const apiMiddleware = ({ getState, dispatch }) => next => action => {
    if (!action[CALL_API]) return next(action);

    const {
        endpoint,
        onFailure = () => {},
        onSuccess = () => {},
        types,
    } = action[CALL_API];
    console.log(types)
    const [requestType, successType, failureType] = types;

    next({ type: requestType });

    fetch(endpoint)
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
