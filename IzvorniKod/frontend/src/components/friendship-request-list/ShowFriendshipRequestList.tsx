import {UserInfo} from "../mountain-lodge/models/UserInfo";
import {ShowFriendshipRequest} from "./ShowFriendshipRequest";
import React from "react";

interface Props {
    allUsers: UserInfo[];
    setAllUsers: (users: UserInfo[]) => void;
}

export const ShowFriendshipRequestList = ({ allUsers, setAllUsers }: Props) => {
    return (
        <div style={{ margin: "5px" }}>
            <div className="users-container">
                {allUsers.map((user) => (
                    <div key={user.id}>
                        <ShowFriendshipRequest user={user} allUsers ={allUsers} setAllUsers={setAllUsers} />
                    </div>
                ))}
            </div>
        </div>
    );
};
