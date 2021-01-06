import React, { useEffect, useState } from "react";
import { UserInfo } from "../mountain-lodge/models/UserInfo";
import { HttpCodesUtil } from "../mountaineering-community/HttpCodesUtil";
import { useHistory } from "react-router";

export const FriendshipRequestList = () => {
  const [allUsers, setAllUsers] = useState<UserInfo[]>([]);
  const history = useHistory();

  function confirm(user: UserInfo) {
    fetch("api/users/friend-request-accept/" + user.id, {
      method: "POST",
      headers: new Headers({
        authorization: sessionStorage.getItem("key") || "",
        "Content-Type": "application/json",
      }),
    }).then((response) => {
      if (response.status === 200) {
        removeUser(user);
      }
    });
  }

  function refuse(user: UserInfo) {
    fetch("api/users/friend-request-decline/" + user.id, {
      method: "POST",
      headers: new Headers({
        authorization: sessionStorage.getItem("key") || "",
        "Content-Type": "application/json",
      }),
    }).then((response) => {
      if (response.status === 200) {
        removeUser(user);
      }
    });
  }

  function removeUser(user: UserInfo) {
    let users = allUsers;
    users = users.filter((u) => u !== user);
    setAllUsers(users);
  }

  useEffect(() => {
    fetch("/api/users/friend-requests-received", {
      method: "GET",
      headers: new Headers({
        authorization: sessionStorage.getItem("key") || "",
      }),
    }).then(function (response) {
      if (response.status === HttpCodesUtil.SUCCESS) {
        response.json().then((users) => {
          users.forEach(function (item: UserInfo) {
            item.image = "data:image/jpeg;base64," + item.image;
          });
          setAllUsers(users);
        });
      } else {
      }
    });
  }, []);

  return (
    <div>
      {!allUsers.length ? (
        <div>Nema pristiglih zahtjeva za prijateljstvo. </div>
      ) : (
        <div style={{ backgroundColor: "aliceblue" }}>
          <div className="all-users-container">
            <span className="request-heading"> Zahtjevi za prijateljstvo </span>
            {allUsers.map((user) => (
              <div key={user.id}>
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
                      onClick={() => confirm(user)}
                    >
                      Prihvati
                    </button>
                    <button
                      type="submit"
                      className="submitButton"
                      onClick={() => refuse(user)}
                    >
                      Odbij
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
