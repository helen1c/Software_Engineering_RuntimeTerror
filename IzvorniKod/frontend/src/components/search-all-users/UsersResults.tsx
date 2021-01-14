import React from "react";
import {UserInfo} from "../mountain-lodge/models/UserInfo";
import {User} from "./User";
import "./UsersResults.css";

interface Props{
    users: UserInfo[];
}

export const Usersresults = ({users} : Props) =>{
    return (
        <div style={{ margin: "5px" }}>
            <div className="all-search-users-container">
                {users.map((user) => (
                    <div key={user.id}>
                        <User user={user} />
                    </div>
                ))}
            </div>
        </div>
    );
}