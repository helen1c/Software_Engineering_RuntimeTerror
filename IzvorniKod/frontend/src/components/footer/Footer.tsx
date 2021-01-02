import React, {useEffect, useState} from "react";
import "./Footer.css";
import logo from "../../assets/logo.jpg";
import {useHistory} from "react-router";
import Tipka from "./components/Button";
import { Link } from "react-router-dom";

function Footer() {
    const history = useHistory();
    const [role,setRole] = useState("");
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        if (sessionStorage.getItem("key") !== null) {
            fetch("/api/users/user/role", {
                method: "GET",
                headers: new Headers({
                    authorization: sessionStorage.getItem("key") || "",
                }),
            }).then(function (response) {
                if (response.status === 200) {
                    response.json().then((e) => {
                        setRole(e.role);
                        setLoading(false);
                    });
                }
            });
        }else{
            setRole("NEPRIJAVLJEN")
            setLoading(false);
        }
    }, []);

        return (
            <div className="main-footer">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="title-footer">
                                <img
                                    src={logo}
                                    alt={"Logo"}
                                    className="logo-image"
                                    onClick={(e) => history.push("/home")}
                                />
                                <div className={"title"}>Planinarski dnevnik</div>
                            </div>
                        </div>
                        <div className="col">
                            <h4 className="list-title">MENU:</h4>
                            <ul className="list-elements">
                                <li><Link to="/home">HOME</Link></li>
                                <li><Link to="/mountain-lodge/search">PRETRAZI PLANINARSKE DOMOVE</Link></li>
                                <li><Link to="/mountain-path/search">PRETRAZI PLANINARSKE STAZE</Link></li>
                                {role == "PLANINAR" ? <li/> : <li><Link to="/login">PRIJAVA</Link></li>}
                                {role == "PLANINAR" ? <li/> : <li><Link to="/register">REGISTRACIJA</Link></li>}
                            </ul>
                        </div>
                        <div className="col">
                            <h4 className="list-title">O nama:</h4>
                            <ul className="list-elements">
                                <li>Stranica za sve planinare</li>
                                <li>i avanturiste</li>
                            </ul>
                        </div>
                        <div className="col">
                            <h4 className="list-title">Kontaktirajte nas:</h4>
                            <ul className="list-elements">
                                <Tipka result={"Neodredeno"}/>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <p className="col-sm">
                            &copy;{new Date().getFullYear()} RuntimeTerror | Progi |
                            projekt | Planinarski Dnevnik
                        </p>
                    </div>
                </div>
            </div>
        );

}

export default Footer;