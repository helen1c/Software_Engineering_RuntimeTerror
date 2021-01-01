import {Dispatch} from "react";
import {
    FIND_ALL_GRADED_PATHS,
    FIND_ALL_GRADED_PATHS_SUCCESS,
    FIND_ALL_GRADED_PATHS_ERROR,
    findAllGradedPathsActionTypes
} from "./findAllGradedPathsActionTypes";

import {MountainPathUserGrade} from "../../components/mountain-path/models/MountainPathUserGrade";

export const findAllGradedPaths = (): findAllGradedPathsActionTypes => ({
    type: FIND_ALL_GRADED_PATHS,
    payload: undefined
});

export const findAllGradedPathsSuccess = (archivedPaths: MountainPathUserGrade[]): findAllGradedPathsActionTypes => ({
    type: FIND_ALL_GRADED_PATHS_SUCCESS,
    payload: archivedPaths
});

export const findAllGradedPathsError = (error: string | undefined): findAllGradedPathsActionTypes => ({
    type: FIND_ALL_GRADED_PATHS_ERROR,
    payload: error
});

export const findGradedPaths = () => (dispatch: Dispatch<findAllGradedPathsActionTypes>) => {
    dispatch(findAllGradedPaths());
    getAllGradedPaths().then(resolve => {
        dispatch(findAllGradedPathsSuccess(resolve));
        return;
    }).catch(reject => {
        dispatch(findAllGradedPathsError(reject));
    })
}

const getAllGradedPaths = async (): Promise<MountainPathUserGrade[]> => {

    const requestOptions = {
        method: "GET",
        headers: {
            authorization: sessionStorage.getItem("key") || "",
            Accept: "application/json"
        }
    };

    let result = await fetch("/api/users/graded-paths/all", requestOptions);
    return result.json();
}
