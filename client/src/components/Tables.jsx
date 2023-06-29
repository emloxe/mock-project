/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { Space, Table, Popconfirm, message } from 'antd';
import { deleteListApi } from '../api';

const Tables = (props) => {
  const { tableList } = props;
  // 点击确认删除
  const confirmPopconfirm = (id) => {
    deleteListApi({ id }).then(() => {
      message.success('删除成功');
      props.updateTable();
    });
  };

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
      render: (_, record) => (
        <Space size="middle">
          <a
            target="_blank"
            href={'http://127.0.0.1:3006/mock/' + record.path}
            rel="noreferrer"
          >
            {record.path}
          </a>
        </Space>
      ),
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              // console.log(record)
              props.setDrawerEditer(record);
            }}
          >
            修改
          </a>
          <a
            target="_blank"
            href={'http://127.0.0.1:3006/mock/' + record.path}
            rel="noreferrer"
          >
            查看
          </a>
          <Popconfirm
            title="确定需要删除？"
            onConfirm={() => {
              confirmPopconfirm(record.key);
            }}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // const data = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     path: 32,
  //     remark: 'New York No. 1 Lake Park',
  //   },
  // ];

  return (
    <>
      <Table columns={columns} dataSource={tableList} />
    </>
  );
};

export default Tables;
