import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select, {ValueType} from "react-select";
import {Field, Form, Formik} from "formik";
import "./MountainPathCreate.css";
import {useDispatch, useSelector} from "react-redux";
import {MainReducer} from "../../../store/reducer";
import {findHills} from "../../../store/actions/findAllHillsActions";
import {HillOption} from "../models/HillOption";
import {MountainPathCreateRequest} from "../models/MountainPathCreateRequest";
import * as Yup from "yup";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import 'semantic-ui-css/semantic.min.css'

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function MountainPathCreate() {

    const [open, setOpen] = useState(false);

    const [success, setSuccessMessage] = React.useState(false);
    const [error, setErrorMessage] = React.useState(false);

    // @ts-ignore
    const[value, setValue] = useState('10:00');


    const successMessage = () => {
        setSuccessMessage(true);
    };
    const errorMessage = () => {
        setErrorMessage(true);
    };

    const handleClose2 = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessMessage(false);
    };
    const handleClose3 = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorMessage(false);
    };

    const dispatcher = useDispatch();

    const {results: hillResults} = useSelector((state: MainReducer) => state.findAllHillsReducer);

    useEffect(() => {
        if (hillResults === undefined || hillResults.length === 0) {
            console.log("Get all Hills...");
            dispatcher(findHills());
        }
    }, [dispatcher, hillResults]);

    const create = async (request: MountainPathCreateRequest) => {

        console.log(request);

        setOpen(false);
        const sRequest = {
            name: request.name,
            startPoint: request.startPoint,
            hillId: request.hillId,
            endPoint: request.endPoint,
            avgWalkTime: request.avgWalkTime,
            length: request.length,
            seaLevelDiff: request.seaLevelDiff,
            isPrivate: request.isPrivate
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
        if((response.status) === 201 || (response.status / 10 >= 20 && response.status/10 < 30)){
            successMessage();
        } else{
            errorMessage();
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Molimo Vas unesite ime planinarske staze."),
        startPoint: Yup.string().required("Molimo Vas početnu točku planinarske staze"),
        hillId: Yup.number().typeError("Molimo odaberite visočje.").required("Molimo odaberite visočje."),
        endPoint: Yup.string().required("Molimo Vas završnu točku planinarske staze"),
        length: Yup.number().typeError("Duljina staze mora biti broj.").positive("Duljina staze mora biti pozitivan broj.").required("Molimo unesite duljinu staze."),
        seaLevelDiff: Yup.number().typeError("Visinska razlika mora biti broj.").positive("Visinska razlika mora biti pozitivan broj.").required("Molimo unesite visinsku razliku")
    })

    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                STVORI STAZU
            </Button>
            <Snackbar open={success} autoHideDuration={2000} onClose={handleClose2}>
                <Alert onClose={handleClose2} severity="success">
                    Planinarska staua je uspješno stvorena.
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={1000000} onClose={handleClose3}>
                <Alert onClose={handleClose3} severity="error">
                    Dogodila se pogreška prilikom stvaranja planinarske staze. Pokušajte kasnije.
                </Alert>
            </Snackbar>
            <Formik initialValues={{
                name: "",
                startPoint: "",
                endPoint: "",
                avgWalkTime: "",
                length: 0,
                seaLevelDiff: 0,
                isPrivate: false,
                hillId: 0,
            } as MountainPathCreateRequest
            } onSubmit={create} onReset={handleClose}
                    validateOnBlur={true}
                    validateOnMount={true}
                    validateOnChange={true}
                    validationSchema={validationSchema}>
                {({setFieldValue, handleReset, errors, touched, values}) => {
                    // @ts-ignore
                    // @ts-ignore
                    return (
                        <Dialog open={open} onClose={() => {
                            handleClose();
                            handleReset();
                        }} aria-labelledby="form-dialog-title">
                            <Form>
                                <DialogTitle className={"dialog-title"} id="form-dialog-title">Stvori novu planinarsku stazu</DialogTitle>
                                <DialogContent>
                                    <div className="create-column">
                                        <Field className={"input-search"}
                                               placeholder={"Naziv planinarske staze..."}
                                               name={"name"} id={"name"}/>
                                        {errors.name && touched.name ? <div className="errorText">{errors.name}</div> : <></>}
                                        <Field className={"input-search"}
                                               placeholder={"Naziv početne točke..."}
                                               name={"startPoint"} id={"startPoint"}/>
                                        {errors.startPoint && touched.startPoint ? <div className="errorText">{errors.startPoint}</div> : <></>}
                                        <Field className={"input-search"}
                                               placeholder={"Naziv završne točke..."}
                                               name={"endPoint"} id={"endPoint"}/>
                                        {errors.endPoint && touched.endPoint ? <div className="errorText">{errors.endPoint}</div> : <></>}
                                        <Field className={"input-search"}
                                               placeholder={"Duljina staze..."}
                                               name={"length"} id={"length"}/>
                                        {errors.length && touched.length ? <div className="errorText">{errors.length}</div> : <></>}
                                        <Field className={"input-search"} placeholder={"Visinska razlika..."}
                                               name={"seaLevelDiff"} id={"seaLevelDiff"}/>
                                        {errors.seaLevelDiff && touched.seaLevelDiff ? <div className="errorText">{errors.seaLevelDiff}</div> : <></>}

                                        <div className="checkbox__cnt">
                                       <label htmlFor="isPrivate" className="checkbox-label">Želite da staza bude privatna?</label>
                                            <Field type="checkbox" name="isPrivate" className="checkbox"/>
                                        </div>
                                        <div className="lodge-create-selects">
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

                                            {errors.hillId && touched.hillId ? <div className="errorText">{errors.hillId}</div> : <></>}
                                        </div>
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => {
                                        handleClose();
                                        handleReset();
                                    }} color="primary">
                                        ODUSTANI
                                    </Button>
                                    <Button type="submit"
                                            color="primary">
                                        STVORI
                                    </Button>
                                </DialogActions>
                            </Form>
                        </Dialog>
                    );
                }}
            </Formik>
        </>
    );
}

