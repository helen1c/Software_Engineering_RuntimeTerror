import React, {useEffect, useState} from "react";
import {CommunityEvent} from "./CommunityEvent";
import {useDispatch, useSelector} from "react-redux";
import {findEvents} from "../../../store/actions/findMyEventsActions";
import {MainReducer} from "../../../store/reducer";

export const MyCommunityEventsResults = () =>{
    const dispatcher = useDispatch();
    const {myEvents, findMyEventsStatus} = useSelector((state: MainReducer) => state.findMyEventsReducer);
    const [read,setRead] = useState(true);

    useEffect(() => {
        if (myEvents === undefined || read) {
            setRead(false);
            console.log("Get all Events...");
            dispatcher(findEvents());
        }
    }, [dispatcher, myEvents, read]);

    // @ts-ignore
    return(
        <div>
            {findMyEventsStatus === "error" ? <h1>Dogodila se pogreška!</h1> :
                <div>
                    {myEvents.length === 0 && findMyEventsStatus ==="success"?
                        <h3>Nemate niti jedan događaj.
                        </h3> :
                        <div>
                            {myEvents.map(result => <CommunityEvent isOwner={true} key={result.id} result={result}/>)}
                        </div>
                    }
                </div>
            }
        </div>
    );
}