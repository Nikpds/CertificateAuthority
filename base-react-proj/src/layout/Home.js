import React from 'react';
import { } from 'antd';
import { Typography, Row, Col, Icon } from 'antd';
const { Title, Paragraph, Text } = Typography;
const Home = () => {
  return (
    <Row style={{ paddingTop: 40 }}>
      <Col span={18} offset={3}>
        <Title level={2}>
          <Icon type="check-circle" theme="twoTone" twoToneColor="#599956" style={{ fontSize: 25,marginRight: 10 }} />
          OpenSSL Essentials: Working with SSL Certificates, Private Keys and CSRs
         </Title>
        <Paragraph>OpenSSL is a versatile command line tool that can be used for a large variety
        of tasks related to Public Key Infrastructure (PKI) and HTTPS (HTTP over TLS). This cheat
         sheet style guide provides a quick reference to OpenSSL commands that are useful in common,
          everyday scenarios. This includes OpenSSL examples of generating private keys, certificate
           signing requests, and certificate format conversion. It does not cover all of the uses of
            OpenSSL.</Paragraph>
      </Col>
    </Row>
  );
};

export default Home;