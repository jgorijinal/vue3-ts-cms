import HYRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // token 放到请求头里面
      // 假设在 vuex里拿到了token

      const token = "";
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
      }

      console.log("请求成功拦截");
      return config;
    },
    requestInterceptorCache: (err) => {
      console.log("请求失败拦截");
      return err;
    },
    responseInterceptor: (res) => {
      console.log("响应成功拦截");
      return res;
    },
    responseInterceptorCache: (err) => {
      console.log("响应失败拦截");
      return err;
    },
  },
});

export default hyRequest;
