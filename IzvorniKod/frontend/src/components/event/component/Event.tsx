import React from "react";
import {EventResult} from "../models/EventResult";
import {Day} from "./Day";
import "../style/Event.css"

interface Props {
    result : EventResult;
}

export const Event = (prop : Props) => {

    return(
      <div className="event-box">
          <h1 className="event-title">{prop.result.name}</h1>
       <div className="event-information">
        <div className="event-user">
            <div className="event-creator"><label>DOGADAJ STVORIO: </label>{prop.result.user.name}</div>
            <div className="date"><label>POCETAK: </label>{prop.result.start_date}</div>
            <div className="date"><label>KRAJ: </label>{prop.result.end_date}</div>
        </div>
        <div className="event-description-box">
                <label>OPIS:</label>
                <textarea className="event-description" disabled value={prop.result.description}/>
        </div>
       </div>
          {prop.result.paths.map(paths => <Day result={paths}/>)}
      </div>

    );
}