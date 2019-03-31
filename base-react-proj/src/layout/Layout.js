import React, { useContext } from 'react';

import Toolbar from './Toolbar/Toolbar'
import { Layout as _layout } from 'antd';
import utcss from '../styles/utilities.module.sass';
import { AuthContext } from '../auth/AuthProvider'

const { Content } = _layout;

const Layout = props => {
    const auth = useContext(AuthContext)
    const cssHeight = auth.isAuthenticated ? 'calc-h' : utcss.IsFullheight;
    const toolbar = auth.isAuthenticated ? <Toolbar /> : null;
    return (
        <React.Fragment>
            {toolbar}
            <Content className={cssHeight}>
                {props.children}
            </Content>
        </React.Fragment>
    );
};

export default Layout;