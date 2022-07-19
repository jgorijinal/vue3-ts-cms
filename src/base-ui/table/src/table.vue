<template>
  <div class="table">
    <div class="table-header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="header-handler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        :width="60"
        align="center"
      ></el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column align="center" v-bind="item" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop ? item.prop : "无"] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="table-footer">
        <el-pagination
          :currentPage="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IPropList } from "../types";
export default defineComponent({
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    propList: {
      type: Array as PropType<IPropList[]>,
      // required: true,
    },
    showIndexColumn: {
      type: Boolean,
      default: false,
    },
    showSelectColumn: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    total: {
      type: Number,
      default: 0,
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 1, pageSize: 10 }),
    },
    childrenProps: {
      type: Object,
      default: () => ({}),
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["selectionChange", "update:page"],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit("selectionChange", value);
    };
    const handleSizeChange = (pageSize: number) => {
      emit("update:page", { ...props.page, pageSize: pageSize });
    };
    const handleCurrentChange = (currentPage: number) => {
      emit("update:page", { ...props.page, currentPage: currentPage });
    };
    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>
<style lang="less" scoped>
.table {
  padding: 10px;
  border-top: 20px solid #f0f2f5;
}
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 6px;
  .title {
    font-weight: bold;
  }
}
.footer {
  display: flex;
  justify-content: flex-end;
  padding: 6px 6px;
}
.el-table__indent {
  padding-left: 0px;
}
</style>
