import React from 'react';
import { Steps } from 'antd';

const Step = Steps.Step;
const certificateSteps = props => {
    return (
        <React.Fragment>
            <h3>Your Certificate is five steps away!</h3>
            <Steps direction="vertical" size="small" current={props.step}>
                <Step title="Private Key" description="Create your private key." />
                <Step title="Certificate Request" description="Fill in your certificate information" />
                <Step title="Create Certificate" description="Your Certificate will be create." />
                <Step title="Chain of trust" description="Bind the certificate with the CA." />
                <Step title="Finish" description="Download your files" />
            </Steps>
        </React.Fragment>
    );
};

export default certificateSteps;