import { Module } from "vuex";
import { IRootState } from "./../../types";
import { ISystemState } from "./types";
import { getPageListData } from "./../../../service/main/system/system";

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
    };
  },
  mutations: {
    changeUserInfo(state, list) {
      state.userList = list;
    },
    changeUserCount(state, count) {
      state.userCount = count;
    },
  },
  actions: {
    // 1 . 页面发送请求
    async getPageListAction({ commit }, payload) {
      const pageResult = await getPageListData(
        payload.pageUrl,
        payload.queryInfo
      );
      const { list, totalCount } = pageResult.data;
      commit("changeUserInfo", list);
      commit("changeUserCount", totalCount);
    },
  },
};

export default systemModule;
