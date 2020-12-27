import React from "react";
import {MessageFindResult} from "./models/MessageFindResult";
import "./MessageResult.css";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

interface Props {
    result: MessageFindResult;
}

export const MessageResult = (prop : Props) => {


    return (
        <div >
        <div className="result-box">
            <span className="result-column"><p>Korisnik:</p></span>
            <span className="result-column"><p>NASLOV PORUKE:</p>{prop.result.name}</span>
            <text className="result-column"><p>SADRZAJ:</p>{prop.result.content}</text>
            <span className="result-column"><DeleteForeverIcon/><DoneOutlineIcon/></span>
        </div>
        </div>

    );
}