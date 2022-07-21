import { IFormItems } from "./../../../../../base-ui/form/types";
export const pageModalConfig = {
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
  ] as IFormItems[],
  colLayout: {
    xl: 24,
    lg: 24,
    md: 24,
    sm: 24,
    xs: 24,
  },
  formItemStyle: {},
  labelWidth: "80px",
};
