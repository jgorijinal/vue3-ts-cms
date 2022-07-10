import HYRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";
import localCache from "@/utils/cache";
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // token 放到请求头里面
      const token = localCache.getCache("token");

      if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    requestInterceptorCache: (err) => {
      return err;
    },
    responseInterceptor: (res) => {
      return res;
    },
    responseInterceptorCache: (err) => {
      return err;
    },
  },
});

export default hyRequest;
