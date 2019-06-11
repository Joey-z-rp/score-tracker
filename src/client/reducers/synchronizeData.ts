import {
    SYNC_SHOOTER,
} from '../actions/synchronizeData';
import { IAction } from '../interfaces/actions';

const initialState = {

};

export default function reducer(
    state: any = initialState,
    action: IAction,
): any {
    switch (action.type) {

        case SYNC_SHOOTER:
            return {
                ...state,
            };

        default:
            return state;
    }
}
