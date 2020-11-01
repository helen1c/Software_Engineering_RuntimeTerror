import React from "react";
import './HomePage.css';
import './App.css';

import logo from "./pictures/slika1.png";
import logo2 from "./pictures/lqbc14.jpg";

export const HomePage = () => {

    return (
        <div>

            <header className="header">
                <a className="header-link" href ="/">logo_slika</a>
                <h1 className="heading">Planinarski dnevnik</h1>
                <a className="header-link"  href="/">slika profila</a>
            </header>

            <div>Najljepša stranica na internetu :)</div>

            <div className="footer">

                <div>Otkrili ste novi planinarski dom?</div>
                <div>Naišli ste na neispravne informacije?</div>
                <div>Pošaljite poruku našim administratorima</div>
                <div>i pomozite održati stranicu ažurnom!</div>
                <a href="/"> KONTAKTIRAJ ADMNISTRATORA </a>
            </div>

        </div>

    );

};
