import React, {useEffect, useState} from "react";
import {CommunityEvent} from "./CommunityEvent";
import {useDispatch, useSelector} from "react-redux";
import {findEvents} from "../../../store/actions/findAllEventsAndParticipatingActions";
import {MainReducer} from "../../../store/reducer";

export const CommunityEventsResults = () =>{

    const dispatcher = useDispatch();
    const {events, findEventsStatus} = useSelector((state: MainReducer) => state.findAllEventsAndAttendance);
    const [read,setRead] = useState(true);

    useEffect(() => {
        if (events === undefined || read) {
            setRead(false);
            console.log("Get all Events...");
            dispatcher(findEvents());
        }
    }, [dispatcher, events, read]);

    // @ts-ignore
    return(
        <div>
            {findEventsStatus === "error" ? <h1>Dogodila se pogreška!</h1> :
                <div>
                    {events.length === 0 && findEventsStatus ==="success"?
                        <h3>Vaša planinarska zajednice trenutno nema nijedan aktivan događaj.
                            <a href={"/events/create"}>Stvorite događaj.</a>
                        </h3> :
                        <div>
                            {events.map(result => <CommunityEvent key={result.id} result={result}/>)}
                        </div>
                    }
                </div>
            }
        </div>
    );
}