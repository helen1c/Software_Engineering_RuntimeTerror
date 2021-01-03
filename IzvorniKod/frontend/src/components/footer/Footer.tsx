import React, {useEffect, useState} from "react";
import "./Footer.css";
import logo from "../../assets/logo.jpg";
import {useHistory} from "react-router";
import Tipka from "./components/Tipka";
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
                                <li><Link className="footer-link" to="/home">HOME</Link></li>
                                <li><Link className="footer-link" to="/mountain-lodge/search">PRETRAZI PLANINARSKE DOMOVE</Link></li>
                                <li><Link className="footer-link" to="/mountain-path/search">PRETRAZI PLANINARSKE STAZE</Link></li>
                            </ul>
                        </div>
                        <div className="col">
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
                                        <Tipka result={"Neodredeno"} css={1}/>
                                    </ul>
                                </div> :
                                <div>
                                    <ul className="list-elements">
                                        <li><Link className="footer-link" to="/users/all">PRETRAŽI KORISNIKE</Link></li>
                                        <li><Link className="footer-link" to="/admin/message-box">PORUKE KORISNIKA</Link></li>
                                    </ul>
                                </div>
                              }
                            </div>
                            }
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