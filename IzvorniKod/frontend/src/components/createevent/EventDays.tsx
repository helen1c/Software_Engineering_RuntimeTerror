import React from "react";
import { EventInfo } from "./EventInfo";
import "./CreateEventPage.css";

interface Props {
  cardsToRender: EventInfo[];
}

export const EventDays = ({ cardsToRender }: Props) => {

  const placeholder = () => {
    return "Unesite ime staze";
  };

  return (
    <div>
      {cardsToRender.map((day) => (
          <div key={day.date.toString()}>
            <span className="eventComponent">{day.date} . dan: </span>
            <input
              type="text"
              name="searchText"
              className="event-input"
              placeholder={placeholder()}
            />
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
