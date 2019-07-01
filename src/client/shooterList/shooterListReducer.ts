import { convertDateString } from '../redux/utils';
import {
    GET_ALL_SHOOTERS,
    GET_ALL_SHOOTERS_FAILURE,
    GET_ALL_SHOOTERS_SUCCESS,
} from './shooterListActions';
import { IAction, IShooterListState } from '../redux/types';

const initialState = {
    error: null,
    isFetching: false,
    shooters: [],
};

export default function reducer(
    state: IShooterListState = initialState,
    action: IAction,
): IShooterListState {
    switch (action.type) {

        case GET_ALL_SHOOTERS:
            return {
                ...state,
                isFetching: true,
                error: null,
            };

        case GET_ALL_SHOOTERS_SUCCESS:
            const shooters = action.payload.map(shooter => convertDateString(shooter));
            return {
                ...state,
                shooters,
                isFetching: false,
            };

        case GET_ALL_SHOOTERS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload,
            };

        default:
            return state;
    }
}
