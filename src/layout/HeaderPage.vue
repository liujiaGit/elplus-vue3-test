<template>
	<div class="header-page">
		<BreadCrumb />
		<TopPerson />
	</div>
</template>

<script setup>
	import BreadCrumb from '@/components/BreadCrumb.vue'
	import TopPerson from './TopPerson.vue'
	
</script>

<style scoped>
	.header-page{
		margin-top: 20px;
		display: flex;
		justify-content: space-between;
	}
</style>