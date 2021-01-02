import {UserInfo} from "../mountain-lodge/models/UserInfo";
import "./ShowFriendshipRequest.css"
import React, {useState} from "react";
import {useHistory} from "react-router";
import {ShowFriendshipRequestList} from "./ShowFriendshipRequestList";

interface Props {
    user: UserInfo;
    allUsers: UserInfo[];
    setAllUsers: (users: UserInfo[]) => void;
}

class NumberOfClicks {
    static click: number = 0;

    static addClick() {
        this.click++;
        return this.click;
    }
}

export const ShowFriendshipRequest= ({ user, allUsers, setAllUsers}: Props) => {
    const history = useHistory();
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
    const [isRefused, setIsRefused] = useState<boolean>(false);
    const [isAllDone, setIsAllDone] = useState<number>(0);
    const [numberOfRequests, setNumberOfRequests] = useState<number>(0);
    const [isFirst, setIsFirst] = useState<boolean>(false);
    let allUsersTemp= allUsers;

    if(!isFirst) {
        setNumberOfRequests(allUsers.length);
        setIsFirst(true);
    }

    function confirm() {
        setIsConfirmed(true);
        setIsAllDone(NumberOfClicks.addClick());
    }

    function refuse(){
        setIsRefused(true);
        let position=-1;
        setIsAllDone(NumberOfClicks.addClick());

        allUsersTemp.map((u, index) => {
            if (u.id === user.id) {
                position = index;
            }
        });

        allUsersTemp.splice(position, 1);
        setAllUsers(allUsersTemp);

    }

    /*const handleDeleteOnClick = () => {
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
    };*/


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
                    <button type="submit" className="submitButton" onClick={() => refuse()}>
                        Odbij
                    </button>
                </div>
            ):(
                <div>
                    {(numberOfRequests === isAllDone) ? (
                        <div className="event-input">Nema pristiglih zahtjeva za prijateljstvo.</div>
                    ) : (
                        <div> </div>
                    )}
                </div>
            )}
        </div>

    );
};