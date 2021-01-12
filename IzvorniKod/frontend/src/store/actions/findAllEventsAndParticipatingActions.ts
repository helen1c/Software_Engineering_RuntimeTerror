import {
    FIND_ALL_EVENTS,
    FIND_ALL_EVENTS_ERROR,
    FIND_ALL_EVENTS_SUCCESS,
    findAllEventsAndParticipatingActionTypes,
    PARTICIPATE_ON_EVENT,
    PARTICIPATE_ON_EVENT_ERROR,
    PARTICIPATE_ON_EVENT_SUCCESS,
    UN_PARTICIPATE_ON_EVENT,
    UN_PARTICIPATE_ON_EVENT_ERROR,
    UN_PARTICIPATE_ON_EVENT_SUCCESS
} from "./findAllEventsAndParticipatingActionTypes"
import {EventResult} from "../../components/event/models/EventResult";
import {Dispatch} from "react";
import {EventParticipatingResponse} from "../../components/event/models/EventParticipatingResponse";
import {fetcher} from "../../Util";

export const participateEvent = () : findAllEventsAndParticipatingActionTypes => ({
   type: PARTICIPATE_ON_EVENT,
   payload: undefined
});

export const participateEventSuccess = (response: EventParticipatingResponse) : findAllEventsAndParticipatingActionTypes => ({
    type: PARTICIPATE_ON_EVENT_SUCCESS,
    payload: response
});

export const participateEventError = (error: string | undefined) : findAllEventsAndParticipatingActionTypes => ({
    type: PARTICIPATE_ON_EVENT_ERROR,
    payload: error
});

export const unParticipateEvent = () : findAllEventsAndParticipatingActionTypes => ({
    type: UN_PARTICIPATE_ON_EVENT,
    payload: undefined
});

export const unParticipateEventSuccess = (response: EventParticipatingResponse) : findAllEventsAndParticipatingActionTypes => ({
    type: UN_PARTICIPATE_ON_EVENT_SUCCESS,
    payload: response
});

export const unParticipateEventError = (error: string | undefined) : findAllEventsAndParticipatingActionTypes => ({
    type: UN_PARTICIPATE_ON_EVENT_ERROR,
    payload: error
});

export const findAllEventsAndParticipatingActions = () : findAllEventsAndParticipatingActionTypes => ({
    type: FIND_ALL_EVENTS,
    payload: undefined
});

export const findAllEventsSuccess = (options : EventResult[]) : findAllEventsAndParticipatingActionTypes => ({
    type: FIND_ALL_EVENTS_SUCCESS,
    payload: options
});

export const findAllEventsError = (error : string | undefined) : findAllEventsAndParticipatingActionTypes => ({
    type: FIND_ALL_EVENTS_ERROR,
    payload: error
});

export const findEvents = () => (dispatch: Dispatch<findAllEventsAndParticipatingActionTypes>) => {
    dispatch(findAllEventsAndParticipatingActions());
    getAllEvents().then(resolve => {
        dispatch(findAllEventsSuccess(resolve));
        return;
    }).catch(reject => {
        dispatch(findAllEventsError(reject));
    })
}

export const participate = (event_id:number) => (dispatch: Dispatch<findAllEventsAndParticipatingActionTypes>) =>{
    dispatch(participateEvent());
    participateOnMountainEvent(event_id).then(resolve => {
        dispatch(participateEventSuccess(resolve));
        return;
    }, reject => {
        console.log(reject);
        dispatch(participateEventError(reject));
    })
}

export const unparticipate = (event_id:number) => (dispatch: Dispatch<findAllEventsAndParticipatingActionTypes>) =>{
    dispatch(unParticipateEvent());
    unParticipateOnMountainEvent(event_id).then(resolve => {
        dispatch(unParticipateEventSuccess(resolve));
        return;
    }, reject => {
        dispatch(unParticipateEventError(reject));
    })
}

const getAllEvents = async (): Promise<EventResult[]> => {
    const requestOptions = {
        method: "GET"
    };
    const response = await fetcher("/api/event/all", requestOptions);
    return await response.json();
}

const participateOnMountainEvent = async (event_id: number): Promise<EventParticipatingResponse> => {
    const requestOptions = {
        method: "PATCH"
    };
    const response = await fetcher("/api/event/participate/" + event_id, requestOptions);
    return await response.json();
}

const unParticipateOnMountainEvent = async (event_id: number): Promise<EventParticipatingResponse> => {
    const requestOptions = {
        method: "PATCH"
    };
    const response = await fetcher("/api/event/departicipate/" + event_id, requestOptions);
    return await response.json();
}

