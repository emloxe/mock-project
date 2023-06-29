import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';

import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  message,
} from 'antd';

import Editor from '@monaco-editor/react';

import { addListApi, updateListApi } from '../api';

const CreateDrawer = (props, ref) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [code, setCode] = useState(
    "{\r\n  code: 0,\r\n  data: {},\r\n  msg: '成功'\r\n}"
  );
  const [name, setName] = useState('');
  const [path, setPath] = useState('');
  const [groupId, setGroupId] = useState('');
  const [remark, setRemark] = useState('');

  const { group } = props;

  useEffect(() => {}, []);

  const setAllData = ({
    code = "{\r\n  code: 0,\r\n  data: {},\r\n  msg: '成功'\r\n}",
    name = '',
    path = '',
    group_id = '',
    remark = '',
    id = '',
  }) => {
    setCode(code);
    setName(name);
    setPath(path);
    group_id && setGroupId(group_id);
    setRemark(remark);
    setId(id);
  };

  useImperativeHandle(ref, () => ({
    setAllData: (obj) => {
      setAllData(obj);
      setOpen(true);
    },
  }));

  const list = (function () {
    return group.map((item) => {
      return {
        label: item.label,
        value: item.key,
      };
    });
  })();

  // 显示输入弹框
  const showNewDrawer = () => {
    setAllData({});
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = (values) => {
    if (!name.trim()) {
      message.warning('名称不能为空');
      return;
    }

    if (!path.trim()) {
      message.warning('路径不能为空');
      return;
    }

    if (!groupId) {
      message.warning('分组必须选择');
      return;
    }

    if (id) {
      updateListApi({
        id,
        group_id: groupId,
        name: name.trim(),
        path: path.trim(),
        remark: remark,
        code: code,
      }).then(() => {
        message.success('修改成功');
        props.updateTable();
        onClose();
        setAllData({});
      });
    } else {
      addListApi({
        group_id: groupId,
        name: name.trim(),
        path: path.trim(),
        remark: remark,
        code: code,
      }).then(() => {
        message.success('添加成功');
        props.updateTable();
        onClose();
        setAllData({});
      });
    }
  };

  return (
    <>
      <Button type="primary" onClick={showNewDrawer} icon={<PlusOutlined />}>
        创建数据
      </Button>
      <Drawer
        title={(id ? '修改' : '创建') + '模拟数据'}
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button onClick={onSubmit} type="primary">
              提交
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="名称">
                <Input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="请输入名称"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="路径">
                <Input
                  value={path}
                  style={{ width: '100%' }}
                  addonBefore="/mock/"
                  placeholder="请输入路径"
                  onChange={(e) => {
                    setPath(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="所属分组">
                <Select
                  value={groupId}
                  style={{ width: 320 }}
                  onChange={(value) => {
                    console.log(`selected ${value}`);
                    setGroupId(value);
                  }}
                  options={list}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="备注">
                <Input.TextArea
                  value={remark}
                  rows={4}
                  placeholder="请输入备注"
                  onChange={(e) => {
                    setRemark(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>规则（JSON）</Col>

            <Col span={24}>
              <div
                style={{
                  border: '1px solid rgb(217, 217, 217)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                }}
              >
                <Editor
                  height="300px"
                  defaultLanguage="json"
                  options={{
                    tabSize: 2,
                  }}
                  onChange={(newValue) => {
                    setCode(newValue);
                  }}
                  value={code}
                />
              </div>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default forwardRef(CreateDrawer);
