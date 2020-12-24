import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.jpg";
import { useHistory } from "react-router";
import logout from "../../assets/logout.jpg";
import profile from "../../assets/profile.png"

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
                    <div className="dropdown-item-div"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <a className="dropdown-item"
                        href={profileLink}
                        //style={{ color: "blue" }}
                        onClick={() => setProfileActive(false)}
                        role="menuitem"
                      >
                        Pogledajte svoj profil
                        <img src={profile} alt={"Profile"} className="dropdown-image" />
                      </a>
                      <a className="dropdown-item"
                        href={"/home"}
                        //style={{ color: "blue" }}
                        onClick={() => {
                          setProfileActive(false);
                          sessionStorage.clear();
                        }}
                        role="menuitem"
                      >
                        Odjavite se
                        <img src={logout} alt={"Logout"} className="dropdown-image" />
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
