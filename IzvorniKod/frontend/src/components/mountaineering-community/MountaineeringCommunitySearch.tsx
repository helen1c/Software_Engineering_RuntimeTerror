import React, {useState} from "react";
import {InputLabel, TextField} from "@material-ui/core";
import './MountaineeringCommunitySearch.css'
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import {useFormik} from "formik";
import * as Yup from "yup";
import {HttpCodesUtil} from "../../errors/HttpCodesUtil";


export const MountaineeringCommunitySearch = () => {

    const formik = useFormik({
        initialValues: {
            name: ""
        },
        onSubmit: (values) => {

            fetch("/api/users/community", { //backend
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                if (response.status !== HttpCodesUtil.SUCCESS) {
                    response.text().then((errors) => {
                        errors = JSON.parse(errors);
                        Object.values(errors).forEach((value) => {
                            const error = JSON.parse(JSON.stringify(value));
                            formik.setFieldError(error.fieldName, error.message);
                        });
                    });
                } else {
                    //GRESKA
                }
            });
        },
    });


    return (

        <div className="search-container">
            Moja planinarska zajednica:
            <TextField name="search_text"  placeholder="Pretraži" className="search-field"  type="search" variant="outlined" />
        </div>

    );

}
