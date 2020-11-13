import {HillOption} from "../../components/mountain-lodge/models/HillOption";
import {
    FIND_ALL_HILLS,
    FIND_ALL_HILLS_ERROR,
    FIND_ALL_HILLS_SUCCESS,
    findAllHillsActionTypes
} from "../actions/findAllHillsActionTypes";


export interface HillState {
    results: HillOption[],
    error: string | undefined,
    status: string
}

const initialHillState = {
    results: [],
    error: undefined,
    status: "idle"
} as HillState;

export default (state: HillState = initialHillState, action: findAllHillsActionTypes) => {

    switch (action.type) {
        case FIND_ALL_HILLS: return {...state, status: 'waiting'};
        case FIND_ALL_HILLS_SUCCESS: return {...state, status: 'success', results: action.payload};
        case FIND_ALL_HILLS_ERROR: return {...state, status: 'error', error: action.payload}
        default: return state;
    }

};