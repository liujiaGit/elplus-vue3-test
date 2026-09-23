import { createRouter, createWebHistory, useRouter } from "vue-router";
import { dynamicRoute, mainRoute } from "./route";
import { useTabsStore } from "@/stores/tabs";
import { useUserStore } from "@/stores/user";
import { filterRoutesByRoles } from "@/untils/GetMenuByRole.ts";

const router = createRouter({
  history: createWebHistory(),
  routes: [...mainRoute],
  // routes: [...mainRoute,...dynamicRoute],
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});

// 记录已添加的动态路由名称，用于重置
let dynamicRoutesAdded: string[] = [];
export function resetRouter() {
  dynamicRoutesAdded.forEach((name) => {
    if (router.hasRoute(name)) {
      router.removeRoute(name);
    }
  });
  dynamicRoutesAdded = [];
  isRoutesAdded = false
}

let isRoutesAdded = false; //是否已经添加动态路由
router.beforeEach(async (to, from) => {
  document.title = to.meta.title as string;
  const userStore = useUserStore();
  const token = localStorage.getItem("token");
  // 无 token 则跳转登录（需排除登录页等公开页面）
  if (!token && to.path !== "/") {
    return "/";
  }
   // 有 token 但已访问登录页 → 送去 Home
  if (token && to.path === "/") {
    return "/home";
  }

  // 如果 token 存在但动态路由未添加，则尝试添加
  if (token && !isRoutesAdded) {
    const userInfoStr = localStorage.getItem("userInfo");
    let asyncRoute = userStore.asyncRoutesList || [];
    if (asyncRoute.length === 0) {
      const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;
      if (userInfo?.role) {
        userStore.asyncRoutesList = filterRoutesByRoles(
          dynamicRoute,
          userInfo.role,
        );
        asyncRoute = userStore.asyncRoutesList;
      }
    }
    if (asyncRoute.length > 0) {
      asyncRoute.forEach((route) => {
        router.addRoute(route);
        if (route.name) {
          dynamicRoutesAdded.push(route.name as string);
        }
      });
      isRoutesAdded = true;
      // 动态路由添加后，重新导航到目标路由，确保能匹配到新添加的路由
      return { ...to, replace: true };
    }
  }
  return true; // 放行
});
//导航标签
router.afterEach((to, from) => {
  const tabsStore = useTabsStore();
  tabsStore.addTab(to);
});
export default router;
