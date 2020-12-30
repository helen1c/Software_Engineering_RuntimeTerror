import React, {useEffect, useState} from "react";
import { EventInfo } from "./EventInfo";
import "./CreateEventPage.css";
import {MountainPathSearch} from "./models/MountainPathSearch";
import Select from "react-select";
import {MountainPathSelect} from "./models/MountainPathSelect";

interface Props {
  cardsToRender: EventInfo[];
}

export const EventDays = ({ cardsToRender }: Props) => {
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
            setMountainPathsSearch(e)
            setSelectValues(e.map(function (item:MountainPathSearch) {
              let values: MountainPathSelect = {value: item.id,label: item.name}
              return values
            }))
          });
        }
      });
  }, []);

  const selectOptions = () => {
    alert(selectValues)
  }


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
                onChange={selectOptions}
                options={selectValues}>
            </Select>
            <p className="eventComponent">Informacije o stazi s backenda</p>
        </div>
      ))}
      { (cardsToRender.length) ? (
        <button type="submit" className="submitButton" >
          Stvori događaj
        </button>
        ): (
          ""
        )
      }
    </div>
  );
};