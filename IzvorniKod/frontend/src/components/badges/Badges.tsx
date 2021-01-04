import React from "react";
import "./Badges.css"
import {Badge} from "./models/Badge";


interface Props {
    badges: Badge[];
}

export const Badges = ({badges}: Props) => {
    return (
        <div className="badges-container">
            {badges.map((badge) => (
                <div key={badge.id}>
                    <div className="badge">
                        <img src={badge.imageURL} title={badge.description} alt={""} className="badge-image" />
                    </div>
                </div>
            ))}
        </div>
    );
};
