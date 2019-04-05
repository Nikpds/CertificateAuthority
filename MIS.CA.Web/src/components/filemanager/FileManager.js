import React from 'react';
import { Row, Col } from 'antd';
import PrivateKey from './PrivateKey';
import CertFiles from './CertFiles';
import CrtRequest from './CrtRequests';
const FileManager = () => {

    return (
        <Row type="flex" justify="space-between">
            <Col span={5}>{<PrivateKey />}</Col>
            <Col span={5}>{<CertFiles />}</Col>
            <Col span={5}>{<CrtRequest />}</Col>
        </Row>
    );
};

export default FileManager;