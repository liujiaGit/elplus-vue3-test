<template>
	<div class="common-layout">
		<el-container>
			<!-- 左侧路由树右侧页面，要注意右侧页面路由配置在layout布局的子路由下children -->
			<el-aside width="20%">
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
</script>

<style scoped>
	.el-aside{
		width: 20vw;
		height: 100vh;
		background-color: #545c64;
		opacity: 0.7;
	}
	.el-header{
		width: 80vw;
		height: 10vh;
	}
	.el-main{
		width: 80vw;
		height: 90vh;
	}
</style>