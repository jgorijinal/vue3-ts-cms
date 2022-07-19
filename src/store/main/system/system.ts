import { Module } from "vuex";
import { IRootState } from "./../../types";
import { ISystemState } from "./types";
import { getPageListData } from "./../../../service/main/system/system";

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
  },
};

export default systemModule;
