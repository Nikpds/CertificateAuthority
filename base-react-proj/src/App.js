import React, { Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import classes from './App.module.sass';
import utcss from './styles/utilities.module.sass';
import LayoutContainer from './layout/Layout';
import Login from './auth/Login/Login'
import Home from './layout/Home';
import AuthProvider from './auth/AuthProvider';

const App = props => {

  let routes = (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Redirect to="/" />      
    </Switch>
  );
  const cssClass = [classes.App, utcss.IsFullheight]
  return (
    <AuthProvider>
      <LayoutContainer className={cssClass.join(' ')}>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </LayoutContainer>
    </AuthProvider>
  )
};

export default withRouter(App);
