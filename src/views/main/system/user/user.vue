<template>
  <div class="user">
    <page-search
      :search-form-config="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      page-name="users"
      ref="pageContentRef"
      @create-btn-click="handleCreateData"
      @edit-btn-click="handleEditData"
    >
      <template #status="scope">
        <el-button
          size="small"
          :type="scope.row.enable === 1 ? 'success' : 'danger'"
          >{{ scope.row.enable === 1 ? "启用" : "禁用" }}</el-button
        >
      </template>
    </page-content>
    <page-modal
      :modalConfig="modalConfigRef"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      pageName="users"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";

import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { pageModalConfig } from "./config/modal.config";

import PageContent from "@/components/page-content";
import PageSearch from "@/components/page-search";
import PageModal from "@/components/page-modal";

import usePageSearch from "@/hooks/use-page-search";
import usePageModal from "@/hooks/use-page-modal";

export default defineComponent({
  components: { PageSearch, PageContent, PageModal },
  setup() {
    const { pageContentRef, handleResetClick, handleQueryClick } =
      usePageSearch();

    // pageModel相关的 hook
    // 1. 处里密码逻辑
    const createCallback = () => {
      const passwordItem = pageModalConfig.formItems.find(
        (item) => item.field === "password"
      );
      passwordItem!.isHidden = false;
    };
    const editCallback = () => {
      const passwordItem = pageModalConfig.formItems.find(
        (item) => item.field === "password"
      );
      passwordItem!.isHidden = true;
    };

    // 2. 动态添加 角色和部门 列表
    const store = useStore();
    const modalConfigRef = computed(() => {
      const departmentItem = pageModalConfig.formItems.find(
        (item) => item.field === "departmentId"
      );
      departmentItem!.selectOptions = store.state.entireDepartment.map(
        (item) => {
          return { label: item.name, value: item.id };
        }
      );

      const roleItem = pageModalConfig.formItems.find(
        (item) => item.field === "roleId"
      );
      roleItem!.selectOptions = store.state.entireRole.map((item) => {
        return { label: item.name, value: item.id };
      });
      return pageModalConfig;
    });

    // 3. 调用 hook 获取公共变量和函数
    const { pageModalRef, handleCreateData, handleEditData, defaultInfo } =
      usePageModal(createCallback, editCallback);
    return {
      searchFormConfig,
      contentTableConfig,
      handleResetClick,
      handleQueryClick,
      pageContentRef,
      modalConfigRef,
      handleCreateData,
      handleEditData,
      pageModalRef,
      defaultInfo,
    };
  },
});
</script>

<style lang="less" scoped></style>
