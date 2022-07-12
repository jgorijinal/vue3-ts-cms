<template>
  <div class="user">
    <hy-form v-bind="searchFormConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HyForm from "@/base-ui";
import { searchFormConfig } from "./config/search.config";

export default defineComponent({
  components: { HyForm },
  setup() {
    return {
      searchFormConfig,
    };
  },
});
</script>

<style lang="less" scoped></style>
