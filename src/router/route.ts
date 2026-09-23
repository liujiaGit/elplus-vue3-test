import type { RouteRecordRaw } from 'vue-router'

// 静态路由
export const mainRoute : Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Login',
		component: () => import('@/views/Login/index.vue'),
		meta: {
			title: '登录页'
		}
	},
]
// 动态路由
export const dynamicRoute : Array<RouteRecordRaw> = [
	{
		path: '/layout',
		name: 'Layout',
		component: () => import('@/layout/index.vue'),
		meta: {
			breadcrumb: false,
			role: ['01', '02'],
		},
		redirect: '/home',
		children: [
			{
				path: '/home',
				name: 'Home',
				component: () => import('@/views/Home/index.vue'),
				meta: {
					title: '首页',
					affix: true, // 🔒 固定标记
					icon: 'HomeFilled',
					role: ['01', '02'],// 01-system ,02-admin
				}
			},
      {
        path:'/system',
        name:'System',
        component:()=>import('@/layout/routerView/parent.vue'),
        redirect:'/menu',
        meta: {
					title: '系统设置',
					isLink: false,
					icon: 'Guide',
					role: ['01'],
				},
        children:[
          {
            path: '/menu',
				    name: 'Menu',
				    component: () => import('@/views/ContentPage/Menu.vue'),
				    meta: {
					    title: '菜单权限',
					    icon: 'House',
					    role: ['01'],
				    }
          },
          {
            path: '/user',
				    name: 'User',
				    component: () => import('@/views/ContentPage/User.vue'),
				    meta: {
					    title: '用户管理',
					    icon: 'House',
					    role: ['01'],
				    }
          },
        ]
      },
			{
				path: '/paginationTest',
				name: 'PaginationTest',
				component: () => import('@/views/ContentPage/PaginationTest/index.vue'),
				meta: {
					title: '分页',
					icon: 'House',
					role: ['01', '02'],
				}
			},
      {
				path: '/testSearchComponent',
				name: 'TestSearchComponent',
				component: () => import('@/views/ContentPage/TestSearchComponent.vue'),
				meta: {
					title: '查询组件',
					icon: 'House',
					role: ['01', '02'],
				}
			},
			{
				path: '/treeSelect',
				name: 'TreeSelect',
				component: () => import('@/views/ContentPage/TreeSelect.vue'),
				meta: {
					title: '树形选择',
					icon: 'Operation',
					role: ['01'],
				}
			},
			{
				path: '/popoverTest',
				name: 'PopoverTest',
				component: () => import('@/views/ContentPage/PopoverTest.vue'),
				meta: {
					title: '弹出框',
					icon: 'Notification',
					role: ['01'],
				}
			},
			{
				path: '/echart',
				name: 'Echart',
				component: () => import('@/layout/routerView/parent.vue'),
				redirect: '/pie',
				meta: {
					title: 'echart图表',
					isLink: false,
					icon: 'Guide',
					role: ['01', '02'],
				},
				children: [
					{
						path: '/pie',
						name: 'Pie',
						component: () => import('@/views/Echarts/Pie.vue'),
						meta: {
							title: '饼图',
							icon: 'Postcard',
							role: ['01', '02'],
						}
					},
					{
						path: '/line',
						name: 'Line',
						component: () => import('@/views/Echarts/Line.vue'),
						meta: {
							title: '折线图',
							icon: 'Postcard',
							role: ['01', '02'],
						}
					},
					{
						path: '/bar',
						name: 'Bar',
						component: () => import('@/views/Echarts/Bar.vue'),
						meta: {
							title: '柱状图',
							icon: 'Postcard',
							role: ['01', '02'],
						}
					},
				]
			},
			{
				path: '/personInfo',
				name: 'PersonInfo',
				component: () => import('@/views/PersonInfo/index.vue'),
				meta: {
					title: '个人中心',
					icon: 'User',
					role: ['01', '02'],
				}
			},
		]
	},
]