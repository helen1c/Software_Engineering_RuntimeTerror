import {UtilityOption} from "../../components/mountain-lodge/models/UtilityOption";
import {
    FIND_ALL_UTILITIES,
    FIND_ALL_UTILITIES_ERROR,
    FIND_ALL_UTILITIES_SUCCESS,
    findAllUtilitiesActionTypes
} from "../actions/findAllUtilitiesActionTypes";


export interface UtilityState {
    results: UtilityOption[],
    error: string | undefined,
    status: string
}

const initialUtilityState = {
    results: [] as UtilityOption[],
    error: undefined,
    status: "idle" as string
} as UtilityState;

export default (state: UtilityState = initialUtilityState, action: findAllUtilitiesActionTypes) => {

    switch (action.type) {
        case FIND_ALL_UTILITIES:
            return {...state, status: 'waiting'};
        case FIND_ALL_UTILITIES_SUCCESS:
            return {...state, status: 'success', results: action.payload};
        case FIND_ALL_UTILITIES_ERROR:
            return {...state, status: 'error', error: action.payload}
        default:
            return state;
    }

};