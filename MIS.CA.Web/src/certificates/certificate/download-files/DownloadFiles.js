import React from 'react';
import { Icon, Typography } from 'antd';
import callFetch, { api } from '../../../services/UseFetch';

const { Title, Paragraph } = Typography;

const DownloadFiles = props => {

    const DownloadCert = (url) => {
        callFetch(url, 'GET').then(res => {
            if (res !== null) {
                window.location.href = api + url;
            }          
        });
    }
    return (
        <React.Fragment>
            <Title level={2}><Icon type="safety-certificate" style={{ fontSize: 25 }} />&nbsp;
            You are good to go</Title>
            <Paragraph>
                Congratulations! You have successfully create
                 your private key and certificate. You can download them in the below section
            </Paragraph>
            <Title level={4}><span onClick={() => DownloadCert(api + 'main/certs/' + props.cert.certificate + '.cert.pem')} className="Link">
                <Icon type="download" /> {props.cert.certificate + '.cert.pem'}</span></Title>
            <Title level={4}><span onClick={() => DownloadCert(api + 'main/private/' + props.cert.certificate + '.key.pem')} className="Link">
                <Icon type="download" /> {props.cert.privateKey + '.key.pem'}</span></Title>
            <Paragraph>
                You need to import the certificate below.
                It containes the chain of trust with the root and intermediate certificate
            </Paragraph>
            <Title level={4}><span onClick={() => DownloadCert(api + 'main/csr/' + props.cert.certificate + '.csr.pem')} className="Link">
                <Icon type="download" /> {props.cert.certificate + '.csr.pem'}</span></Title>
        </React.Fragment >
    );
};

export default DownloadFiles;