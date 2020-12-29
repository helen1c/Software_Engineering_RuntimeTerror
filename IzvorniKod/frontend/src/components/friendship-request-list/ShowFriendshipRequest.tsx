import {UserInfo} from "../mountain-lodge/models/UserInfo";
import "./ShowFriendshipRequest.css"
import React from "react";

interface Props {
    user: UserInfo;
}

export const ShowFriendshipRequest= ({ user }: Props) => {

    return (
        <div className="users-container">
            <div>
                 <img
                    alt={user.name}
                    src={user.image}
                    className="user-photo"
                 />
                <span>{user.name} vam šalje zahtjev za prijateljstvo </span>
                <span>Prihvati</span>
                <span>Odbij</span>



            </div>
        </div>
    );
};