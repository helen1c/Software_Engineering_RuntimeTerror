import React from "react";
import {MountainLodgeResult} from "../models/MountainLodgeResult";

interface Props {
    result: MountainLodgeResult
}

export const MountainLodgeSearchResult = (prop: Props) => {

    return (
        <div className="mountain-lodge-cnt">
            <span>{prop.result.name}</span>
            <span>{prop.result.elevation}</span>
            <span>{prop.result.hillName}</span>

            {prop.result.utilities.indexOf("Voda") !== undefined && <span>voda</span>}
            {prop.result.utilities.indexOf("Hrana") !== undefined && <span>hrana</span>}
            {prop.result.utilities.indexOf("Spavanje") !== undefined && <span>spavanje</span>}
            {prop.result.utilities.indexOf("Wireless") !== undefined && <span>wireless</span>}

        </div>
    );


};