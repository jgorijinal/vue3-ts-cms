import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("@/views/home/home.vue"),
  },
  {
    path: "/login",
    component: () => import("@/views/login/login.vue"),
  },
];
const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
