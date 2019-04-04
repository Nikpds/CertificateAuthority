import React from 'react';
import { Input, Typography, Icon, Button, Form } from 'antd';
const { Title, Paragraph, Text } = Typography;
const PrivateKey = props => {

    return (
        <React.Fragment>
            <Title level={2}><Icon type="key" style={{ fontSize: 25 }} rotate={270} /> Type the name of your Key</Title>
            <Paragraph>Note: The generated file will have .key.pem extention</Paragraph>
            <Paragraph code={true}>Example: if your given name is exampleKey then the generated key will be named exampleKey.key.pem</Paragraph>
            <Form.Item>
                <Input placeholder="Private Key Name" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={() => props.next(1)}>
                    Generate Key
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

export default PrivateKey;