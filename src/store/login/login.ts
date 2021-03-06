import { Module } from "vuex";
import { ILoginState } from "./types";
import { IRootState } from "../types";
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId,
} from "@/service/login/login";
import { IAccount } from "@/service/login/type";
import localCache from "@/utils/cache";
import router from "@/router";
import mapMenusToRoutes from "@/utils/map-menus";
import { mapMenuToPermissions } from "@/utils/map-menus";

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
      permissions: [],
    };
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;

      // userMenus -> routes
      const routes = mapMenusToRoutes(userMenus);

      // 动态添加
      routes.forEach((route) => {
        router.addRoute("main", route);
      });

      // 获取权限按钮数组
      const permissions = mapMenuToPermissions(userMenus);
      state.permissions = permissions;
    },
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1. 登录请求逻辑
      const loginResult = await accountLoginRequest(payload);
      const { id, token } = loginResult.data;
      // 存放token, 提交 mutation
      commit("changeToken", token);
      localCache.setCache("token", token);

      // 发送初始化的请求(拿到完整的 role 和 department数据)
      dispatch("getInitialDataAction", null, { root: true });
      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      commit("changeUserInfo", userInfo);
      localCache.setCache("userInfo", userInfo);

      // 3. 获取用户的菜单列表
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      commit("changeUserMenus", userMenus);
      localCache.setCache("userMenus", userMenus);

      // 4. 跳到首页
      router.push("/main");
    },
    loadLocalLogin({ commit, dispatch }) {
      console.log("login模块开面的loadLocalLogin被调用了");
      const token = localCache.getCache("token");
      if (token) {
        commit("changeToken", token);
        // 发送初始化的请求(拿到完整的 role 和 department数据)
        dispatch("getInitialDataAction", null, { root: true });
      }
      const userInfo = localCache.getCache("userInfo");
      if (token) {
        commit("changeUserInfo", userInfo);
      }
      const userMenus = localCache.getCache("userMenus");
      if (token) {
        commit("changeUserMenus", userMenus);
      }
    },
  },
};

export default loginModule;
