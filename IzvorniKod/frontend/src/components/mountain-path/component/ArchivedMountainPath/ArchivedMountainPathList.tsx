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
            {archivedPaths.map(path => <ArchivedMountainPath path={path} key={path.id}/>)}
        </>);
}

