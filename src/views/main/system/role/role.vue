<template>
  <div class="role">
    <page-search
      :search-form-config="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      page-name="role"
      ref="pageContentRef"
      @create-btn-click="handleCreateData"
      @edit-btn-click="handleEditData"
    ></page-content>
    <page-modal
      pageName="role"
      :modalConfig="pageModalConfig"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <div class="menu-tree">
        <el-tree
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckClick"
          ref="elTreeRef"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, nextTick } from "vue";
import { useStore } from "@/store";

import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { pageModalConfig } from "./config/modal.config";

import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";

import usePageSearch from "@/hooks/use-page-search";
import usePageModal from "@/hooks/use-page-modal";

import { mapMenuToLeafKeys } from "@/utils/map-menus";
import { ElTree } from "element-plus";
export default defineComponent({
  components: {
    PageSearch,
    PageContent,
    PageModal,
  },
  setup() {
    const { pageContentRef, handleResetClick, handleQueryClick } =
      usePageSearch();

    const elTreeRef = ref<InstanceType<typeof ElTree>>();
    const editCallback = (item: any) => {
      const leafKeys = mapMenuToLeafKeys(item.menuList);
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false);
      });
    };
    const { pageModalRef, handleCreateData, handleEditData, defaultInfo } =
      usePageModal(undefined, editCallback);
    const store = useStore();
    const menus = computed(() => store.state.entireMenu);

    const otherInfo = ref({});
    const handleCheckClick = (data1: any, data2: any) => {
      const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys];
      otherInfo.value = { menuList: menuList };
    };

    return {
      contentTableConfig,
      searchFormConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      pageModalRef,
      handleCreateData,
      handleEditData,
      defaultInfo,
      pageModalConfig,
      menus,
      otherInfo,
      handleCheckClick,
      elTreeRef,
    };
  },
});
</script>

<style lang="less" scoped>
.menu-tree {
  padding: 10px 20px;
}
</style>
