import {MyMountainPathResult} from "../../components/mountain-path/models/MyMountainPathResult";

export const GET_OWN_PATHS = "GET_OWN_PATHS";
export const GET_OWN_PATHS_SUCCESS = "GET_OWN_PATHS_SUCCESS";
export const GET_OWN_PATHS_ERROR = "GET_OWN_PATHS_ERROR";

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

export type getOwnMountainPathsActionTypes = getOwnPaths | getOwnPathsSuccess | getOwnPathsError;

