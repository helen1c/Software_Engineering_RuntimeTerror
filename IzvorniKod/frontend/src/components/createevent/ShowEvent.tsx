import React from "react";

interface Props {
  numberOfDays: number;
}

export const ShowEvent = ({ numberOfDays }: Props) => {
  return (
    <div>
      <p>{numberOfDays}</p>
    </div>
  );
};
