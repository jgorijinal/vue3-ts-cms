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
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import PageContent from "@/components/page-content";
import PageSearch from "@/components/page-search";
import usePageSearch from "@/hooks/user-page-search";
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
