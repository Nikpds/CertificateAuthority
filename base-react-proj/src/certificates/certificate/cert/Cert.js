import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
const Cert = props => {
    return (
        <React.Fragment>
            <Form.Item>
                <Input prefix={<Icon type="lock" />} type="password" placeholder="Password" />
            </Form.Item>
        </React.Fragment>
    );
};

export default Cert;