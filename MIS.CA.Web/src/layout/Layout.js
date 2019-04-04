import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Toolbar from './Toolbar/Toolbar';
import { Layout as LayoutC } from 'antd';
import utcss from '../styles/utilities.module.sass';
import Sidebar from './sidebar/Sidebar';

const { Content } = LayoutC;

const Layout = props => {
    const auth = useContext(AuthContext)
    const cssHeight = auth.isAuthenticated ? 'calc-h' : utcss.IsFullheight;
    const toolbar = auth.isAuthenticated ? <Toolbar /> : null;
    const sidebar = auth.isAuthenticated ? <Sidebar /> : null;
    return (
        <React.Fragment>
            <LayoutC>
                {toolbar}
            </LayoutC>
            <LayoutC className={utcss.IsFullheight}>
                {sidebar}
                <Content className={cssHeight}>
                    {props.children}
                </Content>
            </LayoutC>
        </React.Fragment>
    );
};

export default Layout;