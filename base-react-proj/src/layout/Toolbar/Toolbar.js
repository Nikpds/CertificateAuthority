import React from 'react';
import { NavLink } from 'react-router-dom';

import { Menu } from 'antd';
import classes from './Toolbar.module.sass';

const Toolbar = props => {
    return (
        <Menu mode="horizontal" className={classes.Menu}>
            <Menu.Item key="1" ><NavLink to="/">Home</NavLink></Menu.Item>
            <Menu.Item key="2" ><NavLink to="/">Something else</NavLink></Menu.Item>
            <Menu.Item key="3" className={classes.Right}><NavLink to="/login">Login</NavLink></Menu.Item>
        </Menu>
    );
};

export default Toolbar;