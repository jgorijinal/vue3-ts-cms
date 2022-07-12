<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3 + TS</span>
    </div>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse="collapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="`${item.id}`">
            <template #title>
              <el-icon>
                <component
                  :is="item.icon.replace('el-icon-', '')"
                  class="icon-type"
                />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="child in item.children" :key="child.id">
              <el-menu-item
                :index="`${child.id}`"
                @click="handleMenuItemClick(child)"
                >{{ child.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-if="item.type === 2">
          <el-menu-item :index="item.id">
            <template #title>
              <span>{{ item.name }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const userMenus = store.state.login.userMenus;

    const handleMenuItemClick = (child: any) => {
      router.push({
        path: child.url ?? "/not-found",
      });
    };

    return {
      userMenus,
      handleMenuItemClick,
    };
  },
});
</script>

<style lang="less" scoped>
.nav-menu {
  color: white;
  height: 100%;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
.el-menu {
  border-right: none;
}
</style>
