import {EventResult} from "../../components/event/models/EventResult";

export const FIND_ALL_EVENTS = "FIND_ALL_HILLS";
export const FIND_ALL_EVENTS_SUCCESS = "FIND_ALL_HILLS_SUCCESS";
export const FIND_ALL_EVENTS_ERROR = "FIND_ALL_HILLS_ERROR";

interface findAllHills {
    type: typeof FIND_ALL_EVENTS,
    payload: undefined
}

interface findAllHillsSuccess {
    type: typeof FIND_ALL_EVENTS_SUCCESS,
    payload: EventResult[]
}

interface findAllHillsError {
    type: typeof FIND_ALL_EVENTS_ERROR,
    payload: string | undefined
}

export type findAllEventsTypes = findAllHills | findAllHillsSuccess | findAllHillsError;