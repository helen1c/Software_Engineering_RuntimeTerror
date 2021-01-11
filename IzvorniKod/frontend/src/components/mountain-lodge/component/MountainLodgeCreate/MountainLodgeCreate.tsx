import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from "react-select";
import {Field, Form, Formik} from "formik";
import Compress from "react-image-file-resizer";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {IconButton} from "@material-ui/core";
import {AddAPhotoOutlined} from "@material-ui/icons";
import "./MountainLodgeCreate.css";
import {HillOption} from "../../models/HillOption";
import {MountainLodgeCreateRequest} from "../../models/MountainLodgeCreateRequest";
import * as Yup from "yup";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {UtilityOption} from "../../models/UtilityOption";
import plus from "../../../../assets/blueplus.png";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props {
    hillResults: HillOption[];
    utilityResults: UtilityOption[];
}

export default function MountainLodgeCreate({hillResults, utilityResults}: Props) {

    const [newImage, setNewImage] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [success, setSuccessMessage] = React.useState(false);
    const [error, setErrorMessage] = React.useState(false);

    const successMessage = () => {
        setSuccessMessage(true);
    };
    const errorMessage = () => {
        setErrorMessage(true);
    };

    const closeSuccessMessage = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessMessage(false);
    };
    const closeErrorMessage = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorMessage(false);
    };

    // @ts-ignore
    const handleChange = e => {
        // @ts-ignore
        setSelectedOptions(Array.isArray(e) ? e.map(x => x.value) : []);
    };

    // @ts-ignore
    const create = async (request: MountainLodgeCreateRequest, {resetForm}) => {

        resetForm();
        setOpen(false);
        const sRequest = {
            name: request.name,
            elevation: request.elevation,
            hillId: request.hillId,
            utilities: selectedOptions,
            image: newImage.split(",")[1],
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
        const response = await fetch("/api/mountain-lodges/create", requestOptions);
        if ((response.status) === 201 || (response.status / 10 >= 20 && response.status / 10 < 30)) {
            successMessage();
        } else {
            errorMessage();
        }
    }

    const showImage2 = (event: any) => {
        if (!event) return;
        let file = event.target.files[0];
        console.log(file);
        Compress.imageFileResizer(
            file, 480, 480, "JPEG", 100, 0, (uri) => {
                console.log(uri)

                let reader = new FileReader();
                if (uri !== undefined)
                    reader.readAsDataURL(uri as Blob);

                reader.onload = function (newImage) {
                    setNewImage(newImage?.target?.result as string);
                };
            }, "blob"
        );
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setNewImage("");
        setOpen(false);
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Molimo Vas unesite ime planinarskog doma."),
        elevation: Yup.number().typeError("Nadmorska visina mora biti broj.").positive("Nadmorska visina mora biti pozitivan broj.").required("Molimo unesite nadmorsku visinu."),
        hillId: Yup.number().typeError("Molimo odaberite visočje.").required("Molimo odaberite visočje.")
    })

    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                <img className="path-create-img" src={plus} alt="PLus"/>
            </Button>
            <div className="fixed-div">
            <Snackbar open={success} autoHideDuration={1500} onClose={closeSuccessMessage}>
                <Alert onClose={closeSuccessMessage} severity="success">
                    Planinarski dom je uspješno stvoren.
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={2000} onClose={closeErrorMessage}>
                <Alert onClose={closeErrorMessage} severity="error">
                    Dogodila se pogreška prilikom stvaranja planinarskog doma. Pokušajte kasnije.
                </Alert>
            </Snackbar>
            </div>
            <Formik initialValues={{
                name: "",
                hillId: null,
                elevation: null
            } as MountainLodgeCreateRequest
            } onSubmit={create} onReset={handleClose}
                    validateOnBlur={true}
                    validateOnMount={true}
                    validateOnChange={true}
                    validationSchema={validationSchema}>
                {({setFieldValue, handleReset, errors, touched}) => {
                    return (
                        <Dialog open={open} onClose={() => {
                            handleClose();
                            handleReset();
                        }} aria-labelledby="form-dialog-title">
                            <Form className={"form-dialog"}>
                                <DialogTitle className={"dialog-title-lodge"} id="form-dialog-title">Stvori novi
                                    dom</DialogTitle>
                                <DialogContent>
                                    <div className="create-column">
                                        <Field className={"input-create"}
                                               placeholder={"Naziv planinarskog doma..."}
                                               name={"name"} id={"name"}/>
                                        {errors.name && touched.name ?
                                            <div className="errorText">{errors.name}</div> : <></>}
                                        <Field className={"input-create"} placeholder={"Nadmorska visina..."}
                                               name={"elevation"} id={"elevation"}/>
                                        {errors.elevation && touched.elevation ?
                                            <div className="errorText">{errors.elevation}</div> : <></>}

                                        <div className="pic">

                                            <input className={"upload-picture"}
                                                   accept={"image/*"}
                                                   id={"icon-button-file"}
                                                   type="file" multiple
                                                   onChange={(event) => {
                                                       showImage2(event)
                                                       event.target.value = ""
                                                   }}
                                            />
                                            {newImage ?
                                                <div className={"wrapper-picture"}>
                                                    <img
                                                        style={{display: "block"}}
                                                        className="profileImage"
                                                        src={newImage}
                                                        alt="Slika profila"
                                                    />
                                                    <span className={"remove-picture"}
                                                          onClick={() => setNewImage("")}><DeleteForeverIcon/></span>

                                                </div>
                                                :
                                                <>
                                                    <div className={"wrapper-picture"}>
                                                        <div className={"picture-container"}>
                                                            <label className="label-picture" htmlFor="icon-button-file">
                                                                <IconButton color="primary" aria-label="upload picture"
                                                                            component="span">
                                                                    <AddAPhotoOutlined/>
                                                                </IconButton>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                        </div>
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

                                            {errors.hillId && touched.hillId ?
                                                <div className="errorText">{errors.hillId}</div> : <></>}

                                            <Select
                                                className="utility-select"
                                                isClearable={true}
                                                isSearchable={true}
                                                placeholder="Odaberite infrastrukturu..."
                                                name={"utilities"}
                                                isMulti
                                                onChange={handleChange}
                                                options={utilityResults}>
                                            </Select>
                                        </div>
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button className="lodge-button" onClick={() => {
                                        handleClose();
                                        handleReset();
                                    }} color="primary">
                                        ODUSTANI
                                    </Button>
                                    <Button className="lodge-button" type="submit" color="primary">
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
