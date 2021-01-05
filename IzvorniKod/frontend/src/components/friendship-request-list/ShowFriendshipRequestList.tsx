import {UserInfo} from "../mountain-lodge/models/UserInfo";
import {ShowFriendshipRequest} from "./ShowFriendshipRequest";
import React from "react";
import "./ShowFriendshipRequestList.css"

interface Props {
    allUsers: UserInfo[];
    setAllUsers: (users: UserInfo[]) => void;
}

export const ShowFriendshipRequestList = ({ allUsers, setAllUsers }: Props) => {
    return (
        <div style={{ backgroundColor: "aliceblue"}}>
            <div className="all-users-container">
                <span className="request-heading"> Zahtjevi za prijateljstvo </span>
                {allUsers.map((user) => (
                    <div key={user.id}>
                        <ShowFriendshipRequest user={user} allUsers ={allUsers} setAllUsers={setAllUsers} />
                    </div>
                ))}
            </div>
        </div>
    );
};
