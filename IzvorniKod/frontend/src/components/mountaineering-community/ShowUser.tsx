import React from "react";
import { UserInfo } from "../mountain-lodge/models/UserInfo";
import './MountaineeringCommunitySearch.css';
import {useHistory} from "react-router";
import "./ShowUser.css";

interface Props {
  user: UserInfo;
}

export const ShowUser = ({ user }: Props) => {
  const history = useHistory();

  return (
    <div className="user-container">
      <div>
        <img
          alt={user.name}
          src={user.image}
          className="user-photo"
          onClick={(e) => history.push("/profile/" + user.id)}
        />
      </div>
      <div>
        <p>{user.name}</p>
      </div>
    </div>
  );
};
