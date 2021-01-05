import React from "react";
import { UserInfo } from "../mountain-lodge/models/UserInfo";
import { ShowUser } from "./ShowUser";
import "./ShowUsers.css"


interface Props {
  users: UserInfo[];
}

export const ShowUsers = ({ users }: Props) => {
  return (
    <div style={{ margin: "5px" }}>
      <div className="community-users-container">
        {users.map((user) => (
          <div key={user.id}>
            <ShowUser user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};
