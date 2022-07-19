<template>
  <div class="page-content">
    <hy-table
      :tableData="dataList"
      v-bind="contentTableConfig"
      :total="dataCount"
      v-model:page="pageInfo"
    >
      <template #header-handler>
        <el-button type="primary" v-if="isCreate">新建用户</el-button>
      </template>
      <template #createAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.updateAt) }}
      </template>
      <template #handler>
        <div class="handler-btns">
          <el-button text type="primary" v-if="isUpdate">
            <el-icon size="default"><Edit /></el-icon>编辑</el-button
          >
          <el-button text type="primary" v-if="isDelete"
            ><el-icon size="default"><Delete /></el-icon>删除</el-button
          >
        </div>
      </template>
      <!--动态添加插槽-->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import HyTable from "@/base-ui/table";
import { useStore } from "@/store";
import usePermissions from "@/hooks/use-permissions";
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
    // 验证按钮的权限
    const isCreate = usePermissions(props.pageName, "create");
    const isDelete = usePermissions(props.pageName, "delete");
    const isUpdate = usePermissions(props.pageName, "update");
    const isQuery = usePermissions(props.pageName, "query");

    // 分页器
    const pageInfo = ref({ currentPage: 1, pageSize: 10 });

    watch(pageInfo, () => {
      getPageData();
    });

    //网络请求
    const store = useStore();
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return;
      store.dispatch("system/getPageListAction", {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo,
        },
      });
    };
    getPageData();

    // Vuex 中获取数据
    const dataList = computed(() =>
      store.getters["system/pageListData"](props.pageName)
    );
    const dataCount = computed(() =>
      store.getters["system/pageListCount"](props.pageName)
    );

    // 动态获取(除了固定的插槽)插槽名称
    const otherPropSlots = props.contentTableConfig.propList.filter(
      (item: any) => {
        if (item.slotName === "createAt") return false;
        if (item.slotName === "updateAt") return false;
        if (item.slotName === "handler") return false;
        return true;
      }
    );

    return {
      dataList,
      dataCount,
      getPageData,
      pageInfo,
      otherPropSlots,
      isCreate,
      isDelete,
      isUpdate,
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
