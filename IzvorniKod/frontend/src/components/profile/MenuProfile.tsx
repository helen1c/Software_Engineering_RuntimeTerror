import React, { useEffect, useState } from "react";
import { getEmptyProfile, ViewProfileInfo } from "./models/ViewProfileInfo";
import { useHistory } from "react-router";
import { SidebarMenu } from "./SidebarMenu";
import { ProfileUserInfo } from "./ProfileUserInfo";

export const MenuProfile = () => {
  const [user, setUser] = useState<ViewProfileInfo>(getEmptyProfile);
  const history = useHistory();
  const id = window.location.pathname.split("/")[2];

  useEffect(() => {
    fetch("/api/users/profile/" + id, {
      method: "GET",
      headers: new Headers({
        authorization: sessionStorage.getItem("key") || "",
      }),
    }).then(function (response) {
      if (response.status === 200) {
        response.json().then((currentUser) => {
          currentUser.image = "data:image/jpeg;base64," + currentUser.image;
          setUser({
            ...currentUser,
          });
        });
      } else if (response.status === 403) {
        history.push("/naslovnica");
      }
    });
  }, [history, id]);

  return (
    <div>
      {user.isOwner ? (
        <SidebarMenu user={user} setUser={setUser} />
      ) : (
        <ProfileUserInfo user={user} setUser={setUser} />
      )}
    </div>
  );
};
