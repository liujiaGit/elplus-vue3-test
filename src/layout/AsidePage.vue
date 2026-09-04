<template>
	<div class="aside-page">
		<el-scrollbar>
			<el-menu router :default-active="activeMenu">
				<div v-for="item in menuList">
					<el-sub-menu :index="item.path" :key="item.path" v-if="item.children && item.children.length>0">
						<template #title>
							<!-- <el-icon><location/></el-icon> -->
							<span>{{item.meta.title}}</span>
						</template>
						<SubItem :childrenMenu="item.children" />
					</el-sub-menu>
					<div v-else>
						<el-menu-item :index="item.path" :key="item.path">
							<template #title>
								<!-- <el-icon><location/></el-icon> -->
								<span>{{item.meta.title}}</span>
							</template>
						</el-menu-item>
					</div>
				</div>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script setup>
	import {useRouter,useRoute} from 'vue-router'
	import {dynamicRoute} from '@/router/route.js'
	import SubItem from '@/components/SubItem.vue'
	
	let $router = useRouter()
	let $route = useRoute()
	let menuList = dynamicRoute[0].children
	// 当前高亮菜单
	const activeMenu = computed(() => $route.path)
</script>

<style scoped  lang="scss">
	.aside-page {
		padding: 10px 0;
	}
	:deep(.el-menu){
		background-color: unset;
	}
	:deep(.el-menu-item),:deep(.el-sub-menu__title){
		font-size: 20px;
		color: #eaeaea;
	}
	:deep(.el-menu-item.is-active){
		color: #409eff;
	}
	:deep(.el-menu-item:hover),:deep(.el-sub-menu__title:hover) {
		background-color: unset;
	}
	.el-menu--inline{
		background-color: unset;
	}
</style>