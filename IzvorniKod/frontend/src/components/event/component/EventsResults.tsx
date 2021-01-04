import React, {useEffect, useState} from "react";
import {Event} from "./Event";
import {useDispatch, useSelector} from "react-redux";
import {findEvents} from "../../../store/actions/findAllEventsAction";
import {MainReducer} from "../../../store/reducer";

export const EventsResults = () =>{

    const dispatcher = useDispatch();
    const {results: eventsResults,status} = useSelector((state: MainReducer) => state.findAllEvents);
    const [read,setRead] = useState(true);

    useEffect(() => {
        if (eventsResults === undefined || read) {
            setRead(false);
            console.log("Get all Events...");
            dispatcher(findEvents());
        }
    }, [dispatcher, eventsResults]);

    return(
        <div>
            {status === "error" ? <h1>Dogodila se pogreška!</h1> :
                <div>
                    {eventsResults.length === 0 && status ==="success"?
                        <h1> Nema rezultata!</h1> :
                        <div>
                            {eventsResults.map(result => <Event result={result}/>)}
                        </div>
                    }
                </div>
            }
        </div>
    );
}