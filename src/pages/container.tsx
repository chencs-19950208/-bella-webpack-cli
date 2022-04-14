import React, { useState, useEffect } from 'react';

import CoolMainApp from '@/libs/main-app';
import CoolStorePCLayout from '@/components/cool-store';

const menuDataConfig = require('../../mock/menu.json');

const Container = () => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    console.log(menuDataConfig);
    setMenuData(menuDataConfig.children);
  }, [menuDataConfig]);

  return (
    <div>
      <CoolMainApp
        appId="cool-container"
        settingMenuData={menuData}
        globalData={{
          token: 1,
          userId: 2,
        }}
        layout={CoolStorePCLayout}
      />
    </div>
  );
};

export default Container;
