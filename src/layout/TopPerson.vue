<template>
	<el-popover content="Bottom Center prompts info" placement="bottom">
		<template #reference>
			<div class="wel float-right">
				欢迎您，
				<img src="@/assets/img/8.jpg" />
				<span class="wel-name">{{username}}</span>
				<el-icon><i-ep-arrow-down /></el-icon>
			</div>
		</template>
		<p><el-button class="wel-title" @click="toPerson">个人中心</el-button></p>
		<p><el-button class="wel-title" @click="toLogin">退出登录</el-button></p>
	</el-popover>
</template>

<script setup>
	import {useRouter} from 'vue-router';

	let router = useRouter()
	let userInfo = JSON.parse(localStorage.getItem('userInfo'))
	let username = userInfo.username

	// 退出登录
	const toLogin = () => {
		localStorage.removeItem('userInfo')
		router.push('/')
	}
	const toPerson = () => {
		router.push('/personInfo')
	}
</script>

<style scoped>
	.wel {
		font-size: 16px;
		margin-bottom: 10px;
	}
	
	.wel img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		object-fit: cover;
		border: 4px solid #ffffff;
		/* 白色边框 */
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
		/* 轻微阴影增加立体感 */
		vertical-align: middle;
	}
	
	.wel-name {
		font-size: 20px;
		color: red;
		padding: 0 10px;
	}
	
	.wel-title {
		font-size: 16px;
		padding-top: 10px;
		border: none;
	}
</style>