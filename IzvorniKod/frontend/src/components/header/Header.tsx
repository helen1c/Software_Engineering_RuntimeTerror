import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.jpg";
import {useHistory} from "react-router";

function Header() {
  const [profileImage, setProfileImage] = useState("");
  const history = useHistory();

  useEffect(() => {
    if(sessionStorage.getItem("key") !== null)
    fetch("/api/users/image?", {
      method: "GET",
      headers: new Headers({
        authorization: sessionStorage.getItem("key") || "",
      }),
    }).then(function (response) {
      if (response.status === 200) {
        response.blob().then((e) => {
          setProfileImage(URL.createObjectURL(e));
        });
      }
    });
  }, []);

  const logout = () => {
    sessionStorage.removeItem("key");
    window.location.assign("./home");
  }

  return (
    <nav className="header">
      <div className="title-container">
        <img src={logo} alt={"Logo"} className="logo-image" onClick={e => history.push("/home")}/>
        <div className={"title"}>Planinarski dnevnik</div>
      </div>

      <ul className="profil">
        <li className="profil-part">
          {!sessionStorage.getItem("key") ? (
            <div className={"login-cnt"}>
              <button className="loginAndRegisterButton" onClick={e => history.push("/login")}>Prijavi se</button>
              <button className="loginAndRegisterButton" onClick={e => history.push("/register")}>Registriraj se</button>
            </div>
          ) : (
            <div className={"user-cnt"}>
                <img className="profil-image" alt={"Slika profila"} src={profileImage} />
              <button className="logout-button" onClick={logout}>Odjava</button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Header;
