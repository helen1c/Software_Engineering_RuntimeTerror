import React from "react";
import {UserInfo} from "../mountain-lodge/models/UserInfo";
import {useHistory} from "react-router";
import "./User.css";
interface Props{
    user: UserInfo;
}

export const User = ({user}: Props) =>{
    const history = useHistory();

    return(
        <div className="all-user-container">
            <div>
                <img
                    alt={user.name}
                    src={user.image}
                    className="all-user-photo"
                    onClick={(e) => history.push("/profile/" + user.id)}
                />
            </div>
            <div>
                <p>{user.name}</p>
            </div>
        </div>
    );
};