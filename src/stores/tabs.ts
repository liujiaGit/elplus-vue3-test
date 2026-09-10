// stores/tabs.ts
import { defineStore } from 'pinia'
import type { RouteLocationNormalized } from 'vue-router'
import type { TabItem } from '@/types'

export const useTabsStore = defineStore('tabs', {
	state: () => ({
		tabs: [] as TabItem[],
		activeTab: '' as string,
	}),

	actions: {
		// 1. 添加标签时保留 affix 标记
		addTab(route : RouteLocationNormalized) {
			// 黑名单：不记录登录页、404等
			const blacklist = ['Login', 'NotFound']
			if (blacklist.includes(route.name as string)) return

			const { name, fullPath, path, query, meta } = route
			if (!name) return

			const title = meta.title as string || name as string
			const affix = meta.affix as boolean || false

			// 1. 查找是否已存在（用 fullPath 区分动态路由）
			const existIndex = this.tabs.findIndex(t => t.fullPath === fullPath)

			if (existIndex !== -1) {
				// ✅ 已存在：只更新激活状态，不重复 push
				this.activeTab = fullPath
				// 顺便把标题更新一下（防止动态标题变了）
				this.tabs[existIndex].title = title
				return
			}

			// 2. 不存在才添加
			this.tabs.push({ name: name as string, path, fullPath, title, query, affix })
			this.activeTab = fullPath
		},

		// 2. 删除标签：如果该标签是固定的，则阻止删除
		removeTab(fullPath : string) {
			const tab = this.tabs.find(t => t.fullPath === fullPath)
			if (tab?.affix) return // 🚫 固定标签不允许关闭

			const index = this.tabs.findIndex(t => t.fullPath === fullPath)
			if (index === -1) return

			this.tabs.splice(index, 1)

			// 如果删的是当前激活的，跳转到前一个或固定标签
			if (this.activeTab === fullPath) {
				// 优先找前一个，如果没有则找第一个固定标签
				const nextTab = this.tabs[index] || this.tabs.find(t => t.affix) || this.tabs[0]
				if (nextTab) {
					this.activeTab = nextTab.fullPath
				}
			}
		},

		// 3. 关闭其他：保留当前标签 + 所有固定标签
		closeOtherTabs(fullPath : string) {
			this.tabs = this.tabs.filter(t =>
				t.fullPath === fullPath || t.affix === true
			)
			// 确保当前激活的依然存在
			if (!this.tabs.some(t => t.fullPath === fullPath)) {
				// 如果当前标签不是固定的却被误关了（理论上不会），重置到第一个固定标签
				const affixTab = this.tabs.find(t => t.affix)
				if (affixTab) this.activeTab = affixTab.fullPath
			} else {
				this.activeTab = fullPath
			}
		},

		// 4. 关闭所有：仅保留所有固定标签（如首页），清空其他
		closeAllTabs() {
			this.tabs = this.tabs.filter(t => t.affix === true)
			if (this.tabs.length) {
				this.activeTab = this.tabs[0].fullPath
			} else {
				this.activeTab = ''
			}
		},

		// 5. 🆕 初始化/重置：确保固定标签永远存在
		initTabs(defaultRoute : RouteLocationNormalized) {
			// 如果缓存里一个标签都没有，或者缓存里丢了固定标签，强制补上
			const hasAffix = this.tabs.some(t => t.affix)
			if (!hasAffix && defaultRoute) {
				// 找到路由中标记 affix 的页面，或默认传入首页路由
				this.addTab(defaultRoute)
			} else if (this.tabs.length === 0 && defaultRoute) {
				this.addTab(defaultRoute)
			}

			// 检查当前的 activeTab 是否有效
			if (this.activeTab && !this.tabs.some(t => t.fullPath === this.activeTab)) {
				const firstAffix = this.tabs.find(t => t.affix)
				this.activeTab = firstAffix ? firstAffix.fullPath : (this.tabs[0]?.fullPath || '')
			}
		}
	},
	persist: true,
})