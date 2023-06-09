import React, {useState} from 'react';
import "./Tipka.css";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {MessageForm} from "../models/MessageForm";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
interface Props {
    result: String;
    css: number;
    place: string
}

export const Tipka = (prop : Props) =>{

    const [open, setOpen] = useState(false);
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
    const send = async (request: MessageForm,  {resetForm }) => {

        resetForm();
        setOpen(false);
        const sRequest = {
            name: request.name,
            content: request.content,
            status: "PENDING",
            error: prop.result
        };
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(sRequest),
            headers: {
                Accept: "application/json",
                authorization: sessionStorage.getItem("key") || "",
                "Content-Type": "application/json"
            }
        };
        const response = await fetch("/api/messages/send", requestOptions);
        if ((response.status) === 201 || (response.status / 10 >= 20 && response.status / 10 < 30)) {
            successMessage();
        } else {
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
        name: Yup.string().required("Molimo Vas unesite opis poruke."),
        content: Yup.string().required("Molimo Vas unesite sadrzaj poruke."),
    })

    const getTitle = () => {
        if(prop.place === "footer") {
            return "Kontaktirajte administratora..."
        } else if (prop.place === "lodge") {
            return "Prijavljujete grešku za dom: " + prop.result;
        } else if(prop.place === "path") {
            return "Prijavljujete grešku za stazu: " + prop.result;
        }
    }

    return(
        <>
            {prop.css === 1 ?
                <button className="button-mountain-lodge-er" onClick={handleClickOpen}>{prop.place === "footer" ? "Kontaktirajte nas" : "Prijavi pogrešku"}</button>
                : <Button className="button-mountain-path" onClick={handleClickOpen}>{prop.place === "footer" ? "Kontaktirajte nas" : "Prijavi pogrešku"}</Button>
            }
            <Snackbar open={success} autoHideDuration={2000} onClose={closeSuccessMessage}>
                <Alert onClose={closeSuccessMessage} severity="success">
                    Poruka je uspješno poslana.
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={2000} onClose={closeErrorMessage}>
                <Alert onClose={closeErrorMessage} severity="error">
                    Dogodila se pogreška prilikom slanja poruke. Pokušajte kasnije.
                </Alert>
            </Snackbar>

            <Formik initialValues={{
                name: "",
                content: "",
            } as MessageForm
            } onSubmit={send} onReset={handleClose}
                    validateOnBlur={true}
                    validateOnMount={true}
                    validateOnChange={true}
                    validationSchema={validationSchema}>
                {({handleReset, errors, touched}) => {
                    return (
                        <Dialog open={open} onClose={() => {
                            handleClose();
                            handleReset();
                        }} aria-labelledby="form-dialog-title">
                            <Form className={"form-dialog"}>
                                <DialogTitle className={"dialog-title"} id="form-dialog-title">{getTitle()}</DialogTitle>
                                <DialogContent>
                                    <div className="create-column">
                                        <div className="box-title">Predmet poruke:</div>
                                        <Field className={"message-title"}
                                               name={"name"} id={"name"}/>
                                        {errors.name && touched.name ?
                                            <div className="errorText">{errors.name}</div> : <></>}
                                        <div className="box-title">Sadržaj poruke:</div>
                                        <Field as={"textarea"} className={"message-content"}
                                                  name={"content"} id={"content"}/>
                                        {errors.content && touched.content ?
                                            <div className="errorText">{errors.content}</div> : <></>}
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => {
                                        handleClose();
                                        handleReset();
                                    }} color="primary">
                                        ODUSTANI
                                    </Button>
                                    <Button type="submit" color="primary">
                                        POŠALJI
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
export default Tipka;