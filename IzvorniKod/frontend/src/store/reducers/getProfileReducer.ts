import {
    GET_PRINCIPAL_USER_PROFILE,
    GET_PRINCIPAL_USER_PROFILE_ERROR,
    GET_PRINCIPAL_USER_PROFILE_PICTURE,
    GET_PRINCIPAL_USER_PROFILE_PICTURE_ERROR,
    GET_PRINCIPAL_USER_PROFILE_PICTURE_SUCCESS,
    GET_PRINCIPAL_USER_PROFILE_SUCCESS,
    getProfileActionTypes
} from "../actions/getProfileActionTypes";
import {Profile} from "../../components/profile/models/Profile";

export interface ProfileState {
    user: Profile | undefined,
    imageUrl: string,
    error: string | undefined,
    status: string
}

const initialProfileState = {
    user: undefined,
    imageUrl: "",
    error: undefined,
    status: "idle"
} as ProfileState;

export default (state: ProfileState = initialProfileState, action: getProfileActionTypes) => {

    switch (action.type) {
        case GET_PRINCIPAL_USER_PROFILE:
        case GET_PRINCIPAL_USER_PROFILE_PICTURE: return {...state, status: 'waiting'};
        case GET_PRINCIPAL_USER_PROFILE_SUCCESS: return {...state, status: 'success', user: action.payload};
        case GET_PRINCIPAL_USER_PROFILE_ERROR: return {...state, status: 'error', error: action.payload};
        case GET_PRINCIPAL_USER_PROFILE_PICTURE_SUCCESS: return {...state, status: 'success', imageUrl: action.payload};
        case GET_PRINCIPAL_USER_PROFILE_PICTURE_ERROR: return {...state, status: 'error', error: action.payload};
        default: return state;
    }

};