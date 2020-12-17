import React, { useEffect, useState } from "react";
import "./ProfileUserInfo.css";
import { getEmptyProfile, Profile } from "./models/Profile";
import { useHistory } from "react-router";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import uredi from "../../assets/paper-icon.png";
import obrisi from "../../assets/delete-icon.png";
import odustani from "../../assets/blue-x-png-1.png";
import spremi from "../../assets/save-icon.png";

export const ProfileUserInfo = () => {
  const [user, setUser] = useState<Profile>(getEmptyProfile);
  const [oldUser, setOldUser] = useState<Profile>(getEmptyProfile);
  const [edit, setEdit] = useState(false);
  const [nameError, setNameError] = useState("");
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [sentFriendRequest, setSentFriendRequest] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
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
    fetch("/api/users/is-admin/", {
      method: "GET",
      headers: new Headers({
        authorization: sessionStorage.getItem("key") || "",
      }),
    }).then(function (response) {
      if (response.status === 200) {
        response.json().then((owner) => {
          setIsAdmin(owner);
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
      let transfer = { ...user };
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
        if (isOwner) {
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
      } else {
        setError(true);
      }
    });
  };

  return (
    <div >
      <div className="main-profile">
        <h1 className="profile-info-title">Korisnički podaci</h1>
      <div className="profile-info-container profile-info-text">
        <div className="profile-text-wrap">
          <div className="input-content-div">
          <label>Ime: </label>
          {!edit ? (
            <input className="input-content"
              type="text"
              disabled
              value={user ? user.name : ""}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          ) : (
            <>
              <input className="input-content-edit"
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
              <p className="mb-8">{nameError}</p>
            </>
          )}
          </div>
          <div className="input-content-div">
            <label>E-mail: </label>
            <input className="input-content"
                   type="text"
                   disabled
                   value={user ? user.email : ""}

            />
          </div>
          <div className="input-content-div">
          {!edit ? user.placeOfResidence &&
              <><label>Mjesto rođenja: </label>
            <input className="input-content"
              type="text"
              disabled
              value={user ? user.placeOfResidence : ""}
              onChange={(e) =>
                setUser({ ...user, placeOfResidence: e.target.value })
              }
            />
            </>
           : (
            <>
              <label>Mjesto rođenja: </label>
              <input className="input-content-edit"
                type="text"
                value={user.placeOfResidence}
                onChange={(e) =>
                  setUser({ ...user, placeOfResidence: e.target.value })
                }
              />
              <p className="mb-8">{nameError}</p>
            </>
          )}
          </div>
          <div className="input-content-div">

          {!edit ? user.dateOfBirth &&
             <> <label>Datum rođenja:</label>
            <input className="input-content"
              type="date"
              disabled
              value={user.dateOfBirth}
            />
             </>
           :
            <><label>Datum rođenja:</label>
              <input className="input-content-edit"
                type="date"
                value={user.dateOfBirth}
                onChange={(e) =>
                  setUser({ ...user, dateOfBirth: e.target.value })
                }
              />
            </>
          }
          </div>

          <div className="input-content-div">

            {!edit ? ( user.description &&
                 <>   <label> O meni:</label>
                <textarea className="input-content-text"

                disabled
                value={user ? user.description : ""}
                onChange={(e) =>
                  setUser({ ...user, description: e.target.value })
                }
              />
              </>
            ) : (
              <> <label> O meni:</label>
                <textarea className="input-content-text input-content-edit"

                  value={user.description}
                  onChange={(e) =>
                    setUser({ ...user, description: e.target.value })
                  }
                />
              </>
            )}
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
      {isOwner ? (
        !edit ? (
          <div>
            <button className="button-profile" onClick={handleEditOnClick}>
              <span className="button-label" >Uredi profil </span>
              <img
                  src={uredi}
                  alt={"Uredi"}
                  className="buttons-profile-img"
              /></button>

          </div>
        ) : (
          <div>
            <button className="button-profile" onClick={handleCancelOnClick}>
              <span className="button-label"> Odustani </span>
              <img
                  src={odustani}
                  alt={"Odustani"}
                  className="buttons-profile-img"
              /></button>
            <button className="button-profile" onClick={() => setOpenEditModal(true)}>
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
          {!error ? (
            !sentFriendRequest ? (
              <button onClick={handleAddUserAsFriend}>Dodaj prijatelja</button>
            ) : (
              <button disabled={true}>Zahtjev poslan &#10004;</button>
            )
          ) : (
            <span className="errorText">
              Greška prilikom dodavanja prijatelja.
              <button onClick={handleAddUserAsFriend}>Dodaj prijatelja</button>
            </span>
          )}
        </div>
      )}
      {(isOwner || isAdmin) && (
        <button  className="button-profile" onClick={() => setOpenDeleteModal(true)}>
          <span className="button-label" >Ukloni račun </span>
          <img
            src={obrisi}
            alt={"Obrisi"}
            className="buttons-profile-img"
        /></button>
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

    </div>
  );
};
