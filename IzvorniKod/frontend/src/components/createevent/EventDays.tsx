import React from "react";
import { EventInfo } from "./EventInfo";

interface Props {
  cardsToRender: EventInfo[];
}

export const EventDays = ({ cardsToRender }: Props) => {
  return (
    <div>
      {cardsToRender.map((day) => (
        <div key={day.date.toString()}>{day.date}</div>
      ))}
    </div>
  );
};
