import React, { useEffect, useState } from "react";
import { UserInfo } from "../mountain-lodge/models/UserInfo";
import { HttpCodesUtil } from "./HttpCodesUtil";
import './MountaineeringCommunitySearch.css';
import {useHistory} from "react-router";

interface Props {
  user: UserInfo;
}

export const ShowUser = ({ user }: Props) => {
  const [image, setImage] = useState<any>();

  const history = useHistory();

  useEffect(() => {
    fetch("/api/users/image/" + user.id, {
      method: "GET",
      headers: new Headers({
        authorization: sessionStorage.getItem("key") || "",
      }),
    }).then(function (response) {
      if (response.status === HttpCodesUtil.SUCCESS) {
        response.blob().then((e) => {
          setImage(URL.createObjectURL(e));
        });
      }
    });
  }, []);

  return (
    <div>
      <div>
        <img alt={user.name}  src={image} className = "photo" onClick={e => window.location.href = "/profile/" + user.id}/>
      </div>
      <div>
        <p>{user.name}</p>
      </div>
    </div>
  );
};
