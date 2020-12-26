import React, {useState} from "react";
import {MountainPathResult} from "../../models/MountainPathResult";
import "./MountainPathSearchResult.css"

interface Props {
    result: MountainPathResult
}

export const MountainPathSearchResult = (prop: Props) => {

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
        <>{!expand ?
            <div onClick={() => setExpand(true)} className="mountain-path-cnt">
                <fieldset>
                    <legend>Naziv</legend>
                    <span className="mountain-path-name">{prop.result.name}</span>
                </fieldset>

                <span className="mountain-path-hillname">Visočje: {prop.result.hill}</span>
                <span className="mountain-path-walktime">Prosječno trajanje: {prop.result.avgWalkTime}</span>
                <span className="mountain-path-difficulty">Zahtjevnost {mapdiff()}</span>
            </div>
            :
            <div className="mountain-path-cnt-expand" onClick={() =>setExpand(false)}>
                <div className="mountain-path-main-info">
                <span className="mountain-path-name-expand">Naziv: {prop.result.name}</span>
                <span className="mountain-path-hillname-expand">Visočje: {prop.result.hill}</span>
                <span className="mountain-path-walktime-expand">Prosječno trajanje: {prop.result.avgWalkTime}</span>
                <span className="mountain-path-difficulty-expand">Zahtjevnost {mapdiff()}</span>
                </div>
                <div className="mountain-path-extend-info">
                    <span className="mountain-path-length">Duljina: {prop.result.length}m</span>
                    <span className="mountain-path-startpoint">Početna točka: {prop.result.startPoint}</span>
                    <span className="mountain-path-endpoint">Završna točka: {prop.result.endPoint}</span>
                    <span className="mountain-path-datecreated">Datum stvaranja: {prop.result.dateCreated}</span>
                    {prop.result.seaLevelDiff && <span>Razlika u nadmorskoj visini: {prop.result.seaLevelDiff}m</span>}
                </div>
            </div>
        }</>

    );
};