import React from 'react';
import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {RegistrationForm} from "./components/RegistrationForm";
import {LoginForm} from "./components/LoginForm";
import {homepage} from "./components/homepage";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact path="/" to="/registracija" />
                <Route path="/registracija" component={RegistrationForm} />
                <Route path="/prijava" component={LoginForm} />
                <Route path="/registracija" component={homepage} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
