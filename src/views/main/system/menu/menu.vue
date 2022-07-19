<template>
  <PageContent :contentTableConfig="contentTableConfig" pageName="menu">
    <template #permission="scope">
      {{ scope.row.permission ?? "无" }}
    </template>
  </PageContent>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import PageContent from "@/components/page-content";
import { contentTableConfig } from "./config/content.config";
export default defineComponent({
  components: {
    PageContent,
  },
  setup() {
    return {
      contentTableConfig,
    };
  },
});
</script>

<style></style>
