import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { HttpCodesUtil } from "../errors/HttpCodesUtil";
import "../components/css/LoginAndRegistrationForm.css";
import { useHistory } from "react-router";
import {IconButton} from "@material-ui/core";
import {AddAPhotoOutlined} from "@material-ui/icons";

export const RegistrationForm = () => {
  const [newImage, setNewImage] = useState("");
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      placeOfResidence: "",
      dateOfBirth: "",
      image: "",
      description: "",
    },
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      name: Yup.string().required("Obavezan unos!"),
      email: Yup.string()
        .required("Obavezan unos!")
        .email("E-mail u ne ispravnom obliku."),
      password: Yup.string().required("Obavezan unos!"),
      confirmPassword: Yup.string()
        .required("Obavezan unos!")
        .oneOf([Yup.ref("password"), ""], "Lozinke moraju biti iste!"),
    }),
    onSubmit: (values) => {
        values.image = newImage.split(",")[1];

      fetch("/api/users", {
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
          history.push("/prijava");
        }
      });
    },
  });

  const showImage = (event: any) => {
    let file = event.target.files[0];

    let reader = new FileReader();
    reader.onload = function (newImage) {
      // @ts-ignore
      setNewImage(newImage.target.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="registrationForm">
      <form onSubmit={formik.handleSubmit}>
        <h1>Registracija</h1>
        <div className="row ">
          <div className="column">
            <div className="inputComponent textAlignLeft">
              <p>Ime i prezime:</p>
              <input
                id="name"
                className="registration-input"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              <p className="errorText">
                {formik.errors.name ? formik.errors.name : null}
              </p>
            </div>
            <div className="inputComponent textAlignLeft">
              <p>E-mail:</p>
              <input className="registration-input"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <p className="errorText">
                {formik.errors.email ? formik.errors.email : null}
              </p>
            </div>
            <div className="inputComponent textAlignLeft">
              <p>Lozinka:</p>
              <input className={"registration-input"}
                id="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <p className="errorText">
                {formik.errors.password ? formik.errors.password : null}
              </p>
            </div>
            <div className="inputComponent textAlignLeft">
              <p>Ponovite lozinku:</p>
              <input
                  className={"registration-input"}
                id="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
              <p className="errorText">
                {formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : null}
              </p>
            </div>
            <div className="inputComponent textAlignLeft">
              <p>Mjesto stanovanja:</p>
              <input className={"registration-input"}
                id="placeOfResidence"
                value={formik.values.placeOfResidence}
                onChange={formik.handleChange}
              />
              <p className="errorText">
                {formik.errors.placeOfResidence
                  ? formik.errors.placeOfResidence
                  : null}
              </p>
            </div>
            <div className="textAlignLeft">
              <p>Datum rođenja:</p>
              <input className={"registration-input"}
                id="dateOfBirth"
                type="date"
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="column">

              {newImage ?
                  <div className={"wrapper-picture"}>
              <img
                  style = {{display:"block"}}
                className="profileImage"
                src={newImage}
                alt="Slika profila"
              />
            </div>
             :
                <>
                <input className={"upload-picture"}
                       accept={"image/*"}
                       id={"icon-button-file"}
                       type="file" multiple
                       onChange={(event) => showImage(event)}
                />
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

            <div className="textAlignLeft">
              <p>O meni:</p>
              <textarea
                id="description"
                className="text-area "
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              <p className="errorText">
                {formik.errors.description ? formik.errors.description : null}
              </p>
            </div>
          </div>
        </div>
        <div>
          <button type="submit" className="submitButton">
            Registriraj se
          </button>
        </div>
      </form>
    </div>
  );
};
