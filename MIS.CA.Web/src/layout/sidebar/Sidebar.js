import React, { useState } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import classes from './Toolbar.module.sass';
const { Sider } = Layout;

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(true)

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    }
    return (
        <Sider style={{ width: 256 }} collapsed={collapsed}>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                style={{ height: '100%' }} >
                <Menu.Item key="0" onClick={toggleCollapsed}>
                    <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
                    <span>Close</span>
                </Menu.Item>
                <Menu.Item key="1">
                    <NavLink to="/cert/files" >
                        <Icon type="safety-certificate" />   <span>Πιστοπιοητικά</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                    <NavLink to="/cert/files">
                        <Icon type="folder" /><span>Φάκελοι-Αρχεία</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                    <NavLink to="/certificate/new" >
                        <Icon type="plus" /><span>Νέο Πιστοπιοητικό</span></NavLink>
                </Menu.Item>
            </Menu>
        </Sider>
            );
        };
        
export default Sidebar;