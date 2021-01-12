import React, {useEffect, useState} from "react";
import {MountainLodgeResult} from "../../models/MountainLodgeResult";
import "./MountainLodgeSearchResult.css"
import {Button, Dialog, DialogActions, DialogTitle} from "@material-ui/core";
import {HttpCodesUtil} from "../../../../errors/HttpCodesUtil";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "@material-ui/lab";
import Tipka from "../../../footer/components/Tipka";
import {fetcher} from "../../../../Util";

interface Props {
    result: MountainLodgeResult,
    loggedIn: boolean,
    archived: boolean
}

export const MountainLodgeSearchResult = (prop: Props) => {

    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(true);
    const [defImage] = useState(require('../../../../assets/default-ml2.jpg'));
    const [archivedS, setArchivedS] = useState(prop.archived);
    const [role,setRole] = useState("");
    const [exists, setExists] = useState(true);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("key") !== null) {
            fetcher("/api/users/user/role", {
                method: "GET"
            }).then(function (response) {
                if (response.status === 200) {
                    response.json().then((e) => {
                        setRole(e.role);
                    });
                }
            });
        }else{
            setRole("NEPRIJAVLJEN")
        }
    }, []);

    const archiveLodge = async () => {

        const requestOptions = {
            method: "PUT"
        };
        const response = await fetcher("/api/archive-lodge/user/" + prop.result.id, requestOptions);

        if (response.status === HttpCodesUtil.SUCCESS) {
            setSuccess(true);
            setArchivedS(true);
        } else {
            setError(true);
        }

    }

    const deleteLodge = async () => {
        const requestOptions = {
            method: "DELETE"
        };
        const response = await fetcher("/api/mountain-lodges/delete/" + prop.result.id, requestOptions);

        if (response.status === HttpCodesUtil.SUCCESS) {
            setExists(false);
        } else {

        }
    }

    useEffect(() => {
        setLoading(true);
        const base64Data = prop.result.image;
        if (prop.result.image)
            fetch(`data:image/jpeg;base64,${base64Data}`).then(response => response.blob()).then(resolve => {
                setImage(URL.createObjectURL(resolve));
                setLoading(false)
            });
        else setLoading(false)
    }, [setLoading, prop.result.image]);

    const utilpass = {
        1: require('../../../../assets/water.png'),
        2: require("../../../../assets/beds.png"),
        3: require("../../../../assets/wifi.png"),
        4: require("../../../../assets/restauran.png")
    } as any;


    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSuccessMessageClosing = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
    };

    const handleErrorMessageClosing = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(false);
    };

    return (
        <>{exists &&
        <>
            <Dialog
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Jeste li sigurni da želite obrisati planinarski dom: '" + prop.result.name + "'?\n Na taj način planinarski dom više neće biti vidljiv unutar aplikacije :("}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteModal(false)} color="primary">
                        Odustani
                    </Button>
                    <Button onClick={deleteLodge} color="primary" autoFocus>
                        Potvrdi
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={success} autoHideDuration={2000} onClose={handleSuccessMessageClosing}>
            <Alert onClose={handleSuccessMessageClosing} severity="success">
                Planinarski dom je uspješno arhiviran.
            </Alert>
        </Snackbar>
            <Snackbar open={error} autoHideDuration={2000} onClose={handleErrorMessageClosing}>
            <Alert onClose={handleErrorMessageClosing} severity="error">
            Dogodila se pogreška prilikom arhiviranja planinarskog doma. Pokušajte kasnije.
            </Alert>
            </Snackbar>
        {loading ? <div>Molimo pričekajte...</div> :
            <div className="mountain-lodge-cnt">
            <div className="image-util-cnt">
            <span className="mountain-lodge-name">{prop.result.name}</span>
            {prop.result.image ? <img className="mountain-lodge-picture" alt={"Slika"} src={image}/>
                : <img className="mountain-lodge-picture" alt={""} src={defImage}/>}
            {prop.result.utilities && prop.result.utilities.length > 0 &&
            <div className="mountain-lodge-utils">
                {prop.result.utilities.map(v => <img alt={""} className="util-pic" src={utilpass[v.id]}
                                                     key={v.id}/>)}
            </div>
            }
            </div>
            <div className="right-cnt">
            <div className="lodge-description-cnt">
            <span className="mountain-lodge-elevation">Visina: {prop.result.elevation}m</span>
            <span className="mountain-lodge-hill">Planina: {prop.result.hillName}</span>
            </div>
            <div className="lodge-buttons-cnt">
            {prop.loggedIn && <Button
                variant="contained"
                color="primary"
                size="medium"
                className="archive-button-lodge"
                onClick={archiveLodge}
                disabled={archivedS}>
                {archivedS ? "Arhivirano" : "Arhiviraj"}
            </Button>}
            {role === "PLANINAR" ?
                <Tipka result={prop.result.name} css={1} place={"lodge"}/>
                : <div/>
            }
            {
                role === "ADMIN" &&
                <Button variant="contained" color="primary" size="medium" onClick={() => setOpenDeleteModal(true)}>Obriši dom</Button>
            }
            </div>
            </div>
            </div>}</>}

        </>
    );
};