import React, { useEffect, useState } from "react";
import "./css/Header.css";
import logo from "../assets/logo.jpg";
import {useHistory} from "react-router";

function Header() {
  const [profileImage, setProfileImage] = useState("");
  const history = useHistory();

  useEffect(() => {
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

  return (
    <nav className="header">
      <section>
        <a href="/">
          {" "}
          <img src={logo} className="image" />
        </a>
      </section>

      <h1 className="title">PLANINARSKI DNEVNIK</h1>

      <ul className="profil">
        <li className="profil-part">
          {!sessionStorage.getItem("key") ? (
            <div>
              <button className="loginAndRegisterButton" onClick={e => history.push("/prijava")}>Prijavi se</button>
              <button className="loginAndRegisterButton" onClick={e => history.push("/registracija")}>Registriraj se</button>
            </div>
          ) : (
            <div>
                <img className="image" src={profileImage} />
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Header;
