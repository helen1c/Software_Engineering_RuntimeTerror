import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {MainReducer} from "../../../../store/reducer";
import {ArchivedMountainLodge} from "./ArchivedMountainLodge";
import {findArchivedLodges} from "../../../../store/actions/findAllArchivedLodgesActions";

export const ArchivedMountainLodgeList = () => {

    const {lodges} = useSelector((state: MainReducer) => state.findAllArchivedLodgesReducer);

    const dispatcher = useDispatch();

    useEffect(() => {
        if(!lodges)
            dispatcher(findArchivedLodges());
        if(lodges.length === 0) {
            dispatcher(findArchivedLodges());
        }
    }, [dispatcher, lodges])

    return (
        <>
            {lodges.map(lodge => <ArchivedMountainLodge key={lodge.id} lodge={lodge}/>)}
        </>);


}

