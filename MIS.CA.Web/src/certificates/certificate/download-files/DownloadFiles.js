import React from 'react';
import { Icon, Typography } from 'antd';
const { Title, Paragraph } = Typography;
const DownloadFiles = () => {
    return (
        <React.Fragment>
            <Title level={2}><Icon type="safety-certificate" style={{ fontSize: 25 }} />&nbsp;
            You are good to go</Title>
            <Paragraph>
                Congratulations! You have successfully create
                 your private key and certificate. You can download them in the below section
            </Paragraph>
            <Title level={4}><span className="Link"><Icon type="download" /> wwww.example.cert.pem</span></Title>
            <Title level={4}><span className="Link"><Icon type="download" /> www.example.key.pem</span></Title>
            <Paragraph>
                You need to import the certificate below.
                It containes the chain of trust with the root and intermediate certificate
            </Paragraph>
            <Title level={4}><span className="Link"><Icon type="download" /> ssl-bundle.pem</span></Title>
        </React.Fragment>
    );
};

export default DownloadFiles;