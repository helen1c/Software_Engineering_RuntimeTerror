import React, { useEffect, useState } from "react";
import { EventInfo } from "./EventInfo";
import "./CreateEventPage.css";
import { MountainPathSearch } from "./models/MountainPathSearch";
import { MountainPathSelect } from "./models/MountainPathSelect";
import { Paths } from "./models/Paths";
import { EventDay } from "./EventDay";
import {fetcher} from "../../Util";

interface Props {
  cardsToRender: EventInfo[];
  paths: Paths[];
  setPaths: (paths: Paths[]) => void;
}

export const EventDays = ({
  cardsToRender,
  paths,
  setPaths,
}: Props) => {
  const [mountainPathsSearch, setMountainPathsSearch] = useState<
    MountainPathSearch[]
  >();
  const [selectValues, setSelectValues] = useState<MountainPathSelect[]>();

  useEffect(() => {
    fetcher("/api/mountain-paths/all-public", {
      method: "GET"
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

  return (
    <div>
      {cardsToRender.map((day) => (
        <EventDay
          paths={paths}
          setPaths={setPaths}
          day={day}
          selectValues={selectValues}
          mountainPathsSearch={mountainPathsSearch}
        />
      ))}
    </div>
  );
};
