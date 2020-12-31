import React, { useEffect, useState } from "react";
import { EventInfo } from "./EventInfo";
import "./CreateEventPage.css";
import { MountainPathSearch } from "./models/MountainPathSearch";
import Select, {ValueType} from "react-select";
import { MountainPathSelect } from "./models/MountainPathSelect";
import { Paths } from "./models/Paths";
import {HillOption} from "../mountain-lodge/models/HillOption";

interface Props {
  cardsToRender: EventInfo[];
  startDate: string;
  paths: Paths[];
  setPaths: (paths: Paths[]) => void;
}

export const EventDays = ({ cardsToRender, startDate, paths, setPaths }: Props) => {
  const [mountainPathsSearch, setMountainPathsSearch] = useState<MountainPathSearch[]>();
  const [selectValues, setSelectValues] = useState<MountainPathSelect[]>();

  useEffect(() => {
    fetch("/api/mountain-paths/all-public", {
      method: "GET",
      headers: new Headers({
        authorization: sessionStorage.getItem("key") || "",
      }),
    }).then(function (response) {
      if (response.status === 200) {
        response.json().then((e) => {
          setMountainPathsSearch(e);
          setSelectValues(
            e.map(function (item: MountainPathSearch) {
              let values: MountainPathSelect = {
                value: item.id,
                label: item.name,
              };
              return values;
            })
          );
        });
      }
    });
  }, []);

  const selectOptions = (day: number, mountainPath: MountainPathSelect) => {
    let pathSelected: MountainPathSelect = mountainPath;
    let date = new Date(Date.parse(startDate));
    date.setDate(date.getDate() + day - 1);
    let currentPath: Paths = {
      pathId: pathSelected.value,
      date: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
    };
    let found = false
    paths.forEach(path => {
      if (path.date === currentPath.date) {
        path.pathId = currentPath.pathId;
        found = true
      }
    })
    if (!found) {
      paths.push(currentPath)
    }
    setPaths(paths);
  };

  return (
    <div>
      {cardsToRender.map((day) => (
        <div key={day.date.toString()}>
          <span className="eventComponent">{day.date} . dan: </span>
          <Select
            className="utility-select"
            isClearable={true}
            isSearchable={true}
            placeholder="Unesite ime staze"
            name={"utilities"}
            onChange={(e: ValueType<MountainPathSelect>) => {
              selectOptions(day.date, e as MountainPathSelect)
            }}
            options={selectValues}
          />
          <p className="eventComponent">{mountainPathsSearch && mountainPathsSearch[day.date - 1].hill}</p>
        </div>
      ))}
    </div>
  );
};
