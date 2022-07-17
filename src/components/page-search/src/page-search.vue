<template>
  <div class="page-search">
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2>高级检索</h2>
      </template>
      <template #footer>
        <div class="handle-form">
          <el-button type="primary" @click="handleQueryClick">搜索</el-button>
          <el-button @click="handleResetClick">重置</el-button>
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import HyForm from "@/base-ui";
export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true,
    },
  },
  components: {
    HyForm,
  },
  emits: ["resetBtnClick", "queryBtnClick"],
  setup(props, context) {
    // 双向绑定的属性应该是由配置文件的 field 字段来决定
    // 优化 1 : formData中的属性应该动态来决定
    const formItems = reactive(props.searchFormConfig?.formItems ?? []);
    const formOriginData: any = {};
    for (const item of formItems) {
      formOriginData[item.field] = "";
    }
    const formData = ref(formOriginData);

    // 优化2 : 点击 重置 操作
    const handleResetClick = () => {
      formData.value = formOriginData;
      context.emit("resetBtnClick");
    };

    // 3. 当用户点击 搜索
    const handleQueryClick = () => {
      context.emit("queryBtnClick", formData.value);
    };
    return {
      formData,
      handleResetClick,
      handleQueryClick,
    };
  },
});
</script>

<style lang="less" scoped>
.handle-form {
  display: flex;
  justify-content: flex-end;
  padding: 0 20px 20px 0;
}
</style>
