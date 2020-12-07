import React from "react";
import {Redirect, Route, Switch} from "react-router";
import {HomePage} from "./components/homepage/HomePage";
import {AboutUs} from "./aboutus/components/AboutUs/AboutUs";
import Header from "./components/header/Header";
import {RegistrationForm} from "./components/login-registration/RegistrationForm";
import {LoginForm} from "./components/login-registration/LoginForm";
import {MountaineeringCommunitySearch} from "./components/mountaineering-community/MountaineeringCommunitySearch"
import {MenuProfile} from "./components/profile/MenuProfile";
import MountainPathCreate from "./components/mountain-path/component/MountainPathCreate/MountainPathCreate";
import MountainLodgeCreate from "./components/mountain-lodge/component/MountainLodgeCreate/MountainLodgeCreate";
import {MountainLodgeSearch} from "./components/mountain-lodge/component/MountainLodgeSearch/MountainLodgeSearch";
import {MountainPathSearch} from "./components/mountain-path/component/MountainPathSearch/MountainPathSearch";
import {CreateEventPage} from "./components/createevent/CreateEventPage";

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
                <Route path="/mountain-path/search" component={MountainPathSearch} exact/>
                <Route path="/profile/:id" component={MenuProfile} exact/>
                <Route path="/mountain-path/create" component={MountainPathCreate} exact/>
                <Route path="/mountain-lodge/create" component={MountainLodgeCreate} exact/>
            </Switch>
        </div>
    );

}