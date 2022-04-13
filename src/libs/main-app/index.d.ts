// 统一容器组件类型声明
import { AppRouterProps } from '@ice/stark/lib/AppRouter';
import { BaseConfig } from '@ice/stark/lib/apps';
import React from 'react';

export interface MicroAppTypes extends BaseConfig {
  [k: string]: any;
}

export interface MenuItemDetailTypes {
  name: string; // 名称
  icon?: string; // icon
  entryType: 'html' | 'url' | 'iframe' | string; // 进入到微应用的方式
  target: '_blank' | '_self' | string; // 跳转方式
  search?: 'a=1&b=2'; // 连接参数
  umd?: boolean; // 是否开启打包方式是umd
  htmlSrc?: string; // html 地址
  iframeSrc?: string; // iframe 地址
  appOrigin?: string;
  urls?: Array<string>; // entryType 为 url，这里配置的是cdn地址
  href?: string;
  hashType?: boolean; // 跳转微应用路由是否以hash的方式
  activePath: ((url: string) => boolean) | string | string[]; // 微应用的路由
  path: string; // 菜单的path，也可以理解为微应用的basename
  props?: object; // 传入到微应用的props
  isGray?: boolean; // 是否为灰度
  i18nKey?: string; // 国际化相关，后面实现
  i18nKVs?: {
    name: string;
  };
}

export interface MenuItemTypes {
  key: string;
  children?: Array<MenuItemTypes>;
  detail: MenuItemDetailTypes;
  i18nKVs?: {
    [k: string]: any;
  };
}

export interface FlatMenuItemType extends MenuItemDetailTypes {
  key: string;
  children?: Array<MenuItemTypes>;
}
export interface RouteToMenuItemType {
  [key: string]: FlatMenuItemType;
}
// export declare type iframeLoadCallbackTypes = (err: Error | null, appInfo: MicroAppTypes) => any;
export interface FlatMenuType {
  [k: string]: FlatMenuItemType;
}

export interface MenuParseResultTypes {
  registerHtmlApps: Array<MicroAppTypes>;
  registerFrameApps: Array<MicroAppTypes>;
  registerUrlApps: Array<MicroAppTypes>;
  flatMenu: FlatMenuType;
  hiddenAppMenu: FlatMenuType;
  routePathToItem: RouteToMenuItemType;
}

export interface ParseMenuDataTypes extends MenuParseResultTypes {
  originMenuData?: Array<MenuItemTypes>;
}

export interface CoolMainAppProps extends AppRouterProps {
  appId: string;
  globalData?: Record<string, any>;
  getMenuParseData?: (data: ParseMenuDataTypes) => any;
  iframeLoadCallback?: any; // 后期补充
  plugins?: Array<any>;
  layout?: React.ComponentType<LayoutProps>;
  CoolMonitorConfig?: Record<string, any>; // 监控，后期补充
  settingMenuData?: Array<MenuItemTypes>;
}

/**
 * 用户自定义的layout组件，
 * 会接受全局设置的api（包含相关数据的调用方法）
 * MicroApps (微应用容器) menuData (菜单数据)
 * 监控相关配置
 */
export interface LayoutProps {
  menuData: Array<MenuItemTypes>;
  tools: {
    [key: string]: (...args: any[]) => any;
  };
  microApps: React.ReactNode;
  // coolMonitor: Core; // 后期补充
}
