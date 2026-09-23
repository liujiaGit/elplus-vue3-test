import { defineStore } from "pinia";
import { SysUserApi } from "@/api/SysUser";
import type { UserInfo } from "@/types/index";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { resetRouter } from "@/router";
import { useTabsStore } from "@/stores/tabs";
import type { RouteRecordRaw } from "vue-router";
import { dynamicRoute } from "@/router/route";
import { filterRoutesByRoles } from "@/untils/GetMenuByRole.ts";

export const useUserStore = defineStore("user", () => {
  const tabsStore = useTabsStore();
  const token = ref(null);
  const userInfo = ref<UserInfo | null>(null);
  const asyncRoutesList = ref<RouteRecordRaw[]>([]); // 动态路由
  const login = async (param: {}) => {
    const res = await SysUserApi.loginCheck(param);
    // console.log("登录请求res==" + JSON.stringify(res))
    if (res.code === "200") {
      localStorage.setItem("token", res.data[0].token);
      localStorage.setItem("userInfo", JSON.stringify(res.data[0]));
      userInfo.value = res.data[0];
      token.value = res.data[0].token;
      let role = res.data[0].role;
      asyncRoutesList.value = filterRoutesByRoles(dynamicRoute, role);
      return true;
    } else {
      ElMessage.error(res.msg);
      return false;
    }
  };

  const logOut = () => {
    userInfo.value = null;
    token.value = null;
    asyncRoutesList.value = []
    resetRouter(); // 移除所有动态路由
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    // 移除tabs标签
    tabsStore.tabs = [];
    tabsStore.activeTab = "";
  };
  return { userInfo, token, asyncRoutesList, login, logOut };
});
