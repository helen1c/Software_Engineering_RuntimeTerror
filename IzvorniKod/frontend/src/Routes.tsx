import React from "react";
import {Redirect, Route, Switch} from "react-router";
import {HomePage} from "./HomePage";
import {AboutUs} from "./aboutus/components/AboutUs/AboutUs";

export const Routes = () => {

    return (
        <Switch>
            <Route path={"/"} exact={true}>
                <Redirect to={"home"}/>
            </Route>
            <Route path={"/home"} exact={true}>
                <HomePage/>
            </Route>
            <Route path={"/aboutus"} exact={true}>
                <AboutUs/>
            </Route>
        </Switch>
    );

}