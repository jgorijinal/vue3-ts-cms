import { formConfig } from "@/base-ui/form/types";

export const searchFormConfig: formConfig = {
  formItems: [
    {
      type: "input",
      label: "用户名",
      field: "name",
    },
    {
      type: "password",
      label: "密码",
      field: "password",
    },
    {
      type: "select",
      label: "喜欢的运动",
      field: "sports",
      selectOptions: [
        {
          label: "篮球",
          value: "basketball",
        },
        {
          label: "足球",
          value: "soccer",
        },
      ],
    },
    {
      type: "datePicker",
      label: "日期",
      field: "createTime",
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
    xl: 6,
    lg: 6,
    md: 8,
    sm: 12,
    xs: 24,
  },
};
