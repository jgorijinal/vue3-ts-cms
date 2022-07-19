import { RouteRecordRaw } from "vue-router";
let firstMenu: any = null;
export default function mapMenusToRoutes(userMenus: any): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];
  // 1.先默认加载所有的 routes
  const allRoutes: RouteRecordRaw[] = [];
  const routesFiles = require.context("../router/main", true, /\.ts/); // 加载文件
  routesFiles.keys().forEach((key) => {
    // console.log(key); ./story/chat/chat.ts
    const route = require("../router/main" + key.split(".")[1]);
    // console.log(route.default);
    allRoutes.push(route.default);
  });

  //2. 根据菜单获取需要添加的routes
  const _recurseGetRoute = (userMenus: any) => {
    for (const menu of userMenus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url);
        if (route) {
          routes.push(route);
        }
        if (!firstMenu) {
          firstMenu = menu; //保存 firstMenu
        }
      } else {
        _recurseGetRoute(menu.children);
      }
    }
  };

  _recurseGetRoute(userMenus);

  return routes;
}

export function mapPathToMenu(userMenus: any[], path: string): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = mapPathToMenu(menu.children, path);
      if (findMenu) {
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === path) {
      return menu;
    }
  }
}

export { firstMenu };

import { IBreadcrumb } from "./../base-ui/breadcrumb/types";
export function mapPathToBreadcrumb(
  userMenus: any[],
  currentPath: string
): any {
  const breadcrumbs: IBreadcrumb[] = [];
  userMenus.forEach((menu) => {
    if (currentPath.includes(menu.url)) {
      breadcrumbs.push({ name: menu.name });
      menu.children.forEach((child: any) => {
        if (child.url === currentPath) {
          breadcrumbs.push({ name: child.name });
        }
      });
    }
  });
  return breadcrumbs;
}

export function mapMenuToPermissions(userMenus: any[]) {
  const permissions: string[] = [];

  const _recurseGetPermissions = (userMenus: any[]) => {
    for (const item of userMenus) {
      if (item.type === 1 || item.type === 2) {
        _recurseGetPermissions(item.children ?? []);
      } else if (item.type === 3) {
        permissions.push(item.permission);
      }
    }
  };
  _recurseGetPermissions(userMenus);

  return permissions;
}
