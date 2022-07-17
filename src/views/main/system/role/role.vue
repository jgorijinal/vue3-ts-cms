<template>
  <div class="role">
    <page-search :search-form-config="searchFormConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      page-name="role"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
export default defineComponent({
  components: {
    PageSearch,
    PageContent,
  },
  setup() {
    return {
      contentTableConfig,
      searchFormConfig,
    };
  },
});
</script>

<style></style>
