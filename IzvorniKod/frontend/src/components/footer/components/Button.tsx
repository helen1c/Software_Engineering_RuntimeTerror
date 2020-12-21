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
            sadrzaj: request.sadrzaj,
        };
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Molimo Vas unesite opis poruke."),
        sadrzaj: Yup.string().required("Molimo Vas unesite sadrzaj poruke."),
    })

    return(
        <>
            <button onClick={handleClickOpen}>Kontaktiraj Administratora</button>

            <Formik initialValues={{
                name: "",
                sadrzaj: "",
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
                                        <textarea className={"message-content"}
                                                  name={"sadrzaj"} id={"sadrzaj"}/>
                                        {errors.sadrzaj && touched.sadrzaj ?
                                            <div className="errorText">{errors.sadrzaj}</div> : <></>}
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