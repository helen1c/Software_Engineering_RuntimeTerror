import {UserInfo} from "../../components/mountain-lodge/models/UserInfo";
import {Dispatch} from "react";
import {
    GET_FRIEND_REQUESTS_NOTIFICATION,
    GET_FRIEND_REQUESTS_NOTIFICATION_ERROR,
    GET_FRIEND_REQUESTS_NOTIFICATION_SUCCESS,
    getAndResolveFriendRequestsNotificationActionTypes,
    RESOLVE_FRIEND_REQUEST_NOTIFICATION,
    RESOLVE_FRIEND_REQUEST_NOTIFICATION_ERROR,
    RESOLVE_FRIEND_REQUEST_NOTIFICATION_SUCCESS
} from "./getAndResolveFriendRequestsNotificationActionTypes";


export const getFriendRequestsNotification = () : getAndResolveFriendRequestsNotificationActionTypes => ({
    type: GET_FRIEND_REQUESTS_NOTIFICATION,
    payload: undefined
});

export const getFriendRequestsNotificationSuccess = (options : UserInfo[]) : getAndResolveFriendRequestsNotificationActionTypes => ({
    type: GET_FRIEND_REQUESTS_NOTIFICATION_SUCCESS,
    payload: options
});

export const getFriendRequestsNotificationError = (error : string | undefined) : getAndResolveFriendRequestsNotificationActionTypes => ({
    type: GET_FRIEND_REQUESTS_NOTIFICATION_ERROR,
    payload: error
});

export const resolveFriendRequestsNotificationActions = () : getAndResolveFriendRequestsNotificationActionTypes => ({
    type: RESOLVE_FRIEND_REQUEST_NOTIFICATION,
    payload: undefined
});

export const resolveFriendRequestsNotificationSuccess = (userInfo : UserInfo) : getAndResolveFriendRequestsNotificationActionTypes => ({
    type: RESOLVE_FRIEND_REQUEST_NOTIFICATION_SUCCESS,
    payload: {
        userInfo
    }
});

export const resolveFriendRequestsNotificationError = (error : string | undefined) : getAndResolveFriendRequestsNotificationActionTypes => ({
    type: RESOLVE_FRIEND_REQUEST_NOTIFICATION_ERROR,
    payload: error
});

const getAllFriendRequestsNotifications = async () : Promise<UserInfo[]> => {
    const requestOptions = {
        method: "GET",
        headers: new Headers({
            authorization: sessionStorage.getItem("key") || "",
        }),
    };
    const response = await fetch("/api/users/notifications", requestOptions);
    const json = await response.json().then((users) => {
        users.forEach(function (item: UserInfo) {
            item.image = "data:image/jpeg;base64," + item.image;
        });
        return users;
    });
    return json
}

const resolveFriendRequestNotification = async (userInfo: UserInfo) : Promise<string> => {
    const requestOptions = {
        method: "DELETE",
        headers: new Headers({
            authorization: sessionStorage.getItem("key") || "",
        }),
    };
    let result = await fetch("/api/users/notifications/" + userInfo.id, requestOptions);
    return result.text();
}

export const dispatchGetFriendRequestsNotifications = () => (dispatch: Dispatch<getAndResolveFriendRequestsNotificationActionTypes>) => {
    dispatch(getFriendRequestsNotification());
    getAllFriendRequestsNotifications().then(resolve => {
        dispatch(getFriendRequestsNotificationSuccess(resolve));
        return;
    }).catch(reject => {
        dispatch(getFriendRequestsNotificationError(reject));
    })
}

export const dispatchResolveFriendRequestNotification = (userInfo: UserInfo) => (dispatch: Dispatch<getAndResolveFriendRequestsNotificationActionTypes>) => {
    dispatch(resolveFriendRequestsNotificationActions())
    resolveFriendRequestNotification(userInfo).then((resolve) => {
        dispatch(resolveFriendRequestsNotificationSuccess(userInfo))
        return;
    }).catch(reject => {
        dispatch(resolveFriendRequestsNotificationError(reject));
    })
}