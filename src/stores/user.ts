import { defineStore } from "pinia";
import { SysUserApi } from '@/api/SysUser'
import type { UserInfo } from '@/types/index'
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { resetRouter } from "@/router";
import { useTabsStore } from "@/stores/tabs";
import { useRouter } from "vue-router";


export const useUserStore = defineStore('user', () => {
	const $router = useRouter()
	const tabsStore = useTabsStore()
	const token = ref(null)
	const userInfo = ref<UserInfo | null>(null)
	const isRoutesAdded = ref(false) // 是否添加路由
	const login = async (param : {}) => {
		await SysUserApi.loginCheck(param).then(res => {
			// console.log("登录请求res==" + JSON.stringify(res))
			if (res.code === "200") {
				localStorage.setItem("token", res.data[0].token)
				localStorage.setItem("userInfo", JSON.stringify(res.data[0]))
				localStorage.setItem("role", res.data[0].role)
				userInfo.value = res.data[0]
				token.value = res.data[0].token
				// 跳转到主布局
				$router.replace('/layout')
			} else {
				ElMessage.error(res.msg)
				return
			}
		})
	}

	const logOut = () => {
		userInfo.value = null
		token.value = null
		isRoutesAdded.value = false
		resetRouter() // 移除所有动态路由
		localStorage.removeItem("token")
		localStorage.removeItem("role")
		localStorage.removeItem("userInfo")
		localStorage.removeItem('asyncRoute')
		// 移除tabs标签
		tabsStore.tabs = []
		tabsStore.activeTab = ''

	}
	return { userInfo, token, isRoutesAdded, login, logOut }
})