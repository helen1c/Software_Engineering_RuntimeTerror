import {Dispatch} from "react";
import {
    FIND_FAVOURITE_PATHS,
    FIND_FAVOURITE_PATHS_ERROR,
    FIND_FAVOURITE_PATHS_SUCCESS,
    findFavouritePathsActionTypes
} from "./findFavouritePathsActionTypes";

export const findFavPaths = () : findFavouritePathsActionTypes => ({
   type: FIND_FAVOURITE_PATHS,
   payload: undefined
});

export const findFavPathsSuccess = (fav: number[]) : findFavouritePathsActionTypes => ({
    type: FIND_FAVOURITE_PATHS_SUCCESS,
    payload: fav
});


export const findFavPathsError = (error: string|undefined) : findFavouritePathsActionTypes => ({
    type: FIND_FAVOURITE_PATHS_ERROR,
    payload: error
});

export const findWishlist = () => (dispatch: Dispatch<findFavouritePathsActionTypes>) => {
    dispatch(findFavPaths());
    getPathWishlist().then(resolve => {
        dispatch(findFavPathsSuccess(resolve));
        return;
    }).catch(reject => {
        dispatch(findFavPathsError(reject));
    })
}
const getPathWishlist = async (): Promise<number[]> => {

    const requestOptions = {
        method: "GET",
        headers: {
            authorization: sessionStorage.getItem("key") || "",
            Accept: "application/json"
        }
    };

    let result = await fetch("/api/users/path-wishlist", requestOptions);
    return result.json();
}

