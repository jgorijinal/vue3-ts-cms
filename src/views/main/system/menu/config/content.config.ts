import { IPropList } from "@/base-ui/table/types";
export const contentTableConfig = {
  propList: [
    {
      prop: "name",
      label: "菜单名",
      minWidth: "150",
      slotName: "name",
    },
    {
      prop: "type",
      label: "菜单类型",
      minWidth: "90",
      slotName: "type",
    },
    {
      prop: "permission",
      label: "权限",
      minWidth: "90",
      slotName: "permission",
    },
    {
      prop: "url",
      label: "url路径",
      minWidth: "100",
      slotName: "url",
    },
    { prop: "icon", label: "icon名字", minWidth: "100", slotName: "icon" },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "200",
      slotName: "createAt",
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "200",
      slotName: "updateAt",
    },
    {
      label: "操作",
      minWidth: "200",
      slotName: "handler",
    },
  ] as IPropList[],
  title: "用户列表",
  showIndexColumn: true,
  showSelectColumn: false,
  childrenProps: {
    rowKey: "id",
    treeProps: {
      children: "children",
    },
  },
  showFooter: false,
};
