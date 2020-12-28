import React from "react";
import {MountainLodgeUserArchive} from "../../models/MountainLodgeUserArchive";
import minilodge from "../../../../assets/minilodge.png";
import "./ArchivedMountainLodge.css";

interface Props {
    lodge: MountainLodgeUserArchive
}

export const ArchivedMountainLodge = ({lodge} : Props) => {

    return (
        <div className="lodge-archive-cnt">
            <span className="archive-path-name">{lodge.hillName}</span>
            <span className="archive-path-name">{lodge.name}</span>
            <span className="archive-path-name">{lodge.dateArchived}</span>
            <span ><img className="mini-image-archive" alt="Mini lodge" src={minilodge}/></span>

        </div>
    );

}