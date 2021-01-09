import React, {useState} from "react";
import "./ProfileUserInfo.css";
import {Button, Dialog, DialogActions, DialogTitle} from "@material-ui/core";
import uredi from "../../assets/paper-icon.png";
import obrisi from "../../assets/delete-icon.png";
import odustani from "../../assets/blue-x-png-1.png";
import spremi from "../../assets/save-icon.png";
import friend from "../../assets/friend.png"
import mail from "../../assets/mail-inbox-app.png";
import cake from "../../assets/cake.png";
import city from "../../assets/cityscape.png";
import question from "../../assets/question.png";
import cancel from "../../assets/cancel.png";
import {getEmptyProfile, ViewProfileInfo} from "./models/ViewProfileInfo";
import Compress from "react-image-file-resizer";
import {MountaineeringCommunitySearch} from "../mountaineering-community/MountaineeringCommunitySearch";
import {Badges} from "../badges/Badges";

interface Props {
    user: ViewProfileInfo;
    setUser: (user: ViewProfileInfo) => void;
}

export const ProfileUserInfo = ({user, setUser}: Props) => {
    const [oldUser, setOldUser] = useState<ViewProfileInfo>(getEmptyProfile);
    const [edit, setEdit] = useState(false);
    const [nameError, setNameError] = useState("");
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [openRemoveFriendModal, setOpenRemoveFriendModal] = useState(false)
    const [sentFriendRequest, setSentFriendRequest] = useState<boolean>(false);
    const [removedFriend, setRemovedFriend] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const id = window.location.pathname.split("/")[2];

    const showImage = (event: any) => {
        if (!event) return;
        let file = event.target.files[0];
        console.log(file);
        Compress.imageFileResizer(
            file,
            480,
            480,
            "JPEG",
            100,
            0,
            (uri) => {
                console.log(uri);

                let reader = new FileReader();
                if (uri !== undefined) reader.readAsDataURL(uri as Blob);

                reader.onload = function (newImage) {
                    setUser({...user, image: newImage?.target?.result as string});
                };
            },
            "blob"
        );
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
                    "Content-Type": "application/json",
                }),
            }).then((response) => {
                if (response.status === 200) {
                    setOldUser(user);
                    setEdit(false);
                    window.location.href = "/profile/" + id;
                }
            });
        }
    };

    const handleDeleteOnClick = () => {
        setOpenDeleteModal(false);
        fetch("/api/users/" + id, {
            method: "DELETE",
            headers: new Headers({
                authorization: sessionStorage.getItem("key") || "",
                "Content-Type": "application/json",
            }),
        }).then((response) => {
            if (response.status === 200) {
                if (user.isOwner) {
                    sessionStorage.clear();
                }
                window.location.href = "/home";
            }
        });
    };

    const handleAddUserAsFriend = () => {
        fetch("/api/users/add-friend/" + id, {
            method: "POST",
            headers: new Headers({
                authorization: sessionStorage.getItem("key") || "",
            }),
        }).then(function (response) {
            if (response.status === 200) {
                setSentFriendRequest(true);
                setRemovedFriend(false);
            } else {
                setError(true);
            }
        });
    };

    const handleRemoveUserAsFriend = () => {
        fetch("/api/users/remove-friend/" + id, {
            method: "POST",
            headers: new Headers({
                authorization: sessionStorage.getItem("key") || "",
            }),
        }).then(function (response) {
            if (response.status === 200) {
                let newUser = user;
                newUser.friend = false;
                setUser(newUser)
                setRemovedFriend(true);
                setSentFriendRequest(false);
                setOpenRemoveFriendModal(false)
            } else {
                setError(true);
            }
        });
    };

    return (
        <div>
            <div className="main-profile">
                <div className="profile-info-container profile-info-text">
                    <div className="profile-text-wrap">
                        <div className="input-content-div-name">

                            {!edit ? (
                                <input
                                    className="input-content-name"
                                    type="text"
                                    disabled
                                    value={user ? user.name : ""}
                                    onChange={(e) => setUser({...user, name: e.target.value})}
                                />
                            ) : (
                                <>
                                    <input
                                        className="input-content-edit"
                                        type="text"
                                        value={user.name}
                                        onChange={(e) => setUser({...user, name: e.target.value})}
                                    />
                                    <p className="mb-8">{nameError}</p>
                                </>
                            )}
                        </div>
                        <div className="input-content-div-all">
                        <div className="input-content-div-data">
                        <div className="input-content-div">
                            <img
                                src={mail}
                                alt={"Mail"}
                                className="input-profile-img"
                            />
                            <label>E-mail: </label>
                            <input
                                className="input-content"
                                type="text"
                                disabled
                                value={user ? user.email : ""}
                            />
                        </div>
                        <div className="input-content-div">
                            <img
                                src={city}
                                alt={"City"}
                                className="input-profile-img"
                            />
                            {!edit ? (
                                user.placeOfResidence && (
                                    <>
                                        <label>Mjesto rođenja: </label>
                                        <input
                                            className="input-content"
                                            type="text"
                                            disabled
                                            value={user ? user.placeOfResidence : ""}
                                            onChange={(e) =>
                                                setUser({...user, placeOfResidence: e.target.value})
                                            }
                                        />
                                    </>
                                )
                            ) : (
                                <>
                                    <label>Mjesto rođenja: </label>
                                    <input
                                        className="input-content-edit"
                                        type="text"
                                        value={user.placeOfResidence}
                                        onChange={(e) =>
                                            setUser({...user, placeOfResidence: e.target.value})
                                        }
                                    />
                                    <p className="mb-8">{nameError}</p>
                                </>
                            )}
                        </div>
                        <div className="input-content-div">
                            <img
                                src={cake}
                                alt={"Cake"}
                                className="input-profile-img"
                            />
                            {!edit ? (
                                user.dateOfBirth && (
                                    <>
                                        {" "}
                                        <label>Datum rođenja:</label>
                                        <input
                                            className="input-content"
                                            type="date"
                                            disabled
                                            value={user.dateOfBirth}
                                        />
                                    </>
                                )
                            ) : (
                                <>
                                    <label>Datum rođenja:</label>
                                    <input
                                        className="input-content-edit"
                                        type="date"
                                        value={user.dateOfBirth}
                                        onChange={(e) =>
                                            setUser({...user, dateOfBirth: e.target.value})
                                        }
                                    />
                                </>
                            )}
                        </div>

                        <div className="input-content-div-text">
                            <img
                                src={question}
                                alt={"Question"}
                                className="input-profile-img"
                            />
                            {!edit ? (
                                user.description && (
                                    <>
                                        {" "}
                                        <label> O meni:</label>
                                        <textarea
                                            className="input-content-text"
                                            disabled
                                            value={user ? user.description : ""}
                                            onChange={(e) =>
                                                setUser({...user, description: e.target.value})
                                            }
                                        />
                                    </>
                                )
                            ) : (
                                <>
                                    {" "}
                                    <label> O meni:</label>
                                    <textarea
                                        className="input-content-text input-content-edit"
                                        value={user.description}
                                        onChange={(e) =>
                                            setUser({...user, description: e.target.value})
                                        }
                                    />
                                </>
                            )}
                        </div>
                        </div>
                        <div className="input-content-badges">
                            <div className="badges-wrap">
                                <Badges badges={user.badges}/>
                            </div>
                        </div>
                    </div>
                    </div>

                    <div className="profile-image-wrap">
                        <img
                            className="profil-info-image"
                            alt={"Slika profila"}
                            src={user.image}
                        />
                        {edit && (
                            <div className="image-input">
                                <label htmlFor="image">
                                    <u>DODAJ SLIKU</u>
                                </label>
                                <input
                                    id="image"
                                    type="file"
                                    onChange={(event) => showImage(event)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="buttons-profile">
                {user.isOwner ? (
                    !edit ? (
                        <div>
                            <button className="button-profile" onClick={handleEditOnClick}>
                                <span className="button-label">Uredite  profil </span>
                                <img
                                    src={uredi}
                                    alt={"Uredi"}
                                    className="buttons-profile-img"
                                />
                            </button>
                        </div>
                    ) : (
                        <div>
                            <button className="button-profile" onClick={handleCancelOnClick}>
                                <span className="button-label"> Odustani </span>
                                <img
                                    src={odustani}
                                    alt={"Odustani"}
                                    className="buttons-profile-img"
                                />
                            </button>
                            <button
                                className="button-profile"
                                onClick={() => setOpenEditModal(true)}
                            >
                                <span className="button-label"> Spremi </span>
                                <img
                                    src={spremi}
                                    alt={"Spremi"}
                                    className="buttons-profile-img"
                                />
                            </button>
                        </div>
                    )
                ) : (
                    <div>

                        <div>
                            {!error ? (
                                    user.friend ? (
                                        <button className="button-profile"   onClick={() => setOpenRemoveFriendModal(true)}>
                                            <span className="button-label">Ukloni prijatelja </span>
                                            <img src={cancel} alt={"Cancel"} className="buttons-profile-img"/>
                                        </button>
                                    ) : (
                                        (!sentFriendRequest && !user.sentFriendRequest) ? (
                                            <button className="button-profile"  onClick={handleAddUserAsFriend}>
                                                <span className="button-label"> Dodaj prijatelja </span>
                                                <img
                                                    src={friend}
                                                    alt={"Friend"}
                                                    className="buttons-profile-img"
                                                />
                                            </button>

                                        ) : (
                                            <button  className="button-profile-fr"  disabled={true}>Zahtjev poslan &#10004;</button>
                                        )
                                    )
                                ) :
                                (
                                    <span className="errorText">
                    Greška prilikom dodavanja prijatelja.
                     <button className="button-profile-fr"  onClick={handleAddUserAsFriend}>
                            <span className="button-label-fr"> Dodaj prijatelja </span>
                            <img
                                src={friend}
                                alt={"Friend"}
                                className="buttons-friend-img"
                            />
                          </button>

                  </span>
                                )}

                        </div>
                    </div>
                )}
                {(user.isOwner || (user.isAdmin && !user.ownerAdmin)) && (
                    <button
                        className="button-profile"
                        onClick={() => setOpenDeleteModal(true)}
                    >
                        <span className="button-label">Ukloni račun </span>
                        <img src={obrisi} alt={"Obrisi"} className="buttons-profile-img"/>
                    </button>
                )}
            </div>
            <Dialog
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Jeste li sigurni da želite obrisati račun?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteModal(false)} color="primary">
                        NE
                    </Button>
                    <Button onClick={handleDeleteOnClick} color="primary" autoFocus>
                        DA
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Jeste li sigurni da želite urediti račun?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpenEditModal(false)} color="primary">
                        NE
                    </Button>
                    <Button onClick={handleSaveOnClick} color="primary" autoFocus>
                        DA
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openRemoveFriendModal}
                onClose={() => setOpenRemoveFriendModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Jeste li sigurni da želite ukloniti prijatelja?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpenRemoveFriendModal(false)} color="primary">
                        NE
                    </Button>
                    <Button onClick={handleRemoveUserAsFriend} color="primary" autoFocus>
                        DA
                    </Button>
                </DialogActions>
            </Dialog>
            {user.isOwner && <MountaineeringCommunitySearch/>}
        </div>
    );
};