import React, {useEffect} from "react";
import './ProfileUserInfo.css'
import {useDispatch, useSelector} from "react-redux";
import {MainReducer} from "../../store/reducer";
import {getPrincipalProfile, getPrincipalProfilePicture} from "../../store/actions/getProfileActions";

export const ProfileUserInfo = () => {
    const dispatcher = useDispatch();

    const {user, imageUrl} = useSelector((state: MainReducer) => state.getPrincipalUserProfileReducer);

    useEffect(() => {
        if (user === undefined) {
            dispatcher(getPrincipalProfile());
            dispatcher(getPrincipalProfilePicture());
        }
    }, [dispatcher, user]);

    return (
        <div>
            <h1 className="profile-info-title">Korisnički podaci</h1>
            <div className="profile-info-container profile-info-text">
                <div className="profile-text-wrap">
                    <div>Ime: {user ? user.name : ""}</div>
                    <div>E-mail: {user ? user.email : ""}</div>
                    <div>Mjesto rođenja: {user ? user.placeOfResidence : ""}</div>
                    <div>Datum rođenja: {user ?
                        new Intl.DateTimeFormat("de-DE", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit"
                        }).format(user.dateOfBirth) : ""}
                    </div>
                    <div className="profile-info-description">
                        <div>O meni:</div>
                        <div>{user ? user.description : ""}</div>
                    </div>
                </div>
                <div className="profile-image-wrap">
                    <img className="profil-info-image" alt={"Slika profila"} src={imageUrl}/>
                </div>
            </div>
        </div>
    )
}
