<template>
  <div class="nav-header">
    <el-icon class="fold" v-if="!isFold" @click="handleFold"><Fold /></el-icon>
    <el-icon class="fold" v-else @click="handleFold"><Expand /></el-icon>
    <div class="actions">
      <div><hy-breadcrumb :breadcrumbs="breadcrumbs" /></div>
      <div class="info">
        <el-avatar :icon="UserFilled" />
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ username }}
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>系统管理</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { UserFilled } from "@element-plus/icons-vue";
import HyBreadcrumb from "@/base-ui/breadcrumb/src/breadcrumb.vue";
import { useRoute } from "vue-router";
import { mapPathToBreadcrumb } from "@/utils/map-menus";

export default defineComponent({
  components: {
    HyBreadcrumb,
  },
  emits: ["foldChange"],
  setup(props, { emit }) {
    const isFold = ref<boolean>(false);
    const store = useStore();
    const handleFold = () => {
      isFold.value = !isFold.value;
      // console.log(isFold.value);
      emit("foldChange", isFold.value);
    };
    const username = computed(() => store.state.login.userInfo.name);

    // 面包屑
    const route = useRoute();

    const breadcrumbs = computed(() => {
      const userMenus = computed(() => store.state.login.userMenus);
      const currentPath = route.path;
      return mapPathToBreadcrumb(userMenus.value, currentPath);
    });
    console.log(breadcrumbs);
    return {
      isFold,
      handleFold,
      username,
      UserFilled,
      breadcrumbs,
    };
  },
});
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;
  align-items: center;
}
.fold {
  font-size: 30px;
  cursor: pointer;
}
.actions {
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}
.el-dropdown {
  cursor: pointer;
}
.info {
  display: flex;
  align-items: center;
  .el-avatar {
    margin-right: 10px;
  }
}
</style>
