import {UserInfo} from "../../components/mountain-lodge/models/UserInfo";

export const GET_FRIEND_REQUESTS_NOTIFICATION  = "GET_FRIEND_REQUESTS_NOTIFICATION ";
export const GET_FRIEND_REQUESTS_NOTIFICATION_SUCCESS = "GET_FRIEND_REQUESTS_NOTIFICATION _SUCCESS";
export const GET_FRIEND_REQUESTS_NOTIFICATION_ERROR = "GET_FRIEND_REQUESTS_NOTIFICATION _ERROR";

export const RESOLVE_FRIEND_REQUEST_NOTIFICATION = "RESOLVE_FRIEND_REQUEST_NOTIFICATION ";
export const RESOLVE_FRIEND_REQUEST_NOTIFICATION_SUCCESS = "RESOLVE_FRIEND_REQUEST_NOTIFICATION _SUCCESS";
export const RESOLVE_FRIEND_REQUEST_NOTIFICATION_ERROR = "RESOLVE_FRIEND_REQUEST_NOTIFICATION _ERROR";

interface getFriendRequestsNotification {
    type: typeof GET_FRIEND_REQUESTS_NOTIFICATION,
    payload: undefined
}

interface getFriendRequestsNotificationSuccess {
    type: typeof GET_FRIEND_REQUESTS_NOTIFICATION_SUCCESS,
    payload: UserInfo[]
}

interface getFriendRequestsNotificationError {
    type: typeof GET_FRIEND_REQUESTS_NOTIFICATION_ERROR,
    payload: string | undefined
}

interface refuseFriendRequestNotification {
    type: typeof RESOLVE_FRIEND_REQUEST_NOTIFICATION,
    payload: undefined
}

interface refuseFriendRequestNotificationSuccess {
    type: typeof RESOLVE_FRIEND_REQUEST_NOTIFICATION_SUCCESS,
    payload: {
        userInfo: UserInfo
    }
}

interface refuseFriendRequestNotificationError {
    type: typeof RESOLVE_FRIEND_REQUEST_NOTIFICATION_ERROR,
    payload: string | undefined
}

export type  getAndResolveFriendRequestsNotificationActionTypes = getFriendRequestsNotification | getFriendRequestsNotificationSuccess | getFriendRequestsNotificationError | refuseFriendRequestNotification | refuseFriendRequestNotificationError | refuseFriendRequestNotificationSuccess;
