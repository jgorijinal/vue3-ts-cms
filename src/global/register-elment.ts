import { App } from "vue";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import {
  ElButton,
  ElTable,
  ElAlert,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBadge,
  ElTabPane,
  ElTabs,
  ElIcon,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElHeader,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElMenuItemGroup,
  ElEmpty,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElDatePicker,
} from "element-plus";

const components = [
  ElButton,
  ElTable,
  ElAlert,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBadge,
  ElTabPane,
  ElTabs,
  ElIcon,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElHeader,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElMenuItemGroup,
  ElEmpty,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElDatePicker,
];

export function registerElement(app: App): void {
  for (const cpn of components) {
    app.component(cpn.name, cpn);
  }
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
}
