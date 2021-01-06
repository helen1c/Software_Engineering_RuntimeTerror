import React, {useEffect, useState} from "react";
import {UserInfo} from "../mountain-lodge/models/UserInfo";
import {HttpCodesUtil} from "../mountaineering-community/HttpCodesUtil";
import {useHistory} from "react-router";

export const FriendshipRequestsNotification = () => {

    const [allUsers, setAllUsers] = useState<UserInfo[]>([]);
    const history = useHistory();

    useEffect(() => {
        fetch("/api/users/notifications", {
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

    const handleOk = (user: UserInfo) => {
        fetch("/api/users/notifications/" + user.id, {
            method: "DELETE",
            headers: new Headers({
                authorization: sessionStorage.getItem("key") || "",
            }),
        }).then(function (response) {
            if (response.status === HttpCodesUtil.SUCCESS) {
                let users = allUsers
                users = users.filter(u => u!==user)
                setAllUsers(users)
            } else {
            }
        });
    }

    return (
        <div>
            <p>Obavijesti</p>
            {!allUsers.length ? (
                <div> Nema novih obavijesti.</div>
            ) : (
                <div style={{margin: "5px"}}>
                    <div className="users-container">
                        {allUsers.map((user) => (
                            <div key={user.id}>
                                <div>
                                    <div className="notification-container">
                                        <img
                                            alt={user.name}
                                            src={user.image}
                                            className="user-photo"
                                            onClick={(e) => history.push("/profile/" + user.id)}
                                        />
                                        <span>Postali ste prijatelj s <br></br>

                         <div className="user-name">{user.name} <span> </span>
                         <button type="submit" className="submit" onClick={() => handleOk(user)}>
                           OK
                         </button>
                         </div>

                    </span>
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