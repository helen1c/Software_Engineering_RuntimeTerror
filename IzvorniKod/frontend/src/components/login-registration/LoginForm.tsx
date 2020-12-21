import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { HttpCodesUtil } from "../../errors/HttpCodesUtil";
import "./LoginAndRegistrationForm.css";
import loginImage from "../../assets/login-image.png";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "@material-ui/lab";

interface Props {
  successfulRegistration?: boolean
}

export const LoginForm = ({ successfulRegistration }: Props) => {
  const [showError, setShowError] = useState<boolean>(false);
  const [success, setSuccessMessage] = useState(successfulRegistration);

  const handleClose2 = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessMessage(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Molimo unesite e-mail.")
        .email("Ne ispravan oblik mail-a."),
      password: Yup.string().required("Molimo unesite lozinku."),
    }),
    onSubmit: (values) => {
      let loginInfo = {
        email: values.email,
        password: values.password,
      };
      fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(function (response) {
        if (
          response.status === HttpCodesUtil.UNAUTHORIZED ||
          response.status === HttpCodesUtil.FORBIDDEN
        ) {
          setShowError(true);
        } else if (response.status === HttpCodesUtil.SUCCESS) {
          sessionStorage.setItem(
            "key",
            response.headers.get("authorization") || ""
          );
          window.location.href = "/home";
        }
      });
    },
  });

  return (
    <div className="loginForm">
      <Snackbar open={success} autoHideDuration={2000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="success">
          Uspješno ste se registrirali.
        </Alert>
      </Snackbar>
      <form onSubmit={formik.handleSubmit}>
        <h1>Prijava</h1>
        <div className="inputForm">
          <div className="inputComponent">
            <p className={"inputLabel"}>E-mail:</p>
            <input className={"login-input"}
              id="email"
              value={formik.values.email}
              placeholder={"Unesite e-mail..."}
              onChange={formik.handleChange}
            />
            <p className="errorText">{formik.errors.email}</p>
          </div>
          <div className="inputComponent password-component">
            <p className={"inputLabel"}>Lozinka:</p>
            <input className={"login-input"}
              id="password"
              type="password"
              placeholder={"Unesite lozinku..."}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <p className="errorText">{formik.errors.password}</p>
          </div>
        </div>
        <div>
          {showError ? (
              <span className="errorText">Neispravan e-mail ili lozinka.</span>
          ) : <></>}
        </div>
        <div>
          <button type={"submit"} className="submitButton">
            Prijavi se
          </button>
        </div>
        <div>
          <p className="toRegistration">
            Nemaš korisnički račun?{" "}
            <a
              className="toRegistrationAction"
              href={"/register"}
            >
              Registriraj se
            </a>
          </p>
        </div>
        <div>
          <img src={loginImage} alt={"Mountaineers pic"} className="loginImage" />
        </div>
      </form>
    </div>
  );
};
