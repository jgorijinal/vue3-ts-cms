import localCache from "@/utils/cache";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/main.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "note-found",
    component: () => import("@/views/not-found/not-found.vue"),
  },
];
const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = localCache.getCache("token");
    if (!token) {
      return "/login";
    }
  }
});

export default router;
