import {
    REFUSE_FRIEND_REQUEST,
    REFUSE_FRIEND_REQUEST_ERROR,
    REFUSE_FRIEND_REQUEST_SUCCESS,
    GET_FRIEND_REQUESTS,
    GET_FRIEND_REQUESTS_ERROR,
    GET_FRIEND_REQUESTS_SUCCESS,
    getAndRefuseAndAcceptFriendRequestsActionTypes, ACCEPT_FRIEND_REQUEST, ACCEPT_FRIEND_REQUEST_ERROR, ACCEPT_FRIEND_REQUEST_SUCCESS
} from "./getAndRefuseAndAcceptFriendRequestsActionTypes";
import {UserInfo} from "../../components/mountain-lodge/models/UserInfo";
import {Dispatch} from "react";
import {fetcher} from "../../Util";


export const getAndRefuseAndAcceptFriendRequestsActions = () : getAndRefuseAndAcceptFriendRequestsActionTypes => ({
    type: GET_FRIEND_REQUESTS,
    payload: undefined
});

export const findAllFriendRequestsSuccess = (options : UserInfo[]) : getAndRefuseAndAcceptFriendRequestsActionTypes => ({
    type: GET_FRIEND_REQUESTS_SUCCESS,
    payload: options
});

export const findAllFriendRequestsError = (error : string | undefined) : getAndRefuseAndAcceptFriendRequestsActionTypes => ({
    type: GET_FRIEND_REQUESTS_ERROR,
    payload: error
});

export const refuseFriendRequestsActions = () : getAndRefuseAndAcceptFriendRequestsActionTypes => ({
    type: REFUSE_FRIEND_REQUEST,
    payload: undefined
});

export const refuseFriendRequestsSuccess = (userInfo : UserInfo) : getAndRefuseAndAcceptFriendRequestsActionTypes => ({
    type: REFUSE_FRIEND_REQUEST_SUCCESS,
    payload: {
        userInfo
    }
});

export const refuseFriendRequestsError = (error : string | undefined) : getAndRefuseAndAcceptFriendRequestsActionTypes => ({
    type: REFUSE_FRIEND_REQUEST_ERROR,
    payload: error
});

export const acceptFriendRequestsActions = () : getAndRefuseAndAcceptFriendRequestsActionTypes => ({
    type: ACCEPT_FRIEND_REQUEST,
    payload: undefined
});

export const acceptFriendRequestsSuccess = (userInfo : UserInfo) : getAndRefuseAndAcceptFriendRequestsActionTypes => ({
    type: ACCEPT_FRIEND_REQUEST_SUCCESS,
    payload: {
        userInfo
    }
});

export const acceptFriendRequestsError = (error : string | undefined) : getAndRefuseAndAcceptFriendRequestsActionTypes => ({
    type: ACCEPT_FRIEND_REQUEST_ERROR,
    payload: error
});

const getAllFriendRequests = async () : Promise<UserInfo[]> => {
    const requestOptions = {
        method: "GET"
    };
    const response = await fetcher("/api/users/friend-requests-received", requestOptions);
    const json = await response.json().then((users) => {
        users.forEach(function (item: UserInfo) {
            item.image = "data:image/jpeg;base64," + item.image;
        });
        return users;
    });
    return json
}
const refuseFriendRequest = async (userInfo: UserInfo) : Promise<string> => {
    const requestOptions = {
        method: "POST"
    };
    let result = await fetcher("/api/users/friend-request-decline/" + userInfo.id, requestOptions);
    return result.text();
}

const acceptFriendRequset = async (userInfo: UserInfo) : Promise<string> => {
    const requestOption = {
        method: "POST"
    }
    let result = await fetcher("/api/users/friend-request-accept/" + userInfo.id, requestOption);
    return result.text();
}

export const findFriendRequests = () => (dispatch: Dispatch<getAndRefuseAndAcceptFriendRequestsActionTypes>) => {
    dispatch(getAndRefuseAndAcceptFriendRequestsActions());
    getAllFriendRequests().then(resolve => {
        dispatch(findAllFriendRequestsSuccess(resolve));
        return;
    }).catch(reject => {
        dispatch(findAllFriendRequestsError(reject));
    })
}

export const dispatchRefuseFriendRequest = (userInfo: UserInfo) => (dispatch: Dispatch<getAndRefuseAndAcceptFriendRequestsActionTypes>) => {
    dispatch(refuseFriendRequestsActions())
    refuseFriendRequest(userInfo).then((resolve) => {
        dispatch(refuseFriendRequestsSuccess(userInfo))
        return;
    }).catch(reject => {
        dispatch(refuseFriendRequestsError(reject));
    })
}

export const dispatchAcceptFriendRequest = (userInfo: UserInfo) => (dispatch: Dispatch<getAndRefuseAndAcceptFriendRequestsActionTypes>) => {
    dispatch(acceptFriendRequestsActions());
    acceptFriendRequset(userInfo).then(resolve => {
        dispatch(acceptFriendRequestsSuccess(userInfo));
        return;
    }).catch(reject => {
        dispatch(acceptFriendRequestsError(reject));
    })
}