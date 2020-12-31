import {Dispatch} from "react";
import {
    GET_OWN_PATHS,
    GET_OWN_PATHS_ERROR,
    GET_OWN_PATHS_SUCCESS,
    getOwnMountainPathsActionTypes
} from "./getOwnMountainPathsActionTypes";
import {MyMountainPathResult} from "../../components/mountain-path/models/MyMountainPathResult";

export const getOwnPaths = () : getOwnMountainPathsActionTypes => ({
   type: GET_OWN_PATHS,
   payload: undefined
});

export const getOwnPathsSuccess = (ownPaths: MyMountainPathResult[]) : getOwnMountainPathsActionTypes => ({
    type: GET_OWN_PATHS_SUCCESS,
    payload: ownPaths
});

export const getOwnPathsError = (error: string|undefined) : getOwnMountainPathsActionTypes => ({
    type: GET_OWN_PATHS_ERROR,
    payload: error
});

export const getOwnMountainPaths = () => (dispatch: Dispatch<getOwnMountainPathsActionTypes>) => {
    dispatch(getOwnPaths());
    getMyPaths().then(resolve => {
        dispatch(getOwnPathsSuccess(resolve));
        return;
    }).catch(reject => {
        dispatch(getOwnPathsError(reject));
    })
}

const getMyPaths = async (): Promise<MyMountainPathResult[]> => {

    const requestOptions = {
        method: "GET",
        headers: {
            authorization: sessionStorage.getItem("key") || "",
            Accept: "application/json"
        }
    };

    let result = await fetch("/api/mountain-paths/by_user", requestOptions);
    return result.json();
}