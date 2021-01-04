import React, {useState} from "react";
import {MyMountainPathResult} from "../../models/MyMountainPathResult";
import "./MyMountainPath.css"
import {Button, Dialog, DialogActions, DialogTitle, FormControlLabel} from "@material-ui/core";
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
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

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
                              label={<img alt={""} className={"open-lock-picture"} src={opened}/>}/>


            <button className="delete-mountain-path"
                    disabled={!pathPrivate}
                    onClick={() => setOpenDeleteModal(true)}>Obriši stazu
            </button>
            <Dialog
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Jeste li sigurni da želite obrisati planinarsku stazu: '" + result.name + "'?\n Na taj način planinarska staza više neće biti vidljiva unutar aplikacije :("}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteModal(false)} color="primary">
                        Odustani
                    </Button>
                    <Button onClick={deleteMountainPath} color="primary" autoFocus>
                        Potvrdi
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}