import React, {useState} from "react";
import * as Yup from 'yup';
import {useFormik} from "formik";
import {HttpCodesUtil} from "../errors/HttpCodesUtil";
import "../components/css/LoginAndRegistrationForm.css"

export const LoginForm = () => {
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState("");

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validateOnChange: false,
        validateOnMount: false,
        validateOnBlur: false,
        validationSchema: Yup.object({
            email: Yup.string().required("Obavezan unos!").email("Ne ispravan oblik mail-a!"),
            password: Yup.string().required("Obavezan unos!")
        }),
        onSubmit: values => {
            let loginInfo = {
                email: values.email,
                password: values.password
            }
            fetch("/api/login", {
                method: "POST",
                body: JSON.stringify(loginInfo),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function(response) {
                if (response.status === HttpCodesUtil.UNAUTHORIZED || response.status === HttpCodesUtil.FORBIDDEN) {
                    setShowError(true);
                } else if (response.status === HttpCodesUtil.SUCCESS) {
                    sessionStorage.setItem("key", response.headers.get("authorization") || "a");
                    //window.location.href = "/naslovnica";
                } else {
                    response.text().then(e => setErrorMessage(e));
                }
            });
        }
    })

    return (
        <div className="loginForm">
            <div>
                {errorMessage? <p>Korisnik s unesenim mail-om ili lozinkom ne postoji</p> : null}
            </div>
            <form onSubmit={formik.handleSubmit}>
                <h1>Prijava</h1>
                <div className="inputForm">
                        <div className="inputComponent">
                            <p>E-mail:</p>
                            <input
                                id="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}/>
                            <p className="errorText">{formik.errors.email}</p>
                        </div>
                        <div className="inputComponent">
                            <p>Lozinka:</p>
                            <input
                                id="password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}/>
                            <p className="errorText">{formik.errors.password}</p>
                        </div>
                </div>
                <div>
                    <button type={"submit"}>Prijavi se</button>
                </div>
            </form>
        </div>
    )
}