import {
    FIND_ALL_UTILITIES,
    FIND_ALL_UTILITIES_ERROR,
    FIND_ALL_UTILITIES_SUCCESS,
    findAllUtilitiesActionTypes
} from "./findAllUtilitiesActionTypes"
import {Dispatch} from "react";
import {UtilityOption} from "../../components/mountain-lodge/models/UtilityOption";
import {fetcher} from "../../Util";


export const findAllUtilities = () : findAllUtilitiesActionTypes => ({
    type: FIND_ALL_UTILITIES,
    payload: undefined
});

export const findAllUtilitiesSuccess = (options : UtilityOption[]) : findAllUtilitiesActionTypes => ({
    type: FIND_ALL_UTILITIES_SUCCESS,
    payload: options
});

export const findAllUtilitiesError = (error : string | undefined) : findAllUtilitiesActionTypes => ({
    type: FIND_ALL_UTILITIES_ERROR,
    payload: undefined
});

export const findUtilities = () => (dispatch: Dispatch<findAllUtilitiesActionTypes>) => {
    dispatch(findAllUtilities());
    getAllUtilities().then(resolve => {
        dispatch(findAllUtilitiesSuccess(resolve));
        return;
    }).catch(reject => {
        dispatch(findAllUtilitiesError(reject));
    })
}

const getAllUtilities = async (): Promise<UtilityOption[]> => {
    let result = await fetcher("/api/utilities/all", {method: "GET"});
    return result.json();
}

