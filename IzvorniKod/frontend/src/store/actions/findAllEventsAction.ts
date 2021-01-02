import {
    FIND_ALL_EVENTS,
    FIND_ALL_EVENTS_ERROR,
    FIND_ALL_EVENTS_SUCCESS,
    findAllEventsTypes
} from "./findAllEventsTypes"
import {EventResult} from "../../components/event/models/EventResult";
import {Dispatch} from "react";


export const findAllEventsAction = () : findAllEventsTypes => ({
    type: FIND_ALL_EVENTS,
    payload: undefined
});

export const findAllEventsSuccess = (options : EventResult[]) : findAllEventsTypes => ({
    type: FIND_ALL_EVENTS_SUCCESS,
    payload: options
});

export const findAllEventsError = (error : string | undefined) : findAllEventsTypes => ({
    type: FIND_ALL_EVENTS_ERROR,
    payload: undefined
});

export const findEvents = () => (dispatch: Dispatch<findAllEventsTypes>) => {
    dispatch(findAllEventsAction());
    getAllEvents().then(resolve => {
        dispatch(findAllEventsSuccess(resolve));
        return;
    }).catch(reject => {
        dispatch(findAllEventsError(reject));
    })
}

const getAllEvents = async (): Promise<EventResult[]> => {
    const response = await fetch("/api/event/all");
    const json = await response.json();
    return json;
}

