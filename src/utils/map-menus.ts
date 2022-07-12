import { RouteRecordRaw } from "vue-router";
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
      } else {
        _recurseGetRoute(menu.children);
      }
    }
  };

  _recurseGetRoute(userMenus);

  return routes;
}
