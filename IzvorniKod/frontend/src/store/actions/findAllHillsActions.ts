import {
    FIND_ALL_HILLS,
    FIND_ALL_HILLS_ERROR,
    FIND_ALL_HILLS_SUCCESS,
    findAllHillsActionTypes
} from "./findAllHillsActionTypes"
import {HillOption} from "../../components/mountain-lodge/models/HillOption";
import {Dispatch} from "react";
import {fetcher} from "../../Util";


export const findAllHills = () : findAllHillsActionTypes => ({
   type: FIND_ALL_HILLS,
   payload: undefined
});

export const findAllHillsSuccess = (options : HillOption[]) : findAllHillsActionTypes => ({
    type: FIND_ALL_HILLS_SUCCESS,
    payload: options
});

export const findAllHillsError = (error : string | undefined) : findAllHillsActionTypes => ({
    type: FIND_ALL_HILLS_ERROR,
    payload: undefined
});

export const findHills = () => (dispatch: Dispatch<findAllHillsActionTypes>) => {
    dispatch(findAllHills());
    getAllHills().then(resolve => {
        dispatch(findAllHillsSuccess(resolve));
        return;
    }).catch(reject => {
        dispatch(findAllHillsError(reject));
    })
}

const getAllHills = async (): Promise<HillOption[]> => {
    let result = await fetcher("/api/hills/all", {method: "GET"});
    return result.json();
}

