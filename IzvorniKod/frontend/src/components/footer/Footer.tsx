import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.jpg";
import {useHistory} from "react-router";
import Button from "./components/Button";
import Tipka from "./components/Button";

function Footer() {
    const history = useHistory();

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
                            <h4 className="list-title">Opet nest</h4>
                            <ul className="list-elements">
                                <li>te la lala</li>
                                <li>fdfdfdfdg</li>
                                <li>dfdfsfsdfsdfsd</li>
                            </ul>
                        </div>
                        <div className="col">
                            <h4 className="list-title">Opet nest</h4>
                            <ul className="list-elements">
                                <li>te la lala</li>
                                <li>fdfdfdfdg</li>
                                <li>dfdfsfsdfsdfsd</li>
                            </ul>
                        </div>
                        <div className="col">
                            <h4 className="list-title">Imate problem</h4>
                            <ul className="list-elements">
                                <li>dfgdfgfdgd</li>
                                <li>dfgfdgfdg</li>
                                <li>dgdgdfgdfgdf</li>
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