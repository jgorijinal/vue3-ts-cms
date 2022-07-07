import { App } from "vue";
import "element-plus/dist/index.css";

import {
  ElButton,
  ElTable,
  ElAlert,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBadge,
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
];

export function registerElement(app: App): void {
  for (const cpn of components) {
    app.component(cpn.name, cpn);
  }
}
