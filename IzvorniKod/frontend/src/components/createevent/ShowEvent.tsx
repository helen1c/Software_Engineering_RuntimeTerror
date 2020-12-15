import React, { useEffect, useState } from "react";
import { EventInfo } from "./EventInfo";

interface Props {
    event: EventInfo;
}

export const ShowEvent = ({ event }: Props) => {

    return (
            <div>
                <p>{event.during}</p>
            </div>
    );
};
