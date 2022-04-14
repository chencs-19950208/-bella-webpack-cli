import { useEffect, useState } from 'react';
import { Menu } from 'antd';

import { menuRender } from './const';
import styles from './index.less';

const Asider = ({ menuData, onHandleMenu, defaultAsideKey }) => {
  // console.log(menuData, 'menuData----');
  console.log(defaultAsideKey, '[][][][][');
  const { defaultMenuKey, defaultOpenKey } = defaultAsideKey;
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>([]);
  const [openKeys, setOpenKeys] = useState<Array<string>>([]);
  const { menuItems } = menuRender(menuData);

  useEffect(() => {
    setSelectedKeys([defaultMenuKey]);
    setOpenKeys([defaultOpenKey]);
  }, [defaultMenuKey, defaultOpenKey]);

  const handleClick = ({ item, key, keyPath, domEvent }) => {
    onHandleMenu(key);
    // 菜单点击滚动到中心区域,  TODO 这块逻辑再看下，选择器可以根据domEvent拿到
    // if (!inlineCollapsed && document.querySelector(`#${e.key}`)) {
    //   setTimeout(() => {
    //     document.querySelector(`#${e.key}`)?.scrollIntoView({
    //       behavior: 'smooth',
    //       block: 'center',
    //       inline: 'nearest',
    //     });
    //   }, 100);
    // }
  };

  // 选择哪个菜单
  const handleSelect = function (res) {
    const { selectedKeys } = res;
    console.log(res, 'res=select====');
    setSelectedKeys(selectedKeys);
  };

  const handleOpenChange = function (newKeys) {
    console.log(newKeys, 'newKeys---===');
    setOpenKeys(newKeys);
  };

  console.log(selectedKeys, 'selectedKeys----');

  return (
    <Menu
      onClick={handleClick}
      inlineIndent={36}
      style={{ width: 180, height: '100vh', padding: '64px 6px 0 6px' }}
      // triggerSubMenuAction="hover"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={handleOpenChange}
      onSelect={handleSelect}
      mode="inline"
      theme="light"
    >
      {menuItems}
    </Menu>
  );
};

export default Asider;
