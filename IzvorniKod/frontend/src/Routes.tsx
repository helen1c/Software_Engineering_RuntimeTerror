import React from "react";
import {Redirect, Route, Switch} from "react-router";
import {HomePage} from "./components/homepage/HomePage";
import {AboutUs} from "./aboutus/components/AboutUs/AboutUs";
import Header from "./components/header/Header";
import {RegistrationForm} from "./components/login-registration/RegistrationForm";
import {LoginForm} from "./components/login-registration/LoginForm";
import {MountainLodgeSearch} from "./components/mountain-lodge/search/MountainLodgeSearch";
import {ProfileUserInfo} from "./components/profile/ProfileUserInfo";
import {MountaineeringCommunitySearch} from "./components/mountaineering-community/MountaineeringCommunitySearch"



export const Routes = () => {

    return (
        <div>
        <Header/>
            <Switch>
                <Route path={"/"} exact={true}>
                    <Redirect to={"home"}/>
                </Route>
                <Route path="/home" component={HomePage} exact={true}/>
                <Route path="/aboutus" component={AboutUs} exact={true}/>
                <Route path="/register" component={RegistrationForm} exact={true}/>
                <Route path="/login" component={LoginForm} exact={true}/>
                <Route path="/mountaineering-community/search" component={MountaineeringCommunitySearch} exact/>
                <Route path="/mountain-lodge/search" component={MountainLodgeSearch} exact/>
                <Route path="/profile" component={ProfileUserInfo} exact/>

            </Switch>
        </div>
    );

}