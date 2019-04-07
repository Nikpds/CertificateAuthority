import React from 'react';
import { Row, Col, Typography } from 'antd';
import PrivateKey from './PrivateFolder';
import CertFiles from './CertFiles';
import CrtRequest from './CrtRequests';
const { Text, Title } = Typography
const FileManager = () => {

    return (
        <React.Fragment>
            <Row type="flex" justify="space-around" className="Section">
                <Col span={21}>
                    <Title level={2}>Folders and files</Title>
                    <Text>Download Or Delete certificates and their associated requests and private keys</Text>
                </Col>
            </Row>
            <Row type="flex" justify="space-around">
                <Col span={5}>{<PrivateKey />}</Col>
                <Col span={5}>{<CertFiles />}</Col>
                <Col span={5}>{<CrtRequest />}</Col>
            </Row>
        </React.Fragment>
    );
};

export default FileManager;