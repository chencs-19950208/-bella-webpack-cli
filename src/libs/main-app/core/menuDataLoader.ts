import { MenuItemTypes } from '../index.d';

// 对于菜单数据处理
export const menuDataLoader = (menuData: Array<MenuItemTypes>) => {
  const registerHtmlApps = []; // html类型微应用配置
  // const registerFrameApps = []; // iframe类型得微应用配置
  const registerUrlApps = []; // cdn类型得微应用配置
  // const flatMenu = {}; // 平铺菜单
  // const hiddenAppmenu = {}; // 隐藏应用
  // const routePathToItem = {}; // 菜单路径跟菜单值得映射

  const loopMenu = (menuData, parentKey) =>
    menuData.map((item: MenuItemTypes) => {
      const { key, detail, children, i18nKVs } = item;
      const path = detail.path;

      // html 方式
      if (detail.entryType === 'html' && detail.htmlSrc) {
        const selectedApp = registerHtmlApps.find((item: any) => item.src === detail.htmlSrc);
        if (selectedApp) {
          selectedApp.activePath = Array.isArray(detail.activePath);
        } else {
          const newItem = {
            key: key,
            src: detail.htmlSrc,
            name: (i18nKVs === null || i18nKVs === void 0 ? void 0 : i18nKVs.name)
              ? i18nKVs.name
              : detail === null || detail === void 0
              ? void 0
              : detail.name,
            props: detail.props,
            activePath: Array.isArray(detail.activePath) ? detail.activePath : [detail.activePath],
          } as any;

          if (detail.umd) {
            newItem.umd = detail.umd;
          }

          registerHtmlApps.push(newItem);
        }
      }

      // iframe
      // ......

      // url
      if (detail.entryType === 'url' && detail.urls) {
        const selectedApp = registerUrlApps.find((item: any) => {
          let flag = false;

          if (Array.isArray(detail.activePath)) {
            try {
              flag = JSON.stringify(detail.activePath) == JSON.stringify(item.activePath);
            } catch (e) {
              console.log(e, 'err----');
            }
          } else {
            flag = item.activePath.includes(detail.activePath);
          }

          return flag;
        });

        if (!selectedApp) {
          const newUrls = detail.urls;
          const newItem = {
            key: key,
            src: newUrls,
            props: detail.props,
            hashType: detail.hashType,
            name: (i18nKVs === null || i18nKVs === void 0 ? void 0 : i18nKVs.name)
              ? i18nKVs.name
              : detail === null || detail === void 0
              ? void 0
              : detail.name,
            activePath: Array.isArray(detail.activePath) ? detail.activePath : [detail.activePath]
          } as any;

          if (detail.umd) {
            newItem.umd = detail.umd;
          }

          registerUrlApps.push(newItem);
        }
      }

      if (Array.isArray(children) && children.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        loopMenu(children, key);
      }
    });

  loopMenu(menuData, null);
  return {
    // flatMenu: flatMenu,
    registerHtmlApps: registerHtmlApps,
    // registerFrameApps: registerFrameApps,
    registerUrlApps: registerUrlApps,
    // hiddenAppMenu: hiddenAppMenu,
    // routePathToItem: routePathToItem
  };
};
