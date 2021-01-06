import React from "react";
import {EventResult} from "../models/EventResult";
import {OneDayEventMountainPath} from "./OneDayEventMountainPath";
import "./CommunityEvent.css";
import {useDispatch} from "react-redux";
import {participate, unparticipate} from "../../../store/actions/findAllEventsAndParticipatingActions";

interface Props {
    result : EventResult;
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
            <div className="event-creator"><label>Autor: <a href={"/profile/" + prop.result.user.id}>{prop.result.user.name}</a></label></div>
            <div className="date"><label>Datum početka: </label>{prop.result.start_date}</div>
            <div className="date"><label>Datum završetka: </label>{prop.result.end_date}</div>
        </div>
        <div className="event-description-box">
                <label>Više o događaju:</label>
                <textarea className="event-description" disabled value={prop.result.description}/>
        </div>

           <div>
               <button onClick={participateButton}>Dolazim</button>
               <button onClick={unparticipateButton}>Ne dolazim</button>
           </div>

           {prop.result.participants.length > 0 ? <nav className="participants-nav">
               Sudionici
               <ul>
                   {prop.result.participants.map(result => <li key={result.userId}><a href={"/profile/" + result.userId}>{result.name}</a></li>)}
               </ul>
           </nav> : <label>Na ovom događaju još nema sudionika.</label>}

       </div>
          <label>Staze:</label>
          {prop.result.paths.map(paths => <OneDayEventMountainPath key={paths.id} result={paths}/>)}
      </div>
    );
}