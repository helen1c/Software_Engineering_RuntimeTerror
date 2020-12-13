import React, { useEffect, useState } from "react";
import { getEmptyProfile, Profile } from "../profile/models/Profile";
import { useHistory } from "react-router";
import {SidebarMenu} from "../sidebar-menu/SidebarMenu";
import {ProfileUserInfo} from "../profile/ProfileUserInfo";

export const MenuProfile = () => {
    const [user, setUser] = useState<Profile>(getEmptyProfile);
    const [oldUser, setOldUser] = useState<Profile>(getEmptyProfile);
    const [edit, setEdit] = useState(false);
    const [nameError, setNameError] = useState("");
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const history = useHistory();
    const id = window.location.pathname.split("/")[2];

    useEffect(() => {
        fetch("/api/users/" + id, {
            method: "GET",
            headers: new Headers({
                authorization: sessionStorage.getItem("key") || "",
            }),
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then((currentUser) => {
                    fetch("/api/users/profile-image/" + id, {
                        method: "GET",
                        headers: new Headers({
                            authorization: sessionStorage.getItem("key") || "",
                        }),
                    }).then(function (response) {
                        if (response.status === 200) {
                            response.blob().then((e) => {
                                setUser({
                                    ...currentUser,
                                    image: URL.createObjectURL(e),
                                });
                            });
                        } else {
                            setUser(currentUser);
                        }
                    });
                });
            } else if (response.status === 403) {
                history.push("/naslovnica");
            }
        });
        fetch("/api/users/profileOwner/" + id, {
            method: "GET",
            headers: new Headers({
                authorization: sessionStorage.getItem("key") || "",
            }),
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then((owner) => {
                    setIsOwner(owner);
                });
            }
        });
    }, []);

    const showImage = (event: any) => {
        var file = event.target.files[0];

        var reader = new FileReader();
        reader.onload = function (newImage) {
            // @ts-ignore
            setUser({ ...user, image: newImage.target.result as string });
        };
        reader.readAsDataURL(file);
    };

    return (
        <div>
            { isOwner ? (
                <SidebarMenu></SidebarMenu>
            ) : (
                <ProfileUserInfo></ProfileUserInfo>
            )}
            <div className="profile-info-container profile-info-text">
                <div className="profile-text-wrap">
                    <p>Ime: </p>
                </div>
            </div>
        </div>
    )
}

