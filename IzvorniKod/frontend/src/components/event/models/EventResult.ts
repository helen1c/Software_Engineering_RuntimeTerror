import {EventCreator} from "./EventCreator";
import {MountainPathOnDateEvent} from "./MountainPathOnDateEvent";
import {EventParticipant} from "./EventParticipant";

export interface EventResult{
    id: number,
    user : EventCreator,
    name : string,
    description : string,
    start_date : string,
    end_date : string,
    paths : MountainPathOnDateEvent[];
    participants: EventParticipant[];
}