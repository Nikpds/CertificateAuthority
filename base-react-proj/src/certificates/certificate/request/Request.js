import React from 'react';
import { Form, Icon, Input, Button, Typography } from 'antd';
const { Title, Paragraph, Text } = Typography;
const Request = props => {
    const formItemLayout = {
        labelCol: {
            lg: { span: 24 },
            xl: { span: 10 },
        },
        wrapperCol: {
            lg: { span: 24 },
            xl: { span: 14 },
        },
    };
    return (
        <React.Fragment>
            <Title level={2}><Icon type="form" style={{ fontSize: 25 }} rotate={270} /> Certificate Request Info</Title>
            <Paragraph>Fill the form for your certificate info.</Paragraph>
            <Form {...formItemLayout} >
                <Form.Item label="Country Name (2 letter code)">
                    <Input type="text" placeholder="" />
                </Form.Item>
                <Form.Item label="State or Province Name (full name)">
                    <Input type="text" placeholder="" />
                </Form.Item>
                <Form.Item label="Locality Name (eg, city)">
                    <Input type="text" placeholder="" />
                </Form.Item>
                <Form.Item label="Organization Name (eg, company)">
                    <Input type="text" placeholder="" />
                </Form.Item>
                <Form.Item label="Organizational Unit Name (eg, section)">
                    <Input type="text" placeholder="" />
                </Form.Item>
                <Form.Item label="Common Name (e.g. server FQDN or YOUR name)">
                    <Input type="text" placeholder="" />
                </Form.Item>
                <Form.Item label="Email Address">
                    <Input type="email" placeholder="" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={() => props.next(2)}>
                        Send Request Info
                    <Icon type="step-forward" />
                    </Button>
                    <Text type="danger">&nbsp;&nbsp;
                        <Icon type="warning" />
                        Warning! After this step you can't go back
                    </Text>
                </Form.Item>

            </Form>
        </React.Fragment>
    );
};

export default Request;