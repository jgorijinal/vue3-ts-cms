import { IPropList } from "@/base-ui/table/types";
export const contentTableConfig = {
  propList: [
    {
      prop: "name",
      label: "角色名",
      minWidth: "100",
      slotName: "name",
    },
    {
      prop: "intro",
      label: "权限介绍",
      minWidth: "100",
      slotName: "intro",
    },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "250",
      slotName: "createAt",
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "230",
      slotName: "updateAt",
    },
    {
      label: "操作",
      minWidth: "230",
      slotName: "handler",
    },
  ] as IPropList[],
  title: "角色列表",
  showIndexColumn: true,
  showSelectColumn: true,
};
