<template>
  <div class="user">
    <hy-form v-bind="searchFormConfig" v-model="formData" />
    <hy-table
      :tableData="userList"
      :propList="propList"
      :showIndexColumn="true"
      :showSelectColumn="true"
      :title="title"
    >
      <template #header-handler>
        <el-button type="primary">新建用户</el-button>
      </template>
      <template #status="scope">
        <el-button
          size="small"
          :type="scope.row.enable === 1 ? 'success' : 'danger'"
          >{{ scope.row.enable === 1 ? "启用" : "禁用" }}</el-button
        >
      </template>
      <template #createAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.updateAt) }}
      </template>
      <template #handler>
        <div class="handler-btns">
          <el-button text type="primary">
            <el-icon size="default"><Edit /></el-icon>编辑</el-button
          >
          <el-button text type="primary"
            ><el-icon size="default"><Delete /></el-icon>删除</el-button
          >
        </div>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import HyForm from "@/base-ui";
import { searchFormConfig } from "./config/search.config";
import { useStore } from "@/store";
import HyTable from "@/base-ui/table";
import { IPropList } from "@/base-ui/table/types";
export default defineComponent({
  components: { HyForm, HyTable },
  setup() {
    const formData = ref({
      name: "",
      password: "",
      sports: "",
      createTime: "",
    });

    const store = useStore();
    store.dispatch("system/getPageListAction", {
      pageUrl: "/users/list",
      queryInfo: {
        offset: "0",
        size: 10,
      },
    });

    const userList = computed(() => store.state.system.userList);
    const userCount = computed(() => store.state.system.userCount);

    const propList: IPropList[] = [
      { prop: "name", label: "用户名", minWidth: "100", slotName: "name" },
      {
        prop: "realname",
        label: "真实姓名",
        minWidth: "100",
        slotName: "name",
      },
      {
        prop: "cellphone",
        label: "电话号码",
        minWidth: "100",
        slotName: "cellphone",
      },
      { prop: "enable", label: "状态", minWidth: "100", slotName: "status" },
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
    ];
    const title = "用户列表";
    return {
      searchFormConfig,
      formData,
      userList,
      propList,
      title,
    };
  },
});
</script>

<style lang="less" scoped>
.handler-btns {
  display: flex;
  justify-content: center;
}
</style>
