import { createRouter, createWebHistory } from 'vue-router'
import { mainRoute,dynamicRoute } from './route.js'

const router = createRouter({
	history: createWebHistory(),
	// routes: mainRoute.concat(dynamicRoute),
	routes: [...mainRoute, ...dynamicRoute],
	scrollBehavior() {
		return {
			left: 0,
			top: 0
		}
	}
})
router.beforeEach((to, from) => {
	document.title = to.meta.title
})
export default router