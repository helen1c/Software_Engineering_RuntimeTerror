import React, {useEffect, useState} from "react";
import "./Footer.css";
import logo from "../../assets/logo.jpg";
import {useHistory} from "react-router";
import Tipka from "./components/Tipka";
import { Link } from "react-router-dom";
import {ProfileDashboard} from "../profile/ProfileDashboard";

function Footer() {
    const history = useHistory();
    const [role,setRole] = useState("");

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
                    });
                }
            });
        }else{
            setRole("NEPRIJAVLJEN")
        }
    }, []);

        return (
            <div className="main-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-title">
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
                            <h4 className="list-title">Menu:</h4>
                            <ul className="list-elements">
                                <li><Link className="footer-link" to="/home">Home</Link></li>
                                <li><Link className="footer-link" to="/mountain-lodge/search">Pretražite domove</Link></li>
                                <li><Link className="footer-link" to="/mountain-path/search">Petražite staze</Link></li>
                            </ul>
                        </div>
                        <div className="col-about">
                            <h4 className="list-title">O nama:</h4>
                            <ul className="list-elements">
                                <li>Stranica za sve planinare</li>
                                <li>i avanturiste</li>
                            </ul>
                        </div>
                        {role === "NEPRIJAVLJEN" ?
                            <div className="col">
                                <h4 className="list-title">Za više mogućnosti:</h4>
                                <ul className="list-elements">
                                    <li><Link className="footer-link" to="/login">PRIJAVA</Link></li>
                                    <li><Link className="footer-link" to="/register">REGISTRACIJA</Link></li>
                                </ul>
                            </div> :
                            <div className="col">
                            {role === "PLANINAR" ?
                                <div>
                                    <h4 className="list-title">Kontaktirajte nas:</h4>
                                    <ul className="list-elements">
                                        <Tipka result={"Neodredeno"} css={1} place={"footer"}/>
                                    </ul>
                                </div> :
                                <div>
                                    <ul className="list-elements">
                                        <li><Link className="footer-link" to="/users/search">Pretraži korisnike</Link></li>
                                    </ul>
                                </div>
                              }
                            </div>
                            }
                    </div>
                    <hr />
                    <div className="row-about">
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