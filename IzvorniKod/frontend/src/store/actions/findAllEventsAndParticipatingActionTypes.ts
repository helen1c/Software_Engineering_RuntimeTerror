import {EventResult} from "../../components/event/models/EventResult";
import {EventParticipatingResponse} from "../../components/event/models/EventParticipatingResponse";

export const FIND_ALL_EVENTS = "FIND_ALL_HILLS";
export const FIND_ALL_EVENTS_SUCCESS = "FIND_ALL_HILLS_SUCCESS";
export const FIND_ALL_EVENTS_ERROR = "FIND_ALL_HILLS_ERROR";

export const PARTICIPATE_ON_EVENT = "PARTICIPATE_ON_EVENT";
export const UN_PARTICIPATE_ON_EVENT = "UN_PARTICIPATE_ON_EVENT";
export const PARTICIPATE_ON_EVENT_SUCCESS = "PARTICIPATE_ON_EVENT_SUCCESS";
export const UN_PARTICIPATE_ON_EVENT_SUCCESS = "UN_PARTICIPATE_ON_EVENT_SUCCESS";
export const PARTICIPATE_ON_EVENT_ERROR = "PARTICIPATE_ON_EVENT_ERROR";
export const UN_PARTICIPATE_ON_EVENT_ERROR = "UN_PARTICIPATE_ON_EVENT_ERROR";

interface participateOnEvent {
    type: typeof PARTICIPATE_ON_EVENT,
    payload: undefined
}

interface unParticipateOnEvent {
    type: typeof UN_PARTICIPATE_ON_EVENT,
    payload: undefined
}

interface participateOnEventSuccess {
    type: typeof PARTICIPATE_ON_EVENT_SUCCESS,
    payload: EventParticipatingResponse,

}

interface unParticipateOnEventSuccess {
    type: typeof UN_PARTICIPATE_ON_EVENT_SUCCESS,
    payload: EventParticipatingResponse
}

interface participateOnEventError {
    type: typeof PARTICIPATE_ON_EVENT_ERROR,
    payload: undefined | string
}

interface unParticipateOnEventError {
    type: typeof UN_PARTICIPATE_ON_EVENT_ERROR,
    payload: undefined | string
}

interface findAllEvents {
    type: typeof FIND_ALL_EVENTS,
    payload: undefined
}

interface findAllEventsSuccess {
    type: typeof FIND_ALL_EVENTS_SUCCESS,
    payload: EventResult[]
}

interface findAllEventsError {
    type: typeof FIND_ALL_EVENTS_ERROR,
    payload: string | undefined
}


export type findAllEventsAndParticipatingActionTypes = findAllEvents |
    findAllEventsSuccess |
    findAllEventsError |
    participateOnEvent |
    participateOnEventError |
    participateOnEventSuccess |
    unParticipateOnEvent |
    unParticipateOnEventError |
    unParticipateOnEventSuccess;