import React from 'react';
import { Form, Icon, Input, Typography, Button } from 'antd';
const { Title, Paragraph, Text } = Typography;
const Cert = props => {
    return (
        <React.Fragment>
            <Title level={2}><Icon type="form" style={{ fontSize: 25 }} rotate={270} />&nbsp;
                Certificate Title</Title>
            <Paragraph>Note: The generated file will have .cert.pem extention</Paragraph>
            <Paragraph code={true}>Example: if your name is mydomain then the generated certificate will be named mydomain.cert.pem</Paragraph>
            <Form.Item label="Certificate Name">
                <Input prefix={<Icon type="edit" />} type="text" placeholder="192.168.1.1 or www.mydomain.gr" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={() => props.next(3)}>
                    Send Request Info
                    <Icon type="step-forward" />
                </Button>
                <Text type="danger">&nbsp;&nbsp;
                        <Icon type="warning" />
                    Warning! After this step you can't go back
                    </Text>
            </Form.Item>
        </React.Fragment>
    );
};

export default Cert;