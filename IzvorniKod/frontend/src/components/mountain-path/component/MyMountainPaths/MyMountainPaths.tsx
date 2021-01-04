import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {MainReducer} from "../../../../store/reducer";
import {MyMountainPath} from "./MyMountainPath";
import {getOwnMountainPaths} from "../../../../store/actions/getAndDeleteOwnMountainPathsActions";

export const MyMountainPaths = () => {

    const {ownPaths} = useSelector(((state: MainReducer) => state.getOwnMountainPathsReducer))
    const dispatcher = useDispatch();

    useEffect(() => {
        dispatcher(getOwnMountainPaths());
    }, [dispatcher])

    return (<div>
        {ownPaths && ownPaths.length > 0 ?
                ownPaths.map(p => <MyMountainPath result={p} key={p.id}/>) :
                <label className="no-paths-title">Još niste stvorili nijednu stazu.</label>}
    </div>);

}