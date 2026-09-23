<template>
  <el-form
    :model="props.formData"
    :inline="true"
    class="demo-form"
    :rules="props.rules"
  >
    <el-form-item
      v-for="field in props.fieldItem"
      :key="field.prop"
      :label="field.label"
      :prop="field.prop"
    >
      <el-input
        v-model="props.formData[field.prop]"
        :placeholder="field.placeholder || `请输入${field.label}`"
        clearable
      >
      </el-input>
    </el-form-item>
    <!-- 操作按钮 -->
    <el-form-item>
      <el-button type="primary" :loading="loading" @click="handleSearch"
        >查询</el-button
      >
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
  <el-table
    :data="paginatedData"
    style="width: 100%"
    stripe
    highlight-current-row
  >
    <el-table-column
      v-for="item in props.tableCloumns"
      :key="item.prop"
      :prop="item.prop"
      :label="item.label"
    />
  </el-table>

  <el-pagination
    :current-page="currentPage"
    :page-size="pageSize"
    :page-sizes="[5, 10, 15, 20]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup>
import {ElMessage} from "element-plus"
import {computed,ref} from "vue"

const props = defineProps({
  //列表项标题
	tableCloumns: {
		type: Array,
		default: () => []
	},
  //查询项名称
	fieldItem: {
		type: Array,
		default: () => []
	},
  //查询项数据
	formData: {
		type: Array,
		default: () => []
	},
  //校验规则
	rules: {
		type: Array,
		default: () => []
	},
  //请求api
	api: {
		type: Function,
		required: true
	},

})
const loading = ref(false)
// 列表查询--分页功能
const tableData = ref([])
const currentPage = ref(1)// 当前页
const total = ref(0) // 总条数
const pageSize = ref(5) // 每页几条数据
async function getList(){
  await props.api(props.formData).then(res => {
    if (res.code === "200") {
      tableData.value = res.data.list
      total.value = res.data.total
      currentPage.value = res.data.pageNum
    } else {
      ElMessage.error(res.msg)
    }
  })
}
onMounted(()=>{
  getList()
})
function handleSearch(){
    getList()
  }
// 分页逻辑处理函数
const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
	const end = start + pageSize.value
	return tableData.value.slice(start, end)
})
// 处理每页条数变化事件
const handleSizeChange = (newSize) => {
	pageSize.value = newSize
	currentPage.value = 1 // 重置到第一页
}
// 处理当前页码变化事件
const handleCurrentChange = (newPage) => {
	currentPage.value = newPage
}

function handleReset() {
  
}
</script>

<style scoped></style>
