import React, {useState} from "react";
import {MessageFindResult} from "./models/MessageFindResult";
import {MessageResult} from "./MessageResult";

export const MessageSearchResult = () =>{

    const [results,setResults] = useState<MessageFindResult[]>([]);

    const find = async () => {

        const requestOptions = {
            method: "GET",
            headers: {
                Accept: "application/json",
                authorization: sessionStorage.getItem("key") || "",
                "Content-Type": "application/json"
            }
        };
        const response = await fetch("/api/messages/all", requestOptions);
        const json = await response.json();
        setResults(json);

    }
    return(
        <>{
            results.map(r => <MessageResult result={r} key={r.id}/>)
        }
            <button onClick={find}>fdgkjdg</button></>

    );
}