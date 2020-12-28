import React, {useEffect, useState} from "react";
import {MessageFindResult} from "./models/MessageFindResult";
import {MessageResult} from "./MessageResult";
import "./MessageSearchResult.css";


export const MessageSearchResult = () =>{

    const [results,setResults] = useState<MessageFindResult[]>([]);

    useEffect(() => {
        async function find() {
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
        find()
    }, [])

    return(
        <>{
            results.map(r => <MessageResult result={r} key={r.id}/>)
          }
            </>
    );
}