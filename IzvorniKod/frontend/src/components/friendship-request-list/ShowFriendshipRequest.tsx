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

export const ShowFriendshipRequest= ({ user, allUsers, setAllUsers}: Props) => {
    const history = useHistory();
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
    const [isRefused, setIsRefused] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(-1);

    function confirm() {
        setIsConfirmed(true);
    }

    function refuse(){

        setIsRefused(true);

        /*allUsers.filter(function(u){

            if(u.id===user.id){
                setIndex(allUsers.indexOf(u))
            }
        })*/
        allUsers.forEach(function (item) {

            if( item.id === user.id){
                setIndex(allUsers.indexOf(item))
            };
        });

            allUsers.splice(index, 1)

      //allUsers.splice(index, 1)
        //allUsers.splice(index.valueOf(),1)
       // setAllUsers(allUsers)

       // months.splice(0, 1);
        // removes 1 element at index 0
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

                    {!allUsers.length ? (

                            <div>

                                Brisem usera na indexu: {index}, useri koji su ostali:

                                {allUsers.map((user) => (
                                    <div key={user.id}>
                                        {user.name}
                                    </div>
                                ))}

                            Ne postoji niti jedan zahtjev za prijateljstvo.
                        </div>
                    ) : (


                        <div>
                            Brisem usera na indexu: {index}, useri koji su ostali:

                            {allUsers.map((user) => (
                                <div key={user.id}>
                                    {user.name}
                                </div>
                            ))}

                        </div>


                    )}

                </div>
            )}
        </div>

    );
};