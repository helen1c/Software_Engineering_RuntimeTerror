import React from "react";
import {MountainPathResult} from "../../models/MountainPathResult";
import "./MountainPathSearchResult.css"

interface Props {
    result: MountainPathResult
}

export const MountainPathSearchResult = (prop: Props) => {

    const mapdiff = () => {

        if(prop.result.difficulty <= 3) {
            return "Lagano " + prop.result.difficulty + "/10";
        } else if(prop.result.difficulty >= 7) {
            return "Teško " + prop.result.difficulty + "/10";
        } else {
            return "Srednje " + prop.result.difficulty + "/10";
        }

    }

    return (
        <div className="mountain-path-cnt">
            <span className="mountain-path-name">{prop.result.name}</span>
            <span className="mountain-path-hillname">{prop.result.hill}</span>
            <span className="mountain-path-walktime">{prop.result.avgWalkTime}</span>
            <span className="mountain-path-difficulty">{mapdiff()}</span>
        </div>

    );
};