<template>
  <div class="form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :style="formItemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[item.field]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  style="width: 100%"
                  :model-value="modelValue[item.field]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  :placeholder="item.placeholder"
                >
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
                  :model-value="modelValue[item.field]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
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
        xl: 8,
        lg: 8,
        md: 8,
        sm: 12,
        xs: 24,
      }),
    },
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const handleValueChange = (value: any, field: string) => {
      context.emit(
        "update:modelValue",
        Object.assign({ ...props.modelValue }, { [`${field}`]: value })
      );
    };
    return {
      handleValueChange,
    };
  },
});
</script>

<style lang="less" scoped>
.form {
  padding-top: 20px;
}
</style>
