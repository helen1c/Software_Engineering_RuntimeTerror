import React from "react";
import './HomePage.css';
import '../../App.css';
import {useHistory} from "react-router";


export const HomePage = () => {

    const history = useHistory();

    return (

        <body>

        <main className="main">
            <div className="main-images">
                <div className="staze" onClick={e => history.push("/paths/search")}>
                    <span className="pretraga">Pretražite planinarske staze</span>
                </div>
                <div className="domovi" onClick={e => history.push("/mountain-lodge/search")}>
                    <span className="pretraga">Pretražite planinarske domove</span>
                </div>
            </div>
        </main>

        </body>

    );

};