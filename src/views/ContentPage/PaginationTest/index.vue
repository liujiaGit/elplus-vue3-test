<template>
	<div class="pagination-page">
		<div class="top-search">
			<el-input :input="perName" placeholder="请输入人员名称"></el-input>
			<el-button type="primary" :icon="Search" @click="">查询</el-button>
			<el-button type="primary" :icon="FolderAdd" @click="">新增</el-button>
		</div>
		<div v-if="tableData !== '' && tableData !== null && tableData !== undefined">
			<el-table :data="paginatedData" style="width: 100%" stripe highlight-current-row>
				<el-table-column prop="lastRoleName" label="上级部门名称" width="180" />
				<el-table-column prop="branchNo" label="部门编号" />
				<el-table-column prop="branchName" label="部门名称" width="180" />
				<el-table-column prop="perNo" label="人员编号" />
				<el-table-column prop="perName" label="人员名称" />
				<el-table-column label="操作">
					<template #default="{row}">
						<el-button type="primary" size="small" :icon="Edit" @click="handleEdit(row)">修改</el-button>
						<el-button type="danger" size="small" :icon="Delete" @click="handleDelete(row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div v-else>
			<el-table style="width: 100%">
				<el-table-column prop="lastRoleName" label="上级部门名称" width="180" />
				<el-table-column prop="branchNo" label="部门编号" />
				<el-table-column prop="branchName" label="部门名称" width="180" />
				<el-table-column prop="perNo" label="人员编号" />
				<el-table-column prop="perName" label="人员名称" />
			</el-table>
		</div>
		<el-pagination :current-page="currentPage" :page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
			layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
			@current-change="handleCurrentChange" />
		<Dialog v-model="isShowDialog" :form-data="currentRow" @confirm="handleConfirm" @cancel="handleCancel" />
	</div>
</template>

<script setup>
	import {BranchApi} from '@/api/Branch'
	import {Search,Edit,FolderAdd,Delete} from '@element-plus/icons-vue'
	// 引入组件
	import Dialog from './Dialog.vue'

	const perName = ref('')
	// 弹窗显示状态
	const isShowDialog = ref(false)
	// 当前选中行数据
	const currentRow = ref({})

	// 修改按钮点击
	const handleEdit = (row) => {
		// 深拷贝数据，避免直接修改原数据
		currentRow.value = JSON.parse(JSON.stringify(row))
		isShowDialog.value = true
	}
	// 确认修改
	const handleConfirm = (formData) => {
		BranchApi.updateBranchInfo().then((res)=>{
			
		})
		const index = tableData.value.findIndex(item => item.id === formData.id)
		if (index !== -1) {
			tableData.value[index] = {
				...formData
			}
			ElMessage.success('修改成功！')
		}
		isShowDialog.value = false
	}

	// 取消修改
	const handleCancel = () => {
		isShowDialog.value = false
		ElMessage.info('已取消修改')
	}

	// 删除
	const handleDelete = (row) => {
		ElMessageBox.confirm(`确定要删除 ${row.perName} 吗？`, '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			const param = {
				branchId: row.branchId
			}
			BranchApi.deleteBranchById(param).then((res)=>{
				if(res.code === "200"){
					ElMessage.success('删除成功！')
					getBranchPageList()
				}
			})
		}).catch(() => {})
	}

	// 列表查询--分页功能
	const tableData = ref([])
	const currentPage = ref(1) // 当前页
	const total = ref(0) // 总条数
	const pageSize = ref(1) // 每页几条数据
	const getBranchPageList = BranchApi.getBranchPageList().then((res) => {
		const reponseInfo = res.data
		if (res.code === "200") {
			tableData.value = reponseInfo.list
			total.value = reponseInfo.total
			currentPage.value = reponseInfo.pageNum
			pageSize.value = reponseInfo.pageSize
		} else {
			ElMessage.error(res.msg)
		}
	})
	// 分页逻辑处理函数
	const paginatedData = computed(() => {
		const start = (currentPage.value - 1) * pageSize.value;
		const end = start + pageSize.value;
		return tableData.value.slice(start, end);
	});
	// 处理每页条数变化事件
	const handleSizeChange = (newSize) => {
		pageSize.value = newSize;
		currentPage.value = 1; // 重置到第一页
	};

	// 处理当前页码变化事件
	const handleCurrentChange = (newPage) => {
		currentPage.value = newPage;
	};
</script>

<style scoped lang="scss">
	.pagination-page {
		.top-search {
			.el-input {
				width: 200px;
			}

			.el-button {
				margin-left: 10px;
			}
		}

		.el-pagination {
			margin-top: 10px;
		}
	}
</style>