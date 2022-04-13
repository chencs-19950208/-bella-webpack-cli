import React from 'react';

import { CoolMainAppProps } from '../index.d';
import './index.module.less';

const CoolMainApp = (props: CoolMainAppProps) => {
  console.log(props);
  const { layout, settingMenuData, globalData, appId } = props;
  const Layout = layout;
  console.log(globalData, appId);
  if (layout) {
    return (
      <div>
        {/* @ts-ignore */}
        <Layout menuData={settingMenuData} tools={{}} microApps={''} />
      </div>
    );
  } else {
    return <div>layout is required</div>;
  }
};

export default CoolMainApp;
