import axios, { AxiosResponse } from "axios";
import { AxiosInstance, AxiosRequestConfig } from "axios";
import { ElLoading } from "element-plus";
import { LoadingInstance } from "element-plus/es/components/loading/src/loading";

interface HYRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCache?: (err: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCache?: (err: any) => any;
}

interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors<T>;
  showLoading?: boolean;
}

const DEFAULT_LOADING = true;
export default class HYRequest {
  instance: AxiosInstance;
  interceptors?: HYRequestInterceptors;
  loadingInstance?: LoadingInstance;
  showLoading: boolean;

  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCache
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCache
    );
    this.showLoading = config.showLoading ?? DEFAULT_LOADING; // 如果没传 ,默认就是 true

    // 添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (this.showLoading === true) {
          this.loadingInstance = ElLoading.service({
            lock: true,
            text: "加载中",
            background: "rgba(0,0,0,0.5)",
          });
        }
        console.log("所有实例都有的拦截器 : 请求拦截成功");
        return config;
      },
      (err) => {
        console.log("所有实例都有的拦截器 : 请求拦截失败");
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        console.log("所有实例都有的拦截器 : 响应成功拦截");
        this.loadingInstance?.close();
        // 第二种 : 根据 returnCode 显示不同的错误信息
        const data = res.data;
        if (data.returnCode === "-1001") {
          console.log("界面上显示错误信息");
        } else {
          return res.data;
        }
      },
      (err) => {
        console.log("所有实例都有的拦截器 : 响应失败拦截");

        this.loadingInstance?.close();

        // 第一种:
        // 判断不同的 HTTPErrorCode 显示不同的信息
        if (err.response.status === 404) {
          console.log("404的错误");
        }
        return err;
      }
    );
  }
  request<T>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors?.requestInterceptor(config);
      }

      if (config.showLoading === false) {
        this.showLoading = false;
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors?.responseInterceptor(res);
          }
          // console.log(res);
          resolve(res);
          // 请求完了之后将 showLoading 设置为 true , 为了不想影响下一个请求
          this.showLoading = DEFAULT_LOADING;
        }) // 错误的情况也是
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING;
          reject(err);
          return err;
        });
    });
  }

  get<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "GET" });
  }
  post<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "POST" });
  }
  delete<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "DELETE" });
  }
  patch<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "PATCH" });
  }
}
