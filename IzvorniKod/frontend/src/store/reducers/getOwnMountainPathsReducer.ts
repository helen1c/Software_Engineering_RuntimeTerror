import {MyMountainPathResult} from "../../components/mountain-path/models/MyMountainPathResult";
import {
    DELETE_MOUNTAIN_PATH,
    DELETE_MOUNTAIN_PATH_ERROR,
    DELETE_MOUNTAIN_PATH_SUCCESS,
    GET_OWN_PATHS,
    GET_OWN_PATHS_ERROR,
    GET_OWN_PATHS_SUCCESS,
    getAndDeleteOwnMountainPathsActionTypes
} from "../actions/getAndDeleteOwnMountainPathsActionTypes";

interface State {
    ownPaths: MyMountainPathResult[],
    getOwnPathsStatus: string,
    getOwnPathsError: string | undefined,
    deletePathStatus: string,
    deletePathError: string | undefined
}

const initialState = {
    ownPaths: [],
    getOwnPathsStatus: "idle" as string,
    getOwnPathsError: undefined,
    deletePathStatus: "idle" as string,
    deletePathError: undefined
}

export default (state: State = initialState, action: getAndDeleteOwnMountainPathsActionTypes) => {

    switch (action.type) {
        case GET_OWN_PATHS:
            return {...state, getOwnPathsStatus: 'waiting'};
        case GET_OWN_PATHS_SUCCESS:
            return {...state, getOwnPathsStatus: 'success', ownPaths: action.payload};
        case GET_OWN_PATHS_ERROR:
            return {...state, getOwnPathsStatus: 'error', getOwnPathsError: action.payload};
        case DELETE_MOUNTAIN_PATH:
            return {...state, deletePathStatus: "waiting"}
        case DELETE_MOUNTAIN_PATH_SUCCESS:
            state.ownPaths = state.ownPaths.filter(value => value.id !== action.payload.pathId);
            return {
                ...state,
                deletePathStatus: "success"
            }
        case DELETE_MOUNTAIN_PATH_ERROR:
            return {
                ...state, deletePathError: action.payload
            }
        default:
            return state;
    }

};