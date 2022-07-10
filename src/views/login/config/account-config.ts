export default {
  name: [
    {
      required: true,
      message: "用户名要必须填写",
      trigger: "blur",
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: "用户名必须是5~10位的字母或数字",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码要必须填写",
      trigger: "blur",
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: "密码必须是大于3位以上的字母或数字",
      trigger: "blur",
    },
  ],
};
