<template>
  <div class="login-phone">
    <el-form :model="phone" :rules="rules">
      <el-form-item label="手机" prop="num" label-width="60px">
        <el-input v-model="phone.num" />
      </el-form-item>
      <el-form-item label="验证码" prop="code" label-width="60px">
        <div class="get-code">
          <el-input v-model="phone.code" />
          <el-button type="primary" class="code-button">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import rules from "../config/phone-config";

export default defineComponent({
  setup() {
    const phone = reactive({
      num: "",
      code: "",
    });
    return { phone, rules };
  },
});
</script>

<style lang="less" scoped>
.get-code {
  display: flex;
  .code-button {
    margin-left: 8px;
  }
}
</style>
