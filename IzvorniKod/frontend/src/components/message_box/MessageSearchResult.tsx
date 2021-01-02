import React, {useEffect, useState} from "react";
import {MessageFindResult} from "./models/MessageFindResult";
import {MessageResult} from "./MessageResult";
import "./MessageSearchResult.css";
import {useDispatch, useSelector} from "react-redux";
import {MainReducer} from "../../store/reducer";
import {findMessages} from "../../store/actions/findAllMessagesAction";


export const MessageSearchResult = () =>{

    const dispatcher = useDispatch();
    const {results: messagesResults,status,error} = useSelector((state: MainReducer) => state.findAllMessagesReducer);
    const [loading,setLoading] = useState(true);
    const [read,setRead] = useState(true);

    useEffect(() => {
        if (read) {
            console.log("Get all Messages...");
            setRead(false);
            dispatcher(findMessages());
        }
    }, [dispatcher, messagesResults],);

    const [role,setRole] = useState("");

    useEffect(() => {
        if (sessionStorage.getItem("key") !== null) {
            fetch("/api/users/user/role", {
                method: "GET",
                headers: new Headers({
                    authorization: sessionStorage.getItem("key") || "",
                }),
            }).then(function (response) {
                if (response.status === 200) {
                    response.json().then((e) => {
                        setRole(e.role);
                        setLoading(false);
                    });
                } else {
                    setRole("KORISNIK");
                    setLoading(false);
                }
            });
        }else{
            setRole("NEPRIJAVLJEN")
            setLoading(false);
        }
    }, []);

    return(
        <>
            <div>
                {status === "waiting" || loading === true ?
                    <div></div>
                    :
                    <div>
                        {role === "ADMIN" ? <div>{
                            messagesResults.length > 0 ?
                                messagesResults.map(r => <MessageResult result={r} key={r.id}/>)
                                : <h1 className="message-notification">Nema poruka!</h1>
                        }</div> : <h1 className="error-message">Nemate ovlasti!</h1>}
                    </div>
                }
            </div>
            </>
    );
}