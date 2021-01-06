import {EventResult} from "../../components/event/models/EventResult";
import {
    FIND_ALL_EVENTS,
    FIND_ALL_EVENTS_ERROR,
    FIND_ALL_EVENTS_SUCCESS,
    findAllEventsAndParticipatingActionTypes,
    PARTICIPATE_ON_EVENT,
    PARTICIPATE_ON_EVENT_ERROR, PARTICIPATE_ON_EVENT_SUCCESS,
    UN_PARTICIPATE_ON_EVENT, UN_PARTICIPATE_ON_EVENT_ERROR, UN_PARTICIPATE_ON_EVENT_SUCCESS
} from "../actions/findAllEventsAndParticipatingActionTypes";
import {EventParticipatingResponse} from "../../components/event/models/EventParticipatingResponse";
import {EventParticipant} from "../../components/event/models/EventParticipant";


export interface EventState {
    events: EventResult[],
    findEventsError: string | undefined,
    findEventsStatus: string,
    participateStatus: string,
    participateError: string|undefined,
    unParticipateStatus: string,
    unParticipateError: string|undefined
}

const initialEventState = {
    events: [] as EventResult[],
    findEventsError: undefined,
    findEventsStatus: "idle",
    participateError: undefined,
    participateStatus: "idle" as string,
    unParticipateError: undefined,
    unParticipateStatus: "idle" as string
} as EventState;

export default (state: EventState = initialEventState, action: findAllEventsAndParticipatingActionTypes) => {

    switch (action.type) {
        case FIND_ALL_EVENTS: return {...state, findEventsStatus: 'waiting'};
        case FIND_ALL_EVENTS_SUCCESS: return {...state, findEventsStatus: 'success', events: action.payload};
        case FIND_ALL_EVENTS_ERROR: return {...state, findEventsStatus: 'error', findEventsError: action.payload}
        case PARTICIPATE_ON_EVENT: return {...state, participateStatus: "waiting"}
        case UN_PARTICIPATE_ON_EVENT: return {...state, unParticipateStatus: "waiting"}
        case PARTICIPATE_ON_EVENT_ERROR: return {...state, participateStatus: "error", participateError: action.payload}
        case UN_PARTICIPATE_ON_EVENT_ERROR: return {...state, unParticipateStatus: "error", unParticipateError: action.payload}
        case PARTICIPATE_ON_EVENT_SUCCESS: {

            const response = action.payload as EventParticipatingResponse;
            const event_id = response.eventId;
            const ind = state.events.findIndex(v => v.id === event_id);
            state.events[ind].participants.unshift({userId: response.userId, name: response.name} as EventParticipant);

            return {
                ...state,
                participateStatus: "success"
            }

        }
        case UN_PARTICIPATE_ON_EVENT_SUCCESS: {
            const response = action.payload as EventParticipatingResponse;
            const event_id = response.eventId;
            const ind = state.events.findIndex(v => v.id === event_id);
            state.events[ind].participants = state.events[ind].participants.filter(v => v.userId !== response.userId);

            return {
                ...state,
                unParticipateStatus: "success"
            }
        }
        default: return state;
    }

};