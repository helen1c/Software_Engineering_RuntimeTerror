import React from "react";
import {MountainPathUserArchive} from "../../models/MountainPathUserArchive";
import "./ArchivedMountainPath.css";
import minipath from"../../../../assets/minipath.png";

interface Props {
    path: MountainPathUserArchive
}

export const ArchivedMountainPath = ({path} : Props) => {

    return (
        <div className="path-archive-cnt">
            <span className="archive-path-name"> {path.hillName}</span>
            <span className="archive-path-name"> {path.name}</span>
            <span className="archive-path-name"> {path.dateArchived}</span>
            <span><img className="mini-image-archive" alt="Mini path" src={minipath} /></span>
        </div>

    );

}