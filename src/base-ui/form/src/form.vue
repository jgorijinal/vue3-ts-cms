<template>
  <div class="form">
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item :label="item.label" :style="formItemStyle">
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :show-password="item.type === 'password'"
                  v-model="formData[item.field]"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select style="width: 100%" v-model="formData[item.field]">
                  <el-option
                    v-for="option in item.selectOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </template>
              <template v-if="item.type === 'datePicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.datePickerOptions"
                  v-model="formData[item.field]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import { IFormItems } from "@/base-ui/form/types";
export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    formItems: {
      type: Array as PropType<IFormItems[]>,
    },
    labelWidth: {
      type: String,
      default: "100px",
    },
    formItemStyle: {
      type: Object,
      default: () => ({ padding: "10px 10px" }),
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 6,
        md: 8,
        sm: 12,
        xs: 24,
      }),
    },
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const formData = ref({ ...props.modelValue });
    watch(
      formData,
      (newValue) => {
        context.emit("update:modelValue", newValue);
      },
      { deep: true }
    );
    return { formData };
  },
});
</script>

<style lang="less" scoped>
.form {
  padding-top: 20px;
}
</style>
