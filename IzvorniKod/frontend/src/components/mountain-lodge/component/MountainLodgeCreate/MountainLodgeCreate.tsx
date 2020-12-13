import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select, {ValueType} from "react-select";
import {Field, Form, Formik, useFormik} from "formik";
import Compress from "react-image-file-resizer";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {IconButton} from "@material-ui/core";
import {AddAPhotoOutlined} from "@material-ui/icons";
import "./MountainLodgeCreate.css";
import {useDispatch, useSelector} from "react-redux";
import {MainReducer} from "../../../../store/reducer";
import {findHills} from "../../../../store/actions/findAllHillsActions";
import {findUtilities} from "../../../../store/actions/findAllUtilitiesActions";
import {HillOption} from "../../models/HillOption";
import {MountainLodgeCreateRequest} from "../../models/MountainLodgeCreateRequest";
import * as Yup from "yup";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

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

export default function MountainLodgeCreate() {

    const [newImage, setNewImage] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const classes = useStyles();
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);

    const handleClick = () => {
        setOpen2(true);
    };
    const handleClick2 = () => {
        setOpen3(true);
    };

    const handleClose2 = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen2(false);
    };
    const handleClose3 = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen3(false);
    };

    const dispatcher = useDispatch();

    // @ts-ignore
    const handleChange = e => {
        // @ts-ignore
        setSelectedOptions(Array.isArray(e) ? e.map(x => x.value) : []);
    };

    const {results: hillResults} = useSelector((state: MainReducer) => state.findAllHillsReducer);
    const {results: utilityResults} = useSelector((state: MainReducer) => state.findAllUtilitiesReducer);

    useEffect(() => {
        if (hillResults === undefined || hillResults.length === 0) {
            console.log("Get all Hills...");
            dispatcher(findHills());
        }
    }, [dispatcher, hillResults]);

    useEffect(() => {
        if (utilityResults === undefined || utilityResults.length === 0) {
            console.log("Get all Utilities...");
            dispatcher(findUtilities());
        }
    }, [dispatcher, utilityResults]);

    const create = async (request: MountainLodgeCreateRequest) => {
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
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        };
        const response = await fetch("/api/mountain-lodges/create", requestOptions);
        if((response.status) === 201){
            handleClick();
        } else{
            handleClick2();
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
        setOpen(false);
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Molimo Vas unesite ime planinarskog doma."),
        elevation: Yup.number().required("Molimo unesite nadmorsku visinu."),
        // hillId: Yup.object().nullable().required("Molimo odaberite visočje.")
    })

    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                STVORI DOM
            </Button>
            <Snackbar open={open2} autoHideDuration={2000} onClose={handleClose2}>
                <Alert onClose={handleClose2} severity="success">
                    This is a success message!
                </Alert>
            </Snackbar>
            <Snackbar open={open3} autoHideDuration={2000} onClose={handleClose3}>
                <Alert onClose={handleClose3} severity="error">
                    This is an error message!
                </Alert>
            </Snackbar>
            <Formik initialValues={{
                name: "",
            } as MountainLodgeCreateRequest
            } onSubmit={create}
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
                            <Form>
                                <DialogTitle id="form-dialog-title">Stvori novi dom</DialogTitle>
                                <DialogContent>
                                    <div className="create-column">
                                        <Field className={"input-search"}
                                               placeholder={"Naziv planinarskog doma..."}
                                               name={"name"} id={"name"}/>
                                        {errors.name && touched.name ? <div className="errorText">{errors.name}</div> : <></>}
                                        <Field className={"input-search"} placeholder={"Nadmorska visina..."}
                                               name={"elevation"} id={"elevation"}/>
                                        {errors.elevation && touched.elevation ? <div className="errorText">{errors.elevation}</div> : <></>}

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

                                        {/*// {errors.hillId && touched.hillId ? <div className="error-input">{errors.hillId}</div> : <></>}*/}

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

                                    <div className="create-column">

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
                                                        <label htmlFor="icon-button-file">
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