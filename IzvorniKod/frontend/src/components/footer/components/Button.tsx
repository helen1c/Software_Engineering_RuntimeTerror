import React, {useState} from 'react';
import "./Button.css";
import {Field, Form, Formik, useFormik} from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {MessageForm} from "../models/MessageForm";

function Tipka() {

    const [open, setOpen] = useState(false);

    // @ts-ignore
    const handleChange = e => {
        // @ts-ignore
        setSelectedOptions(Array.isArray(e) ? e.map(x => x.value) : []);
    };

    // @ts-ignore
    const send = async (request: MessageForm,  {resetForm }) => {

        resetForm();
        setOpen(false);
        const sRequest = {
            name: request.name,
            content: request.content,
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

    return(
        <>
            <button onClick={handleClickOpen}>Kontaktiraj Administratora</button>

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
                                <DialogTitle className={"dialog-title"} id="form-dialog-title">Kontaktirajte
                                    administartora!</DialogTitle>
                                <DialogContent>
                                    <div className="create-column">
                                        <div className="box-title">Naziv poruke:</div>
                                        <Field className={"message-title"}
                                               name={"name"} id={"name"}/>
                                        {errors.name && touched.name ?
                                            <div className="errorText">{errors.name}</div> : <></>}
                                        <div className="box-title">Sadrzaj poruke:</div>
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
                                        POSALJI
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