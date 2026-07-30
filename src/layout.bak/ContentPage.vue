<template>
	<div v-if="flag==true">
		<el-empty description="description" />
	</div>
	<div v-if="flag==false">
		<router-view></router-view>
	</div>
</template>

<script setup>
	import {
		useRoute
	} from 'vue-router'

	let $route = useRoute()
	const flag = ref(true)
	// 监测路由变化，判断是否首次登录
	watch(() => $route.path, (newPath, oldPath) => {
		flag.value = false
	});
</script>

<style scoped>
</style>