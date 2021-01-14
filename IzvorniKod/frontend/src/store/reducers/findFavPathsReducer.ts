import {
    FIND_FAVOURITE_PATHS, FIND_FAVOURITE_PATHS_ERROR,
    FIND_FAVOURITE_PATHS_SUCCESS,
    findFavouritePathsActionTypes
} from "../actions/findFavouritePathsActionTypes";


export interface State {
    favPaths: number[],
    error: string | undefined,
    status: string
}

const initialState = {
    favPaths: [],
    error: undefined,
    status: "idle"
} as State;

export default (state: State = initialState, action: findFavouritePathsActionTypes) => {

    switch (action.type) {
        case FIND_FAVOURITE_PATHS:
            return {...state, status: 'waiting'};
        case FIND_FAVOURITE_PATHS_SUCCESS:
            return {...state, status: 'success', favPaths: action.payload};
        case FIND_FAVOURITE_PATHS_ERROR:
            return {...state, status: 'error', error: action.payload}
        default:
            return state;
    }
};