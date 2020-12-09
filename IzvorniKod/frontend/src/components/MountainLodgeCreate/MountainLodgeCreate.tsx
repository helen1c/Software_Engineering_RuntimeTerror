import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { HttpCodesUtil } from "../../errors/HttpCodesUtil";
import "./MountainLodgeCreate.css";
import { useHistory } from "react-router";
import { IconButton } from "@material-ui/core";
import { AddAPhotoOutlined } from "@material-ui/icons";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

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
    const history = useHistory();


    const classes = useStyles();
    const [state, setState] = React.useState({
        voda : false,
        hrana : false,
        wifi : false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const { voda, hrana, wifi } = state;
    const error = [voda, hrana, wifi].filter((v) => v).length !== 2;


    const formik = useFormik({
        initialValues: {
            name: "",
            elevation: "",
            hill: "",
            utilities: ["","",""],
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
            let i=0;
            if([voda]){
                values.utilities[i] = "voda";
                i++;
            }
            if([hrana]){
                values.utilities[i] = "hrana";
                i++;
            }
            if([wifi]){
                values.utilities[i] = "wifi";
                i++;
            }

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
                    history.push("/login");
                }
            });
        },
    });



    const showImage = (event: any) => {
        if(!event) return;
        let file = event.target.files[0];

        let reader = new FileReader();
        reader.onload = function (newImage) {

            setNewImage(newImage?.target?.result as string);
        };
        if(file !== undefined)
            reader.readAsDataURL(file);
    };

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
                                value={formik.values.hill}
                                onChange={formik.handleChange}
                            />
                            <p className="errorText">
                                {formik.errors.hill ? formik.errors.hill : null}
                            </p>
                        </div>

                    </div>
                    <div className="create-column">

                        <input className={"upload-picture"}
                               accept={"image/*"}
                               id={"icon-button-file"}
                               type="file" multiple
                               onChange={(event) => {
                                   showImage(event)
                                   event.target.value=""
                               }}
                        />
                        {newImage ?
                            <div className={"wrapper-picture"}>
                                <img
                                    style = {{display:"block"}}
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
                                    </div></div>
                            </>
                        }
                        <div className={classes.root}>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Dodatni sadrzaj</FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox checked={voda} onChange={handleChange} name="voda" />}
                                        label="Voda"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={hrana} onChange={handleChange} name="hrana" />}
                                        label="Hrana"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={wifi} onChange={handleChange} name="wifi" />}
                                        label="Wi-fi"
                                    />
                                </FormGroup>
                                <FormHelperText>Odaberi</FormHelperText>
                            </FormControl>

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
