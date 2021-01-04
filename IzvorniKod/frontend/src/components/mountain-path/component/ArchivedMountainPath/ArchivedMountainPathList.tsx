import {useDispatch, useSelector} from "react-redux";
import {MainReducer} from "../../../../store/reducer";
import React, {useEffect} from "react";
import {ArchivedMountainPath} from "./ArchivedMountainPath";
import {findArchivedPaths} from "../../../../store/actions/findAllArchivedPathsActions";

export const ArchivedMountainPathList = () => {

    const {archivedPaths, status} = useSelector((state: MainReducer) => state.findAllArchivedPathsReducer);

    const dispatcher = useDispatch();

    useEffect(() => {
        dispatcher(findArchivedPaths())
    }, [dispatcher])

    return (
        <>

        {status === "waiting" ? <label>Molimo pričekajte...</label> :
            <>
            {archivedPaths.length > 0 ?
            <div className="path-archive-title">
                <span className="archive-path-name">Visočje</span>
                <span className="archive-path-name">Naziv staze</span>
                <span className="archive-path-name">Datum  </span>
                <span className="archive-path-name-first">slika</span>
            </div> : <label>Nemate arhiviranih planinarskih staza.</label>}
            {archivedPaths.map(path => <ArchivedMountainPath path={path} key={path.id}/>)}
            </>}
        </>);
}

