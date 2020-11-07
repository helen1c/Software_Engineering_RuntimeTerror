import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { HttpCodesUtil } from "../errors/HttpCodesUtil";
import "../components/css/LoginAndRegistrationForm.css";
import loginImage from "../assets/login-image.png";

export const LoginForm = () => {
  const [showError, setShowError] = useState<boolean>(false);

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
      <form onSubmit={formik.handleSubmit}>
        <h1>Prijava</h1>
        <div className="inputForm">
          <div className="inputComponent">
            <p className={"input-label"}>E-mail:</p>
            <input className={"login-input"}
              id="email"
              value={formik.values.email}
              placeholder={"Unesite e-mail..."}
              onChange={formik.handleChange}
            />
            <p className="errorText">{formik.errors.email}</p>
          </div>
          <div className="inputComponent password-component">
            <p className={"input-label"}>Lozinka:</p>
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
              href={"/registracija"}
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
