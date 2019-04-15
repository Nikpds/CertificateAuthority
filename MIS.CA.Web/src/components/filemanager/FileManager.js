import React from 'react';
import { Row, Col, Typography } from 'antd';
import Folder from './Folder';
import './FileManager.sass';

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
                <Col span={5}>{<Folder path="private"/>}</Col>
                <Col span={5}>{<Folder path="certs"/>}</Col>
                <Col span={5}>{<Folder path="csr"/>}</Col>
            </Row>
        </React.Fragment>
    );
};

export default FileManager;