import React, { useEffect, useRef, useState } from 'react';

import { Card, Tabs, Modal, Input, Form, message } from 'antd';

import Tables from '../components/Tables';
import CreateDrawer from '../components/CreateDrawer';

import {
  getGroupApi,
  addGroupApi,
  deleteGroupApi,
  getListApi,
  deleteListApi,
} from '../api';

const { confirm } = Modal;

const Home = () => {
  const drawerRef = useRef();
  const [activeKey, setActiveKey] = useState(0);
  const [items, setItems] = useState([]);

  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [tableList, setTableList] = useState('');

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    // 初始化分组数据
    getGroupApi().then((data) => {
      const { list } = data.data;
      const newPanes = [...items];
      list.forEach(({ name, id }) => {
        newPanes.push({
          label: name,
          key: id,
        });
      });
      setItems(newPanes);

      // 判断是否有分组
      if (!newPanes.length) {
        setGroupName('默认');
      } else {
        onTabChange(1)
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTable = () => {
    onTabChange(activeKey);
  };

  const onTabChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
    console.log('点击了活动页', newActiveKey);

    getListApi({ group_id: newActiveKey }).then((res) => {
      const { list } = res.data;
      list.forEach((item) => {
        item.key = item.id;
      });
      setTableList(list);
    });
  };

  const removeTag = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    // setActiveKey(newActiveKey);
    onTabChange(newActiveKey);
  };

  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      // 显示创建分组模态框
      setIsCreateGroupOpen(true);
    } else {
      console.log(targetKey);
      if(targetKey === 1) {
        Modal.info({
          title: '提示',
          content: '默认组无法删除',
          onOk() {
          },
        });
        return;
      }
      confirm({
        title: '提示',
        content: '是否确定删除这个分组及分组下的数据？',
        onOk() {
          deleteListApi({ group_id: targetKey }).then(() => {
            deleteGroupApi({ id: targetKey }).then(() => {
              removeTag(targetKey);
            });
          });
        },
      });
    }
  };

  /**
   * 处理创建分组
   */
  const handleCreateGroupOk = () => {
    if (!groupName.trim()) {
      messageApi.open({
        type: 'warning',
        content: '名称不能为空',
      });
      return;
    }

    // 请求发送
    addGroupApi({ name: groupName.trim() })
      .then((data) => {
        setIsCreateGroupOpen(false);
        setGroupName('');

        const { id, name } = data.data;
        const newPanes = [...items];
        newPanes.push({
          label: name,
          key: id,
        });
        setItems(newPanes);
        // setActiveKey(id);
        // onTabChange(id)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 处理分组名称同步
  const handleGroupNameChange = (e) => {
    const { value } = e.target;
    setGroupName(value);
  };

  const setDrawerEditer = (obj) => {
    obj.id = obj.key;
    drawerRef.current.setAllData(obj);
  };

  return (
    <Card>
      <Tabs
        type="editable-card"
        onChange={onTabChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={items}
        tabBarExtraContent={
          <CreateDrawer
            ref={drawerRef}
            group={items}
            updateTable={updateTable}
          ></CreateDrawer>
        }
      />

      <div style={{ display: activeKey ? 'block' : 'none' }}>
        <Tables
          tableList={tableList}
          updateTable={updateTable}
          setDrawerEditer={setDrawerEditer}
        />
      </div>

      {contextHolder}
      <Modal
        title="创建分组"
        maskClosable={false}
        open={isCreateGroupOpen}
        onOk={handleCreateGroupOk}
        onCancel={() => {
          setIsCreateGroupOpen(false);
        }}
      >
        <br />
        <Form.Item label="分组名称">
          <Input
            value={groupName}
            onChange={handleGroupNameChange}
            showCount
            maxLength={10}
          />
        </Form.Item>
      </Modal>
    </Card>
  );
};

export default Home;
