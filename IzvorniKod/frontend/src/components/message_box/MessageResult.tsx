import React from "react";
import {MessageFindResult} from "./models/MessageFindResult";

interface Props {
    result: MessageFindResult;
}

export const MessageResult = (prop : Props) => {


    return (
        <div>
            <span>Naslov: {prop.result.name}</span>
            <span>Sadrzaj: {prop.result.content}</span>
        </div>
    );
}