import {
    LOAD,
} from '../actions/load';
import { IAction } from '../interfaces/actions';

const initialState = {

};

export default function reducer(
    state: any = initialState,
    action: IAction,
): any {
    switch (action.type) {

        case LOAD:
            return {
                ...state,
            };

        default:
            return state;
    }
}
