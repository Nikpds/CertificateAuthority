import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import Steps from './certificate-steps/certificate-steps';
import Request from './request/Request';
import css from './Certificate.module.sass';
import PrivateKey from './privateKey/PrivateKey';
import Cert from './cert/Cert';
import Chain from './chain/Chain';

const Certificate = props => {
    const [step, setStep] = useState(3);
    let stepComponent;
    useEffect(() => {

    });
    const stepHandler = (nextStep) => {
        setStep(nextStep);
    }

    switch (step) {
        case 0:
            stepComponent = <PrivateKey next={stepHandler} step={step} />;
            break;
        case 1:
            stepComponent = <Request next={stepHandler} step={step} />;
            break;
        case 2:
            stepComponent = <Cert next={stepHandler} step={step} />;
            break;
        case 3:
            stepComponent = <Chain next={stepHandler} step={step} />;
            break;
        case 4:
            stepComponent = <Request next={stepHandler} step={step} />;
            break;
        default:
            break;
    }
    return (
        <Row className={css.Row}>
            <Col span={12} offset={3}>
                {stepComponent}
            </Col>
            <Col span={6} offset={3}>
                <Steps step={step} />
            </Col>
        </Row>
    );
};

export default Certificate;