<template>
	<div v-for="item in menuList">
		<el-sub-menu :index="item.path" :key="item.path" v-if="item.children && item.children.length>0">
			<template #title>
				<!-- <el-icon><location/></el-icon> -->
				<span>{{item.meta.title}}</span>
			</template>
			<sub-item :childrenMenu="item.children" />
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
</template>

<script setup>
	const props = defineProps(['childrenMenu'])
	const menuList = props.childrenMenu
</script>

<style>
</style>