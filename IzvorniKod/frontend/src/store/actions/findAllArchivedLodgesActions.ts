import {Dispatch} from "react";
import {
    FIND_ALL_ARCHIVED_LODGES,
    FIND_ALL_ARCHIVED_LODGES_ERROR,
    FIND_ALL_ARCHIVED_LODGES_SUCCESS,
    findAllArchivedLodgesActionTypes
} from "./findAllArchivedLodgesActionTypes";
import {MountainLodgeUserArchive} from "../../components/mountain-lodge/models/MountainLodgeUserArchive";
import {fetcher} from "../../Util";

export const findAllArchivedLodges = () : findAllArchivedLodgesActionTypes => ({
   type: FIND_ALL_ARCHIVED_LODGES,
   payload: undefined
});

export const findAllArchivedLodgesSuccess = (lodges : MountainLodgeUserArchive[]) : findAllArchivedLodgesActionTypes => ({
    type: FIND_ALL_ARCHIVED_LODGES_SUCCESS,
    payload: lodges
});

export const findAllArchivedLodgesError = (error : string | undefined) : findAllArchivedLodgesActionTypes => ({
    type: FIND_ALL_ARCHIVED_LODGES_ERROR,
    payload: error
});

export const findArchivedLodges = () => (dispatch: Dispatch<findAllArchivedLodgesActionTypes>) => {
    dispatch(findAllArchivedLodges());
    getAllArchivedLodges().then(resolve => {
        dispatch(findAllArchivedLodgesSuccess(resolve));
        return;
    }).catch(reject => {
        dispatch(findAllArchivedLodgesError(reject));
    })
}

const getAllArchivedLodges = async (): Promise<MountainLodgeUserArchive[]> => {

    const requestOptions = {
        method: "GET"
    };

    let result = await fetcher("/api/users/archived-lodges/all", requestOptions);
    return result.json();
}

