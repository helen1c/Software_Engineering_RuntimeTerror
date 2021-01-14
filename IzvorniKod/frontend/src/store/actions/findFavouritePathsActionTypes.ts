export const FIND_FAVOURITE_PATHS = "FIND_FAVOURITE_PATHS";
export const FIND_FAVOURITE_PATHS_ERROR = "FIND_FAVOURITE_PATHS_ERROR";
export const FIND_FAVOURITE_PATHS_SUCCESS = "FIND_FAVOURITE_PATHS_SUCCESS";

interface findFavouritePaths {
    type: typeof FIND_FAVOURITE_PATHS,
    payload: undefined
}

interface findFavouritePathsSuccess {
    type: typeof FIND_FAVOURITE_PATHS_SUCCESS,
    payload: number[]
}

interface findFavouritePathsError {
    type: typeof FIND_FAVOURITE_PATHS_ERROR,
    payload: undefined|string
}

export type findFavouritePathsActionTypes = findFavouritePaths | findFavouritePathsError | findFavouritePathsSuccess;

