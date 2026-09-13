import { createRouter, createWebHistory, useRouter } from 'vue-router'
import { dynamicRoute, mainRoute } from './route'
import { useTabsStore } from '@/stores/tabs'
import { useUserStore } from '@/stores/user'
import type { RouteRecordRaw } from "vue-router";

const router = createRouter({
	history: createWebHistory(),
	routes: [...mainRoute],
	// routes: [...mainRoute,...dynamicRoute],
	scrollBehavior() {
		return {
			left: 0,
			top: 0
		}
	}
})

// 根据角色过滤菜单
function filterRoutesByRoles(routes : RouteRecordRaw[], role : string) : RouteRecordRaw[] {
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
function hasPermission(route: RouteRecordRaw, roles: string): boolean {
  if (route.meta?.role) {
    const roleList = roles.split(',').map(r => r.trim())
    return route.meta.role.some((r: string) => roleList.includes(r))
  }
  return true // 如果未设置 roles，默认可见
}


// 记录已添加的动态路由名称，用于重置
let dynamicRoutesAdded : string[] = []
export function resetRouter() {
	dynamicRoutesAdded.forEach((name) => {
		if (router.hasRoute(name)) {
			router.removeRoute(name)
		}
	})
	dynamicRoutesAdded = []
}

let isRoutesAdded = false //是否已经添加动态路由
router.beforeEach(async (to, from) => {
	document.title = to.meta.title as string
	const userStore = useUserStore()
	const token = localStorage.getItem('token')
	// 无 token 则跳转登录（需排除登录页等公开页面）
	if (!token && to.path !== '/') {
		return '/'
	}
	// 如果 token 存在但动态路由未添加，则尝试添加
	if (token && !isRoutesAdded) {
		const userInfoStr = localStorage.getItem('userInfo')
		const userInfo = userInfoStr ? JSON.parse(userInfoStr):null
		let asyncRoute:RouteRecordRaw[] = []
		console.log("role===="+userInfo.role)
		if (userInfo.role) {
			asyncRoute = filterRoutesByRoles(dynamicRoute, userInfo.role)
			userStore.asyncRoutesList = asyncRoute
			// localStorage.setItem('asyncRoute',JSON.stringify(asyncRoute))
		}
		if (asyncRoute.length > 0) {
			console.log("-------开始添加动态路由-------")
			asyncRoute.forEach(route => {
				router.addRoute(route)
				if (route.path) {
					dynamicRoutesAdded.push(route.path as string)
				}
			})
		}
		isRoutesAdded = true
		// 如果当前在登录页，跳转到主布局
		if (from.path === '/') {
			return '/layout'
		}
	}
	return true // 放行
})
//导航标签
router.afterEach((to, from) => {
	const tabsStore = useTabsStore()
	tabsStore.addTab(to)
})
export default router