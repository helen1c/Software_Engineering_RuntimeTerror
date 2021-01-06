import React, { useState } from "react";
import {useHistory} from "react-router";
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import {Button, IconButton} from "@material-ui/core";
import './MountaineeringCommunity.css';
import {CommunityEventsResults} from "../event/component/CommunityEventsResults";

export const MountaineeringCommunity = () => {
    const history = useHistory();

    return (
        <div className="community-container mountaineering-community-container">
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
