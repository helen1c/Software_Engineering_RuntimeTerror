import {MyMountainPathResult} from "../../components/mountain-path/models/MyMountainPathResult";

export const GET_OWN_PATHS = "GET_OWN_PATHS";
export const GET_OWN_PATHS_SUCCESS = "GET_OWN_PATHS_SUCCESS";
export const GET_OWN_PATHS_ERROR = "GET_OWN_PATHS_ERROR";

export const DELETE_MOUNTAIN_PATH_SUCCESS = "DELETE_MOUNTAIN_PATH_SUCCESS";
export const DELETE_MOUNTAIN_PATH = "DELETE_MOUNTAIN_PATH";
export const DELETE_MOUNTAIN_PATH_ERROR = "DELETE_MOUNTAIN_PATH_ERROR";

interface deleteMountainPath {
    type: typeof DELETE_MOUNTAIN_PATH,
    payload: undefined
}

interface deleteMountainPathSuccess {
    type: typeof DELETE_MOUNTAIN_PATH_SUCCESS,
    payload: {
        pathId: number
    }
}

interface deleteMountainPathError {
    type: typeof DELETE_MOUNTAIN_PATH_ERROR,
    payload: string | undefined
}

interface getOwnPaths {
    type: typeof GET_OWN_PATHS,
    payload: undefined
}

interface getOwnPathsSuccess {
    type: typeof GET_OWN_PATHS_SUCCESS,
    payload: MyMountainPathResult[]
}

interface getOwnPathsError {
    type: typeof GET_OWN_PATHS_ERROR,
    payload: string | undefined
}

export type getAndDeleteOwnMountainPathsActionTypes = deleteMountainPath | deleteMountainPathError | deleteMountainPathSuccess |getOwnPaths | getOwnPathsSuccess | getOwnPathsError;

