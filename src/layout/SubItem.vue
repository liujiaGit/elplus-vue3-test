<template>
	<div v-for="item in menuList">
		<el-sub-menu :index="item.path" :key="item.path" v-if="item.children && item.children.length>0">
			<template #title>
				<el-icon>
					<!-- 核心：动态渲染图标 -->
					<component :is="getIconComponent(item.meta.icon)" />
				</el-icon>
				<span>{{item.meta.title}}</span>
			</template>
			<sub-item :childrenMenu="item.children" />
		</el-sub-menu>
		<div v-else>
			<el-menu-item :index="item.path" :key="item.path">
				<template #title>
					<el-icon>
						<!-- 核心：动态渲染图标 -->
						<component :is="getIconComponent(item.meta.icon)" />
					</el-icon>
					<span>{{item.meta.title}}</span>
				</template>
			</el-menu-item>
		</div>
	</div>
</template>

<script setup>
	// 导入所有 Element Plus 图标
	import * as ElementPlusIconsVue from '@element-plus/icons-vue'
	
	const props = defineProps(['childrenMenu'])
	const menuList = props.childrenMenu
	
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

<style>
</style>