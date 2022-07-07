import { App } from "vue";
import { registerElement } from "./register-elment";

export function registerApp(app: App) {
  registerElement(app);
}
