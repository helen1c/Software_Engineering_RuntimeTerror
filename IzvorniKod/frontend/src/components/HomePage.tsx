import React from "react";
import './HomePage.css';
import './App.css';


export const HomePage = () => {

    return (

        <body>
        <header className="header">
            <a className="header-link" href ="/">logo_slika</a>
            <h1 className="heading">Planinarski dnevnik</h1>
            <a className="header-link"  href="/">slika profila</a>
        </header>

        <main className="main">
            <div className="main-images">
                <div className="staze">
                    <a className="pretraga" href="#" >Pretražite staze</a>
                </div>
                <div className="domovi">
                    <a className="pretraga" href="#" >Pretražite planinarske domove</a>
                </div>
            </div>
        </main>

        <footer className="footer">

            <div>Otkrili ste novi planinarski dom?</div>
            <div>Naišli ste na neispravne informacije?</div>
            <div>Pošaljite poruku našim administratorima</div>
            <div>i pomozite održati stranicu ažurnom!</div>
            <a href="/"> KONTAKTIRAJ ADMNISTRATORA </a>
        </footer>

        </body>

    );

};