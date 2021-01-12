import {
    FIND_MY_EVENTS,
    FIND_MY_EVENTS_SUCCESS,
    FIND_MY_EVENTS_ERROR,
    findMyEventsActionsTypes
} from "./findMyEventsActionsTypes";

import {EventResult} from "../../components/event/models/EventResult";
import {Dispatch} from "react";
import {fetcher} from "../../Util";

export const findMyEvents = () : findMyEventsActionsTypes => ({
    type: FIND_MY_EVENTS,
    payload: undefined
})

export const findMyEventsSuccess = (results: EventResult[]) : findMyEventsActionsTypes => ({
    type: FIND_MY_EVENTS_SUCCESS,
    payload: results
})

export const findMyEventsError = (error : string | undefined) : findMyEventsActionsTypes => ({
    type: FIND_MY_EVENTS_ERROR,
    payload: error
})

export const findEvents = () => (dispatch: Dispatch<findMyEventsActionsTypes>) => {
    dispatch(findMyEvents());
    getMyEvents().then(resolve => {
        dispatch(findMyEventsSuccess(resolve));
        return;
    }).catch(reject => {
        dispatch(findMyEventsError(reject));
    })
}

const getMyEvents = async (): Promise<EventResult[]> => {
    const requestOptions = {
        method: "GET"
    };
    const response = await fetcher("/api/event/by-author", requestOptions);
    return await response.json();
}
