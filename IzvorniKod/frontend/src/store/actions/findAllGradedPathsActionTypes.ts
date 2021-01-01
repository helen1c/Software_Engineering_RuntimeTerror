import {MountainPathUserGrade} from "../../components/mountain-path/models/MountainPathUserGrade";

export const FIND_ALL_GRADED_PATHS = "FIND_ALL_GRADED_PATHS";
export const FIND_ALL_GRADED_PATHS_SUCCESS = "FIND_ALL_GRADED_PATHS_SUCCESS";
export const FIND_ALL_GRADED_PATHS_ERROR = "FIND_ALL_GRADED_PATHS_ERROR";

interface findAllGradedPaths {
    type: typeof FIND_ALL_GRADED_PATHS,
    payload: undefined
}

interface findAllGradedPathsSuccess {
    type: typeof FIND_ALL_GRADED_PATHS_SUCCESS,
    payload: MountainPathUserGrade[]
}

interface findAllGradedPathsError {
    type: typeof FIND_ALL_GRADED_PATHS_ERROR,
    payload: string | undefined
}

export type findAllGradedPathsActionTypes = findAllGradedPaths | findAllGradedPathsSuccess | findAllGradedPathsError;