import { defineStore } from 'pinia'

export const useFlagStore = defineStore('flag', {
	state: () => ({
		isCollapse: false,// true 表示折叠，false 表示展开
	}),
	actions:{
		// 切换菜单伸缩状态的方法
		toggleMenu() {
		  this.isCollapse = !this.isCollapse
			// console.log(this.isCollapse)
		}
	},
})