import React, { Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import classes from './App.module.sass';
import LayoutContainer from './layout/Layout';
import Login from './auth/Login/Login'
import Home from './layout/Home';

const App = props => {
  let routes = (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Redirect to="/" />
    </Switch>
  );
  return (
    <div className={classes.App}>
      <LayoutContainer>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </LayoutContainer>
    </div>
  )
};

export default withRouter(App);
