import { IRootState, IStoreType } from "./types";
import { createStore, useStore as useVuexStore, Store } from "vuex";
import loginModule from "./login/login";
import systemModule from "./main/system/system";
import { getPageListData } from "@/service/main/system/system";

const store = createStore<IRootState>({
  state: () => {
    return {
      name: "frank",
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: [],
    };
  },
  mutations: {
    changeEntireDepartment(state, entireDepartment) {
      state.entireDepartment = entireDepartment;
    },
    changeEntireRole(state, entireRole) {
      state.entireRole = entireRole;
    },
    changeEntireMenu(state, entireMenu) {
      state.entireMenu = entireMenu;
    },
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 请求 部门 和 角色 数据
      const departmentResult = await getPageListData("department/list", {
        offset: 0,
        size: 1000,
      });
      const { list: departmentList } = departmentResult.data;
      commit("changeEntireDepartment", departmentList);

      const roleResult = await getPageListData("role/list", {
        offset: 0,
        size: 1000,
      });
      const { list: roleList } = roleResult.data;
      commit("changeEntireRole", roleList);

      // 请求 菜单 的数据
      const menuResult = await getPageListData("/menu/list", {});
      const { list: menuList } = menuResult.data;
      commit("changeEntireMenu", menuList);
    },
  },
  modules: {
    login: loginModule,
    system: systemModule,
  },
});

// 对 store 做初始化
export function setupStore() {
  store.dispatch("login/loadLocalLogin"); //调这个
  // store.dispatch("getInitialDataAction"); // 上面的 请求部门和角色数据
}

export function useStore(): Store<IStoreType> {
  return useVuexStore();
}
export default store;
