import React, { Suspense, useState } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import classes from './App.module.sass';
import utcss from './styles/utilities.module.sass';
import LayoutContainer from './layout/Layout';
import Login from './auth/Login/Login'
import Home from './layout/Home';
import AuthContect from './auth/authContect';
import { saveToLocalstorage } from './auth/authService';
const App = props => {
  const [isAuthenticated, setAuthenticated] = useState(false);


  let routes = (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Redirect to="/" />
    </Switch>
  );
  const cssClass = [classes.App, utcss.IsFullheight]
  return (
    <AuthContect.Provider value={{ isAuthenticated: isAuthenticated, token: null }}>
      <LayoutContainer className={cssClass.join(' ')}>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </LayoutContainer>
    </AuthContect.Provider>
  )
};

export default withRouter(App);
