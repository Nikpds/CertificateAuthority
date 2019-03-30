import React from 'react';

import Toolbar from './Toolbar/Toolbar'
import { Layout as _layout } from 'antd';
import utcss from '../styles/utilities.module.sass';
import AuthContext from '../auth/authContect';
const { Content } = _layout;

const Layout = props => {
    return (
        <AuthContext.Consumer>
            {context => {
                const cssHeight = context.isAuthenticated ? 'calc-h' : utcss.IsFullheight;
                const toolbar = context.isAuthenticated ? <Toolbar /> : null;
                return <React.Fragment>
                    {toolbar}
                    <Content className={cssHeight}>
                        {props.children}
                    </Content>
                </React.Fragment>
            }}
        </AuthContext.Consumer>


    );
};

export default Layout;