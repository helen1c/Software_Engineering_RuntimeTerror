import {UserInfo} from "../../components/mountain-lodge/models/UserInfo";
import {
    GET_FRIEND_REQUESTS_NOTIFICATION,
    GET_FRIEND_REQUESTS_NOTIFICATION_ERROR, GET_FRIEND_REQUESTS_NOTIFICATION_SUCCESS,
    getAndResolveFriendRequestsNotificationActionTypes,
    RESOLVE_FRIEND_REQUEST_NOTIFICATION, RESOLVE_FRIEND_REQUEST_NOTIFICATION_ERROR,
    RESOLVE_FRIEND_REQUEST_NOTIFICATION_SUCCESS
} from "../actions/getAndResolveFriendRequestsNotificationActionTypes";

export interface FriendRequestNotificationState {
    results: UserInfo[],
    error: string | undefined,
    status: string,
    resolveFriendRequestNotificationStatus: string,
    resolveFriendRequestNotificationError: string | undefined,

}

const initialFriendRequestNotificationState = {
    results: [],
    error: undefined,
    status: "idle",
    resolveFriendRequestNotificationStatus: "idle",
    resolveFriendRequestNotificationError: undefined,
} as FriendRequestNotificationState

export default (state: FriendRequestNotificationState = initialFriendRequestNotificationState, action: getAndResolveFriendRequestsNotificationActionTypes) => {

    switch (action.type) {
        case GET_FRIEND_REQUESTS_NOTIFICATION: return {...state, status: 'waiting'};
        case GET_FRIEND_REQUESTS_NOTIFICATION_SUCCESS: return {...state, status: 'success', results: action.payload}
        case GET_FRIEND_REQUESTS_NOTIFICATION_ERROR: return {...state, status: 'error', error: action.payload}
        case RESOLVE_FRIEND_REQUEST_NOTIFICATION:
            return {...state, resolveFriendRequestNotificationStatus: 'waiting'};
        case RESOLVE_FRIEND_REQUEST_NOTIFICATION_SUCCESS:
            state.results = state.results.filter(user => user !== action.payload.userInfo);
            return {...state, resolveFriendRequestNotificationStatus: "success"}
        case RESOLVE_FRIEND_REQUEST_NOTIFICATION_ERROR:
            return {
                ...state, resolveFriendRequestNotificationError: action.payload
            }
        default: return state;
    }
}