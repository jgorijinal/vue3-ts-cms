import { IPropList } from "@/base-ui/table/types";
export const contentTableConfig = {
  propList: [
    {
      prop: "name",
      label: "商品名称",
      minWidth: "100",
      slotName: "name",
    },
    {
      prop: "oldPrice",
      label: "原价格",
      minWidth: "60",
      slotName: "oldPrice",
    },
    {
      prop: "newPrice",
      label: "现价格",
      minWidth: "60",
      slotName: "newPrice",
    },
    {
      prop: "imgUrl",
      label: "图片",
      minWidth: "70",
      slotName: "imgUrl",
    },
    {
      prop: "inventoryCount",
      label: "库存",
      minWidth: "100",
      slotName: "inventoryCount",
    },
    { prop: "status", label: "状态", minWidth: "100", slotName: "status" },
    {
      prop: "favorCount",
      label: "喜欢数",
      minWidth: "70",
      slotName: "favorCount",
    },
    {
      prop: "address",
      label: "原产地",
      minWidth: "70",
      slotName: "address",
    },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "190",
      slotName: "createAt",
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "190",
      slotName: "updateAt",
    },
    {
      label: "操作",
      minWidth: "230",
      slotName: "handler",
    },
  ] as IPropList[],
  title: "商品列表",
  showIndexColumn: true,
  showSelectColumn: true,
};
