<template>
  <div class="login-panel">
    <h1>后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><User /></el-icon>
            <span class="label-title">账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span class="label-title">手机登录</span>
          </span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control" v-if="currentTab === 'account'">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-button" @click="handleLoginClick">
      立即登录
    </el-button>
  </div>
</template>
<script lang="ts">
import loginAccount from "./login-account.vue";
import loginPhone from "./login-phone.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    loginAccount,
    loginPhone,
  },
  setup() {
    // 定义变量
    const isKeepPassword = ref(true);
    const accountRef = ref<InstanceType<typeof loginAccount>>();
    const phoneRef = ref<InstanceType<typeof loginPhone>>();
    const currentTab = ref<string>("account");

    // 定义方法
    const handleLoginClick = () => {
      if (currentTab.value === "account") {
        accountRef.value?.loginAction(isKeepPassword.value);
      } else {
        console.log("调用phone的loginActon");
      }
    };
    return {
      isKeepPassword,
      handleLoginClick,
      accountRef,
      phoneRef,
      currentTab,
    };
  },
});
</script>
<style lang="less" scoped>
.login-panel {
  width: 320px;
  margin-bottom: 130px;
  > h1 {
    text-align: center;
  }
  .label-title {
    margin-left: 6px;
  }
  .custom-tabs-label {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .account-control {
    display: flex;
    justify-content: space-between;
  }
  .login-button {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
