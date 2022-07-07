<template>
  <div class="login-panel">
    <h1>后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><User /></el-icon>
            <span class="label-title">账号登录</span>
          </span>
        </template>
        <h1>账号登录</h1>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span class="label-title">手机登录</span>
          </span>
        </template>
        <h1>手机登录</h1>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
export default {};
</script>
<style lang="less" scoped>
.login-panel {
  width: 320px;
  > h1 {
    text-align: center;
  }
  // &.custom-tabs-label {
  //   display: flex;
  //   align-content: center;
  // }
  .label-title {
    margin-left: 6px;
  }
  .custom-tabs-label {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
