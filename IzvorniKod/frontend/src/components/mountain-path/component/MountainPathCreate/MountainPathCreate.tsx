import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from "react-select";
import {Field, Form, Formik} from "formik";
import "./MountainPathCreate.css";
import {useDispatch, useSelector} from "react-redux";
import {MainReducer} from "../../../../store/reducer";
import {findHills} from "../../../../store/actions/findAllHillsActions";
import {HillOption} from "../../models/HillOption";
import {MountainPathCreateRequest} from "../../models/MountainPathCreateRequest";
import * as Yup from "yup";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import 'semantic-ui-css/semantic.min.css'
import TimePicker, {TimePickerValue} from "react-time-picker";
import {HttpCodesUtil} from "../../../../errors/HttpCodesUtil";
import plus from "../../../../assets/plus.png";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MountainPathCreate() {


    const [open, setOpen] = useState(false);

    const [success, setSuccessMessage] = React.useState(false);
    const [error, setErrorMessage] = React.useState(false);
    const [timePicker, setTimePicker] = useState<TimePickerValue>("00:00:00");

    const successMessage = () => {
        setSuccessMessage(true);
    };
    const errorMessage = () => {
        setErrorMessage(true);
    };

    const DEFAULT_TIME_PICKER_VALUE = "00:00:00";

    const onCloseSuccess = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessMessage(false);
    };
    const onCloseError = (event?: React.SyntheticEvent, reason?: string) => {
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


    // @ts-ignore
    const create = async (request: MountainPathCreateRequest, {resetForm }) => {

        let sRequest = {};

        if(timePicker === null) {
            sRequest = {...sRequest, avgWalkTime: DEFAULT_TIME_PICKER_VALUE};
        } else {
            sRequest = {...sRequest, avgWalkTime: timePicker};
        }

        sRequest = {...sRequest,
            name: request.name,
            startPoint: request.startPoint,
            hillId: request.hillId,
            endPoint: request.endPoint,
            length: request.length,
            seaLevelDiff: request.seaLevelDiff,
            isPrivate: request.isPrivate,
            difficulty: request.difficulty
        };

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(sRequest),
            headers: {
                authorization: sessionStorage.getItem("key") || "",
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        };
        const response = await fetch("/api/mountain-paths/create", requestOptions);
        if((response.status) === HttpCodesUtil.CREATED || (response.status / 10 >= 20 && response.status/10 < 30)){
            setOpen(false);
            resetForm();
            setTimePicker(DEFAULT_TIME_PICKER_VALUE);
            setAlreadyExists(false);
            successMessage();
        } else{
            if(response.status === HttpCodesUtil.BAD_REQUEST) {
                setAlreadyExists(true);
            } else {
                setAlreadyExists(false);
                resetForm();
                setOpen(false);
                errorMessage();
            }

        }
    }

    const [alreadyExists, setAlreadyExists] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setAlreadyExists(false);
        setOpen(false);
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Molimo Vas unesite ime planinarske staze."),
        startPoint: Yup.string().required("Molimo Vas početnu točku planinarske staze"),
        hillId: Yup.number().typeError("Molimo odaberite visočje.").required("Molimo odaberite visočje."),
        endPoint: Yup.string().required("Molimo Vas završnu točku planinarske staze"),
        length: Yup.number().typeError("Duljina staze mora biti broj.").positive("Duljina staze mora biti pozitivan broj.").required("Molimo unesite duljinu staze."),
        seaLevelDiff: Yup.number().typeError("Visinska razlika mora biti broj.").positive("Visinska razlika mora biti pozitivan broj."),
        difficulty: Yup.number().typeError("Težina staze mora biti broj.").min(1, "Najmanja zahtjevnost staze je 1.").max(10, "Najveća zahtjevnost staze je 10."),
    })

    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                <img  className="path-create-img" src={plus} alt ="PLus"/>
            </Button>
            <div className={"snackbar-div"}>
            <Snackbar open={success} autoHideDuration={1300} onClose={onCloseSuccess}>
                <Alert onClose={onCloseSuccess} severity="success">
                    Planinarska staza je uspješno stvorena.
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={1500} onClose={onCloseError}>
                <Alert onClose={onCloseError} severity="error">
                    Dogodila se pogreška prilikom stvaranja planinarske staze. Pokušajte kasnije.
                </Alert>
            </Snackbar>
            </div>
            <Formik initialValues={{
                name: "",
                startPoint: "",
                endPoint: "",
                avgWalkTime: "",
                length: null,
                seaLevelDiff: null,
                isPrivate: false,
                hillId: null,
                difficulty:null
            } as MountainPathCreateRequest
            } onSubmit={create} onReset={handleClose}
                    validateOnBlur={false}
                    validateOnMount={false}
                    validateOnChange={true}
                    validationSchema={validationSchema}>
                {({setFieldValue, handleReset, errors, touched, handleChange}) => {
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
                                               placeholder={"Naziv planinarske staze.."}
                                               name={"name"} id={"name"}
                                               onChange={handleChange}

                                        />
                                        {errors.name && touched.name ? <div className="errorText">{errors.name}</div> : <></>}
                                        {alreadyExists && <div className="errorText">Naziv staze već postoji, pokušajte ponovno.</div>}

                                        <Field className={"input-search"}
                                               placeholder={"Naziv početne točke.."}
                                               name={"startPoint"} id={"startPoint"}/>
                                        {errors.startPoint && touched.startPoint ? <div className="errorText">{errors.startPoint}</div> : <></>}
                                        <Field className={"input-search"}
                                               placeholder={"Naziv završne točke.."}
                                               name={"endPoint"} id={"endPoint"}/>
                                        {errors.endPoint && touched.endPoint ? <div className="errorText">{errors.endPoint}</div> : <></>}
                                        <Field  type="number" className={"input-number"} placeholder={"Visinska razlika u metrima.."}
                                               name={"seaLevelDiff"} id={"seaLevelDiff"}/>
                                        {errors.seaLevelDiff && touched.seaLevelDiff ? <div className="errorText">{errors.seaLevelDiff}</div> : <></>}
                                        <Field type="number" className={"input-number"}
                                               placeholder={"Duljina staze u metrima .."}
                                               name={"length"} id={"length"}/>
                                        {errors.length && touched.length ? <div className="errorText">{errors.length}</div> : <></>}
                                        <Field type="number" className={"input-number"}
                                               placeholder={"Zahtjevnost staze 1-10"}
                                               name={"difficulty"} id={"difficulty"}/>
                                        {errors.difficulty && touched.difficulty ? <div className="errorText">{errors.difficulty}</div> : <></>}

                                        <div className="checkbox__cnt">
                                        <label htmlFor="isPrivate" className="checkbox-label">Želite da staza bude privatna?</label>
                                            <Field type="checkbox" name="isPrivate" className="checkbox"/>

                                        </div>

                                        <div className={"checkbox__cnt"}>
                                            <label className={"checkbox-label"} htmlFor={"avgWalkTime"}>Prosječno trajanje: </label>
                                        <TimePicker value={timePicker} minutePlaceholder={"mm"} hourPlaceholder={"hh"} secondPlaceholder={"ss"}
                                                    clearIcon={undefined}
                                                    disableClock
                                                    name="avgWalkTime"
                                                    format={"HH:mm:ss"}
                                                    maxDetail={"second"}
                                                    onChange={(value) => {
                                            setTimePicker(value);
                                        }}/>

                                        </div>
                                        {timePicker === null && <div className={"errorText"}>Molimo unesite prosječno trajanje...</div>}
                                        <div className="lodge-create-selects">
                                            <Select
                                                className="hill-select"
                                                isClearable={true}
                                                isSearchable={true}
                                                placeholder="Odaberite područje..."
                                                name={"hillId"}
                                                onChange={(option) => setFieldValue("hillId",
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

