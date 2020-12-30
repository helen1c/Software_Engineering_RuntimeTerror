import {MountainPathUserArchive} from "../../components/mountain-path/models/MountainPathUserArchive";

export const FIND_ALL_ARCHIVED_PATHS = "FIND_ALL_ARCHIVED_PATHS";
export const FIND_ALL_ARCHIVED_PATHS_SUCCESS = "FIND_ALL_ARCHIVED_PATHS_SUCCESS";
export const FIND_ALL_ARCHIVED_PATHS_ERROR = "FIND_ALL_ARCHIVED_PATHS_ERROR";

interface findAllArchivedPaths {
    type: typeof FIND_ALL_ARCHIVED_PATHS,
    payload: undefined
}

interface findAllArchivedPathsSuccess {
    type: typeof FIND_ALL_ARCHIVED_PATHS_SUCCESS,
    payload: MountainPathUserArchive[]
}

interface findAllArchivedPathsError {
    type: typeof FIND_ALL_ARCHIVED_PATHS_ERROR,
    payload: string | undefined
}

export type findAllArchivedPathsActionTypes = findAllArchivedPaths | findAllArchivedPathsSuccess | findAllArchivedPathsError;
