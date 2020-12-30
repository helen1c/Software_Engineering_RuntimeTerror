import {Dispatch} from "react";
import {
    FIND_ALL_ARCHIVED_PATHS,
    FIND_ALL_ARCHIVED_PATHS_ERROR,
    FIND_ALL_ARCHIVED_PATHS_SUCCESS,
    findAllArchivedPathsActionTypes
} from "./findAllArchivedPathsActionTypes";
import {MountainPathUserArchive} from "../../components/mountain-path/models/MountainPathUserArchive";

export const findAllArchivedPaths = (): findAllArchivedPathsActionTypes => ({
    type: FIND_ALL_ARCHIVED_PATHS,
    payload: undefined
});

export const findAllArchivedPathsSuccess = (archivedPaths: MountainPathUserArchive[]): findAllArchivedPathsActionTypes => ({
    type: FIND_ALL_ARCHIVED_PATHS_SUCCESS,
    payload: archivedPaths
});

export const findAllArchivedPathsError = (error: string | undefined): findAllArchivedPathsActionTypes => ({
    type: FIND_ALL_ARCHIVED_PATHS_ERROR,
    payload: error
});

export const findArchivedPaths = () => (dispatch: Dispatch<findAllArchivedPathsActionTypes>) => {
    dispatch(findAllArchivedPaths());
    getAllArchivedPaths().then(resolve => {
        dispatch(findAllArchivedPathsSuccess(resolve));
        return;
    }).catch(reject => {
        dispatch(findAllArchivedPathsError(reject));
    })
}

const getAllArchivedPaths = async (): Promise<MountainPathUserArchive[]> => {

    const requestOptions = {
        method: "GET",
        headers: {
            authorization: sessionStorage.getItem("key") || "",
            Accept: "application/json"
        }
    };

    let result = await fetch("/api/users/archived-paths/all", requestOptions);
    return result.json();
}
