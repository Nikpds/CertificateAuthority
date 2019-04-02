import React, { Suspense, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import classes from './App.module.sass';
import utcss from './styles/utilities.module.sass';
import LayoutContainer from './layout/Layout';
import { AuthContext } from './context/AuthContext';
import { fullAccess, unAuthorized } from './services/Routes';

const App = props => {
  const authContext = useContext(AuthContext);
  const routes = authContext.isAuthenticated ? fullAccess : unAuthorized;
  const cssClass = [classes.App, utcss.IsFullheight]
  return (
    <LayoutContainer className={cssClass.join(' ')}>
      <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
    </LayoutContainer>
  )
};

export default withRouter(App);
