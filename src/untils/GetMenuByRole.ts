import type { RouteRecordRaw } from "vue-router";

// 根据角色过滤菜单
export function filterRoutesByRoles(routes : RouteRecordRaw[], role : string) : RouteRecordRaw[] {
  const res : RouteRecordRaw[] = [];
  for (const route of routes) {
    const tmp = { ...route };
    // 检查当前路由是否有权限
    if (hasPermission(tmp, role)) {
      // 如果有子路由，递归过滤
      if (tmp.children) {
        tmp.children = filterRoutesByRoles(tmp.children, role);
      }
      res.push(tmp);
    }
  }
  return res;
}
export function hasPermission(route: RouteRecordRaw, roleStr: string): boolean {
  if (route.meta?.role) {
    const roleList = roleStr.split(',').map(r => r.trim())
    return (route.meta.role as string[]).some(r => roleList.includes(r))
  }
  return true
}