import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../auth/Login/Login';
import Home from '../layout/Home';
import Certificate from '../certificates/certificate/Certificate';
export const fullAccess = (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/certificate/new" exact component={Certificate} />
        <Redirect to="/" />
    </Switch>
);

export const unAuthorized = (
    <Switch>
        <Route path="/login" exact component={Login} />
        <Redirect to="/login" />
    </Switch>
);