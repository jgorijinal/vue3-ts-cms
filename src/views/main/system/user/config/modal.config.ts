import { IFormItems } from "./../../../../../base-ui/form/types";
export const pageModalConfig = {
  formItems: [
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
      label: "密码",
      field: "password",
      placeholder: "请输入密码",
      isHidden: false,
    },
    {
      type: "input",
      label: "手机号",
      field: "cellphone",
      placeholder: "请输入手机号",
    },
    {
      type: "select",
      label: "部门",
      field: "departmentId",
      placeholder: "请输入部门名",
      selectOptions: [],
    },
    {
      type: "select",
      label: "角色",
      field: "roleId",
      placeholder: "请输入角色名",
      selectOptions: [],
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
