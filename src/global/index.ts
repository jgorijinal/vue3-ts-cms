import { App } from "vue";
import { registerElement } from "./register-elment";
import { registerProperties } from "./register-properties";
export function registerApp(app: App) {
  registerElement(app);
  registerProperties(app);
}
