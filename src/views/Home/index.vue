<template>
	<div>
		<!-- 头部展示信息 -->
		<div class="info">
			<div class="bg-color info-content" v-for="item in infoList" :key="item.id">
				<div class="info-data float-left">
					<p>
						<span class="data-info">{{item.infoData}}</span>
						<span class="rate">{{item.rate}}</span>
					</p>
					<p class="info-title">{{item.title}}</p>
				</div>
				<div class="float-right">
					<img class="top-img" :src="getAssetUrl(item.img)" />
				</div>
			</div>
		</div>
		<div class="info-center">
			<TestLine class="bg-color chart-bg float-left" />
			<Circle class="bg-color chart-circle float-right" />
		</div>
		<div class="info-bottom">
			<div class="bg-color float-left show-title">
				<div class="title">展示信息</div>
				<div class="show-data">
					<div class="show-info" v-for="item in showList" :key="item.id">
						<p>{{item.title}}</p>
						<p>{{item.dataInfo}}</p>
					</div>
				</div>
			</div>
			<GeothermalChart class="bg-color float-right chart-geothermal" />
		</div>
	</div>
</template>

<script setup>
	import {
		ElMessage
	} from 'element-plus';
	import {
		DataInfoApi
	} from '@/api/TheTableDataInfo.ts'
	import {
		getAssetUrl
	} from '@/untils/useAccet'
	import TestLine from '@/views/Echarts/ContentEcharts/TestLine.vue'
	import Circle from '@/views/Echarts/ContentEcharts/Circle.vue'
	import GeothermalChart from '@/views/Echarts/ContentEcharts/GeothermalChart.vue'
	import {
		reactive
	} from 'vue';

	// 头部flex布局数据
	const infoList = reactive([{
		id: '',
		title: '', //标题
		infoData: 0, //数据
		rate: 0, //涨幅
		img: '', //图片
	}])

	const info = DataInfoApi.getDataInfoPageList().then((res) => {
		if (res.code === '200') {
			const newData = res.data
			// 赋值方法一
			// infoList.length = 0
			// infoList.push(...newData)
			// 赋值方法二
			Object.assign(infoList,newData)
		} else {
			ElMessage('查询失败！')
		}
	}).catch((err) => {
		// 加上这个，看看具体的报错信息
		console.error("请求出错了：", err);
		ElMessage.error('网络请求失败，请检查控制台');
	});

	//底部flex布局数据
	const showList = reactive([{
		id: '',
		title: '',
		dataInfo: ''
	}])
	//测试数据
	const res = [{
			id: '1',
			title: '浅浅',
			dataInfo: '2.1%OBSM'
		},
		{
			id: '2',
			title: '白真',
			dataInfo: '30℃'
		},
		{
			id: '3',
			title: '夜华',
			dataInfo: '107w'
		},
		{
			id: '4',
			title: '紫罗兰',
			dataInfo: '57BF'
		},
		{
			id: '5',
			title: '康乃馨',
			dataInfo: '98PB'
		},
		{
			id: '6',
			title: '李文华',
			dataInfo: '5578Cpd'
		},
		{
			id: '7',
			title: '玫瑰',
			dataInfo: '89HY'
		},
		{
			id: '8',
			title: '月季',
			dataInfo: '12kg'
		},
		{
			id: '9',
			title: '牡丹',
			dataInfo: '687fm'
		}
	]
	Object.assign(showList,res)
</script>

<style scoped lang="scss">
	.info {
		display: flex;
		justify-content: space-between;
	}

	.info-content {
		width: 21%;
		background-color: #ffffff;
		padding: 30px 20px;
		border-radius: 5px;
	}

	.chart-bg,
	.chart-circle,
	.info-content,
	.chart-geothermal,
	.show-title {
		&:hover {
			box-shadow: 0 2px 12px #0000001a;
		}
	}

	.data-info {
		font-size: 30px;
	}

	.rate {
		color: red;
	}

	.info-title {
		font-size: 16px;
		padding-top: 10px;
	}

	.top-img {
		width: 30px;
		padding-top: 20px;
	}

	.info-center {
		margin-top: 10px;
		height: 402px;
	}

	.info-bottom {
		height: 420px;
		margin-top: 10px;
	}

	.chart-bg {
		width: 65%;
		height: 400px;
	}

	.chart-circle {
		width: 34%;
		height: 400px;
	}

	.show-title {
		width: 34%;
		height: 400px;
	}

	.show-data {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
	}

	.title {
		margin: 10px;
		font-size: 16px;
		font-weight: bold;
	}

	.show-info {
		width: 22%;
		height: 100px;
		margin: 10px 0 0 10px;
		background-color: #f5f5ff;
		display: flex;
		flex-direction: column;
		/* 垂直排列：图标 -> 标题 -> 数值 */
		align-items: center;
		/* 水平居中 */
		justify-content: center;
		/* 垂直居中 */
		text-align: center;
	}
	/* 如果存在占位符，隐藏它们 */
	.show-info:empty {
	  display: none;
	}
	.show-info p {
		font-size: 16px;
		font-weight: 100;
	}

	.chart-geothermal {
		width: 65%;
		height: 400px;
	}
</style>