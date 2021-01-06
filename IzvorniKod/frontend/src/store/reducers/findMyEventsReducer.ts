import {EventResult} from "../../components/event/models/EventResult";
import {
    FIND_MY_EVENTS,
    FIND_MY_EVENTS_ERROR,
    FIND_MY_EVENTS_SUCCESS,
    findMyEventsActionsTypes
} from "../actions/findMyEventsActionsTypes";

export interface EventState {
    myEvents: EventResult[],
    findMyEventsError: string | undefined,
    findMyEventsStatus: string
}

const initialEventState = {
    myEvents: [] as EventResult[],
    findMyEventsError: undefined,
    findMyEventsStatus: "idle",
} as EventState;

export default (state: EventState = initialEventState, action: findMyEventsActionsTypes) => {
    switch (action.type) {
        case FIND_MY_EVENTS:
            return {...state, findMyEventsStatus: 'waiting'};
        case FIND_MY_EVENTS_SUCCESS:
            return {...state, findMyEventsStatus: 'success', myEvents: action.payload};
        case FIND_MY_EVENTS_ERROR:
            return {...state, findMyEventsStatus: 'error', findEventsError: action.payload}
        default:
            return state;
    }
};