import { formConfig } from "@/base-ui/form/types";

export const searchFormConfig: formConfig = {
  formItems: [
    {
      type: "input",
      label: "id",
      field: "id",
      placeholder: "请输入id",
    },
    {
      type: "input",
      label: "用户名",
      field: "name",
      placeholder: "请输入用户名",
    },
    {
      type: "input",
      label: "真实姓名",
      field: "realname",
      placeholder: "请输入真实姓名",
    },
    {
      type: "input",
      label: "手机号",
      field: "cellphone",
      placeholder: "请输入手机号",
    },
    {
      type: "select",
      label: "用户状态",
      field: "enable",
      placeholder: "请选择用户状态",
      selectOptions: [
        {
          label: "启用",
          value: 1,
        },
        {
          label: "禁用",
          value: 0,
        },
      ],
    },
    {
      type: "datePicker",
      label: "日期",
      field: "createAt",
      datePickerOptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "daterange",
      },
    },
  ],
  labelWidth: "100px",
  formItemStyle: { padding: "10px 20px" },
  colLayout: {
    xl: 8,
    lg: 8,
    md: 8,
    sm: 12,
    xs: 24,
  },
};
