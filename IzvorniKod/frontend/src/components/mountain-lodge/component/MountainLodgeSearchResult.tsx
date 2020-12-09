import React from "react";
import {MountainLodgeResult} from "../models/MountainLodgeResult";
import "./MountainLodgeSearchResults.css"

interface Props {
    result: MountainLodgeResult
}

export const MountainLodgeSearchResult = (prop: Props) => {

    return (
        <div className="mountain-lodge-cnt">
            <span>Naziv planinarskog doma: {prop.result.name}</span>
            <span>Nadmorska visina planinarskog doma: {prop.result.elevation}</span>
            <span>Visočje: {prop.result.hillName}</span>

            <div className={"utils"}>Pogodnosti:
            {prop.result.utilities.map(v => <span>{v.name}</span>)}
            </div>
        </div>
    );


};