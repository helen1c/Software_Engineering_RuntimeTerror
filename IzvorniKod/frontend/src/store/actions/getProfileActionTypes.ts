import {Profile} from "../../components/profile/models/Profile";

export const GET_PRINCIPAL_USER_PROFILE = "GET_PRINCIPAL_USER_PROFILE";
export const GET_PRINCIPAL_USER_PROFILE_SUCCESS = "GET_PRINCIPAL_USER_PROFILE_SUCCESS";
export const GET_PRINCIPAL_USER_PROFILE_ERROR = "GET_PRINCIPAL_USER_PROFILE_ERROR";
export const GET_PRINCIPAL_USER_PROFILE_PICTURE = "GET_PRINCIPAL_USER_PROFILE_PICTURE";
export const GET_PRINCIPAL_USER_PROFILE_PICTURE_SUCCESS = "GET_PRINCIPAL_USER_PROFILE_PICTURE_SUCCESS";
export const GET_PRINCIPAL_USER_PROFILE_PICTURE_ERROR = "GET_PRINCIPAL_USER_PROFILE_PICTURE_ERROR";

interface getPrincipalUserProfile {
    type: typeof GET_PRINCIPAL_USER_PROFILE,
    payload: undefined
}

interface getPrincipalUserProfileSuccess {
    type: typeof GET_PRINCIPAL_USER_PROFILE_SUCCESS,
    payload: Profile
}

interface getPrincipalUserProfileError {
    type: typeof GET_PRINCIPAL_USER_PROFILE_ERROR,
    payload: string | undefined
}

interface getPrincipalUserProfilePicture {
    type: typeof GET_PRINCIPAL_USER_PROFILE_PICTURE,
    payload: undefined
}

interface getPrincipalUserProfilePictureSuccess {
    type: typeof GET_PRINCIPAL_USER_PROFILE_PICTURE_SUCCESS,
    payload: string
}

interface getPrincipalUserProfilePictureError {
    type: typeof GET_PRINCIPAL_USER_PROFILE_PICTURE_ERROR,
    payload: string | undefined
}

export type getProfileActionTypes =
    getPrincipalUserProfile
    | getPrincipalUserProfileSuccess
    | getPrincipalUserProfileError
    | getPrincipalUserProfilePicture
    | getPrincipalUserProfilePictureSuccess
    | getPrincipalUserProfilePictureError;