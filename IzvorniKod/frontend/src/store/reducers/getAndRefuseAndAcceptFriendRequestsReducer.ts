import {UserInfo} from "../../components/mountain-lodge/models/UserInfo";
import {
    GET_FRIEND_REQUESTS,
    GET_FRIEND_REQUESTS_ERROR,
    GET_FRIEND_REQUESTS_SUCCESS,
    getAndRefuseAndAcceptFriendRequestsActionTypes,
    REFUSE_FRIEND_REQUEST,
    REFUSE_FRIEND_REQUEST_ERROR,
    REFUSE_FRIEND_REQUEST_SUCCESS, ACCEPT_FRIEND_REQUEST_SUCCESS, ACCEPT_FRIEND_REQUEST_ERROR, ACCEPT_FRIEND_REQUEST
} from "../actions/getAndRefuseAndAcceptFriendRequestsActionTypes";

export interface FriendRequestState {
    results: UserInfo[],
    error: string | undefined,
    status: string,
    refuseFriendRequestStatus: string,
    refuseFriendRequestError: string | undefined,
    acceptFriendRequestStatus: string,
    acceptFriendRequestError: string | undefined

}

const initialFriendRequestState = {
    results: [],
    error: undefined,
    status: "idle",
    refuseFriendRequestStatus: "idle",
    refuseFriendRequestError: undefined,
    acceptFriendRequestStatus: "idle",
    acceptFriendRequestError: undefined
} as FriendRequestState

export default (state: FriendRequestState = initialFriendRequestState, action: getAndRefuseAndAcceptFriendRequestsActionTypes) => {

    switch (action.type) {
        case GET_FRIEND_REQUESTS: return {...state, status: 'waiting'};
        case GET_FRIEND_REQUESTS_SUCCESS: return {...state, status: 'success', results: action.payload}
        case GET_FRIEND_REQUESTS_ERROR: return {...state, status: 'error', error: action.payload}
        case REFUSE_FRIEND_REQUEST:
            return {...state, refuseFriendRequestStatus: 'waiting'};
        case REFUSE_FRIEND_REQUEST_SUCCESS:
            state.results = state.results.filter(user => user !== action.payload.userInfo);
            return {...state, refuseFriendRequestError: "success"}
        case REFUSE_FRIEND_REQUEST_ERROR:
            return {
                ...state, refuseFriendRequestError: action.payload
            }
        case ACCEPT_FRIEND_REQUEST:
            return {...state, acceptFriendRequestStatus: 'waiting'};
        case ACCEPT_FRIEND_REQUEST_SUCCESS:
            state.results = state.results.filter(user => user !== action.payload.userInfo);
            return {...state, acceptFriendRequestStatus: "success"}
        case ACCEPT_FRIEND_REQUEST_ERROR:
            return {
                ...state, acceptFriendRequestError: action.payload
            }
        default: return state;
    }
}