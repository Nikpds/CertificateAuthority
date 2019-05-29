import React, { useState } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
const { Sider } = Layout;

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false)

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    }
    return (
        <Sider style={{ width: 256 }} collapsed={collapsed}>
            <Menu
                mode="inline"
                theme="dark"
                style={{ height: '100%' }} >
                <Menu.Item key="0" onClick={toggleCollapsed}>
                    <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
                    <span>Ελαχιστοποίηση</span>
                </Menu.Item>
                <Menu.Item key="1">
                    <NavLink to="/cert/certificates" >
                        <Icon type="safety-certificate" /><span>Πιστοποιητικά</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                    <NavLink to="/cert/files">
                        <Icon type="folder" /><span>Φάκελοι-Αρχεία</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                    <NavLink to="/certificate/new" >
                        <Icon type="plus" /><span>Νέο Πιστοποιητικό</span></NavLink>
                </Menu.Item>
                <Menu.Item key="4">
                    <NavLink to="/certificate/issued" >
                        <Icon type="safety-certificate" /><span>Εισαγωγή</span></NavLink>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;