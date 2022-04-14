import React, { useEffect } from 'react';
import { AppRouter, start } from '@ice/stark';
import { Spin } from 'antd';

import { menuDataLoader } from '../core/menuDataLoader';
import { CoolHtmlRoute, CoolUrlRoute } from '../core/appRoute';
import { CoolMainAppProps } from '../index.d';
import './index.module.less';

const CoolMainApp = (props: CoolMainAppProps) => {
  const { layout, settingMenuData, globalData, appId } = props;
  const Layout = layout;
  console.log(globalData, appId);

  const MicroApps = () => {
    const { registerHtmlApps, registerUrlApps } = menuDataLoader(settingMenuData);

    start({
      onAppEnter: (appConfig) => {
        console.log(appConfig, 'app---=====++++++');
      },
      onRouteChange: (args) => {
        console.log(args, 'args----');
      },
      onAppLeave: (appConfig) => {
        console.log(appConfig, 'app=-leave');
      },
    });

    console.log(registerUrlApps, 'registerUrlApps---');
    return (
      <AppRouter NotFoundComponent={() => <div>Not Found</div>} LoadingComponent={() => <Spin />}>
        {/* url */}
        {Array.isArray(registerUrlApps) && registerUrlApps.length > 0 && (
          <>{registerUrlApps.map(item => CoolUrlRoute(item, globalData))}</>
        )}

        {/* html */}
        {Array.isArray(registerHtmlApps) && registerHtmlApps.length > 0 && (
          <>{registerHtmlApps.map(item => CoolHtmlRoute(item, globalData))}</>
        )}

        {/* iframe 后期实现 */}
      </AppRouter>
    );
  };

  if (layout) {
    return (
      <div>
        {/* @ts-ignore */}
        <Layout menuData={settingMenuData} tools={{}} microApps={MicroApps()} />
      </div>
    );
  } else {
    return <div>layout is required</div>;
  }
};

export default CoolMainApp;
