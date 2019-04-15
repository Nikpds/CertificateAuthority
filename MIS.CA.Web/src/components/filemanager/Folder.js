import React, { useState, useEffect } from 'react';
import { List, Skeleton, Icon, Badge, Input, Popconfirm, message } from 'antd';
import { Get, Delete, baseurl } from '../../services/Utility';

const Folder = (props) => {
    const [files, setFiles] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        Get('main/ls/' + props.path).then(res => {
            const data = res;
            if (res) {
                setFiles(data);
            }
        });
    }

    const search = (value) => {
        setSearchValue(value);
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
        Delete('main/' + props.path + '/' + file)
        .then(resp => {
            if (resp.ok) {
                message.info('Το αρχείο διαγράφτηκε επιτυχώς');
                let filesCopy = [...files];
                const index = filesCopy.findIndex((f) => file === f);
                filesCopy.splice(index, 1);
                setFiles(filesCopy);
            } else {
                message.error('An error occured while deleting the file');
            }
        })
        .catch(error => {
            console.log(error);
            message.error('An error occured while deleting the file');
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
                        <span className="Link" title="Διαγραφή"><Icon type="delete" theme="twoTone" twoToneColor="#eb2f96" /></span>,
                    </Popconfirm>,
                    <a className="Link" href={baseurl +'main/' + props.path + '/' + item} title="Κατέβασμα"><Icon type="download" /></a>]}>
                    <Skeleton avatar title={false} loading={false} >
                        <List.Item.Meta title={item} />
                    </Skeleton>
                </List.Item>)}
        />
    );
};

export default Folder;