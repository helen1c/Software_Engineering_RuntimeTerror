import React from "react";
import {MountainLodgeUserArchive} from "../../models/MountainLodgeUserArchive";

interface Props {
    lodge: MountainLodgeUserArchive
}

export const ArchivedMountainLodge = ({lodge} : Props) => {

    return (
        <div className="lodge-archive-cnt">
            <span>Neka cool sličica planinarskog doma</span>
            <span>{lodge.hillName}</span>
            <span>{lodge.name}</span>
            <span>{lodge.dateArchived}</span>
        </div>
    );

}