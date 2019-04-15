import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import Steps from './certificate-steps/certificate-steps';
import Request from './request/Request';
import css from './Certificate.module.sass';
import PrivateKey from './privateKey/PrivateKey';
import Cert from './cert/Cert';
import Confirm from './confirmInfo/ConfirmInfo';
import DownloadFiles from './download-files/DownloadFiles'
const Certificate = props => {
    const [step, setStep] = useState(0);
    const [cert, setCert] = useState({
        privateKey: '',
        certificate: '',
        expires: null,
        duration: 1,
        request: null
    });
    useEffect(() => {       
    }, [cert]);

    useEffect(() => {       
    }, [step]);

    const nextStepHandler = (step, data, name) => {
        setCert({
            ...cert,
            [name]: data
        });
        setStep(step);
    }

    const finalStep = (step) => {
        setStep(step);
    }

    const lastInfoHandler = (certificate, years) => {
        var d = new Date();
        var year = d.getFullYear();
        const expires = new Date(year + years, d.getMonth(), d.getDate());
        setCert({
            ...cert,
            expires: expires,
            duration: years,
            certificate: certificate
        });
        setStep(3)
    }
    let stepComponent;
    switch (step) {
        case 0:
            stepComponent = <PrivateKey next={nextStepHandler} />;
            break;
        case 1:
            stepComponent = <Request next={nextStepHandler} />;
            break;
        case 2:
            stepComponent = <Cert next={lastInfoHandler} />;
            break;
        case 3:
            stepComponent = <Confirm next={finalStep} cert={cert} />;
            break;
        case 4:
            stepComponent = <DownloadFiles next={finalStep} cert={cert} />;
            break;
        default:
            break;
    }
    return (
        <Row className={css.Row}>
            <Col span={12} offset={1}>
                {stepComponent}
            </Col>
            <Col span={8} offset={3}>
                <Steps step={step} />
            </Col>
        </Row>
    );
};

export default Certificate;