import { CALL_API } from '../redux/apiMiddleware';

export const SYNC_SHOOTER = 'SYNC_SHOOTER';
export const SYNC_SHOOTER_SUCCESS = 'SYNC_SHOOTER_SUCCESS';
export const SYNC_SHOOTER_FAILURE = 'SYNC_SHOOTER_FAILURE';

export const syncShooter = (shooterId: number) => ({
    [CALL_API]: {
        types: [SYNC_SHOOTER, SYNC_SHOOTER_SUCCESS, SYNC_SHOOTER_FAILURE],
        endpoint: `/syncShooterData?shooterId=${shooterId}`,
        onSuccess: (response) => { console.log({ SYNC_SHOOTER_SUCCESS: response }) },
        onFailure: (error) => { console.log({ SYNC_SHOOTER_FAILURE: error }) },
    },
});
