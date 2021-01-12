import React, { useEffect, useState } from "react";
import { getEmptyProfile, ViewProfileInfo } from "./models/ViewProfileInfo";
import { useHistory } from "react-router";
import { ProfileUserInfo } from "./ProfileUserInfo";
import { ProfileDashboard } from "./ProfileDashboard";
import {fetcher} from "../../Util";

export const MenuProfile = () => {
  const [user, setUser] = useState<ViewProfileInfo>(getEmptyProfile);
  const history = useHistory();
  const id = window.location.pathname.split("/")[2];

  useEffect(() => {
    fetcher("/api/users/profile/" + id, {
      method: "GET"
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
        <ProfileDashboard user={user} setUser={setUser} />
      ) : (
        <ProfileUserInfo user={user} setUser={setUser} />
      )}
    </div>
  );
};
