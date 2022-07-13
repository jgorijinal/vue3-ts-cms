<template>
  <div class="user">
    <hy-form v-bind="searchFormConfig" v-model="formData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import HyForm from "@/base-ui";
import { searchFormConfig } from "./config/search.config";
import { useStore } from "@/store";

export default defineComponent({
  components: { HyForm },
  setup() {
    const formData = ref({
      name: "",
      password: "",
      sports: "",
      createTime: "",
    });
    const store = useStore();
    store.dispatch("system/getPageListAction", {
      pageUrl: "/users/list",
      queryInfo: {
        offset: "0",
        size: 10,
      },
    });

    const userList = computed(() => store.state.system.userList);
    const userCount = computed(() => store.state.system.userCount);

    return {
      searchFormConfig,
      formData,
    };
  },
});
</script>

<style lang="less" scoped></style>
