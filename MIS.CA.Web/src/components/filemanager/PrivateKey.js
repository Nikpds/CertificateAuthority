import React, { useState, useEffect } from 'react';
import { List, Avatar, Button, Skeleton, Icon } from 'antd';

const PrivateKey = () => {
    const [files, setFiles] = useState([{ name: 'Nikos' }, { name: 'Stefanos' }]);
    useEffect(() => {

    });

    const getData = () => {
        return fetch('', {
            method: "GET", // *GET, POST, PUT, DELETE, etc
            headers: { "Content-Type": "application/json" }
        }).then(response => {
            const res = response.json();
            console.log(res);
        }).catch(error => console.error('Error:', error))
    }
    return (
        <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={files}
            renderItem={item => (
                <List.Item actions={[
                    <a><Icon type="delete" /></a>,
                    <a><Icon type="download" /></a>]}>
                    <Skeleton avatar title={false} loading={false} >
                        <List.Item.Meta title={item.name} />
                    </Skeleton>
                </List.Item>)}
        />
    );
};

export default PrivateKey;