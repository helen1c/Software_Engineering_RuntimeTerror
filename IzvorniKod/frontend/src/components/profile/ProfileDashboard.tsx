import React, {useState} from "react";
import {ProfileUserInfo} from "./ProfileUserInfo";
import "./ProfileDashboard.css"
import menu from "../../assets/menu-bar.jpg";
import {ViewProfileInfo} from "./models/ViewProfileInfo";

const PROFILE = "PROFILE";
const PATHS = "PATHS";
const ARCHIVE = "ARCHIVE";
const EVENTS = "EVENTS"

interface Props {
    user: ViewProfileInfo;
    setUser: (user: ViewProfileInfo) => void;
}

export const ProfileDashboard = ({ user, setUser }: Props) => {
  const [option, setOption] = useState(PROFILE);

  return (
    <div>
      <div className="menu-div">
        <button className="menu-button">
          <img className="menu-image" alt={"Menu"} src={menu} />
        </button>
        <div className="sidebar">
          <button
            className={
              option === PROFILE ? "sidebar__item selected" : "sidebar__item"
            }
            onClick={() => setOption(PROFILE)}
          >
            <p className="sidebar__item__description">Moj profil</p>
            <img
              className="sidebar__image"
              src={require("../../assets/user.png")}
              alt=""
            />
          </button>
          <button
            className={
              option === PATHS ? "sidebar__item selected" : "sidebar__item"
            }
            onClick={() => setOption(PATHS)}
          >
            <p className="sidebar__item__description">Moje staze</p>
            <img
              className="sidebar__image"
              src={require("../../assets/path.png")}
              alt=""
            />
          </button>
          <button
            className={
              option === ARCHIVE ? "sidebar__item selected" : "sidebar__item"
            }
            onClick={() => setOption(ARCHIVE)}
          >
            <p className="sidebar__item__description">Moja arhiva</p>
            <img
              className="sidebar__image"
              src={require("../../assets/archive.png")}
              alt=""
            />
          </button>
          <button
            className={
              option === EVENTS ? "sidebar__item selected" : "sidebar__item"
            }
            onClick={() => setOption(EVENTS)}
          >
            <p className="sidebar__item__description">Moji događaji</p>
            <img
              className="sidebar__image"
              src={require("../../assets/event.png")}
              alt=""
            />
          </button>
        </div>
      </div>

      <div className="admin-layout">
        {option === PROFILE && (
          <ProfileUserInfo user={user} setUser={setUser} />
        )}
      </div>
    </div>
  );
};