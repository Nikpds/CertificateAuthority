import React, { useState } from 'react';
import { Form, Icon, Input, Typography, Button } from 'antd';
const { Title, Paragraph } = Typography;
const Cert = props => {
    const [certificate, setCertificate] = useState('');
    const [duration, setDuration] = useState(1);

    const certificateHandler = (e) => {
        setCertificate(e.target.value);
    }
    const durationHandler = (e) => {
        setDuration(e.target.value);
    }
    return (
        <React.Fragment>
            <Title level={2}><Icon type="form" style={{ fontSize: 25 }} rotate={270} />&nbsp;
                Certificate Title</Title>
            <Paragraph>Note: The generated file will have .cert.pem extention</Paragraph>
            <Paragraph code={true}>Example: if your name is mydomain then the generated certificate will be named mydomain.cert.pem</Paragraph>
            <Form.Item label="Certificate Name">
                <Input prefix={<Icon type="edit" />} value={certificate}
                    onChange={certificateHandler}
                    type="text" placeholder="192.168.1.1 or www.mydomain.gr" />
            </Form.Item>
            <Form.Item label="Duration (1 - 10 years)">
                <Input prefix={<Icon type="calendar" />}
                    value={duration} onChange={durationHandler}
                    type="number" min="1" max="10" placeholder="5 years" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={() => props.next(certificate,duration)}>
                    Next Step
                    <Icon type="step-forward" />
                </Button>
            </Form.Item>
        </React.Fragment>
    );
};

export default Cert;