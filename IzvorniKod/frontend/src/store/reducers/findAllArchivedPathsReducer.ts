import {
    FIND_ALL_ARCHIVED_PATHS,
    FIND_ALL_ARCHIVED_PATHS_ERROR,
    FIND_ALL_ARCHIVED_PATHS_SUCCESS,
    findAllArchivedPathsActionTypes
} from "../actions/findAllArchivedPathsActionTypes";
import {MountainPathUserArchive} from "../../components/mountain-path/models/MountainPathUserArchive";


export interface State {
    archivedPaths: MountainPathUserArchive[],
    error: string | undefined,
    status: string
}

const initialState = {
    archivedPaths: [],
    error: undefined,
    status: "idle"
} as State;

export default (state: State = initialState, action: findAllArchivedPathsActionTypes) => {

    switch (action.type) {
        case FIND_ALL_ARCHIVED_PATHS:
            return {...state, status: 'waiting'};
        case FIND_ALL_ARCHIVED_PATHS_SUCCESS:
            return {...state, status: 'success', archivedPaths: action.payload};
        case FIND_ALL_ARCHIVED_PATHS_ERROR:
            return {...state, status: 'error', error: action.payload}
        default:
            return state;
    }

};