import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { HttpCodesUtil } from "../errors/HttpCodesUtil";
import "../components/css/LoginAndRegistrationForm.css";
import { useHistory } from "react-router";
import loginImage from "../assets/login-image.png";

export const LoginForm = () => {
  const [showError, setShowError] = useState<boolean>(false);
  const history = useHistory();

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
        .required("Obavezan unos.")
        .email("Ne ispravan oblik mail-a."),
      password: Yup.string().required("Obavezan unos."),
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
      <form onSubmit={formik.handleSubmit}>
        <h1>Prijava</h1>
        <div>
          {showError ? (
            <p className="errorText">Neispravan e-mail ili lozinka.</p>
          ) : null}
        </div>
        <div className="inputForm">
          <div className="inputComponent">
            <p>E-mail:</p>
            <input
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <p className="errorText">{formik.errors.email}</p>
          </div>
          <div className="inputComponent">
            <p>Lozinka:</p>
            <input
              id="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <p className="errorText">{formik.errors.password}</p>
          </div>
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
              onClick={(e) => history.push("/registracija")}
            >
              Registriraj se
            </a>
          </p>
        </div>
        <div>
          <img src={loginImage} className="loginImage" />
        </div>
      </form>
    </div>
  );
};
