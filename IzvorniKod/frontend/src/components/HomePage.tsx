import React from "react";
import './css/HomePage.css';
import '../App.css';


export const HomePage = () => {

    return (

        <body>

        <main className="main">
            <div className="main-images">
                <div className="staze">
                    <a className="pretraga" href="/staze"  >Pretražite staze</a>
                </div>
                <div className="domovi">
                    <a className="pretraga" href="/domovi" >Pretražite planinarske domove</a>
                </div>
            </div>
        </main>

        </body>

    );

};