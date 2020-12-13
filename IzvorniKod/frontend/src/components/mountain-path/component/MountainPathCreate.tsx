import React, {useState} from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import {HttpCodesUtil} from "../../../errors/HttpCodesUtil";
import "./MountainPathCreate.css";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        formControl: {
            margin: theme.spacing(3),
        },
    }),
);

export const MountainPathCreate = () => {
    const [newImage, setNewImage] = useState("");

    const formik = useFormik({
        initialValues: {
            name: "",
            startPoint: "",
            endPoint: "",
            avgWalkTime: "",
            length: "",
            seaLevelDiff: "",
            dateCreated: "",
            isPrivate: "",
            hillId: "",
            authorId: ""
        },
        validateOnChange: false,
        validateOnMount: false,
        validateOnBlur: false,
        validationSchema: Yup.object({
            name: Yup.string().required("Obavezan unos!"),
        }),
        onSubmit: (values) => {
            values.hillId = "1";

            fetch("/api/mountain-paths/create", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                if (response.status !== HttpCodesUtil.CREATED) {
                    response.text().then((errors) => {
                        errors = JSON.parse(errors);
                        Object.values(errors).forEach((value) => {
                            const error = JSON.parse(JSON.stringify(value));
                            formik.setFieldError(error.fieldName, error.message);
                        });
                    });
                } else {
                    console.log("Planinarska staza uspjesno stvorena...")
                }
            });
        },
    });


    const showImage = (event: any) => {


        if (!event) return;
        let file = event.target.files[0];

        let reader = new FileReader();
        reader.onload = function (newImage) {

            setNewImage(newImage?.target?.result as string);
            console.log(newImage)
        };
        if (file !== undefined)
            reader.readAsDataURL(file);
    };


    return (
        <div className="createForm">
            <form onSubmit={formik.handleSubmit}>
                <h1>Dodaj Planinarsku stazu</h1>
                <div className="create-container">
                    <div className="create-column">
                        <div className="inputComponent textAlignLeft">
                            <p className={"inputLabel"}>Naziv staze:</p>
                            <input
                                id="name"
                                className="create-input"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                            <p className="errorText">
                                {formik.errors.name ? formik.errors.name : null}
                            </p>
                        </div>

                        <div className="inputComponent textAlignLeft">
                            <p className={"inputLabel"}>Planina:</p>
                            <input
                                className={"create-input"}
                                id="hillId"
                                value={formik.values.hillId}
                                onChange={formik.handleChange}
                            />
                            <p className="errorText">
                                {formik.errors.hillId ? formik.errors.hillId : null}
                            </p>
                        </div>
                        <div className="inputComponent textAlignLeft">
                            <p className={"inputLabel"}>Početna točka:</p>
                            <input
                                className="create-input"
                                id="startPoint"
                                value={formik.values.startPoint}
                                onChange={formik.handleChange}
                            />
                            <p className="errorText">
                                {formik.errors.startPoint ? formik.errors.startPoint : null}
                            </p>
                        </div>
                        <div className="inputComponent textAlignLeft">
                            <p className={"inputLabel"}>Završna točka:</p>
                            <input
                                className="create-input"
                                id="endPoint"
                                value={formik.values.endPoint}
                                onChange={formik.handleChange}
                            />
                            <p className="errorText">
                                {formik.errors.startPoint ? formik.errors.endPoint : null}
                            </p>
                        </div>
                        <div className="inputComponent textAlignLeft">
                            <p className={"inputLabel"}>Prosječno vrijeme za šetnju:</p>
                            <input
                                className="create-input"
                                id="avgWalkTime"
                                value={formik.values.avgWalkTime}
                                onChange={formik.handleChange}
                            />
                            <p className="errorText">
                                {formik.errors.avgWalkTime ? formik.errors.avgWalkTime : null}
                            </p>
                        </div>
                        <div className="inputComponent textAlignLeft">
                            <p className={"inputLabel"}>Duljina staze</p>
                            <input
                                className="create-input"
                                id="length"
                                value={formik.values.length}
                                onChange={formik.handleChange}
                            />
                            <p className="errorText">
                                {formik.errors.length ? formik.errors.length : null}
                            </p>
                        </div>
                        <div className="inputComponent textAlignLeft">
                            <p className={"inputLabel"}>Razlika u nadmorskoj visini</p>
                            <input
                                className="create-input"
                                id="seaLevelDiff"
                                value={formik.values.seaLevelDiff}
                                onChange={formik.handleChange}
                            />
                            <p className="errorText">
                                {formik.errors.seaLevelDiff ? formik.errors.seaLevelDiff : null}
                            </p>
                        </div>
                        <div className="inputComponent textAlignLeft">
                            <p className={"inputLabel"}>Datum stvaranja</p>
                            <input
                                className="create-input"
                                id="dateCreated"
                                value={formik.values.dateCreated}
                                onChange={formik.handleChange}
                            />
                            <p className="errorText">
                                {formik.errors.dateCreated ? formik.errors.dateCreated : null}
                            </p>
                        </div>
                        <div className="inputComponent textAlignLeft">
                            <p className={"inputLabel"}>Je li staza privatna</p>
                            <input
                                className="create-input"
                                id="isPrivate"
                                value={formik.values.isPrivate}
                                onChange={formik.handleChange}
                            />
                            <p className="errorText">
                                {formik.errors.isPrivate ? formik.errors.isPrivate : null}
                            </p>
                        </div>
                        <div className="inputComponent textAlignLeft">
                            <input
                                className={"create-input"}
                                id="authorId"
                                value={formik.values.authorId}
                                onChange={formik.handleChange}
                            />
                            <p className="errorText">
                                {formik.errors.authorId ? formik.errors.authorId : null}
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <button type="submit" className="submitButton">
                        Izradi Dom
                    </button>
                </div>
            </form>
        </div>
    );
};
