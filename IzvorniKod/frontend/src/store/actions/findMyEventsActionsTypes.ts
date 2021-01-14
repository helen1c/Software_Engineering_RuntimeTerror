import {EventResult} from "../../components/event/models/EventResult";

export const FIND_MY_EVENTS = "FIND_MY_EVENTS";
export const FIND_MY_EVENTS_SUCCESS = "FIND_MY_EVENTS_SUCCESS";
export const FIND_MY_EVENTS_ERROR = "FIND_MY_EVENTS_ERROR";

interface findMyEvents {
    type: typeof FIND_MY_EVENTS,
    payload: undefined
}

interface findMyEventsSuccess {
    type: typeof FIND_MY_EVENTS_SUCCESS,
    payload: EventResult[]
}

interface findMyEventsError {
    type: typeof FIND_MY_EVENTS_ERROR,
    payload: string | undefined
}

export type findMyEventsActionsTypes = findMyEvents | findMyEventsSuccess | findMyEventsError;