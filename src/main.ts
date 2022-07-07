import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import { registerApp } from "@/global";
import hyRequest from "./service";

const app = createApp(App);
registerApp(app);
app.use(store);
app.use(router);
app.mount("#app");

// console.log(process.env);
// console.log(process.env.VUE_APP_BASE_URL);

interface DataType {
  data: any;
  returnCode: string;
  success: boolean;
}

hyRequest
  .request<DataType>({
    url: "/home/multidata",
    method: "GET",
    interceptors: {
      requestInterceptor: (config) => {
        console.log("单独请求的config");
        return config;
      },
      responseInterceptor: (res) => {
        console.log("单独响应的response");
        return res;
      },
    },
    // showLoading: false,
  })
  .then((res) => {
    console.log(res);
  });
