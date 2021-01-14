import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import {Button} from "@material-ui/core";
import './MountaineeringCommunity.css';
import {CommunityEventsResults} from "../event/component/CommunityEventsResults";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "@material-ui/lab";

export const MountaineeringCommunity = () => {
    const history = useHistory();
    const [success, setSuccessMessage] = useState<boolean>(false);

    useEffect(() => {
        setSuccessMessage(
            (sessionStorage.getItem("successfulEventCreation") || "") === "true"
        );
        sessionStorage.removeItem("successfulEventCreation");
    }, []);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccessMessage(false);
    };

    return (
        <div className="community-container mountaineering-community-container">
            <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Uspješno ste se napravili događaj.
                </Alert>
            </Snackbar>
            <h1>Moja planinarska zajednica</h1>
            <div className="action-container">
                <Button
                    className="search-all-button"
                    startIcon={<SearchIcon/>}
                    onClick={() => history.push("/users/search")}
                    color="primary"
                    variant="contained"
                >
                    Pretraži sve planinare
                </Button>
                <Button
                    className="create-event-button"
                    startIcon={<AddIcon/>}
                    onClick={() => history.push("/events/create")}
                    variant="contained"
                    color="primary"
                >
                    Stvori novi događaj
                </Button>
            </div>
            <CommunityEventsResults/>
        </div>
    );
};
