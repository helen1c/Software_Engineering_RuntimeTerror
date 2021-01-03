import React, { useState } from "react";
import { EventInfo } from "./EventInfo";
import "./CreateEventPage.css";
import { MountainPathSearch } from "./models/MountainPathSearch";
import Select, { ValueType } from "react-select";
import { MountainPathSelect } from "./models/MountainPathSelect";
import { Paths } from "./models/Paths";
import "./EventDay.css";
import goimg from "../../assets/go.png";
import finish from "../../assets/finish_flag-512.png";
import hill from "../../assets/mountains.png";

interface Props {
  paths: Paths[];
  setPaths: (paths: Paths[]) => void;
  day: EventInfo;
  selectValues?: MountainPathSelect[];
  mountainPathsSearch?: MountainPathSearch[];
}

export const EventDay = ({
  paths,
  setPaths,
  day,
  selectValues,
  mountainPathsSearch,
}: Props) => {
  const [currentPath, setCurrentPath] = useState<MountainPathSearch>();

  const selectOptions = (day: string, mountainPath: MountainPathSelect) => {
    let allPaths = paths;
    let position = -1;
    allPaths.map((path, index) => {
      if (path.date === day) {
        position = index;
      }
    });

    if (!mountainPath) {
      if (position >= 0) {
        let allPaths = paths;
        allPaths.splice(position, 1);
        setPaths(allPaths);
        setCurrentPath(undefined);
      }
    } else {
      let newPath: Paths = { pathId: mountainPath.value, date: day };

      if (position >= 0) {
        let allPaths = paths;
        allPaths.splice(position, 1);
        setPaths([...allPaths, newPath]);
      } else {
        setPaths([...paths, newPath]);
      }

      let pathInfo: MountainPathSearch;
      mountainPathsSearch?.forEach(function (path) {
        if (path.id === newPath.pathId) {
          pathInfo = path;
          setCurrentPath(pathInfo);
        }
      });
    }
  };

  return (
    <div>
      <div  className="event-div" key={new Date(day.date).getTime()}>

        <Select
          className="utility-select"
          isClearable={true}
          isSearchable={true}
          placeholder="Unesite ime staze"
          name={"utilities"}
          onChange={(e: ValueType<MountainPathSelect>) => {
            selectOptions(day.date, e as MountainPathSelect);
          }}
          options={selectValues}
        />

        <div className="eventComponent-date">{day.date}:</div>
        {currentPath && (
          <div className="event-details">
            <div className="event-details-mini">
              <img className="mini-image-hill" alt="GO" src={goimg}/>
              <span>{currentPath.startPoint}</span>
            </div>
            <div className="event-details-mini">
              <img className="mini-image-hill" alt="Finish" src={finish}/>
              <span>{currentPath.endPoint} </span>
            </div>
            <div className="event-details-mini">
              <img className="mini-image-hill" alt="Hill" src={hill}/>
              <span> {currentPath.hill}</span></div>
          </div>
        )}
      </div>
    </div>
  );
};
