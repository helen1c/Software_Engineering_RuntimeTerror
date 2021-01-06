import React, {useEffect, useState} from "react";
import {Event} from "./Event";
import {useDispatch, useSelector} from "react-redux";
import {findEvents} from "../../../store/actions/findAllEventsActions";
import {MainReducer} from "../../../store/reducer";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "@material-ui/lab";

export const EventsResults = () =>{

    const dispatcher = useDispatch();
    const {results: eventsResults,status} = useSelector((state: MainReducer) => state.findAllEvents);
    const [read,setRead] = useState(true);
    const [success, setSuccessMessage] = useState<boolean>(false);

    useEffect(() => {
        setSuccessMessage(
            (sessionStorage.getItem("successfulEventCreation") || "") === "true"
        );
        sessionStorage.removeItem("successfulEventCreation");
        if (eventsResults === undefined || read) {
            setRead(false);
            console.log("Get all Events...");
            dispatcher(findEvents());
        }
    }, []);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccessMessage(false);
    };

    return(
        <div>
            <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Uspješno ste se napravili događaj.
                </Alert>
            </Snackbar>
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