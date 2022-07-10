export default {
  num: [
    {
      required: true,
      message: "必须要填写手机号",
      trigger: "blur",
    },
    {
      pattern: /^[0-9]*$/,
      message: "请填写正确的手机号码",
      trigger: "blur",
    },
  ],
  code: [{}, {}],
};
