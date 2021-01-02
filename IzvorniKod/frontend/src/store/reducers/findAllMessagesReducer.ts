import {MessageFindResult} from "../../components/message_box/models/MessageFindResult";
import {
    FIND_ALL_MESSAGES,
    FIND_ALL_MESSAGES_ERROR,
    FIND_ALL_MESSAGES_SUCCESS,
    findAllMessagesTypes
} from "../actions/findAllMessagesTypes";


export interface MessageState {
    results: MessageFindResult[],
    error: string | undefined,
    status: string
}

const initialMessageState = {
    results: [],
    error: undefined,
    status: "idle"
} as MessageState;

export default (state: MessageState = initialMessageState, action: findAllMessagesTypes) => {

    switch (action.type) {
        case FIND_ALL_MESSAGES: return {...state, status: 'waiting'};
        case FIND_ALL_MESSAGES_SUCCESS: return {...state, status: 'success', results: action.payload};
        case FIND_ALL_MESSAGES_ERROR: return {...state, status: 'error', error: action.payload}
        default: return state;
    }

};