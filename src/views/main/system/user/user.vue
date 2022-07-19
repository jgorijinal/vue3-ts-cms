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
    >
      <template #status="scope">
        <el-button
          size="small"
          :type="scope.row.enable === 1 ? 'success' : 'danger'"
          >{{ scope.row.enable === 1 ? "启用" : "禁用" }}</el-button
        >
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import PageContent from "@/components/page-content";
import PageSearch from "@/components/page-search";
import usePageSearch from "@/hooks/use-page-search";
export default defineComponent({
  components: { PageSearch, PageContent },
  setup() {
    const { pageContentRef, handleResetClick, handleQueryClick } =
      usePageSearch();
    return {
      searchFormConfig,
      contentTableConfig,
      handleResetClick,
      handleQueryClick,
      pageContentRef,
    };
  },
});
</script>

<style lang="less" scoped></style>
