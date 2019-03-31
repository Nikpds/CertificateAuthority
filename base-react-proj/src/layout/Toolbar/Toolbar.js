import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthProvider'
import { Menu } from 'antd';
import classes from './Toolbar.module.sass';

const Toolbar = props => {
    const auth = useContext(AuthContext);
    const logInOut = auth.isAuthenticated ? <NavLink to="/logout">logout</NavLink> : <NavLink to="/login">Login</NavLink>
    return (
        <Menu mode="horizontal" className={classes.Menu}>
            <Menu.Item key="1" ><NavLink to="/">Home</NavLink></Menu.Item>
            <Menu.Item key="2" ><NavLink to="/">Something else</NavLink></Menu.Item>
            <Menu.Item key="3" className={classes.Right}>{logInOut}</Menu.Item>
        </Menu>
    );
};

export default Toolbar;