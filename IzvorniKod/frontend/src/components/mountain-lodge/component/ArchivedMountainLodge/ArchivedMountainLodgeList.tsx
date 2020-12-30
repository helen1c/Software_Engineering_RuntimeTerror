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
            <div className="lodge-archive-title">
                <span className="archive-lodge-name">Visočje</span>
                <span className="archive-lodge-name">Naziv doma</span>
                <span className="archive-lodge-name">Datum  </span>
                <span className="archive-lodge-name-first">slika</span>

            </div>
            {lodges.map(lodge => <ArchivedMountainLodge key={lodge.id} lodge={lodge}/>)}
        </>);


}

