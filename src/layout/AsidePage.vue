<template>
	<div class="aside-page">
		<el-scrollbar>
			<div v-for="item in menuList">
				<el-menu router :collapse="flagStore.isCollapse" :collapse-transition="false" :default-active="activeMenu">
					<el-sub-menu :index="item.path" :key="item.path" v-if="item.children && item.children.length>0">
						<template #title>
							<el-icon>
								<!-- 核心：动态渲染图标 -->
								<component :is="getIconComponent(item.meta.icon)" />
							</el-icon>
							<span>{{item.meta.title}}</span>
						</template>
						<SubItem :childrenMenu="item.children" />
					</el-sub-menu>
					<div v-else>
						<el-menu-item :index="item.path" :key="item.path">
							<el-icon>
								<!-- 核心：动态渲染图标 -->
								<component :is="getIconComponent(item.meta.icon)" />
							</el-icon>
							<template #title>
								<span>{{item.meta.title}}</span>
							</template>
						</el-menu-item>
					</div>
				</el-menu>
			</div>
		</el-scrollbar>
	</div>
</template>

<script setup>
	import {useRouter,useRoute} from 'vue-router'
	import SubItem from '@/components/SubItem.vue'
	import {useFlagStore} from '@/stores/flag.ts'
	// 导入所有 Element Plus 图标
	import * as ElementPlusIconsVue from '@element-plus/icons-vue'

	// 控制菜单的伸缩
	const flagStore = useFlagStore()
	let asyncRoutesList = JSON.parse(localStorage.getItem('asyncRoute'))
	let $router = useRouter()
	let $route = useRoute()
	let menuList = asyncRoutesList[0].children
	console.log("AsidePage.vue----menuList==="+menuList)
	// 当前高亮菜单
	const activeMenu = computed(() => $route.path)
	/**
	 * 核心函数：将图标名称（字符串）转换为实际的组件对象
	 * 如果路由中存的是组件对象，则直接返回
	 */
	const getIconComponent = (icon) => {
		// 如果 icon 已经是组件对象，直接返回
		if (typeof icon !== 'string') {
			return icon
		}
		// 如果是字符串，从 Element Plus 图标库中查找对应的组件
		// 注意：图标名称需要与导入时的名称一致，如 'User' -> ElementPlusIconsVue.User
		return ElementPlusIconsVue[icon]
	}
</script>

<style scoped lang="scss">
	.aside-page {
		padding: 10px 0;
	}

	:deep(.el-menu) {
		background-color: unset;
		border-right: none;
	}

	:deep(.el-menu-item),
	:deep(.el-sub-menu__title) {
		font-size: 15px;
		color: #eaeaea;
	}

	:deep(.el-menu-item.is-active) {
		color: #409eff;
	}

	:deep(.el-menu-item:hover),
	:deep(.el-sub-menu__title:hover) {
		background-color: unset;
	}

	.el-menu--inline {
		background-color: unset;
	}
</style>