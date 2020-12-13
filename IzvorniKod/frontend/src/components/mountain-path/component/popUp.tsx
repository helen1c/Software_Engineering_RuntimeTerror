import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select, {ValueType} from "react-select";
import {Field, Form, Formik, useFormik} from "formik";
import "./popUp.css";
import {useDispatch, useSelector} from "react-redux";
import {MainReducer} from "../../../store/reducer";
import {findHills} from "../../../store/actions/findAllHillsActions";
import {HillOption} from "../models/HillOption";
import {MountainPathCreateRequest} from "../models/MountainPathCreateRequest";

export default function FormDialog() {

    const [newImage, setNewImage] = useState("");

    const dispatcher = useDispatch();
    const [selectedOptions, setSelectedOptions] = useState([]);

    // @ts-ignore
    const handleChange = e => {
        // @ts-ignore
        setSelectedOptions(Array.isArray(e) ? e.map(x => x.value) : []);
    };

    const {results: hillResults} = useSelector((state: MainReducer) => state.findAllHillsReducer);

    useEffect(() => {
        if (hillResults === undefined || hillResults.length === 0) {
            console.log("Get all Hills...");
            dispatcher(findHills());
        }
    }, [dispatcher, hillResults]);


    const create = async (request: MountainPathCreateRequest) => {
        setOpen(false);
        const sRequest = {
            name: request.name,
            startPoint: request.startPoint,
            hillId: request.hillId,
            endPoint: request.endPoint,
            avgWalkTime: request.avgWalkTime,
            length: request.length,
            seaLevelDiff: request.seaLevelDiff,
            dateCreated: request.dateCreated,
            isPrivate: request.isPrivate,
            authorId: request.authorId
        };

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(sRequest),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        };

        const response = await fetch("/api/mountain-paths/create", requestOptions);
        const json = await response.json();
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setNewImage("");
        setSelectedOptions([]);
    };

    const handleClose = () => {

        setOpen(false);
    };

    return (
        <>
            <div className="search-form">
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    STVORI PLANINARSKU STAZU
                </Button>
                <Formik initialValues={{
                    name: "",
                } as MountainPathCreateRequest
                } onSubmit={create}>
                    {({setFieldValue}) => {
                        return (
                            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                <Form>
                                    <DialogTitle id="form-dialog-title">Stvori novu planinarsku stazu</DialogTitle>
                                    <DialogContent>
                                        <div className="create-column">
                                            <div className="inputComponent textAlignLeft">
                                                <Field className={"input-search"} placeholder={"Naziv planinarske staze..."}
                                                       name={"name"} id={"name"}/>
                                            </div>
                                            <div className="inputComponent textAlignLeft">
                                                <Field className={"input-search"} placeholder={"Početna točka..."}
                                                       name={"startPoint"} id={"startPoint"}/>
                                            </div>
                                            <div className="inputComponent textAlignLeft">
                                                <Field className={"input-search"} placeholder={"Završna točka..."}
                                                       name={"endPoint"} id={"endPoint"}/>
                                            </div>
                                            <div className="inputComponent textAlignLeft">
                                                <Field className={"input-search"} placeholder={"Prosječno vrijeme potrebno za prehodati..."}
                                                       name={"avgWalkTime"} id={"avgWalkTime"}/>
                                            </div>
                                            <div className="inputComponent textAlignLeft">
                                                <Field className={"input-search"} placeholder={"Dužina staze..."}
                                                       name={"length"} id={"length"}/>
                                            </div>
                                            <div className="inputComponent textAlignLeft">
                                                <Field className={"input-search"} placeholder={"Razlika nadmorske visine između početka i kraja..."}
                                                       name={"seaLevelDiff"} id={"seaLevelDiff"}/>
                                            </div>
                                            <div className="inputComponent textAlignLeft">
                                                <Field className={"input-search"} placeholder={"Datum stvaranja..."}
                                                       name={"dateCreated"} id={"dateCreated"}/>
                                            </div>
                                            <div className="inputComponent textAlignLeft">
                                                <Field className={"input-search"} placeholder={"Privatno..."}
                                                       name={"isPrivate"} id={"isPrivate"}/>
                                            </div>
                                            <div className="inputComponent textAlignLeft">
                                                <Field className={"input-search"} placeholder={""}
                                                       name={"authorId"} id={"authorId"}/>
                                            </div>
                                        </div>

                                        <Select
                                            className="hill-select"
                                            isClearable={true}
                                            isSearchable={true}
                                            placeholder="Odaberite područje..."
                                            name={"hillId"}
                                            onChange={(option: ValueType<HillOption>) => setFieldValue("hillId",
                                                option === null ? null : (option as HillOption).value)
                                            }
                                            options={hillResults}>
                                        </Select>

                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            ODUSTANI
                                        </Button>
                                        <Button type="submit" color="primary">
                                            STVORI
                                        </Button>
                                    </DialogActions>
                                </Form>
                            </Dialog>
                        );
                    }}
                </Formik>
            </div>
        </>
    );
}
