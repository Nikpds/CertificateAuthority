import React from 'react';
import { Icon, Typography } from 'antd';
import {baseurl} from '../../../services/Utility';
const { Title, Paragraph } = Typography;

const DownloadFiles = props => {

    console.log(props);

    return (
        <React.Fragment>
            <Title level={2}><Icon type="safety-certificate" style={{ fontSize: 25 }} />&nbsp;
            You are good to go</Title>
            <Paragraph>
                Congratulations! You have successfully create
                 your private key and certificate. You can download them in the below section
            </Paragraph>
            <a href={baseurl + 'main/certs/' + props.cert.certificate + '.cert.pem'}><Title level={4}><span className="Link"><Icon type="download" /> {props.cert.certificate + '.cert.pem'}</span></Title></a>
            <a href={baseurl + 'main/private/' + props.cert.certificate + '.key.pem'}><Title level={4}><span className="Link"><Icon type="download" /> {props.cert.privateKey + '.key.pem'}</span></Title></a>
            <Paragraph>
                You need to import the certificate below.
                It containes the chain of trust with the root and intermediate certificate
            </Paragraph>
            <a href={baseurl + 'main/csr/' + props.cert.certificate + '.csr.pem'}><Title level={4}><span className="Link"><Icon type="download" /> {props.cert.certificate + '.csr.pem'}</span></Title></a>
        </React.Fragment>
    );
};

export default DownloadFiles;