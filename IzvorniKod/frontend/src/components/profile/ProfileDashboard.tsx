import React, {useState} from "react";
import {ProfileUserInfo} from "./ProfileUserInfo";
import "./ProfileDashboard.css"
import menu from "../../assets/menu-bar.jpg";
import {ViewProfileInfo} from "./models/ViewProfileInfo";
import {ArchivedMountainLodgeList} from "../mountain-lodge/component/ArchivedMountainLodge/ArchivedMountainLodgeList";
import {ArchivedMountainPathList} from "../mountain-path/component/ArchivedMountainPath/ArchivedMountainPathList";
import {MyMountainPaths} from "../mountain-path/component/MyMountainPaths/MyMountainPaths";
import {MyCommunityEventsResults} from "../event/component/MyCommunityEventsResults";

const PROFILE = "PROFILE";
const MY_PATHS = "MY_PATHS";
const ARCHIVE_LODGE = "ARCHIVE_LODGE";
const ARCHIVE_PATH = "ARCHIVE_PATH";
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
              option === MY_PATHS ? "sidebar__item selected" : "sidebar__item"
            }
            onClick={() => setOption(MY_PATHS)}
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
              option === ARCHIVE_LODGE ? "sidebar__item selected" : "sidebar__item"
            }
            onClick={() => setOption(ARCHIVE_LODGE)}
          >
            <p className="sidebar__item__description">Posjećeni domovi</p>
            <img
              className="sidebar__image"
              src={require("../../assets/archive.png")}
              alt=""
            />
          </button>
            <button
                className={
                    option === ARCHIVE_PATH ? "sidebar__item selected" : "sidebar__item"
                }
                onClick={() => setOption(ARCHIVE_PATH)}
            >
                <p className="sidebar__item__description">Posjećene staze</p>
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
        {option === ARCHIVE_LODGE && (
            <div className="admin-layout-mini">
            <ArchivedMountainLodgeList/>
            </div>
        )}
          {option === ARCHIVE_PATH && (
              <div className="admin-layout-mini">
              <ArchivedMountainPathList/>
              </div>
          )}
          {option === MY_PATHS && (
              <div className="admin-layout-mini">
                  <MyMountainPaths/>
              </div>
          )}
          {option === EVENTS && (
              <div className="admin-layout-mini">
                  <MyCommunityEventsResults/>
              </div>
          )}
      </div>
    </div>
  );
};