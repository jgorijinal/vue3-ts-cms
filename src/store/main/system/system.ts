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
    };
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case "users":
            return state.usersList;
          case "role":
            return state.roleList;
        }
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
      }
    },
  },
};

export default systemModule;
