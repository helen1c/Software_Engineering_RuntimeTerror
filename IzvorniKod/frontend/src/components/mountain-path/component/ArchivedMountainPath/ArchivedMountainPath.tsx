import React from "react";
import {MountainPathUserArchive} from "../../models/MountainPathUserArchive";

interface Props {
    path: MountainPathUserArchive
}

export const ArchivedMountainPath = ({path} : Props) => {

    return (
        <div className="path-archive-cnt">
            <span>Neka cool sličica planinarske staze</span>
            <span>{path.hillName}</span>
            <span>{path.name}</span>
            <span>{path.dateArchived}</span>
        </div>
    );

}