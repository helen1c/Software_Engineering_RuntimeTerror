import {useDispatch, useSelector} from "react-redux";
import {MainReducer} from "../../../../store/reducer";
import React, {useEffect} from "react";
import {ArchivedMountainPath} from "./ArchivedMountainPath";
import {findArchivedPaths} from "../../../../store/actions/findAllArchivedPathsActions";

export const ArchivedMountainPathList = () => {

    const {archivedPaths} = useSelector((state: MainReducer) => state.findAllArchivedPathsReducer);

    const dispatcher = useDispatch();

    useEffect(() => {
        if(!archivedPaths)
            dispatcher(findArchivedPaths());
        if(archivedPaths.length === 0) {
            dispatcher(findArchivedPaths());
        }
    }, [dispatcher, archivedPaths])

    return (
        <>
            <div className="path-archive-title">
                <span className="archive-path-name">Visočje</span>
                <span className="archive-path-name">Naziv staze</span>
                <span className="archive-path-name">Datum  </span>
                <span className="archive-path-name-first">slika</span>

            </div>
            {archivedPaths.map(path => <ArchivedMountainPath path={path} key={path.id}/>)}
        </>);
}

