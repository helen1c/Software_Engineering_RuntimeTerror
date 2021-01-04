import React from "react";
import {Paths} from "../models/Paths";
import {MountainPath} from "./MountainPath";
import "../style/Day.css"

interface Props {
    result : Paths;
}

export const Day = (prop : Props) => {
    return(
      <div className="event-day">
          <h3 className="day-date">{prop.result.date}: </h3><div><MountainPath result={prop.result.path}/></div>
      </div>
    );
}