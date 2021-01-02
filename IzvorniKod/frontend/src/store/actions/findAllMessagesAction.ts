import {
    FIND_ALL_MESSAGES,
    FIND_ALL_MESSAGES_ERROR,
    FIND_ALL_MESSAGES_SUCCESS,
    findAllMessagesTypes
} from "../actions/findAllMessagesTypes";

import {MessageFindResult} from "../../components/message_box/models/MessageFindResult";
import {Dispatch} from "react";

export const findAllMessagesAction = () : findAllMessagesTypes => ({
    type: FIND_ALL_MESSAGES,
    payload: undefined
});

export const findAllMessagesSuccess = (options : MessageFindResult[]) : findAllMessagesTypes => ({
    type: FIND_ALL_MESSAGES_SUCCESS,
    payload: options
});

export const findAllMessagesError = (error : string | undefined) : findAllMessagesTypes => ({
    type: FIND_ALL_MESSAGES_ERROR,
    payload: undefined
});

export const findMessages = () => (dispatch: Dispatch<findAllMessagesTypes>) => {
    dispatch(findAllMessagesAction());
    getAllMessages().then(resolve => {
        dispatch(findAllMessagesSuccess(resolve));
        return;
    }).catch(reject => {
        dispatch(findAllMessagesError(reject));
    })
}

const getAllMessages = async (): Promise<MessageFindResult[]> => {
    const requestOptions = {
        method: "GET",
        headers: {
            Accept: "application/json",
            authorization: sessionStorage.getItem("key") || "",
            "Content-Type": "application/json"
        }
    };
    const response = await fetch("/api/messages/all", requestOptions);
    const json = await response.json();
    return json;
}

