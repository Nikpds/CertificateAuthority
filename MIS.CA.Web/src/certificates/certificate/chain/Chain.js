import React from 'react';
import { Form, Icon, Typography, Button } from 'antd';
const { Title, Paragraph } = Typography;
const Chain = props => {
    return (
        <React.Fragment>
            <Title level={2}><Icon type="form" style={{ fontSize: 25 }} rotate={270} />&nbsp;
                Final Step Chain of Trust</Title>
            <Paragraph>Note: Your certificate and private key are ready. Create the chain of trush with your Intermediate
            and Certificate Authority as your final step. IF you skip this step your certificate will not be able to be validated</Paragraph>
            <Form.Item>
                <Button type="secondary" onClick={() => props.next(5)} style={{ marginRight: 10 }}>
                    Skip
                </Button>
                <Button type="primary" onClick={() => props.next(5)}>
                    Chain your Certificate
                    <Icon type="step-forward" />
                </Button>
            </Form.Item>
        </React.Fragment>
    );
};

export default Chain;