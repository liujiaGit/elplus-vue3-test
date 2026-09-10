<template>
	<div class="content-page">
		<!-- <router-view></router-view> -->
		<router-view v-slot="{ Component, route }">
		  <keep-alive :include="cachedViews">
		    <component :is="Component" :key="route.fullPath" />
		  </keep-alive>
		</router-view>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import { useTabsStore } from '@/stores/tabs'

const tabsStore = useTabsStore()

// 动态计算需要缓存的组件名列表
const cachedViews = computed(() => {
  // 注意：如果不同路由用了相同组件名（如都是 'Detail'），
  // 建议在路由定义时设置不同的 name，或者用 fullPath 做 key
  return tabsStore.tabs.map(tab => tab.name).filter(Boolean)
})
</script>

<style scoped lang="scss">
</style>