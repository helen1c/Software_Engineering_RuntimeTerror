import {
    FIND_ALL_GRADED_PATHS,
    FIND_ALL_GRADED_PATHS_SUCCESS,
    FIND_ALL_GRADED_PATHS_ERROR,
    findAllGradedPathsActionTypes
} from "../actions/findAllGradedPathsActionTypes"
import {MountainPathUserGrade} from "../../components/mountain-path/models/MountainPathUserGrade";

export interface State {
    gradedPaths: MountainPathUserGrade[],
    error: string | undefined,
    status: string
}

const initialState = {
    gradedPaths: [],
    error: undefined,
    status: "idle"
} as State;

export default (state: State = initialState, action: findAllGradedPathsActionTypes) => {
    switch (action.type) {
        case FIND_ALL_GRADED_PATHS:
            return {...state, status: 'waiting'};
        case FIND_ALL_GRADED_PATHS_SUCCESS:
            return {...state, status: 'success', gradedPaths: action.payload};
        case FIND_ALL_GRADED_PATHS_ERROR:
            return {...state, status: 'error', error: action.payload}
        default:
            return state;
    }
};