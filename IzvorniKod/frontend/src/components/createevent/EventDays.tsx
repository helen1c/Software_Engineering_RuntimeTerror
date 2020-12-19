import React from "react";
import { EventInfo } from "./EventInfo";

interface Props {
  cardsToRender: EventInfo[];
}

export const EventDays = ({ cardsToRender }: Props) => {

  const placeholder1 = () => {
    return "Početna točka";
  };

  const placeholder2 = () => {
    return "Krajnja točka";
  };

  const placeholder3 = () => {
    return "Predviđeno trajanje";
  };

  return (
    <div>
      {cardsToRender.map((day) => (
        <div key={day.date.toString()}>{day.date}. dan

          <div>
          <input
              type="text"
              name="text"
              placeholder={placeholder1()}
          />
          </div>

          <div>
            <input
                type="text"
                name="text"
                placeholder={placeholder2()}
            />
          </div>

          <div>
            <input
                type="text"
                name="text"
                placeholder={placeholder3()}
            />
          </div>
        </div>

      ))}
      { (cardsToRender.length) ? (
        <button type="submit" className="submitButton">
          Stvori događaj
        </button>
        ): (
          ""
        )
      }
    </div>
  );
};
