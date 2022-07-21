<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      title="新建用户"
      width="30%"
      center
      destroy-on-close
    >
      <hy-form v-bind="modalConfig" v-model="formData"></hy-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import HyForm from "@/base-ui/form/src/form.vue";
import { useStore } from "@/store";

export default defineComponent({
  components: {
    HyForm,
  },
  props: {
    modalConfig: {
      type: Object,
      required: true,
    },
    defaultInfo: {
      type: Object,
      default: () => ({}),
    },
    pageName: {
      type: String,
      required: true,
    },
    otherInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const dialogVisible = ref(false);

    const formData = ref<any>({});

    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[item.field] = newValue[item.field];
        }
      }
    );

    const store = useStore();
    // 新建 和 编辑 按钮点击处理
    const handleConfirmClick = () => {
      dialogVisible.value = false;
      // 新建
      if (Object.keys(props.defaultInfo).length === 0) {
        store.dispatch("system/createPageDataAction", {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo },
        });
      } else {
        // 编辑
        store.dispatch("system/editPageDataAction", {
          pageName: props.pageName,
          id: props.defaultInfo.id,
          newData: { ...formData.value, ...props.otherInfo },
        });
      }
    };

    return { dialogVisible, formData, handleConfirmClick };
  },
});
</script>
