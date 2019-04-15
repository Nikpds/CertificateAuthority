import React, { useState } from 'react';
import { Form, Icon, Input, Button, Typography } from 'antd';
const { Title, Paragraph } = Typography;
const Request = props => {
    const [req, useReq] = useState({
        country: '',
        state: '',
        locality: '',
        organization: '',
        cn: '',
        email: ''
    });
    const inputeHandler = (e) => {
        useReq({
            ...req,
            [e.target.name]: e.target.value
        });
    }
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
                    <Input type="text" placeholder="" name="country"
                        value={req.country} onChange={inputeHandler} />
                </Form.Item>
                <Form.Item label="State or Province Name (full name)">
                    <Input type="text" placeholder="" name="state"
                        value={req.state} onChange={inputeHandler} />
                </Form.Item>
                <Form.Item label="Locality Name (eg, city)">
                    <Input type="text" placeholder="" name="locality"
                        value={req.locality} onChange={inputeHandler} />
                </Form.Item>
                <Form.Item label="Organization Name (eg, company)">
                    <Input type="text" placeholder="" name="organization"
                        value={req.organization} onChange={inputeHandler} />
                </Form.Item>
                <Form.Item label="Organization Unit (eg, IT)">
                    <Input type="text" placeholder="" name="unit"
                        value={req.unit} onChange={inputeHandler} />
                </Form.Item>
                <Form.Item label="Common Name (e.g. server FQDN or YOUR name)">
                    <Input type="text" placeholder="" name="cn"
                        value={req.cn} onChange={inputeHandler} />
                </Form.Item>
                <Form.Item label="Email Address">
                    <Input type="email" placeholder="" name="email"
                        value={req.email} onChange={inputeHandler} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={() => props.next(2, req, 'request')}>
                        Next Step
                    <Icon type="step-forward" />
                    </Button>
                </Form.Item>

            </Form>
        </React.Fragment>
    );
};

export default Request;