import { createRouter, createWebHistory } from 'vue-router'
import { mainRoute,constantRoute } from './route.js'

const router = createRouter({
	history: createWebHistory(),
	routes: mainRoute.concat(constantRoute),
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