import React, {useState} from "react";
import {MountainPathResult} from "../../models/MountainPathResult";
import "./MountainPathSearchResult.css"
import goimg from "../../../../assets/go.png";
import finish from "../../../../assets/finish_flag-512.png"
import dots from "../../../../assets/dots.png";
import elevation from "../../../../assets/Snowy_Mountain_Transparent_PNG_Clip_Art_Image.png";
import {Button} from "@material-ui/core";
import {HttpCodesUtil} from "../../../../errors/HttpCodesUtil";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import green from "@material-ui/core/colors/green";
import {ThemeProvider} from "@material-ui/core/styles"

interface Props {
    result: MountainPathResult,
    loggedIn: boolean,
    archived: boolean
}

export const MountainPathSearchResult = (prop: Props) => {

    const [expand, setExpand] = useState<boolean>(false);

    const mapdiff = () => {
        if(prop.result.difficulty <= 3) {
            return "Lagano";
        } else if(prop.result.difficulty >= 7) {
            return "Teško";
        } else {
            return "Srednje";
        }
    }

    const [archivedS, setArchivedS] = useState(prop.archived);

    const archivePath = async () => {

        const requestOptions = {
            method: "PUT",
            headers: {
                authorization: sessionStorage.getItem("key") || "",
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        };
        const response = await fetch("/api/archive-path/user/" + prop.result.id, requestOptions);

        if(response.status === HttpCodesUtil.SUCCESS) {
            console.log("Sve uspjesno arhivirano")
            setArchivedS(true);
        } else if(response.status === HttpCodesUtil.FORBIDDEN) {
            console.log("Neispravan token");
        } else if(response.status === HttpCodesUtil.BAD_REQUEST) {
            console.log("Već postoji u vašoj arhivi.")
        }

    }

    const theme = createMuiTheme({
        palette: {
            primary: green,
        },
    });

    return (
        <>
            {!expand ?
            <div onClick={() => setExpand(true)} className="mountain-path-cnt">
                    <span className="mountain-path-name">{prop.result.name}</span>
                <span className="mountain-path-hillname"> {prop.result.hill}</span>
                <span className="mountain-path-walktime"> {prop.result.avgWalkTime}</span>
                <span className="mountain-path-difficulty"> {mapdiff()}</span>
            </div>
            :
            <div className="mountain-path-cnt-expand">
                <div className="mountain-path-main-info" onClick={() =>setExpand(false)}>
                <span className="mountain-path-name-expand">{prop.result.name}</span>
                <span className="mountain-path-hillname-expand"> {prop.result.hill}</span>
                <span className="mountain-path-walktime-expand"> {prop.result.avgWalkTime}</span>
                <span className="mountain-path-difficulty-expand"> {mapdiff()}</span>
                </div>
                <div className="mountain-path-extend-info">
                    <div className="mountain-path-cnt-mini">
                        <span className="mountain-path-length">Duljina: {prop.result.length}m</span>
                        {prop.result.seaLevelDiff && <span className="mountain-path-elevation">Razlika u nadmorskoj visini: {prop.result.seaLevelDiff}m</span>}
                        <img className="mini-image-2" alt="GO" src={elevation}/>
                    </div>
                    <div className="mountain-path-cnt-mini">
                        <fieldset> <legend>Plan puta</legend>
                        <img className="mini-image" alt="GO" src={goimg}/>
                        <span className="mountain-path-startpoint">{prop.result.startPoint}</span>
                        <img className="mini-image" alt="Dots" src={dots}/>
                        <span className="mountain-path-endpoint">{prop.result.endPoint}</span>
                        <img className="mini-image" alt="Finish" src={finish}/>
                        </fieldset>
                    </div>
                    <div className="archive-cnt">
                    <div className="mountain-path-cnt-mini">
                        <span className="mountain-path-datecreated">Datum stvaranja: {prop.result.dateCreated}</span>
                    </div>
                    {prop.loggedIn &&
                    <ThemeProvider theme={theme}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className="archive-button"
                        onClick={archivePath}
                        disabled={archivedS}>
                        {archivedS ? "Arhivirano" : "Arhiviraj"}
                    </Button>
                    </ThemeProvider>}
                    </div>

                </div>
            </div>
        }</>

    );
};