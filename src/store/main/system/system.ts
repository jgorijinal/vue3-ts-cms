import { Module } from "vuex";
import { IRootState } from "./../../types";
import { ISystemState } from "./types";
import {
  deletePageData,
  getPageListData,
  createPageData,
  editPageData,
} from "./../../../service/main/system/system";

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
    };
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`];
      };
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`];
      };
    },
  },
  mutations: {
    changeUserInfo(state, list) {
      state.usersList = list;
    },
    changeUserCount(state, count) {
      state.usersCount = count;
    },
    changeRoleInfo(state, list) {
      state.roleList = list;
    },
    changeRoleCount(state, count) {
      state.roleCount = count;
    },
    changeGoodsInfo(state, list) {
      state.goodsList = list;
    },
    changeGoodsCount(state, count) {
      state.goodsCount = count;
    },
    changeMenuInfo(state, list) {
      state.menuList = list;
    },
    changeMenuCount(state, count) {
      state.menuCount = count;
    },
  },
  actions: {
    async getPageListAction({ commit }, payload) {
      // 1. 获取 pageUrl
      const pageName = payload.pageName;
      const pageUrl = `/${pageName}/list`;

      // 2 . 页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo);

      // 3 .将数据保存到 state 中
      const { list, totalCount } = pageResult.data;
      switch (pageName) {
        case "users":
          commit("changeUserInfo", list);
          commit("changeUserCount", totalCount);
          break;
        case "role":
          commit("changeRoleInfo", list);
          commit("changeRoleCount", totalCount);
          break;
        case "goods":
          commit("changeGoodsInfo", list);
          commit("changeGoodsCount", totalCount);
          break;
        case "menu":
          commit("changeMenuInfo", list);
          commit("changeMenuCount", totalCount);
          break;
      }
    },
    async deletePageDataAction(context, payload) {
      // 1. 获取删除 url : /users/4 做拼接
      // pageName -> users
      // id ->  4
      const { pageName, id } = payload;
      const pageUrl = `/${pageName}/${id}`;
      // 2. 发送删除网络请求
      await deletePageData(pageUrl);
      // 3. 重新拿到最新数据
      context.dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },
    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload;
      const pageUrl = `/${pageName}`;

      // 发送新建请求
      await createPageData(pageUrl, newData);
      // 重新获取最新列表数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },
    async editPageDataAction({ dispatch }, payload) {
      const { pageName, newData, id } = payload;
      const pageUrl = `/${pageName}/${id}`;
      //发送编辑请求
      await editPageData(pageUrl, newData);
      //重新获取最新列表数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },
  },
};

export default systemModule;
