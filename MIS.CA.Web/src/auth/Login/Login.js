import React, { useState, useContext } from 'react';
import { Form, Icon, Button, Typography as T } from 'antd';
import { AuthContext } from '../../context/AuthContext';
import callFetch from '../../services/UseFetch';
import './Login.css';
const Login = props => {
    const auth = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const usernameHandler = (e) => {
        setUsername(e.target.value);
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }
    const loginHandler = async () => {
        const body = {
            username: username,
            password: password
        }
        callFetch('auth', 'POST', body).then(res => {
            if (res && res.token) {
                auth.signIn(res.token);
            }
        });
    }
    return (
        <Form className="login-container">
            <div className="login-card">
                <div className="login-card-content">
                    <div className="header">
                        <T.Title level={1}> <Icon type="safety-certificate" style={{ fontSize: 50, marginRight: 10 }}
                            theme="twoTone" twoToneColor="#711411" />
                            <span style={{ color: 'red' }}>Open</span><span style={{ color: 'white' }}>SSL</span></T.Title>
                    </div>
                    <div className="form">
                        <div className="form-field username">
                            <div className="icon">  <Icon type="user" /> </div>
                            <input type="text" name="username" autoComplete="username"
                                value={username} onChange={usernameHandler} placeholder="Username" />
                        </div>
                        <div className="form-field password">
                            <div className="icon"> <Icon type="lock" /></div>
                            <input type="password" placeholder="Password" autoComplete="password"
                                value={password} onChange={passwordHandler} />
                        </div>
                        <Button type="submit" block shape="round" ghost onClick={loginHandler}> Σύνδεση </Button>
                    </div>
                </div>
            </div>
        </Form>
    );
};


export default Login;