import React, {useEffect, useState} from "react";
import {UserInfo} from "../mountain-lodge/models/UserInfo";
import {HttpCodesUtil} from "../mountaineering-community/HttpCodesUtil";
import {ShowFriendshipRequestList} from "./ShowFriendshipRequestList";

export const FriendshipRequestList = () => {
    const [allUsers, setAllUsers] = useState<UserInfo[]>([]);

    useEffect(() => {
        fetch("/api/users/community?name=", {
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
                    allUsers.filter((user) => user.name.toLowerCase())
                });
            } else {
                allUsers.filter((user) => user.name.toLowerCase())
            }
        });
    }, []);

    return (
        <div>

            {!allUsers.length ? (
                <div> </div>
            ) : (
                <ShowFriendshipRequestList allUsers={allUsers} setAllUsers={setAllUsers} />
            )}
        </div>
    );

};