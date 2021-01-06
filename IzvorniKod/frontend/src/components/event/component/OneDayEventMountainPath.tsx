import React from "react";
import {MountainPathOnDateEvent} from "../models/MountainPathOnDateEvent";
import "./OneDayEventMountainPath.css";
import starred from "../../../assets/starred.png";

interface Props {
    result: MountainPathOnDateEvent
}

export const OneDayEventMountainPath = (prop: Props) => {

    return (
        <div className="oneday-event-path__cnt">
            <div className="oneday-date">Dan: {prop.result.dateTraveled}</div>
            <div className="oneday-path">
                <span className="oneday-name-span">{prop.result.name}</span>
                <span className="oneday-path-span">{prop.result.hillName}</span>
                <span className="oneday-path-span">{prop.result.startPoint}</span>
                <span className="oneday-path-span">{prop.result.endPoint}</span>
                <div className="oneday-len-div">
                <span className="oneday-len" >{prop.result.length} m</span>
                <span className="oneday-len">{prop.result.difficulty}
                <img
                    className="oneday-img"
                    src={starred}
                    alt={"Starred"}
                /></span>
                </div>
            </div>
        </div>
    );
};