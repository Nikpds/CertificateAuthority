import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Table, Icon, Divider, Button, Popconfirm, message } from 'antd';
import moment from 'moment';
import callFetch, { api } from '../../../services/UseFetch';

const { Text, Title } = Typography


const INITIAL_PAGE = 1;
const INITIAL_PAGE_SIZE = 10;
const PAGINATION = {
    defaultCurrent: INITIAL_PAGE,
    defaultPageSize: INITIAL_PAGE_SIZE,
    showSizeChanger: true,
    showTotal: (total, range) => 'Βλέπετε ' + range[0] + ' έως ' + range[1] + ' από τις ' + total + ' εγγραφές'
};
const lastPagination = {
    page: null,
    size: null,
    sort: null
};

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

const ListCertificates = () => {

    const columns = [{
        title: 'Title',
        dataIndex: 'certificate',
        sorter: true,
    },
    {
        title: 'Organization Name',
        dataIndex: 'request.organization',
        sorter: true,
    },
    {
        title: 'Common Name',
        dataIndex: 'request.cn',
        sorter: true,
    },
    {
        title: 'Date Issued',
        dataIndex: 'created',
        sorter: true,
    },
    {
        title: 'Expiry Date',
        dataIndex: 'expires',
        sorter: true,
        render: (date, cert) => (
            <span>
                {date} {Expires(date)}
            </span>
        ),
    },
    {
        title: 'Action',
        render: (text, cert) => (
            <span>
                <Button type="primary" icon="download" onClick={() => { DownloadCert(cert) }}></Button>
                <Divider type="vertical" />
                <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={() => { DeleteCert(cert.id) }}>
                    <Button type="danger" icon="delete"></Button>
                </Popconfirm>
            </span>
        )
    }];

    const [cert, setCert] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getData(INITIAL_PAGE, INITIAL_PAGE_SIZE);
    }, []);

    const DeleteCert = (certId) => {
        setLoading(true);
        callFetch('certificates/' + certId, 'DELETE').then(res => {
            if (res) {
                message.info('Το αρχείο διαγράφτηκε επιτυχώς');
                const pageToLoad = lastPagination.page > 0 && cert.length === 1 ? lastPagination.page - 1 : lastPagination.page;
                getData(pageToLoad, lastPagination.size, lastPagination.sort);
            } else {
                errorCallBack();
            }
        });
    }

    const DownloadCert = (cert) => {
        callFetch('main/certs/' + cert.certificate + '.crt', 'GET').then(res => {
            if (res !== null) {
                window.location.href = api + 'main/certs/' + cert.certificate + '.crt';
            }
        });
    }

    const handleTableChange = (pag, filters, sorter) => {
        let sortField = '';
        if (sorter && sorter.field) {
            let subfields = sorter.field.split('.');
            for (const subfield of subfields) {
                sortField += (!sortField ? '' : '.') + subfield.substring(0, 1).toUpperCase() + subfield.substring(1);
            }
            sortField += ':' + sorter.order.replace('end', '');
        }

        getData(pag.current, pag.pageSize, sortField);
    };

    const getData = (page, size, sort) => {
        lastPagination.page = page;
        lastPagination.size = size;
        lastPagination.sort = sort;

        let queryParams = '?page=' + page + '&size=' + size + (sort ? '&sort=' + sort : '');
        callFetch('certificates/paged' + queryParams, 'GET').then(res => {
            setLoading(false);
            if (res) {
                setTotal(res.total);
                setCert(res.content);
            } else {
                errorCallBack();
            }
        });
    }

    const errorCallBack = (error) => {
        setLoading(false);
        setTotal(0);
        setCert([]);
    }

    return (
        <React.Fragment>
            <Row className="Section">
                <Col span={22} offset={1}>
                    <Title level={2}><Icon style={{ fontSize: 25 }} type="file-protect" /> Εκδομένα Πιστοποιητικά</Title>
                    <Text>Προβολή πιστοποιητικών με λεπτομέριες</Text>
                </Col>
            </Row>
            <Row >
                <Col span={22} offset={1}>
                    <Table
                        columns={columns}
                        rowKey={cert => cert.id}
                        pagination={{ ...PAGINATION, total: total }}
                        dataSource={cert}
                        loading={loading}
                        onChange={handleTableChange}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ListCertificates;