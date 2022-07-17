import { formConfig } from "@/base-ui/form/types";

export const searchFormConfig: formConfig = {
  formItems: [
    {
      type: "input",
      label: "角色名",
      field: "name",
      placeholder: "请输入角色名",
    },
    {
      type: "input",
      label: "权限介绍",
      field: "intro",
      placeholder: "请输入权限介绍",
    },
    {
      type: "datePicker",
      label: "创建时间",
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
    xl: 8,
    lg: 8,
    md: 8,
    sm: 12,
    xs: 24,
  },
};
