import React, {useState} from "react";
import {MyMountainPathResult} from "../../models/MyMountainPathResult";
import "./MyMountainPath.css"
import {FormControlLabel} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import opened from "../../../../assets/open-lock.png"
import {useDispatch} from "react-redux";
import {dispatchDeleteOwnMountainPath} from "../../../../store/actions/getAndDeleteOwnMountainPathsActions";

interface Props {
    result: MyMountainPathResult
}

export const MyMountainPath = ({result}: Props) => {

    const [pathPrivate, setPathPrivate] = useState(result.isPrivate);
    const dispatch = useDispatch();

    const deleteMountainPath = () => {
        dispatch(dispatchDeleteOwnMountainPath(result.id));
    }

    const makePathPublic = async () => {

        const requestOptions = {
            method: "PATCH",
            headers: {
                authorization: sessionStorage.getItem("key") || "",
                Accept: "application/json"
            }
        };

        if (result.isPrivate) {
            const response = await fetch("/api/mountain-paths/update-private/" + result.id, requestOptions);
            const message = await response.text()
            console.log(message);
            if (response.status === 200) {
                setPathPrivate(false);
            } else {
                //pogreška...
            }

        }

    }

    return (
        <div className="my-path__cnt">
            <span className="my-path-name">{result.name}</span>
            <span className="my-path-startpoint">{result.startPoint}</span>
            <span className="my-path-endpoint">{result.endPoint}</span>
            <span className="my-path-length">{result.length}</span>
            <span className="my-path-difficulty">{result.difficulty}</span>
            <FormControlLabel control={
                <Switch color={"primary"} checked={!pathPrivate} disabled={!pathPrivate} onChange={makePathPublic}/>}
                              label={<img className={"open-lock-picture"} src={opened}/>}/>


            <button className="delete-mountain-path"
                    disabled={!pathPrivate}
                    onClick={deleteMountainPath}>Obriši stazu
            </button>
        </div>
    );

}