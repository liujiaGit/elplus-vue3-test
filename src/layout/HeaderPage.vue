<template>
	<div class="header-page">
		<BreadCrumb class="float-left"/>
		<TopPerson class="float-right"/>
	</div>
	<TabsBar class="tabs-bar"/>
</template>

<script setup>
	import BreadCrumb from './BreadCrumb.vue'
	import TopPerson from './TopPerson.vue'
	import TabsBar from './tabsBar.vue'
</script>

<style scoped>
	.tabs-bar{
		width: 100%;
	}
</style>