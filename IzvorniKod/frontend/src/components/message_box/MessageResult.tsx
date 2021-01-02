import React, {useState} from "react";
import {MessageFindResult} from "./models/MessageFindResult";
import "./MessageResult.css";

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
        window.location.href="/admin/message-box"


    }

    return (
        <div className="result-box">
            <span className="result-column"><p>Korisnik:</p><a onClick={e => window.location.href = "/profile/" + prop.result.userId}>{prop.result.userName}</a></span>
            <span className="result-column"><p>NASLOV PORUKE:</p>{prop.result.name}</span>
            <span className="result-column"><p>GRESKA NASTALA:</p>{prop.result.error}</span>
            <text className="result-column"><p>SADRZAJ:</p>{prop.result.content}</text>
            <span className="result-column">
                <button onClick={update}>RIJESENO</button>
            </span>
        </div>
    );
}