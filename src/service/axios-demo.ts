import axios from "axios";

// // 1. 模拟get 请求
// axios
//   .request({
//     method: "GET",
//     url: "http://123.207.32.32:8000/home/multidata",
//   })
//   .then((res) => console.log(res));

// // 网站 : http://httpbin.org/get

// // 2. 模拟 get请求 , 并且传入参数
// axios
//   .get("http://httpbin.org/get", {
//     params: {
//       name: "frank",
//       age: 18,
//     },
//   })
//   .then((res) => console.log(res));

// // 3. 模拟 post 请求
// axios
//   .post("http://httpbin.org/post", {
//     data: {
//       name: "frank",
//       age: 18,
//     },
//   })
//   .then((res) => console.log(res));

// 4. 配置选项
// 4.1 全局的配置
axios.defaults.baseURL = "http://httpbin.org";
axios.defaults.timeout = 5000;
// axios.defaults.headers = {};

// 4.2 每个请求单独的配置
axios
  .get("/get", {
    params: {
      name: "frank",
      age: 18,
    },
    timeout: 5000,
    headers: {},
  })
  .then((res) => console.log(res));

// 5 . axios.all([])
axios
  .all([
    axios.get("/get", { params: { name: "frank", age: 18 } }),
    axios.post("/post", { data: { name: "frank", age: 18 } }),
  ])
  .then((res) => {
    console.log(res[0].data);
    console.log(res[1].data);
  });

// 6. 拦截器
// fn1 : 请求发送 成功会执行的函数
// fn2 : 请求发送 失败会执行的函数
axios.interceptors.request.use(
  (config) => {
    // 想做的一些操作
    // 1. 给请求添加 token
    // 2. 一些 loading 动画
    return config;
  },
  (err) => {
    console.log("请求发送失败");
    return err;
  }
);

// 数据响应成功 (服务器正常地返回了数据 200)
axios.interceptors.response.use(
  (res) => {
    console.log("响应成功的拦截");
    return res;
  },
  (err) => {
    console.log("服务器响应失败");
    return err;
  }
);
