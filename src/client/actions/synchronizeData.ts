import fetch from '../../common/utils/fetch';

// action types

export const SYNC_SHOOTER = 'SYNC_SHOOTER';

// action creators

export function syncShooterAction() {
    return {
        type: SYNC_SHOOTER,
    };
}

// async actions

export function syncShooterData(shooterId: number) {
    return (dispatch, getState) => {
        const url = `/api/syncShooterData?shooterId=${shooterId}`;

        return fetch(url)
            .then((response: any) => console.log(response))
            .catch(err => console.log({err}));
    };
}
