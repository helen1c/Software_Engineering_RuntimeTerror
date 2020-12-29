import {UserInfo} from "../mountain-lodge/models/UserInfo";
import {ShowFriendshipRequest} from "./ShowFriendshipRequest";
import React from "react";

interface Props {
    users: UserInfo[];
}

export const ShowFriendshipRequestList = ({ users }: Props) => {
    return (
        <div style={{ margin: "5px" }}>
            <div className="users-container">
                {users.map((user) => (
                    <div key={user.id}>
                        <ShowFriendshipRequest user={user} />
                    </div>
                ))}
            </div>
        </div>
    );
};
