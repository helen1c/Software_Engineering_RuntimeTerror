import React, {useEffect, useState} from "react";
import './ProfileUserInfo.css'
import {getEmptyProfile, Profile} from "./models/Profile";
import {useHistory} from "react-router";

export const ProfileUserInfo = () => {
    const [user, setUser] = useState<Profile>(getEmptyProfile);
    const [oldUser, setOldUser] = useState<Profile>(getEmptyProfile);
    const [edit, setEdit] = useState(false);
    const [nameError, setNameError] = useState("")
    const history = useHistory();
    const id = window.location.pathname.split("/")[2]

    useEffect(() => {
        fetch("/api/users/" + id, {
            method: "GET",
            headers: new Headers({
                authorization: sessionStorage.getItem("key") || ""
            })
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then(currentUser => {
                    fetch("/api/users/image?", {
                        method: "GET",
                        headers: new Headers({
                            authorization: sessionStorage.getItem("key") || ""
                        })
                    }).then(function (response) {
                        if (response.status === 200) {
                            response.blob().then(e => {
                                setUser({
                                    ...currentUser,
                                    image: URL.createObjectURL(e)
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
    }, []);

    const showImage = (event: any) => {
        var file = event.target.files[0];

        var reader = new FileReader();
        reader.onload = function (newImage) {
            // @ts-ignore
            setUser({...user, image: newImage.target.result as string});
        };
        reader.readAsDataURL(file);
    };

    const handleEditOnClick = () => {
        setEdit(true);
        setOldUser(user);
    };

    const handleCancelOnClick = () => {
        setEdit(false);
        setUser(oldUser);
    };

    function validateProfile() {
        let currentNameError = "";
        let foundError = false;

        let trimedUser = user;
        trimedUser.name = trimedUser.name.trim();
        trimedUser.email = trimedUser.email.trim();

        setUser(trimedUser);

        if (trimedUser.name.length < 1) {
            currentNameError = "Obavezan unos.";
            foundError = true;
        } else if (trimedUser.name.length > 128) {
            currentNameError = "Ime mora biti kraće od 128 znakova.";
            foundError = true;
        }

        setNameError(currentNameError);
        return !foundError;
    }

    const handleSaveOnClick = () => {
        if (validateProfile()) {
            let transfer = {...user};
            transfer.image = transfer.image.split(",")[1];
            fetch("/api/users/current", {
                method: "PATCH",
                body: JSON.stringify(transfer),
                headers: new Headers({
                    authorization: sessionStorage.getItem("key") || "",
                    "Content-Type": "application/json"
                })
            }).then(response => {
                if (response.status === 200) {
                    setOldUser(user);
                    setEdit(false);
                }
            });
        }
    };

    return (
        <div>
            <h1 className="profile-info-title">Korisnički podaci</h1>
            <div className="profile-info-container profile-info-text">
                <div className="profile-text-wrap">
                    <p>Ime: </p>
                    {!edit ? (
                        <input
                            type="text"
                            disabled
                            value={user ? user.name : ""}
                            onChange={e => setUser({...user, name: e.target.value})}
                        />
                    ) : (
                        <>
                            <input
                                type="text"
                                value={user.name}
                                onChange={e => setUser({...user, name: e.target.value})}
                            />
                            <p className="mb-8">{nameError}</p>
                        </>
                    )}
                    <div>E-mail: {user ? user.email : ""}</div>
                    <p>Mjesto rođenja: </p>
                    {!edit ? (
                        <input
                            type="text"
                            disabled
                            value={user ? user.placeOfResidence : ""}
                            onChange={e => setUser({...user, placeOfResidence: e.target.value})}
                        />
                    ) : (
                        <>
                            <input
                                type="text"
                                value={user.placeOfResidence}
                                onChange={e => setUser({...user, placeOfResidence: e.target.value})}
                            />
                            <p className="mb-8">{nameError}</p>
                        </>
                    )}
                    <p>Datum rođenja:</p>
                    {!edit ? (
                        <input
                            type="date"
                            disabled
                            value={user.dateOfBirth}
                            onChange={e => setUser({...user, dateOfBirth: e.target.value})}
                        />
                    ) : (
                        <>
                            <input
                                type="date"
                                value={user.dateOfBirth}
                                onChange={e => setUser({...user, dateOfBirth: e.target.value})}
                            />
                        </>
                    )}
                    <div className="profile-info-description">
                        <div>O meni:</div>
                        {!edit ? (
                            <input
                                type="text"
                                disabled
                                value={user ? user.description : ""}
                                onChange={e => setUser({...user, description: e.target.value})}
                            />
                        ) : (
                            <>
                                <input
                                    type="text"
                                    value={user.description}
                                    onChange={e => setUser({...user, description: e.target.value})}
                                />
                                <p className="mb-8">{nameError}</p>
                            </>
                        )}
                    </div>
                </div>
                <div className="profile-image-wrap">
                    <img className="profil-info-image" alt={"Slika profila"} src={user.image}/>
                    {edit && (
                        <div className="">
                            <label htmlFor="image">
                                <u>DODAJ SLIKU</u>
                            </label>
                            <input id="image" className="hidden" type="file" onChange={event => showImage(event)} />
                        </div>
                    )}
                </div>
            </div>
            {!edit ? (
                <div>
                    <button className="bt-yellow-200 text-xl text-white" onClick={handleEditOnClick}>
                        Izmijeni
                    </button>
                </div>
            ) : (
                <div className="inline-block mb-12">
                    <button className="bt-red-200 text-xl text-white mr-3" onClick={handleCancelOnClick}>
                        Odustani
                    </button>
                    <button className="bt-yellow-200 text-xl text-white" onClick={handleSaveOnClick}>
                        Spremi
                    </button>
                </div>
            )}
        </div>
    )
}
