// 2. 根据 process.env.NODE_ENV
// 开发环境 : development
// 生成环境 : production
// 测试环境 : test

//"http://123.207.32.32:8000/home/multidata"

let BASE_URL = "";
const TIME_OUT = 10000;

if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://123.207.32.32:8000";
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "http://xxxxxx/prod";
} else {
  BASE_URL = "http://xxxxxx/test";
}

export { BASE_URL, TIME_OUT };
