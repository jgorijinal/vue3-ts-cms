<template>
  <page-content :contentTableConfig="contentTableConfig" pageName="goods">
    <template #imgUrl="scope">
      <el-image
        :src="scope.row.imgUrl"
        :preview-src-list="[scope.row.imgUrl]"
        style="width: 40px; height: 50px"
        preview-teleported
      />
    </template>
    <template #status="scope">
      <el-button
        size="small"
        :type="scope.row.status === 1 ? 'success' : 'danger'"
        >{{ scope.row.status === 1 ? "启用" : "禁用" }}</el-button
      >
    </template>
  </page-content>
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
