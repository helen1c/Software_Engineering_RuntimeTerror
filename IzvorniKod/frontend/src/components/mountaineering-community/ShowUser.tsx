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
    <div className="community-user-container">
      <div>
        <img
          alt={user.name}
          src={user.image}
          className="community-user-photo"
          onClick={(e) => history.push("/profile/" + user.id)}
        />
      </div>
      <div>
        <p>{user.name}</p>
      </div>
    </div>
  );
};
