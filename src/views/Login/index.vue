<template>
  <div class="login">
    <div class="login-form">
      <div class="form-box">
        <p>欢迎登录系统</p>
        <el-form ref="formData" :model="ruleForm">
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="ruleForm.userName"
            ></el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input
              type="password"
              :prefix-icon="Unlock"
              v-model="ruleForm.pwd"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-btn">
            <el-button type="primary" @click="login(ruleForm)">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { User, Unlock } from "@element-plus/icons-vue";
import { useUserStore } from "@/stores/user.ts";
import { useRouter } from "vue-router";

let $router = useRouter();
const ruleForm = reactive({
  userName: "admin",
  pwd: "111111",
});
// 登录
const login = async (formVal) => {
  if (formVal.userName !== "" && formVal.pwd !== "") {
    let params = {
      ...formVal,
    };
    //调接口
    const userStore = useUserStore();
    const ok = await userStore.login(params);
    if (ok) {
      $router.replace("/home");
    }
  } else {
    ElMessage.error("请输入正确信息!")
  }
};

// 重置
const resetForm = (formData) => {
  if (!formData) return;
  formData.resetFields();
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  background: url(@/assets/img/2.jpg) left top / 100% 100% no-repeat;
}

.login-form {
  width: 30vw;
  height: 60vh;
  background-color: seagreen;
  border: 2px solid lightgray;
  border-radius: 10px;
  opacity: 0.8;
}

.form-box {
  margin: 50px 0;
  text-align: center;
}

.form-box p {
  font-size: 40px;
}

.el-form-item {
  margin-top: 30px;
}

:deep(.el-form-item__label::before) {
  content: none !important;
}

/* :deep(.el-form-item__label){
		width: 200px;
		font-size: 30px;
		font-weight: bold;
		color: black;
	} */
:deep(.el-form-item__error) {
  color: red;
  font-size: 25px;
}

:deep(.el-input) {
  height: 60px;
  padding: 0 50px;
  margin: auto;
}

:deep(.el-input__inner) {
  font-size: 30px;
  color: black;
}

.form-btn :deep(.el-form-item__content) {
  margin: auto;
  padding: 0 50px;
}

:deep(.el-button) {
  width: 100%;
  height: 60px;
  color: black;
  font-size: 30px;
  border-radius: 20px;
  background-color: royalblue;
}
</style>
