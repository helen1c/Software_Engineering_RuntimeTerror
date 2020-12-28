import React, {useState} from "react";
import {MessageFindResult} from "./models/MessageFindResult";
import "./MessageResult.css";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Tooltip from '@material-ui/core/Tooltip';
import {MountainLodgeCreateRequest} from "../mountain-lodge/models/MountainLodgeCreateRequest";

interface Props {
    result: MessageFindResult;
}

export const MessageResult = (prop : Props) => {

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const update = async () => {

        const sRequest = {
            id: prop.result.id,
            status:prop.result.status
        };

        const requestOptions = {
            method: "PATCH",
            body: JSON.stringify(sRequest),
            headers: {
                Accept: "application/json",
                authorization: sessionStorage.getItem("key") || "",
                "Content-Type": "application/json"
            }
        };
        const response = await fetch("/api/messages/update", requestOptions);
        window.location.href="/test"

    }

    return (
        <div className="result-box">
            <span className="result-column"><p>Korisnik:</p><a onClick={e => window.location.href = "/profile/" + prop.result.userId}>{prop.result.userName}</a></span>
            <span className="result-column"><p>NASLOV PORUKE:</p>{prop.result.name}</span>
            <text className="result-column"><p>SADRZAJ:</p>{prop.result.content}</text>
            <span className="result-column"><p>STATUS:</p>{prop.result.status == "PENDING" ?
                <Tooltip open={open} onClose={handleClose} onOpen={handleOpen} title="Unsolved">
                <DeleteForeverIcon className="unsolved-icon" onClick={update}>PENDING</DeleteForeverIcon>
                </Tooltip>
                : <Tooltip open={open} onClose={handleClose} onOpen={handleOpen} title="Solved">
                    <DoneOutlineIcon className="solved-icon" onClick={update}>RESOLVED</DoneOutlineIcon>
                </Tooltip> }</span>
        </div>
    );
}