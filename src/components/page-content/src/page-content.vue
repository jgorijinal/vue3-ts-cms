<template>
  <div class="page-content">
    <hy-table :tableData="dataList" v-bind="contentTableConfig">
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
import { defineComponent, computed } from "vue";
import HyTable from "@/base-ui/table";
import { useStore } from "@/store";
export default defineComponent({
  components: {
    HyTable,
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true,
    },
    pageName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const getPageData = (queryInfo: any = {}) => {
      store.dispatch("system/getPageListAction", {
        pageName: props.pageName,
        queryInfo: {
          offset: "0",
          size: 10,
          ...queryInfo,
        },
      });
    };
    getPageData();
    // const userList = computed(() => store.state.system.userList);
    // const userCount = computed(() => store.state.system.userCount);

    const dataList = computed(() =>
      store.getters["system/pageListData"](props.pageName)
    );
    return {
      dataList,
      getPageData,
    };
  },
});
</script>

<style lang="less" scoped>
.handler-btns {
  display: flex;
  justify-content: center;
  .el-icon {
    margin-right: 4px;
  }
}
</style>
