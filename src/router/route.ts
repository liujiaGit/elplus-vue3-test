export const mainRoute = [
	{
		path: '/',
		name: 'Login',
		component: () => import('@/views/Login/index.vue'),
		meta: {
			title: '登录页'
		}
	},
]
export const dynamicRoute = [
	{
		path: '/layout',
		name: 'Layout',
		component: () => import('@/layout/index.vue'),
		meta: {
			breadcrumb: false,
		},
		redirect: '/home',
		children: [
			{
				path: '/home',
				name: 'Home',
				component: () => import('@/views/Home/index.vue'),
				meta: {
					title: '首页'
				}
			},
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
				component: () => import('@/layout/routerView/parent.vue'),
				meta: {
					title: '弹出框'
				}
			},
			{
				path: '/echart',
				name: 'Echart',
				component: () => import('@/layout/routerView/parent.vue'),
				redirect: '/pie',
				meta: {
					title: 'echart图表',
					isLink: false
				},
				children: [
					{
						path: '/pie',
						name: 'Pie',
						component: () => import('@/views/Echarts/Pie.vue'),
						meta: {
							title: '饼图'
						}
					},
					{
						path: '/line',
						name: 'Line',
						component: () => import('@/views/Echarts/Line.vue'),
						meta: {
							title: '折线图'
						}
					},
					{
						path: '/bar',
						name: 'Bar',
						component: () => import('@/views/Echarts/Bar.vue'),
						meta: {
							title: '柱状图'
						}
					},
				]
			},
			{
				path: '/personInfo',
				name: 'PersonInfo',
				component: () => import('@/views/PersonInfo/index.vue'),
				meta: {
					title: '个人中心'
				}
			}
		]
	}
]