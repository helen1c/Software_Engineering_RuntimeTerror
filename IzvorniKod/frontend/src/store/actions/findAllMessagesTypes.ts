import {MessageFindResult} from "../../components/message_box/models/MessageFindResult";

export const FIND_ALL_MESSAGES = "FIND_ALL_MESSAGES";
export const FIND_ALL_MESSAGES_SUCCESS = "FIND_ALL_MESSAGES_SUCCESS";
export const FIND_ALL_MESSAGES_ERROR = "FIND_ALL_MESSAGES_ERROR";

interface findAllMessages {
    type: typeof FIND_ALL_MESSAGES,
    payload: undefined
}

interface findAllMessagesSuccess {
    type: typeof FIND_ALL_MESSAGES_SUCCESS,
    payload: MessageFindResult[]
}

interface findAllMessagesError {
    type: typeof FIND_ALL_MESSAGES_ERROR,
    payload: string | undefined
}

export type findAllMessagesTypes = findAllMessages | findAllMessagesSuccess | findAllMessagesError;