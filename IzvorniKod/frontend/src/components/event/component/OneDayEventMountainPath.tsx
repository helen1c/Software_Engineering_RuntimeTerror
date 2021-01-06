import React from "react";
import {MountainPathOnDateEvent} from "../models/MountainPathOnDateEvent";
import "./OneDayEventMountainPath.css";

interface Props {
    result: MountainPathOnDateEvent
}

export const OneDayEventMountainPath = (prop: Props) => {

    return (
        <div className="oneday-event-path__cnt">
            <span className="oneday-date">Dan: {prop.result.dateTraveled}</span>
            <div className="oneday-path">
                <span>{prop.result.name}</span>
                <span>{prop.result.hillName}</span>
                <span>{prop.result.startPoint}</span>
                <span>{prop.result.endPoint}</span>
                <span>{prop.result.length}</span>
            </div>
        </div>
    );
};