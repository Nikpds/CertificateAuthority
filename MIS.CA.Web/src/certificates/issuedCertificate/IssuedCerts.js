import React, { useState } from 'react';
import { Form, Icon, Input, Button, Typography, DatePicker, Row, Col, message } from 'antd';
import classes from './IssuedCerts.sass';
import { Post } from '../../services/Utility';

const { Title } = Typography;
const oldCertificate = props => {
    const formItemLayout = {
        labelCol: {
            lg: { span: 24 },
            xl: { span: 24 },
        },
        wrapperCol: {
            lg: { span: 24 },
            xl: { span: 24 },
        },
    };

    // το object data:
    const data = {
        privateKey: '',
        certificate: '',
        expires: null,
        owner: '',
        unit: '',
        request: {
            country: '',
            state: '',
            locality: '',
            organization: '',
            cn: '',
            email: ''
        }
    }
    // το useState Hook:
    const [certData, setCertData] = useState(data);
    // το updateFieldHandler που εκτελείται στην onChange: 
    const updateFieldHandler = (e, type) => {
        const field = type === 'text' ? e.target.name : type
        setCertData({
            ...certData,
            [field]: type === 'text' ? e.target.value : e._d
        })
    };
    const updateNestedFieldHandler = (e) => {
        console.log(e);
        //const field = type === 'text' ? e.target.name : type
        setCertData({
            ...certData,
            request: {
                ...certData.request,
                [e.target.name]: e.target.value
            }
        })
    };
    // το clickMe που εκτελείται στην onClick: 
    const submitHandler = () => {
        console.log('eimai edw' + certData);
        console.log(certData);
        props.form.validateFields((err, fieldsValue) => {
            if (err) {
                console.log(fieldsValue);
                return;
            }
            Post('certificates/', certData).then((cert) => {
                message.info('Το πιστοποιητικό καταγράφηκε!');
            }, (error) => {
                console.log(error);
                message.error('Σφάλμα κατά την καταγραφή του πιστοποιητικού!');
            });
        });
    };

    const { getFieldDecorator } = props.form;
    return (
        <Form {...formItemLayout} className="Section">
            <Row>
                <Col span={22} offset={1}>
                    <Title level={2}><Icon type="safety-certificate" style={{ fontSize: 25 }} /> Εισαγωγή Πιστοποιητικού </Title>
                </Col>
            </Row>
            <Row className={classes.Row}>
                <Col span={10} offset={1}>
                    <Form.Item label="Δώστε ένα όνομα για το Κλειδί">
                        {getFieldDecorator('PrivateKey', {
                            rules: [{
                                required: true,
                                message: 'Δεν έχετε δώσει όνομα πιστοποιητικού. ',
                            }],
                        })(
                            <Input
                                name="privateKey"
                                type="text"
                                placeholder="Εισαγάγετε Όνομα Κλειδιού"
                                onChange={(e) => updateFieldHandler(e, 'text')} />
                        )}
                    </Form.Item>
                    <Form.Item label="Δώστε ένα όνομα για το πιστοποιητικό">
                        {getFieldDecorator('Certificate', {
                            rules: [{
                                required: true,
                                message: 'Δεν έχετε δώσει όνομα πιστοποιητικού. ',
                            }],
                        })(
                            <Input
                                name="certificate"
                                type="text"
                                placeholder="Εισαγάγετε Όνομα πιστοποιητικού"
                                onChange={(e) => updateFieldHandler(e, 'text')} />
                        )}
                    </Form.Item>
                    <Form.Item label="Δώστε ένα όνομα Ιδιοκτήτη">
                        {getFieldDecorator('Owner', {
                            rules: [{
                                required: true,
                                message: 'Δεν έχετε δώσει όνομα Ιδιοκτήτη. ',
                            }],
                        })(
                            <Input
                                name="owner"
                                type="text"
                                placeholder="Εισαγάγετε Όνομα Ιδιοκτήτη"
                                onChange={(e) => updateFieldHandler(e, 'text')} />
                        )}
                    </Form.Item>
                    <Form.Item label="Μονάδα που χρησιμοποιείται:">
                        {getFieldDecorator('Unit', {
                            rules: [{
                                required: true,
                                message: 'Δεν έχετε δώσει όνομα πιστοποιητικού. ',
                            }],
                        })(
                            <Input
                                name="unit"
                                type="text"
                                placeholder="Εισαγάγετε Μονάδα που χρησιμοποιείται"
                                onChange={(e) => updateFieldHandler(e, 'text')}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Ημερομηνία Λήξης Πιστοποιητικού: ">
                        {getFieldDecorator('Expires', { type: 'date', required: true, message: 'Παρακαλώ εισάγετε ημερομηνία' })(
                            <DatePicker name="expires" onChange={(e) => updateFieldHandler(e, 'expires')} />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <div style={{ marginTop: 30, float: 'right' }}>
                            <Button type="danger" style={{ marginRight: 8 }}>Εκκαθάριση Φόρμας</Button>
                            <Button type="primary" onClick={() => submitHandler()} className={classes.Button}>
                                <Icon type="save" />
                                Αποθήκευση Πληροφοριών Πιστοποιητικού
                                </Button>
                        </div>
                    </Form.Item>
                </Col>
                <Col span={10} offset={1}>

                    <Form.Item label="Χώρα:">
                        {getFieldDecorator('country', {
                            rules: [{
                                required: true,
                                message: 'Δεν έχετε δώσει όνομα Χώρας. ',
                            }],
                        })(
                            <Input
                                name="country"
                                type="text"
                                placeholder="Εισαγάγετε Χώρα"
                                onChange={(e) => updateNestedFieldHandler(e, 'text')}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="State:">
                        {getFieldDecorator('state', {
                            rules: [{
                                required: true,
                                message: 'Δεν έχετε δώσει όνομα State. ',
                            }],
                        })(
                            <Input
                                name="state"
                                type="text"
                                placeholder="Εισαγάγετε State"
                                onChange={(e) => updateNestedFieldHandler(e, 'text')}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Locality:">
                        {getFieldDecorator('locality', {
                            rules: [{
                                required: true,
                                message: 'Δεν έχετε δώσει Locality. ',
                            }],
                        })(
                            <Input
                                name="locality"
                                type="text"
                                placeholder="Εισαγάγετε Μονάδα"
                                onChange={(e) => updateNestedFieldHandler(e, 'text')}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Organization:">
                        {getFieldDecorator('organization', {
                            rules: [{
                                required: true,
                                message: 'Δεν έχετε δώσει Organization. ',
                            }],
                        })(
                            <Input
                                name="organization"
                                type="text"
                                placeholder="Εισαγάγετε Organization"
                                onChange={(e) => updateNestedFieldHandler(e, 'text')}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Common:">
                        {getFieldDecorator('cn', {
                            rules: [{
                                required: true,
                                message: 'Δεν έχετε δώσει όνομα πιστοποιητικού. ',
                            }],
                        })(
                            <Input
                                name="cn"
                                type="text"
                                placeholder="Εισαγάγετε Μονάδα"
                                onChange={(e) => updateNestedFieldHandler(e, 'text')}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Email Address">
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'Δεν έχετε εισάγει έγκυρο Email',
                            }, {
                                required: true, message: 'Παρακαλώ εισάγετε ένα Email',
                            }],
                        })(
                            <Input
                                name="email"
                                addonBefore="@"
                                type="email"
                                placeholder="Εισάγετε Email"
                                onChange={(e) => updateNestedFieldHandler(e, 'text')}
                            />
                        )}
                    </Form.Item>

                </Col>
            </Row>
        </Form>
    );
};
// export default oldCertificate;

const IssuedCertificateForm = Form.create({ name: 'certificateForm' })(oldCertificate);
export default IssuedCertificateForm;