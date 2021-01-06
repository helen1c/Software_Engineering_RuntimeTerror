import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.jpg";
import { useHistory } from "react-router";
import logout from "../../assets/logout.jpg";
import profile from "../../assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { MainReducer } from "../../store/reducer";
import { findFriendRequests } from "../../store/actions/getAndRefuseAndAcceptFriendRequestsActions";
import { dispatchGetFriendRequestsNotifications } from "../../store/actions/getAndResolveFriendRequestsNotificationActions";
import community from "../../assets/worldwide.png";

export const Header = () => {
  const dispatch = useDispatch();
  const { results: friendRequestsResults } = useSelector(
    (state: MainReducer) => state.getAndRefuseAndAcceptFriendRequestsReducer
  );
  const { results: friendRequestsNotificationResults } = useSelector(
    (state: MainReducer) =>
      state.getAndResolveFriendRequestsNotificationActionReducer
  );
  const [profileImage, setProfileImage] = useState("");
  const history = useHistory();
  const [isProfileActive, setProfileActive] = useState(false);
  const [profileLink, setProfileLink] = useState("");
  const [mountaineeringCommunityLink, setMountaineeringCommunityLink] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("key") !== null) {
      dispatch(findFriendRequests());
      dispatch(dispatchGetFriendRequestsNotifications());
      fetch("/api/users/me", {
        method: "GET",
        headers: new Headers({
          authorization: sessionStorage.getItem("key") || "",
        }),
      }).then(function (response) {
        if (response.status === 200) {
          response.json().then((e) => {
            setProfileImage("data:image/jpeg;base64," + e.image);
            setProfileLink("/profile/" + e.id);
            setMountaineeringCommunityLink("/mountaineering-community")
          });
        }
      });
    }
  }, []);

  return (
    <nav className="header">
      <div className="title-container">
        <img
          src={logo}
          alt={"Logo"}
          className="logo-image"
          onClick={() => history.push("/home")}
        />
        <div className={"title"}>Planinarski dnevnik</div>
      </div>

      <ul className="profil">
        <li className="profil-part">
          {!sessionStorage.getItem("key") ? (
            <div className={"login-cnt"}>
              <button
                className="loginAndRegisterButton"
                onClick={() => history.push("/login")}
              >
                Prijavi se
              </button>
              <button
                className="loginAndRegisterButton"
                onClick={() => history.push("/register")}
              >
                Registriraj se
              </button>
            </div>
          ) : (
            <div>
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
                        className="dropdown-item-div"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                      >
                        <a
                          href={"/friendship-requests"}
                          className="dropdown-item"
                          //style={{ color: "blue" }}
                          role="menuitem"
                        >
                          Zahtjevi za prijateljstvo{" "}
                          {friendRequestsResults.length && <span style={{color: "red"}}>({friendRequestsResults.length.toString()})</span>}
                        </a>
                        <a
                          href={"/notifications"}
                          className="dropdown-item"
                          //style={{ color: "blue" }}
                          role="menuitem"
                        >
                          Obavijesti {friendRequestsNotificationResults.length && <span style={{color: "red"}}>({friendRequestsNotificationResults.length.toString()})</span>}
                        </a>
                        <a
                            className="dropdown-item"
                            href={mountaineeringCommunityLink}
                            //style={{ color: "blue" }}
                            role="menuitem"
                        >
                          Planinarska zajednica
                          <img
                              src={community}
                              alt={"Community"}
                              className="dropdown-image"
                          />
                        </a>

                        <a
                          className="dropdown-item"
                          href={profileLink}
                          //style={{ color: "blue" }}
                          onClick={() => setProfileActive(false)}
                          role="menuitem"
                        >
                          Pogledajte svoj profil
                          <img
                            src={profile}
                            alt={"Profile"}
                            className="dropdown-image"
                          />
                        </a>
                        <a
                          className="dropdown-item"
                          href={"/home"}
                          //style={{ color: "blue" }}
                          onClick={() => {
                            setProfileActive(false);
                            sessionStorage.clear();
                          }}
                          role="menuitem"
                        >
                          Odjavite se
                          <img
                            src={logout}
                            alt={"Logout"}
                            className="dropdown-image"
                          />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div
                className="relative"
                onMouseLeave={() => setProfileActive(false)}
              ></div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}
