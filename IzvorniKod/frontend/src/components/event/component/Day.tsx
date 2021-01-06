import React from "react";
import {OneDayEventMountainPath} from "./OneDayEventMountainPath";
import "../style/Day.css"
import {MountainPathOnDateEvent} from "../models/MountainPathOnDateEvent";

interface Props {
    result: MountainPathOnDateEvent
}

export const Day = ({result} : Props) => {
    return(
      <div className="event-day">
          <h3 className="day-date">{result.dateTraveled}: </h3>
      </div>
    );
}