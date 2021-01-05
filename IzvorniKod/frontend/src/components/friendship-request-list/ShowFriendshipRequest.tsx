import { UserInfo } from "../mountain-lodge/models/UserInfo";
import "./ShowFriendshipRequest.css";
import React from "react";
import { useHistory } from "react-router";

interface Props {
  user: UserInfo;
  allUsers: UserInfo[];
  setAllUsers: (users: UserInfo[]) => void;
}

export const ShowFriendshipRequest = ({
  user,
  allUsers,
  setAllUsers,
}: Props) => {
  const history = useHistory();

  function confirm() {
    fetch("api/users/friend-request-accept/" + user.id, {
      method: "POST",
      headers: new Headers({
        authorization: sessionStorage.getItem("key") || "",
        "Content-Type": "application/json",
      }),
    }).then((response) => {
      if (response.status === 200) {
      }
    });
  }

  function refuse() {
    fetch("api/users/friend-request-decline/" + user.id, {
      method: "POST",
      headers: new Headers({
        authorization: sessionStorage.getItem("key") || "",
        "Content-Type": "application/json",
      }),
    }).then((response) => {
      if (response.status === 200) {
        let position = -1;
        let allUsersTemp = allUsers;
        allUsersTemp.forEach((u, index) => {
          if (u.id === user.id) {
            position = index;
          }
        });

        allUsersTemp.splice(position, 1);
        setAllUsers(allUsersTemp);
        alert(allUsers.length)
      }
    });
  }

  return (
    <div className="users-container">
      <div>
        <img
          alt={user.name}
          src={user.image}
          className="user-photo"
          onClick={(e) => history.push("/profile/" + user.id)}
        />
        <span>
          <span className="user-name">{user.name} </span>
          vam šalje zahtjev za prijateljstvo{" "}
        </span>
        <button
          type="submit"
          className="submitButton"
          onClick={() => confirm()}
        >
          Prihvati
        </button>
        <button type="submit" className="submitButton" onClick={() => refuse()}>
          Odbij
        </button>
      </div>
    </div>
  );
};