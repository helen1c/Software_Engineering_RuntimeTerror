import {
    GET_PRINCIPAL_USER_PROFILE,
    GET_PRINCIPAL_USER_PROFILE_ERROR,
    GET_PRINCIPAL_USER_PROFILE_SUCCESS,
    GET_PRINCIPAL_USER_PROFILE_PICTURE,
    GET_PRINCIPAL_USER_PROFILE_PICTURE_SUCCESS,
    GET_PRINCIPAL_USER_PROFILE_PICTURE_ERROR,
    getProfileActionTypes
} from "./getProfileActionTypes"
import {Profile} from "../../components/profile/models/Profile";
import {Dispatch} from "react";

export const getPrincipalUserProfile = () : getProfileActionTypes => ({
    type: GET_PRINCIPAL_USER_PROFILE,
    payload: undefined
});

export const getPrincipalUserProfileSuccess = (profile : Profile) : getProfileActionTypes => ({
    type: GET_PRINCIPAL_USER_PROFILE_SUCCESS,
    payload: profile
});

export const getPrincipalUserProfileError = (error : string | undefined) : getProfileActionTypes => ({
    type: GET_PRINCIPAL_USER_PROFILE_ERROR,
    payload: undefined
});

export const getPrincipalUserProfilePicture = () : getProfileActionTypes => ({
    type: GET_PRINCIPAL_USER_PROFILE_PICTURE,
    payload: undefined
});

export const getPrincipalUserProfilePictureSuccess = (picture : string) : getProfileActionTypes => ({
    type: GET_PRINCIPAL_USER_PROFILE_PICTURE_SUCCESS,
    payload: picture
});

export const getPrincipalUserProfilePictureError = (error : string | undefined) : getProfileActionTypes => ({
    type: GET_PRINCIPAL_USER_PROFILE_PICTURE_ERROR,
    payload: undefined
});

export const getPrincipalProfilePicture = () => (dispatch: Dispatch<getProfileActionTypes>) => {
    dispatch(getPrincipalUserProfilePicture());
    getPrincipalUserProfilePictureMethod().then(picture => {
        dispatch(getPrincipalUserProfilePictureSuccess(picture));
        return;
    }).catch(reject => {
        dispatch(getPrincipalUserProfilePictureError(reject));
    })
}

export const getPrincipalProfile = () => (dispatch: Dispatch<getProfileActionTypes>) => {
    dispatch(getPrincipalUserProfile());
    getPrincipalUserProfileMethod().then(data => {
        dispatch(getPrincipalUserProfileSuccess({
            ...data,
            dateOfBirth: new Date(data.dateOfBirth),
        }));
        return;
    }).catch(reject => {
        dispatch(getPrincipalUserProfileError(reject));
    })
}

const getPrincipalUserProfileMethod = async (): Promise<Profile> => {
    let result = await fetch("/api/users/me", {
        method: "GET",
        headers: new Headers({
            authorization: sessionStorage.getItem("key") || "",
        }),
    });
    return result.json();
}

const getPrincipalUserProfilePictureMethod = async (): Promise<string> => {
    return await fetch("/api/users/image", {
        method: "GET",
        headers: new Headers({
            authorization: sessionStorage.getItem("key") || "",
        }),
    }).then(imageResponse => {
        if (imageResponse.status === 200) {
            return imageResponse.blob().then(blobResponse =>
            {
                return URL.createObjectURL(blobResponse)
            });
        }
       return Promise.resolve("");
    });
}