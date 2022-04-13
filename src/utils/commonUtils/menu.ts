import { MenuItemTypes } from '@/libs/main-app/index.d';

export const getHeaderMenuData = (data: Array<MenuItemTypes>) => {
  if (Array.isArray(data) && data.length === 0) {
    return [];
  }

  // 取出第一层
  const result = [] as any;
  data.forEach(item => {
    result.push({
      id: item.key,
      key: item.key,
      name: item.detail.name,
      path: item.detail.path,
      hashType: item.detail.hashType,
      isChildren: !!item.children,
    });
  });

  return result;
};

// 处理左侧的菜单项
export const getLeftMenuList = (key, data) => {
  console.log(key, data);
  if (Array.isArray(data) && data.length === 0) {
    return [];
  }

  let result;

  data.forEach(col => {
    if (col.key === key) {
      result = col.children;
    }
  });

  return result || [];
};
