import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {MainReducer} from "../../../../store/reducer";
import {MyMountainPath} from "./MyMountainPath";
import {getOwnMountainPaths} from "../../../../store/actions/getAndDeleteOwnMountainPathsActions";
import "./MyMountainPaths.css";

export const MyMountainPaths = () => {

    const {ownPaths} = useSelector(((state: MainReducer) => state.getOwnMountainPathsReducer))
    const dispatcher = useDispatch();

    useEffect(() => {
        dispatcher(getOwnMountainPaths());
    }, [dispatcher])

    return (<div>
        {ownPaths && ownPaths.length > 0 ?
            <div className="my-path-title">
                <span className="my-path-name">Naziv</span>
                <span className="my-path-startpoint">Početak</span>
                <span className="my-path-endpoint">Kraj</span>
                <span className="my-path-length">Visina</span>
                <span className="my-path-dif">Težina</span>
                <span className="my-path-name-first">slika</span>
                <span className="my-path-name-first">slika</span>
            </div> :  <label className="no-paths-title">Još niste stvorili nijednu stazu.</label> }
        { ownPaths.map(p => <MyMountainPath result={p} key={p.id}/>) }

    </div>);

}