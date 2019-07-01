import { IAction } from '../redux/types';
import {
    SYNC_SHOOTER,
} from './synchronizeDataActions';

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
