import React from 'react';
import Toolbar from './Toolbar/Toolbar'
import { Layout as _layout } from 'antd';
const { Content } = _layout;
const Layout = props => {
    return (
        <React.Fragment>
            <Toolbar />
            <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 280
            }}>
                <main >{props.children}</main>
            </Content>

        </React.Fragment>
    );
};

export default Layout;