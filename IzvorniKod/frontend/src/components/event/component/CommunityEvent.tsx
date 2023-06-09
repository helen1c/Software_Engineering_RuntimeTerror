import React from "react";
import {EventResult} from "../models/EventResult";
import {OneDayEventMountainPath} from "./OneDayEventMountainPath";
import "./CommunityEvent.css";
import {useDispatch} from "react-redux";
import {participate, unparticipate} from "../../../store/actions/findAllEventsAndParticipatingActions";
import cancel from "../../../assets/cancel.png";
import check from "../../../assets/checkmark.png";

interface Props {
    result : EventResult;
    isOwner? : boolean;
}

export const CommunityEvent = (prop : Props) => {

    const dispatch = useDispatch();

    const participateButton = () => {
        dispatch(participate(prop.result.id));
    }

    const unparticipateButton = () => {
        dispatch(unparticipate(prop.result.id));
    }

    return(
      <div className="event-box">
          <h3 className="event-title">Naziv događaja: {prop.result.name}</h3>
       <div className="event-information">
        <div className="event-user">
            {!prop.isOwner && <div className="event-creator"><label>Autor: <a href={"/profile/" + prop.result.user.id}>{prop.result.user.name}</a></label></div>}
            <div className="date"><label>Datum početka: </label>{prop.result.start_date}</div>
            <div className="date"><label>Datum završetka: </label>{prop.result.end_date}</div>
        </div>
        <div className="event-description-box">
                <label>Više o događaju:</label>
                <textarea className="event-description" disabled value={prop.result.description}/>
        </div>

           {!prop.isOwner && <div className="going-button-cnt" >
               <button className="going-button" onClick={participateButton}>Dolazim <img  className="going-btn-img" src={check} alt={"Check"}/></button>
               <button className="going-button"  onClick={unparticipateButton}>Ne dolazim <img  className="going-btn-img" src={cancel} alt={"Cancel"}/></button>
           </div>}


           {prop.result.participants.length > 0 ? <nav className="participants-nav">
               <b>Sudionici</b>
               <ul>
                   {prop.result.participants.map(result => <li key={result.userId}><a href={"/profile/" + result.userId}>{result.name}</a></li>)}
               </ul>
           </nav> : <label>Na ovom događaju nema sudionika.</label>}

       </div>
          <label className="path-label">{prop.result.paths !== undefined && prop.result.paths.length > 0 && "Staze:"}</label>
          <div className="all-oneday-paths">
          {prop.result.paths.map(paths => <OneDayEventMountainPath key={paths.id} result={paths}/>)}
          </div>
      </div>
    );
}