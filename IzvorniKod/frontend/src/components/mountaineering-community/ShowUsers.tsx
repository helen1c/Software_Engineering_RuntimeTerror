import React from "react";
import { UserInfo } from "../mountain-lodge/models/UserInfo";
import { ShowUser } from "./ShowUser";

interface Props {
  users: UserInfo[];
}

export const ShowUsers = ({ users }: Props) => {
  return (
    <div style={{ margin: "5px" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
        {users.map((user) => (
          <div key={user.id}>
            <ShowUser user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};
