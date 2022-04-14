import React from 'react';
import { AppLink } from '@ice/stark-app';
import { Menu } from 'antd';

// import styles from './index.less';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { SubMenu, Item } = Menu;

// 解析菜单
export function menuRender(menuData) {
  const flatMenu = []; // 平铺的菜单
  const hiddenAppMenu = {}; // 隐藏的应用
  const routePathToItem = {}; // 菜单路径与菜单值得映射

  const loopMenu = (data, parentKey) =>
    data.map(item => {
      const { detail, children, key } = item;
      const { path } = detail;

      if (detail.addMenu !== false) {
        flatMenu[key] = {
          key,
          children,
          ...detail,
        };

        if (parentKey) {
          flatMenu[key].parentKey = parentKey;
        }

        if (!children) {
          // 只选末级节点可能没有设置path属性
          routePathToItem[path] = {
            key,
            children,
            ...detail,
          };

          if (parentKey) {
            routePathToItem[path].parentKey = parentKey;
          }

          if (detail.target === '_blank') {
            return (
              <Item id={key} key={detail.href}>
                <a href={detail.href} target="_blank" rel="noreferrer">
                  {detail?.name}
                </a>
              </Item>
            );
          } else {
            // console.log(detail, 'detail-app-link-----')
            return (
              <Item
                className={detail?.icon}
                id={detail.path}
                key={detail.path}
                // icon={<IconFont style={{ fontSize: 16 }} type={detail.icon} />}
              >
                <AppLink to={detail.path} hashType={detail.hashType}>
                  {detail?.name}
                </AppLink>
              </Item>
            );
          }
        }

        if (Array.isArray(children) && children?.length > 0) {
          return (
            <SubMenu
              key={detail.path}
              className={detail.icon}
              title={detail?.name}
              // icon={<IconFont style={{ fontSize: 16 }} type={detail?.icon} />}
            >
              {loopMenu(children, key)}
            </SubMenu>
          );
        }
      } else {
        // 收集所有隐藏应用
        hiddenAppMenu[key] = {
          key,
          children,
          ...detail,
        };

        return null;
      }
    });

  const menuItems = loopMenu(menuData, null);

  return {
    flatMenu,
    hiddenAppMenu,
    routePathToItem,
    menuItems,
  };
}
