import {Dispatch} from "react";
import {
    DELETE_MOUNTAIN_PATH,
    DELETE_MOUNTAIN_PATH_ERROR,
    DELETE_MOUNTAIN_PATH_SUCCESS,
    GET_OWN_PATHS,
    GET_OWN_PATHS_ERROR,
    GET_OWN_PATHS_SUCCESS,
    getAndDeleteOwnMountainPathsActionTypes
} from "./getAndDeleteOwnMountainPathsActionTypes";
import {MyMountainPathResult} from "../../components/mountain-path/models/MyMountainPathResult";

export const getOwnPaths = () : getAndDeleteOwnMountainPathsActionTypes => ({
   type: GET_OWN_PATHS,
   payload: undefined
});

export const getOwnPathsSuccess = (ownPaths: MyMountainPathResult[]) : getAndDeleteOwnMountainPathsActionTypes => ({
    type: GET_OWN_PATHS_SUCCESS,
    payload: ownPaths
});

export const getOwnPathsError = (error: string|undefined) : getAndDeleteOwnMountainPathsActionTypes => ({
    type: GET_OWN_PATHS_ERROR,
    payload: error
});

export const deleteOwnMountainPath = () : getAndDeleteOwnMountainPathsActionTypes => ({
   type: DELETE_MOUNTAIN_PATH,
   payload: undefined
});

export const deleteOwnMountainPathSuccess = (pathId: number) : getAndDeleteOwnMountainPathsActionTypes => ({
    type: DELETE_MOUNTAIN_PATH_SUCCESS,
    payload: {
        pathId
    }
});

export const deleteOwnMountainPathError = (error: string |undefined) : getAndDeleteOwnMountainPathsActionTypes => ({
    type: DELETE_MOUNTAIN_PATH_ERROR,
    payload: error
});

export const getOwnMountainPaths = () => (dispatch: Dispatch<getAndDeleteOwnMountainPathsActionTypes>) => {
    dispatch(getOwnPaths());
    getMyPaths().then(resolve => {
        dispatch(getOwnPathsSuccess(resolve));
        return;
    }).catch(reject => {
        dispatch(getOwnPathsError(reject));
    })
}

export const dispatchDeleteOwnMountainPath = (id: number) => (dispatch: Dispatch<getAndDeleteOwnMountainPathsActionTypes>) => {
    dispatch(deleteOwnMountainPath())
    deletePath(id).then(resolve => {
        dispatch(deleteOwnMountainPathSuccess(id));
        return;
    }).catch(reject => {
        dispatch(deleteOwnMountainPathError(reject))
    })
}

const deletePath = async (id: number): Promise<string> => {
    const requestOptions = {
        method: "DELETE",
        headers: {
            authorization: sessionStorage.getItem("key") || "",
            Accept: "application/json"
        }
    };
    let result = await fetch("/api/mountain-paths/" + id, requestOptions);
    return result.text();
}

const getMyPaths = async (): Promise<MyMountainPathResult[]> => {

    const requestOptions = {
        method: "GET",
        headers: {
            authorization: sessionStorage.getItem("key") || "",
            Accept: "application/json"
        }
    };

    let result = await fetch("/api/mountain-paths/by-user", requestOptions);
    return result.json();
}