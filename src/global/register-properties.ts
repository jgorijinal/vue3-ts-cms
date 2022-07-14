import { App } from "vue";
import formatUtcString from "@/utils/date-format";

export function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(utcString: string) {
      return formatUtcString(utcString);
    },
  };
}
