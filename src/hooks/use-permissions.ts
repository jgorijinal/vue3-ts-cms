import { useStore } from "@/store";
export default function usePermissions(pageName: string, handleName: string) {
  const store = useStore();
  const permissions = store.state.login.permissions;
  const verifyPermission = `system:${pageName}:${handleName}`;
  return Boolean(permissions.find((item) => item === verifyPermission));
}
