import React, { useState, useEffect } from 'react';
import { List, Skeleton, Icon, Badge, Input, Popconfirm, message } from 'antd';
import callFetch, { api } from '../../services/UseFetch';

const Folder = (props) => {
    const [files, setFiles] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        callFetch('main/ls/' + props.path, 'GET').then(res => {
            if (res) {
                setFiles(res);
            }
        });
    }

    const search = (value) => {
        setSearchValue(value);
    }
    const DownloadCert = (url) => {
        callFetch(url, 'GET').then(res => {
            if (res !== null) {
                window.location.href = api + url;
            }

        });
    }

    const calculateDataToDisplay = () => {
        if (searchValue) {
            return files.filter((file) => {
                return file.toUpperCase().indexOf(searchValue.toUpperCase()) >= 0;
            });
        }
        return files;
    }

    const deleteFile = (file) => {
        callFetch('main/' + props.path + '/' + file, 'DELETE').then(res => {
            if (res) {
                message.info('Το αρχείο διαγράφτηκε επιτυχώς');
                let filesCopy = [...files];
                const index = filesCopy.findIndex((f) => file === f);
                filesCopy.splice(index, 1);
                setFiles(filesCopy);
            }
        });
    }

    const filesToDisplay = calculateDataToDisplay();

    return (
        <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={filesToDisplay}
            pagination={{
                showSizeChanger: true,
                size: 'small',
                pageSize: pageSize,
                onShowSizeChange: (val, size) => { setPageSize(size) }
            }}
            header={<div>
                <div>
                    <strong>
                        <Icon theme="twoTone" twoToneColor="#f5cd00" type="folder-open" /> {'intermediate/' + props.path}
                    </strong>
                    <Badge count={files.length} className="filecounter" />
                </div>
                <div>
                    <Input.Search
                        placeholder="Search file"
                        onSearch={search}
                        className="IsFullwidth searchbar" />
                </div>
            </div>}
            renderItem={(item) => (
                <List.Item actions={[
                    <Popconfirm title="Είστε σίγουρος για την διαγραφή αρχείου?" onConfirm={() => { deleteFile(item) }} okText="Yes" cancelText="No">
                        <span className="Link" title="Διαγραφή"><Icon type="delete" theme="twoTone" twoToneColor="#eb2f96" /></span>
                    </Popconfirm>,
                    <span className="Link" onClick={() => DownloadCert('main/' + props.path + '/' + item)} title="Κατέβασμα">
                        <Icon type="download" /></span>]}>
                    <Skeleton avatar title={false} loading={false} >
                        <List.Item.Meta title={item} />
                    </Skeleton>
                </List.Item>)}
        />
    );
};

export default Folder;