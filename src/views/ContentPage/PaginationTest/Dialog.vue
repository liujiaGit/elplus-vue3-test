<template>
  <el-dialog 
    v-model="dialogVisible" 
    title="修改信息" 
    :close-on-click-modal="false" 
    @close="handleClose"
  >
    <el-form ref="formRef" :inline="true" :model="rowInfo">
      <el-form-item label="上级部门名称">
        <el-input v-model="rowInfo.lastRoleName"></el-input>
      </el-form-item>
      <el-form-item label="部门编号">
        <el-input v-model="rowInfo.branchNo"></el-input>
      </el-form-item>
      <el-form-item label="部门名称">
        <el-input v-model="rowInfo.branchName"></el-input>
      </el-form-item>
      <el-form-item label="人员编号">
        <el-input v-model="rowInfo.perNo"></el-input>
      </el-form-item>
      <el-form-item label="人员名称">
        <el-input v-model="rowInfo.perName"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleSubmit">
          确认修改
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { BranchApi } from '@/api/Branch'
import { ref, reactive, watch, nextTick, computed } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  formData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue','confirm', 'cancel'])

// ✅ 使用计算属性实现双向绑定
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => {
    // 关闭时通知父组件更新
    if (!val) {
      emit('update:modelValue', false)
    }
  }
})

// 表单引用
const formRef = ref(null)
// 提交加载状态
const loading = ref(false)
// 表单数据
const rowInfo = reactive({
  lastRoleName: '',
  branchNo: '',
  branchName: '',
  perNo: '',
  perName: ''
})

// 监听弹窗打开，填充数据
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    // 弹窗打开时，将数据填充到表单
    nextTick(() => {
      Object.assign(rowInfo, props.formData)
    })
  }
})

// 提交修改
const handleSubmit = async () => {
  try {
    loading.value = true
    
    // 调用接口更新数据
    const res = await BranchApi.updateBranchInfo(rowInfo)
    
    if (res.code === "200") {
      ElMessage.success('修改成功！')
      // 触发确认事件，将修改后的数据传回父组件
      emit('confirm', { ...rowInfo })
      // 关闭弹窗
      dialogVisible.value = false
    } else {
      ElMessage.error(res.msg || '修改失败')
    }
    
    loading.value = false
  } catch (error) {
    loading.value = false
    console.error('修改失败:', error)
    ElMessage.error('修改失败，请重试')
  }
}

// 取消修改
const handleCancel = () => {
  emit('cancel')
  dialogVisible.value = false
}

// 弹窗关闭回调
const handleClose = () => {
  dialogVisible.value = false
  // 重置表单
  formRef.value?.resetFields()
}
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>