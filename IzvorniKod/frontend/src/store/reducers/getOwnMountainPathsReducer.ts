import {MyMountainPathResult} from "../../components/mountain-path/models/MyMountainPathResult";
import {
    GET_OWN_PATHS, GET_OWN_PATHS_ERROR,
    GET_OWN_PATHS_SUCCESS,
    getOwnMountainPathsActionTypes
} from "../actions/getOwnMountainPathsActionTypes";

interface State {
    ownPaths: MyMountainPathResult[],
    status: string,
    error: string | undefined
}

const initialState = {
    ownPaths: [],
    status: "idle" as string,
    error: undefined
}

export default (state: State = initialState, action: getOwnMountainPathsActionTypes) => {

    switch (action.type) {
        case GET_OWN_PATHS:
            return {...state, status: 'waiting'};
        case GET_OWN_PATHS_SUCCESS:
            return {...state, status: 'success', ownPaths: action.payload};
        case GET_OWN_PATHS_ERROR:
            return {...state, status: 'error', error: action.payload}
        default:
            return state;
    }

};