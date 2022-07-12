<template>
  <div class="empty">
    <el-empty :image-size="200" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style lang="less" scoped>
.empty {
  height: 100%;
  .el-empty {
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
