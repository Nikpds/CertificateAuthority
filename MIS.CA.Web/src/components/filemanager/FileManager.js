import React from 'react';
import { Row, Col, Typography } from 'antd';
import Folder from './Folder';
import './FileManager.sass';

const { Text, Title } = Typography
const FileManager = () => {

    return (
        <React.Fragment >
            <Row type="flex" justify="space-around" className="Section">
                <Col span={22}>
                    <Title level={2}>Φάκελοι και αρχεία πιστοποιητικών</Title>
                    <Text>Διαχείριση προσωπικών κλειδιών, αιτημάτων και πιστοποιητικών</Text>
                </Col>
                <Col span={6}>{<Folder path="private" />}</Col>
                <Col span={6}>{<Folder path="certs" />}</Col>
                <Col span={6}>{<Folder path="csr" />}</Col>
            </Row>
        </React.Fragment>
    );
};

export default FileManager;