import fetch from '../../common/utils/fetch';

// action types

export const LOAD = 'LOAD';

// action creators

export function loadAction() {
    return {
        type: LOAD,
    };
}

// async actions

export function loadData() {
    return (dispatch, getState) => {
        const url = '/api/load';

        return fetch(url)
            .then((response: any) => console.log(response))
            .catch(err => console.log({err}));
    };
}
