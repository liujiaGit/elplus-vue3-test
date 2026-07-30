export const mainRoute = [
	{
		path: '/',
		name: 'Login',
		component: () => import('@/views/Login/index.vue'),
		meta: {
			title: '登录页'
		}
	},
	{
		
		meta: {
			title: '首页'
		},
	}
]
export const constantRoute = [
	{
		path: '/layout',
		name: 'Layout',
		component: () => import('@/layout/index.vue'),
		children: [
			{
				path: '/paginationTest',
				name: 'PaginationTest',
				component: () => import('@/views/ContentPage/PaginationTest/index.vue'),
				meta: {
					title: '分页'
				}
			},
			{
				path: '/treeSelect',
				name: 'TreeSelect',
				component: () => import('@/views/ContentPage/TreeSelect.vue'),
				meta: {
					title: '树形选择'
				}
			},
			{
				path: '/popoverTest',
				name: 'PopoverTest',
				component: () => import('@/views/ContentPage/PopoverTest.vue'),
				meta: {
					title: '弹出框'
				}
			}
		]
	}
]