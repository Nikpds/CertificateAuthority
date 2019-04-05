import React, { useState, useEffect } from 'react';
import { List, Skeleton, Icon } from 'antd';
import { Get } from '../../services/Utility';

const CertFiles = () => {
    const [files, setFiles] = useState([]);
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        Get('main/ls/certs').then(res => {
            const data = res;
            setFiles(data);
        });
    }
    return (
        <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={files}
            header={<strong>
                <Icon theme="twoTone" twoToneColor="#f5cd00" type="folder-open" /> intermediate/certs
                </strong>}
            renderItem={item => (
                <List.Item actions={[
                    <span className="Link" title="Delete key"><Icon type="delete" theme="twoTone" twoToneColor="#eb2f96" /></span>,
                    <span className="Link" title="Download file"><Icon type="download" /></span>]}>
                    <Skeleton avatar title={false} loading={false} >
                        <List.Item.Meta title={item} />
                    </Skeleton>
                </List.Item>)}
        />
    );
};

export default CertFiles;