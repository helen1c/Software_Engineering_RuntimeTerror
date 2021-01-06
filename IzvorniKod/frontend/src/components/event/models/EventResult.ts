import {EventCreator} from "./EventCreator";
import {MountainPathOnDateEvent} from "./MountainPathOnDateEvent";

export interface EventResult{
    user : EventCreator;
    name : string;
    description : string;
    start_date : string;
    end_date : string;
    paths : MountainPathOnDateEvent[];
}