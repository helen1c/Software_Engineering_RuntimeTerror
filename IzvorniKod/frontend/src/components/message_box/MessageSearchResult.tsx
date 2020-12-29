import React, {useEffect, useState} from "react";
import {MessageFindResult} from "./models/MessageFindResult";
import {MessageResult} from "./MessageResult";
import "./MessageSearchResult.css";


export const MessageSearchResult = () =>{

    const [results,setResults] = useState<MessageFindResult[]>([]);

    const [role,setRole] = useState("");

    useEffect(() => {
        if (sessionStorage.getItem("key") !== null)
            fetch("/api/users/user/role", {
                method: "GET",
                headers: new Headers({
                    authorization: sessionStorage.getItem("key") || "",
                }),
            }).then(function (response) {
                if (response.status === 200) {
                    response.json().then((e) => {
                        setRole(e.role);
                    });
                }else{
                    setRole("KORISNIK");
                }
            });
    }, []);

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
        <>{role == "ADMIN" ? <div>{
            results.length>0 ?
            results.map(r => <MessageResult result={r} key={r.id}/>)
                : <h1 className="message-notification">Nema poruka!</h1>
        }</div> : <h1 className="error-message">Nemate ovlasti!</h1> }
            </>
    );
}