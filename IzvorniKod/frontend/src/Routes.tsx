import React from "react";
import {Redirect, Route, Switch} from "react-router";
import {HomePage} from "./components/HomePage";
import {AboutUs} from "./aboutus/components/AboutUs/AboutUs";
import {MountainLodgeSearch} from "./components/search/MountainLodgeSearch";
import Header from "./components/Header";
import {RegistrationForm} from "./components/RegistrationForm";
import {LoginForm} from "./components/LoginForm";

export const Routes = () => {

    return (
        <div>
        <Header/>
            <Switch>
                <Route path={"/"} exact={true}>
                    <Redirect to={"home"}/>
                </Route>
                <Route path={"/home"} component={HomePage} exact={true}/>
                <Route path={"/aboutus"} component={AboutUs} exact={true}/>
                <Route path="/registracija" component={RegistrationForm} exact={true}/>
                <Route path="/prijava" component={LoginForm} exact={true}/>
                <Route path="/mountain-lodge/search" exact>
                    <MountainLodgeSearch/>
                </Route>
            </Switch>
        </div>
    );

}