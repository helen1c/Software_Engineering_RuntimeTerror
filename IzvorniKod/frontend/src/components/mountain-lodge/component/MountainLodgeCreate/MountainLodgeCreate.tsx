import React, {useState} from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import {HttpCodesUtil} from "../../../../errors/HttpCodesUtil";
import "./MountainLodgeCreate.css";
import {IconButton} from "@material-ui/core";
import {AddAPhotoOutlined} from "@material-ui/icons";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Compress from "react-image-file-resizer";

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

export const MountainLodgeCreate = () => {
    const [newImage, setNewImage] = useState("");

    const formik = useFormik({
        initialValues: {
            name: "",
            elevation: "",
            hillId: "",
            utilities: [],
            image: "",
        },
        validateOnChange: false,
        validateOnMount: false,
        validateOnBlur: false,
        validationSchema: Yup.object({
            name: Yup.string().required("Obavezan unos!"),
        }),
        onSubmit: (values) => {
            values.image = newImage.split(",")[1];
            values.hillId = "1";

            fetch("/api/mountain-lodges/create", {
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
                    console.log("Dom uspjesno stvoren...")
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

    return (
        <div className="createForm">
            <form onSubmit={formik.handleSubmit}>
                <h1>Dodaj Planinarski dom</h1>
                <div className="create-container">
                    <div className="create-column">
                        <div className="inputComponent textAlignLeft">
                            <p className={"inputLabel"}>Naziv doma:</p>
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
                            <p className={"inputLabel"}>Nadmorska visina:</p>
                            <input
                                className="create-input"
                                id="elevation"
                                value={formik.values.elevation}
                                onChange={formik.handleChange}
                            />
                            <p className="errorText">
                                {formik.errors.elevation ? formik.errors.elevation : null}
                            </p>
                        </div>
                        <div className="inputComponent textAlignLeft">
                            <p className={"inputLabel"}>Planina:</p>
                            <input
                                className={"create-input"}
                                id="hill"
                                value={formik.values.hillId}
                                onChange={formik.handleChange}
                            />
                            <p className="errorText">
                                {formik.errors.hillId ? formik.errors.hillId : null}
                            </p>
                        </div>

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
                                <span className={"remove-picture"} onClick={() => setNewImage("")}><DeleteForeverIcon/></span>

                            </div>
                            :
                            <>
                                <div className={"wrapper-picture"}>
                                    <div className={"picture-container"}>
                                        <label htmlFor="icon-button-file">
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <AddAPhotoOutlined/>
                                            </IconButton>
                                        </label>
                                    </div>
                                </div>
                            </>
                        }
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
