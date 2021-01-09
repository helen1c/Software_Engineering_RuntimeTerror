import {UserInfo} from "../../components/mountain-lodge/models/UserInfo";

export const GET_FRIEND_REQUESTS = "GET_FRIEND_REQUESTS";
export const GET_FRIEND_REQUESTS_SUCCESS = "GET_FRIEND_REQUESTS_SUCCESS";
export const GET_FRIEND_REQUESTS_ERROR = "GET_FRIEND_REQUESTS_ERROR";

export const REFUSE_FRIEND_REQUEST = "REFUSE_FRIEND_REQUEST";
export const REFUSE_FRIEND_REQUEST_SUCCESS = "REFUSE_FRIEND_REQUEST_SUCCESS";
export const REFUSE_FRIEND_REQUEST_ERROR = "REFUSE_FRIEND_REQUEST_ERROR";

export const ACCEPT_FRIEND_REQUEST = "ACCEPT_FRIEND_REQUEST";
export const ACCEPT_FRIEND_REQUEST_SUCCESS = "ACCEPT_FRIEND_REQUEST_SUCCESS";
export const ACCEPT_FRIEND_REQUEST_ERROR = "ACCEPT_FRIEND_REQUEST_ERROR";

interface getFriendRequests {
    type: typeof GET_FRIEND_REQUESTS,
    payload: undefined
}

interface getFriendRequestsSuccess {
    type: typeof GET_FRIEND_REQUESTS_SUCCESS,
    payload: UserInfo[]
}

interface getFriendRequestsError {
    type: typeof GET_FRIEND_REQUESTS_ERROR,
    payload: string | undefined
}

interface refuseFriendRequest {
    type: typeof REFUSE_FRIEND_REQUEST,
    payload: undefined
}

interface refuseFriendRequestSuccess {
    type: typeof REFUSE_FRIEND_REQUEST_SUCCESS,
    payload: {
        userInfo: UserInfo
    }
}

interface refuseFriendRequestError {
    type: typeof REFUSE_FRIEND_REQUEST_ERROR,
    payload: string | undefined
}

interface acceptFriendRequest {
    type: typeof ACCEPT_FRIEND_REQUEST,
    payload: undefined
}

interface acceptFriendRequestSuccess {
    type: typeof ACCEPT_FRIEND_REQUEST_SUCCESS,
    payload: {
        userInfo: UserInfo
    }
}

interface acceptFriendRequestError {
    type: typeof ACCEPT_FRIEND_REQUEST_ERROR,
    payload: string | undefined
}

export type  getAndRefuseAndAcceptFriendRequestsActionTypes = getFriendRequests | getFriendRequestsSuccess | getFriendRequestsError | refuseFriendRequest | refuseFriendRequestError | refuseFriendRequestSuccess | acceptFriendRequest | acceptFriendRequestError | acceptFriendRequestSuccess;
