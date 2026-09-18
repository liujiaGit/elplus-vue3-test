<template>
	<div class="common-layout">
		<el-container>
			<!-- 左侧路由树右侧页面，要注意右侧页面路由配置在layout布局的子路由下children -->
			<el-aside :width="flagStore.isCollapse ? '4%' : '15%'">
				<AsidePage></AsidePage>
			</el-aside>
			<el-container class="content">
				<el-header>
					<HeaderPage></HeaderPage>
				</el-header>
				<el-main>
					<ContentPage></ContentPage>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup>
	import HeaderPage from './HeaderPage.vue'
	import AsidePage from './AsidePage.vue'
	import ContentPage from './ContentPage.vue'
	import { useFlagStore } from '@/stores/flag.ts'
	// 控制菜单的伸缩
	const flagStore = useFlagStore()
</script>

<style scoped>
	.el-aside{
		height: 100vh;
		background-color: #545c64;
	}
	.el-header{
		height: 14vh;
		background-color: #f8f8f8;
	}
	.el-main{
		height: 85vh;
		padding: 5px 0 5px 20px;
		background-color: #f8f8f8;
	}
</style>