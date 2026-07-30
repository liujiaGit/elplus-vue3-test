<template>
	<div class="aside-page">
		<el-scrollbar>
			<el-menu router>
				<el-menu-item :index="item.path" v-for="item in menuList" :key="item.path">
					{{item.meta.title}}
				</el-menu-item>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script setup>
	import {useRouter} from 'vue-router'
	import {constantRoute} from '@/router/route.js'
	
	let $router = useRouter()
	let menuList = constantRoute[0].children
</script>

<style scoped  lang="scss">
	.aside-page {
		padding: 10px 0;
	}
	.el-menu {
		background-color: unset;
	}
	.el-menu-item{
		font-size: 20px;
		color: #eaeaea;
	}
	.el-menu-item.is-active{
		opacity: 1;
	}
	
</style>