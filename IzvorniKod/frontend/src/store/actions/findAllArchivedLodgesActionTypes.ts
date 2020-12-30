import {MountainLodgeUserArchive} from "../../components/mountain-lodge/models/MountainLodgeUserArchive";

export const FIND_ALL_ARCHIVED_LODGES = "FIND_ALL_ARCHIVED_LODGES";
export const FIND_ALL_ARCHIVED_LODGES_SUCCESS = "FIND_ALL_ARCHIVED_LODGES_SUCCESS";
export const FIND_ALL_ARCHIVED_LODGES_ERROR = "FIND_ALL_ARCHIVED_LODGES_ERROR";

interface findAllArchivedLodges {
    type: typeof FIND_ALL_ARCHIVED_LODGES,
    payload: undefined
}

interface findAllArchivedLodgesSuccess {
    type: typeof FIND_ALL_ARCHIVED_LODGES_SUCCESS,
    payload: MountainLodgeUserArchive[]
}

interface findAllArchivedLodgesError {
    type: typeof FIND_ALL_ARCHIVED_LODGES_ERROR,
    payload: string | undefined
}

export type findAllArchivedLodgesActionTypes = findAllArchivedLodges | findAllArchivedLodgesSuccess | findAllArchivedLodgesError;
