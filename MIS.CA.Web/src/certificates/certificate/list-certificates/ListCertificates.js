import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Table, Icon, Divider, notification, Button, Popconfirm } from 'antd';
import moment from 'moment';

const { Text, Title } = Typography
const columns = [{
    title: 'Title',
    dataIndex: 'title',
    sorter: true,
    width: '20%',
}, {
    title: 'Issuer',
    dataIndex: 'issuer',
    sorter: true,
    width: '20%',
}, {
    title: 'Date Issued',
    dataIndex: 'created_at',
    sorter: true,
    width: '20%',
}, {
    title: 'Expiry Date',
    dataIndex: 'expiry_date',
    sorter: true,
    width: '20%',
    render: (date, cert) => (
        <span>
            {date} {Expires(date)}
        </span>
    ),
}, {
    title: 'Action',
    width: '20%',
    render: (text, cert) => (
        <span>
            <Button type="primary" icon="download" onClick={() => { DownloadCert(cert._id) }}></Button>
            <Divider type="vertical" />

            <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={() => { DeleteCert(cert._id) }}>
                <Button type="danger" icon="delete"></Button>
            </Popconfirm>
        </span>
    )
}];

// Show icon if certificate expires soon
const Expires = (date) => {
    var now = moment();
    date = moment(date, 'DD/MM/YYYY HH:mm');
    var diff = date.diff(now);
    var diffDays = date.diff(now, 'days');

    if (diff <= 0) {
        return (<Icon type="warning" className="ant-typography-danger" />);

    } else if (diffDays >= 0 && diffDays <= 30) {
        return (<Icon type="clock-circle" className="ant-typography-warning" />);
    }
    return null;
}


const DownloadCert = (certId) => {
    // Get('download certificate' + certId).then(res => {
    //     if (res) {
    notification['success']({
        message: 'The certificate was successfully downloaded.'
        // description: error,
    });
    //     }
    // }, error => {
    //     notification['error']({
    //         message: 'There was an error processing your request',
    //         description: error,
    //     });
    // });
}

const DeleteCert = (certId) => {
    // Get('delete certificate' + certId).then(res => {
    //     if (res) {
    notification['success']({
        message: 'The certificate was successfully deleted.'
        // description: error,
    });
    //     }
    // }, error => {
    //     notification['error']({
    //         message: 'There was an error processing your request',
    //         description: error,
    //     });
    // });
}

const ListCertificates = () => {
    const [cert, setCert] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        total: 0,
        pageSize: 2,
        loading: true
    });

    useEffect(() => {
        getData();
    }, []);

    const handleTableChange = (pagination, filters, sorter) => {
        console.log('pagination', pagination);
        console.log('filters', filters);
        console.log('sorter', sorter);

        // @TODO Add pagination and sorter to state. Filters are not used in the table 
        // setPagination({
        //     ...pagination,
        // });
    };


    const getData = () => {
        // Get('main/ls/private').then(res => {
        //     const data = res;
        //     if (res) {
        setPagination({
            ...pagination,
            loading: true
        });
        setCert([
            {
                _id: "1919199190",
                title: "www.google.com",
                issuer: "Stefanos Pap",
                created_at: "06/04/2019 23:59",
                expiry_date: "06/04/2020 23:59"
            },
            {
                _id: "1919199191",
                title: "www.stefanos.com",
                issuer: "Kostas Papaionou",
                created_at: "06/10/2019 23:59",
                expiry_date: "06/01/2020 23:59"
            },
            {
                _id: "1919199192",
                title: "www.mis",
                issuer: "Aggelos Fyselias",
                created_at: "06/10/2018 23:59",
                expiry_date: "08/04/2019 23:59"
            },
        ]);
        // Update table certificates
        // setCert(res.results);

        // Update table pagination
        console.log(pagination.loading);
        setPagination({
            ...pagination,
            total: 3,
            loading: false
        });
        //     }
        // });
    }

    return (
        <React.Fragment>
            <Row className="Section">
                <Col span={22} offset={1}>
                    <Title level={2}><Icon style={{ fontSize: 25 }} type="file-protect" /> Εκδομένα Πιστοποιητικά</Title>
                    <Text>Προβολή πιστοποιητικών με λεπτομέριες και φίλτρα για αναζήτηση</Text>
                </Col>
            </Row>
            <Row >
                <Col span={22} offset={1}>
                    <Table
                        columns={columns}
                        rowKey={cert => cert._id}
                        dataSource={cert}
                        pagination={pagination}
                        loading={pagination.loading}
                        onChange={handleTableChange}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ListCertificates;