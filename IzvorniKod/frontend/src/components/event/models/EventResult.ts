import {EventCreator} from "./EventCreator";
import {Paths} from "./Paths";

export interface EventResult{
    user : EventCreator;
    name : string;
    description : string;
    start_date : string;
    end_date : string;
    paths : Array<Paths>;
}