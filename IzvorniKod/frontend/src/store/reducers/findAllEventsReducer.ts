import {EventResult} from "../../components/event/models/EventResult";
import {
    FIND_ALL_EVENTS,
    FIND_ALL_EVENTS_ERROR,
    FIND_ALL_EVENTS_SUCCESS,
    findAllEventsActionTypes
} from "../actions/findAllEventsActionTypes";


export interface EventState {
    results: EventResult[],
    error: string | undefined,
    status: string
}

const initialEventState = {
    results: [],
    error: undefined,
    status: "idle"
} as EventState;

export default (state: EventState = initialEventState, action: findAllEventsActionTypes) => {

    switch (action.type) {
        case FIND_ALL_EVENTS: return {...state, status: 'waiting'};
        case FIND_ALL_EVENTS_SUCCESS: return {...state, status: 'success', results: action.payload};
        case FIND_ALL_EVENTS_ERROR: return {...state, status: 'error', error: action.payload}
        default: return state;
    }

};