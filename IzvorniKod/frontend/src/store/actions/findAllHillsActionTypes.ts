import {HillOption} from "../../components/mountain-lodge/models/HillOption";

export const FIND_ALL_HILLS = "FIND_ALL_HILLS";
export const FIND_ALL_HILLS_SUCCESS = "FIND_ALL_HILLS_SUCCESS";
export const FIND_ALL_HILLS_ERROR = "FIND_ALL_HILLS_ERROR";

interface findAllHills {
    type: typeof FIND_ALL_HILLS,
    payload: undefined
}

interface findAllHillsSuccess {
    type: typeof FIND_ALL_HILLS_SUCCESS,
    payload: HillOption[]
}

interface findAllHillsError {
    type: typeof FIND_ALL_HILLS_ERROR,
    payload: string | undefined
}

export type findAllHillsActionTypes = findAllHills | findAllHillsSuccess | findAllHillsError;