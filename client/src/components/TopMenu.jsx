import React, {
  useState,
  useEffect
} from 'react';

import { Menu } from 'antd';

import { useNavigate, useLocation} from 'react-router-dom';

const TopMenu = () => {
const [selectedKeys, setSelectedKeys] = useState([]);

  const navigate = useNavigate();
  let { pathname } = useLocation();

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname]);
  

  const mainMenu = [
    {
      label: '数据',
      path: '/',
    },
    {
      label: '参考文档',
      path: '/doc',
    },
  ];


  const menuItems = mainMenu.map((item, index) => ({
    key: item.path,
    label: item.label,
  }));


  return (
    <Menu
      theme="dark"
      mode="horizontal"
      onSelect={({ key }) => {
        navigate(key);
        // setSelectedKeys([key]); // 本句可删除
      }}
      selectedKeys={selectedKeys}
      defaultSelectedKeys={[pathname]}
      items={menuItems}
    />
  );
};

export default TopMenu;
