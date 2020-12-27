import React, {useState} from "react";
import {MessageFindResult} from "./models/MessageFindResult";
import {MessageResult} from "./MessageResult";
import "./MessageSearchResult.css";


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
        <>
            {/*<div className="message-box">*/}
            {/*    <p className="message-column">Korisnik:</p>*/}
            {/*    <p className="message-column">Naslov poruke:</p>*/}
            {/*    <p className="message-column">Sadrzaj poruke:</p>*/}
            {/*    <p className="message-column">Stanje:</p>*/}
            {/*</div>*/}
            <div>
            {
            results.map(r => <MessageResult result={r} key={r.id}/>)
        }
            </div>
            <button onClick={find}>fdgkjdg</button></>

    );
}