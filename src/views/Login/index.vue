<template>
	<div class="login">
		<div class="login-form">
			<div class="form-box">
				<p>欢迎登录系统</p>
				<el-form ref="formData" :model="ruleForm" :rules="rules">
					<el-form-item prop="username">
						<el-input :prefix-icon="User" v-model="ruleForm.username"></el-input>
					</el-form-item>
					<el-form-item prop="pwd">
						<el-input type="password" :prefix-icon="Unlock" v-model="ruleForm.pwd"></el-input>
					</el-form-item>
					<el-form-item class="form-btn">
						<el-button type="primary" @click="login(formData)">登录</el-button>
						<!-- <el-button type="primary" @click="resetForm(formData)">重置</el-button> -->
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script setup>
	import {useRouter} from 'vue-router'
	import { User, Unlock } from '@element-plus/icons-vue'
	
	let $router = useRouter()
	let formData = ref()
	const validateUsername = (rule, value, callback) => {
		if(value === ''){
			callback(new Error('请输入用户名'))
		}else{
			if(ruleForm.username !==''){
				if(!formData.value) return
				// formData.value.validateField('username')
			}
			callback()
		}
	}
	const validatePwd = (rule, value, callback) => {
		if(value == ''){
			callback(new Error('请输入密码'))
		}else{
			if(ruleForm.pwd !==''){
				if(!formData.value) return
				formData.value.validateField('pwd')
			}
			callback()
		}
	}
	const ruleForm = reactive({username:'admin',pwd:'111111',userNo: '100312'})
	const rules = reactive({
	  username: [{required:true, validator: validateUsername, trigger: 'blur' }],
	  pwd: [{required:true,validator: validatePwd, trigger: 'blur' }],
	})
	// 登录
	const login = (formVal)=>{
		// if (!formVal) return
		  formVal.validate((valid) => {
		    if (valid) {
					let params = {...ruleForm}
					let userInfo = JSON.stringify(params)
					localStorage.setItem('userInfo',userInfo)
		      //调接口
					$router.replace({path:'/layout'})
		    } else {
		      alert('请输入正确信息!')
		    }
		  })
	}
	// 重置
	const resetForm = (formData)=>{
		if(!formData) return
		formData.resetFields()
	}
</script>

<style scoped>
	.login{
		width: 100%;
		height: 100vh;
		display: grid;
		place-items: center; 
		background: url(@/assets/img/2.jpg) left top / 100% 100% no-repeat;
	}
	.login-form{
		width: 30vw;
		height: 70vh;
		background-color: seagreen;
		border: 2px solid lightgray;
		border-radius: 10px;
		opacity: 0.8;
	}
	.form-box{
		margin: 100px 0;
		text-align: center;
	}
	.form-box p{
		font-size: 40px;
	}
	.el-form-item{
		margin-top: 50px;
	}
	:deep(.el-form-item__label::before){
		content: none !important;
	}
	/* :deep(.el-form-item__label){
		width: 200px;
		font-size: 30px;
		font-weight: bold;
		color: black;
	} */
	:deep(.el-form-item__error){
		color: red;
		font-size: 25px;
	}
	:deep(.el-input){
		height: 60px;
		padding: 0 50px;
		margin: auto;
	}
	:deep(.el-input__inner){
		font-size: 30px;
		color: black;
	}
	.form-btn :deep(.el-form-item__content){
		margin: auto;
		padding: 0 50px;
	}
	:deep(.el-button){
		width: 100%;
		height: 60px;
		color: black;
		font-size: 30px;
		border-radius: 20px;
		background-color: royalblue;
	}
</style>