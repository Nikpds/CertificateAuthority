import React, { useState, useContext } from 'react';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import utcss from '../../styles/utilities.module.sass';
import { AuthContext } from '../AuthProvider'
const Login = props => {
    const auth = useContext(AuthContext)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const usernameHandler = (e) => {
        setUsername(e.target.value);
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }
    const clearUsernameHandler = () => {
        setUsername('');
    }
    const formItemLayout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
    };

    const loginHandler = () => {
        auth.signIn(username, password);
    }

    const clearButton = username ? <Icon type="close-circle" onClick={clearUsernameHandler} /> : null;

    return (
        <Row className={utcss.IsFullheight} type="flex" justify="space-around" align="middle">
            <Col span={6} value={50}>
                <Form >
                    <Form.Item
                        label="Όνομα Χρήστη"
                        {...formItemLayout}>
                        <Input
                            placeholder="Enter your username"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={clearButton}
                            value={username}
                            onChange={usernameHandler} />
                    </Form.Item>
                    <Form.Item
                        label="Κωδικός"
                        {...formItemLayout}>
                        <Input.Password
                            value={password}
                            onChange={passwordHandler}
                            placeholder="input password"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={loginHandler}> Check</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};


export default Login;