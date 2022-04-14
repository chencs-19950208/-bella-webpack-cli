import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { appHistory } from '@ice/stark-app';

import { LayoutProps } from '@/libs/main-app/index.d';
import { getHeaderMenuData, getLeftMenuList } from '@/utils/commonUtils/menu';

import Header from './components/header';
import Asider from './components/asider';

import './index.less';

const { Content, Sider } = Layout;

function CoolStorePCLayout(props: LayoutProps) {
  const { menuData, microApps: MircoApps } = props;

  console.log(MircoApps, 'microApps-----00000');

  console.log(props, '=-=-=-=');
  // 获取顶部菜单项
  let headerMenuData = getHeaderMenuData(menuData);
  const [menuRoutes, setMenuRoutes] = useState([]);

  const onTabClick = item => {
    const newRoutes = getLeftMenuList(item.key, menuData);
    setMenuRoutes(newRoutes);
  };

  const handleMenuClick = (key: string) => {
    // appHistory.push(key);
  };

  useEffect(() => {
    const newMenuRoutes = getLeftMenuList('operation', menuData);
    setMenuRoutes(newMenuRoutes);
  }, [menuData]);

  return (
    <div className="mainApp">
      <Layout>
        <Header
          headerTabs={headerMenuData}
          onTabClick={onTabClick}
          defaultActiveKey={'operation'}
        />
        <Layout>
          <Sider width={180} className="site-layout-background">
            <Asider menuData={menuRoutes} onHandleMenu={handleMenuClick} defaultAsideKey={{}} />
          </Sider>
          <Layout className="right-content" style={{ padding: 10 }}>
            <Content className="right-content">{MircoApps}</Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default CoolStorePCLayout;
