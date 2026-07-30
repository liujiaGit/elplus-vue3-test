<template>
	<div class="top-nav">
		<img src="@/assets/logo.png" alt="" />
		<p>Element-plus+vue3+vite</p>
		<div class="top-nav-right">
			<div class="wel">
				欢迎您，
				<span class="wel-name">{{username}}</span>
			  <span class="back" @click="toLogin">退出</span>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {useRouter} from 'vue-router'
	
	let $router = useRouter()
	let userInfo = JSON.parse(localStorage.getItem('userInfo'))
	let username = userInfo.username
	
	
	// 退出登录
	const toLogin = ()=>{
		localStorage.removeItem('userInfo')
		$router.push({path:'/'})
	}
</script>

<style scoped>
	.top-nav {
		display: flex;
	}

	.top-nav img {
		width: 40px;
		height: 40px;
		margin: 5px 0;
	}

	.top-nav p {
		font-size: 20px;
		align-content: end;
		margin-bottom: 10px;
	}

	.top-nav-right {
		flex: 1;
		float: right;
		align-content: end;
		justify-items: right;
	}
	.wel {
		font-size: 16px;
		margin-bottom: 10px;
	}
	.wel-name {
		font-size: 20px;
		color:red;
	}
	.back {
		margin-left: 20px;
	}
	
</style>