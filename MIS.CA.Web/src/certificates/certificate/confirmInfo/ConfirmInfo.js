import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { Form, Icon, Typography, Button } from 'antd';
import './ConfirmInfo.sass';
import { Post as post } from '../../../services/Utility';
const { Title, Paragraph, Text } = Typography;

const confirm = props => {
    console.log(props)
    const [crt, setCrt] = useState({ ...props.cert });

    const editHandler = (e, name) => {
        if (name.includes('request')) {
            const field = name.split('.')[1];
            setCrt({
                ...crt,
                request: {
                    ...crt.request,
                    [field]: e
                }
            })
        } else {
            setCrt({
                ...crt,
                [name]: e
            })
        }
    }

    const submitCertHandler = () => {
        post('cert/request', crt).then(res => {
            console.log('all good');
            props.next(4);
        });
    }

    const d = new Date(crt.expires)
    const expiredDate = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
    return (
        <Route render={({ history }) => (
            <React.Fragment>
                <Title level={2}><Icon type="form" style={{ fontSize: 25, marginRight: 10 }} rotate={270} />
                    Confirm your Info</Title>
                <Paragraph>Note: Confirm your information and continue .</Paragraph>
                <Paragraph>The next step will create all the necessary files for your Certificate.</Paragraph>
                <Title level={3}><Icon type="read" style={{ fontSize: 22, marginRight: 10 }} /> Your Request</Title>

                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 10 }}>
                    <Form.Item label="Private ">
                        <Text editable={{ onChange: (v) => editHandler(v, 'privateKey') }}>
                            {crt.privateKey}
                        </Text>
                    </Form.Item>
                    <Form.Item label="Certificate  ">
                        <Text editable={{ onChange: (v) => editHandler(v, 'certificate') }}>
                            {crt.certificate}
                        </Text>
                    </Form.Item>
                    <Form.Item label="Duration ">
                        <Text editable={{ onChange: (v) => editHandler(v, 'duration') }}>
                            {crt.duration + ' years'}
                        </Text>
                    </Form.Item>
                    <Form.Item label="Expires ">
                        <Text >
                            {expiredDate}
                        </Text>
                    </Form.Item>
                    <Form.Item label="Country ">
                        <Text name="" editable={{ onChange: (v) => editHandler(v, 'request.country') }}>
                            {crt.request.country}
                        </Text>
                    </Form.Item>
                    <Form.Item label="State ">
                        <Text editable={{ onChange: (v) => editHandler(v, 'request.state') }}>
                            {crt.request.state}
                        </Text>
                    </Form.Item>
                    <Form.Item label="Locality ">
                        <Text editable={{ onChange: (v) => editHandler(v, 'request.locality') }}>
                            {crt.request.locality}
                        </Text>
                    </Form.Item>
                    <Form.Item label="Organization ">
                        <Text editable={{ onChange: (v) => editHandler(v, 'request.organization') }}>
                            {crt.request.organization}
                        </Text>
                    </Form.Item>
                    <Form.Item label="Common Name ">
                        <Text editable={{ onChange: (v) => editHandler(v, 'request.cn') }}>
                            {crt.request.cn}
                        </Text>
                    </Form.Item>
                    <Form.Item label="Email ">
                        <Text editable={{ onChange: (v) => editHandler(v, 'request.email') }}>
                            {crt.request.email}
                        </Text>
                    </Form.Item>
                    <Form.Item>
                        <Button type="secondary" style={{ marginRight: 10 }}
                            onClick={() => { history.push('/') }} >
                            Cancel
                    </Button>
                        <Button type="primary" onClick={submitCertHandler}>
                            Create Certificates
                    <Icon type="step-forward" />
                        </Button>
                    </Form.Item>
                </Form>




            </React.Fragment>)}
        />
    );
};

export default confirm;