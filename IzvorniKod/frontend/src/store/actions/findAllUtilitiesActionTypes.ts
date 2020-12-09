
export const FIND_ALL_UTILITIES = "FIND_ALL_UTILITIES";
export const FIND_ALL_UTILITIES_SUCCESS = "FIND_ALL_UTILITIES_SUCCESS";
export const FIND_ALL_UTILITIES_ERROR = "FIND_ALL_UTILITIES_ERROR";

interface findAllUtilities {
    type: typeof FIND_ALL_UTILITIES,
    payload: undefined
}

interface findAllUtilitiesSuccess {
    type: typeof FIND_ALL_UTILITIES_SUCCESS,
    payload: HillOption[]
}

interface findAllUtilitiesError {
    type: typeof FIND_ALL_UTILITIES_ERROR,
    payload: string | undefined
}

export type findAllUtilitiesActionTypes = findAllUtilities | findAllUtilitiesSuccess | findAllUtilitiesError;