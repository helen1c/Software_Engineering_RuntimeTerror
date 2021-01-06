import React, {useState} from "react";
import {MountainPathOnDateEvent} from "../models/MountainPathOnDateEvent";
import "../style/MountainPath.css"
import goimg from "../../../assets/go.png";
import finish from "../../../assets/finish_flag-512.png"
import dots from "../../../assets/dots.png";
import elevation from "../../../assets/Snowy_Mountain_Transparent_PNG_Clip_Art_Image.png";

interface Props {
    result: MountainPathOnDateEvent
}

export const OneDayEventMountainPath = (prop: Props) => {

    const [expand, setExpand] = useState<boolean>(false);

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
        <>
            {!expand ?
                <div onClick={() => setExpand(true)} className="mountain-path-cnt2">
                    <span className="mountain-path-name">{prop.result.name}</span>
                    <span className="mountain-path-hillname"> {prop.result.hillName}</span>
                    <span className="mountain-path-walktime">Trajanje: {prop.result.avgWalkTime}</span>
                    <span className="mountain-path-difficulty"> {mapdiff()}</span>
                </div>
                :
                <div className="mountain-path-cnt-expand2" onClick={() =>setExpand(false)}>
                    <div className="mountain-path-main-info">
                        <span className="mountain-path-name-expand">{prop.result.name}</span>
                        <span className="mountain-path-hillname-expand"> {prop.result.hillName}</span>
                        <span className="mountain-path-walktime-expand">Trajanje:{prop.result.avgWalkTime}</span>
                        <span className="mountain-path-difficulty-expand"> {mapdiff()}</span>
                    </div>
                    <div className="mountain-path-extend-info">
                        <div className="mountain-path-cnt-mini">
                            <span className="mountain-path-length">Duljina: {prop.result.length}m</span>
                            <img className="mini-image-2" alt="GO" src={elevation}/>
                        </div>
                        <div className="mountain-path-cnt-mini">
                            <fieldset> <legend>Plan puta</legend>
                                <img className="mini-image" alt="GO" src={goimg}/>
                                <span className="mountain-path-startpoint">{prop.result.startPoint}</span>
                                <img className="mini-image" alt="Dots" src={dots}/>
                                <span className="mountain-path-endpoint">{prop.result.endPoint}</span>
                                <img className="mini-image" alt="Finish" src={finish}/>
                            </fieldset>
                        </div>
                    </div>
                </div>
            }</>

    );
};