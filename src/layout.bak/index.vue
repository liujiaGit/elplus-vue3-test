<template>
	<div class="common-layout">
		<el-container>
			<el-header>
				<HeaderPage />
			</el-header>
			<el-container class="content">
				<!-- 左侧路由树右侧页面，要注意右侧页面路由配置在layout布局的子路由下children -->
				<el-aside width="20%">
					<AsidePage />
				</el-aside>
				<el-main>
					<ContentPage />
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
	.common-layout {
		overflow: scroll;
	}

	:deep(.el-header) {
		height: 50px;
		background-color: #3c8dbc;
		text-align: center;
	}

	.content {}

	:deep(.el-aside) {
		height: 800px;
		background-color: #ebebeb;
		padding: 10px 0;
	}

	:deep(.el-main) {
		height: 800px;
		background-color: whitesmoke;
	}
</style>