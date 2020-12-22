import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.jpg";
import { useHistory } from "react-router";

function Header() {
  const [profileImage, setProfileImage] = useState("");
  const history = useHistory();
  const [isProfileActive, setProfileActive] = useState(false);
  const [profileLink, setProfileLink] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("key") !== null)
      fetch("/api/users/me", {
        method: "GET",
        headers: new Headers({
          authorization: sessionStorage.getItem("key") || "",
        }),
      }).then(function (response) {
        if (response.status === 200) {
          response.json().then((e) => {
            setProfileImage("data:image/jpeg;base64," + e.image)
            setProfileLink("/profile/" + e.id);
          });
        }
      });
  }, []);

  return (
    <nav className="header">
      <div className="title-container">
        <img
          src={logo}
          alt={"Logo"}
          className="logo-image"
          onClick={(e) => history.push("/home")}
        />
        <div className={"title"}>Planinarski dnevnik</div>
      </div>

      <ul className="profil">
        <li className="profil-part">
          {!sessionStorage.getItem("key") ? (
            <div className={"login-cnt"}>
              <button
                className="loginAndRegisterButton"
                onClick={(e) => history.push("/login")}
              >
                Prijavi se
              </button>
              <button
                className="loginAndRegisterButton"
                onClick={(e) => history.push("/register")}
              >
                Registriraj se
              </button>
            </div>
          ) : (
            <div
              className="relative"
              onMouseLeave={() => setProfileActive(false)}
            >
              <div className={"user-cnt"}>
                <img
                  className="profil-image"
                  alt={"Slika profila"}
                  src={profileImage}
                  onClick={() => setProfileActive(!isProfileActive)}
                />
                {isProfileActive && (
                  <div>
                    <div
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <a
                        href={profileLink}
                        style={{ color: "orange" }}
                        onClick={() => setProfileActive(false)}
                        role="menuitem"
                      >
                        Profil
                      </a>
                      <a
                        href={"/home"}
                        style={{ color: "orange" }}
                        onClick={() => {
                          setProfileActive(false);
                          sessionStorage.clear();
                        }}
                        role="menuitem"
                      >
                        Odjavi se
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Header;
