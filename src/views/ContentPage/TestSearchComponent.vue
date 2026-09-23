<template>
	<SearchTem :api="fetchList" :fieldItem="fieldItem" :tableCloumns="tableCloumns" :formData="formData" />
</template>

<script setup lang="ts">
	import { reactive, ref } from 'vue';
	import SearchTem from '@/components/SearchTem.vue'
	import { BranchApi } from '@/api/Branch'

	const fieldItem = reactive([
		{
			label: "上级部门名称",
			prop: "lastRoleName",
			type: 'input',
			placeholder:''
		},
		{
			label: "人员名称",
			prop: "perName",
			type: 'input',
		},
	])
	const tableCloumns = reactive([
		{
			prop: "lastRoleName",
			label: "上级部门名称",
		},
		{
			prop: "branchNo",
			label: "部门编号",
		},
		{
			prop: "branchName",
			label: "部门名称",
		},
		{
			prop: "perNo",
			label: "人员编号",
		},
		{
			prop: "perName",
			label: "人员名称",
		},
	])
	const formData = reactive({
			branchName:'',
			perName:''
		}
	)
  async function fetchList(formData: string) {
  // 实际项目替换为 axios
  return BranchApi.getBranchPageList(formData)
  }
</script>

<style scoped>

</style>