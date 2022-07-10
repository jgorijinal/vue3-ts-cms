import { IRootState, IStoreType } from "./types";
import { createStore, useStore as useVuexStore, Store } from "vuex";
import loginModule from "./login/login";

const store = createStore<IRootState>({
  state: () => {
    return {
      name: "frank",
      age: 18,
    };
  },
  modules: {
    login: loginModule,
  },
});

// 对 store 做初始化
export function setupStore() {
  store.dispatch("login/loadLocalLogin"); //调这个
}

export function useStore(): Store<IStoreType> {
  return useVuexStore();
}
export default store;
