import {UserInfo} from "../mountain-lodge/models/UserInfo";
import "./ShowFriendshipRequest.css"
import React, {useState} from "react";
import {useHistory} from "react-router";

interface Props {
    user: UserInfo;
}

export const ShowFriendshipRequest= ({ user}: Props) => {
    const history = useHistory();
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
    const [isRefused, setIsRefused] = useState<boolean>(false);
    const [allUsers, setAllUsers] = useState();

    function confirm() {
        setIsConfirmed(true);
        //staviti u listu prijatelja
    }

    const handleDeleteOnClick = () => {
        setIsRefused(true);
        fetch("/api/users/" + user.id, {
            method: "DELETE",
            headers: new Headers({
                authorization: sessionStorage.getItem("key") || "",
                "Content-Type": "application/json",
            }),
        }).then((response) => {
            if (response.status === 200) {
                sessionStorage.clear();
                window.location.href = "/friendship-request-list";
            }
        });
    };


    return (

        <div className="users-container">
            {!isConfirmed && !isRefused?(
            <div>
                 <img
                    alt={user.name}
                    src={user.image}
                    className="user-photo"
                    onClick={(e) => history.push("/profile/" + user.id)}
                 />
                <span>
                    <span className="user-name" >{user.name} </span>
                    vam šalje zahtjev za prijateljstvo </span>
                <button type="submit" className="submitButton" onClick={() => confirm()}>
                    Prihvati
                </button>
                <button type="submit" className="submitButton" onClick={handleDeleteOnClick}>
                    Odbij
                </button>
            </div>
            ):(<div> </div>)}
        </div>

    );
};