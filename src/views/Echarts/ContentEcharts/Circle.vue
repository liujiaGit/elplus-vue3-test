<template>
	<div ref="chartRef" class="circle-data"></div>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';
	import * as echarts from 'echarts';

	const chartRef = ref(null);

	onMounted(() => {
		const myChart = echarts.init(chartRef.value);

		const option = {
			title: {
				text: '房屋建筑工程',
				left: '2%',
				top: '4%',
				textStyle: {
					fontSize: 16,
					fontWeight: 'bold'
				}
			},
			tooltip: {
				trigger: 'item',
				formatter: '{b}: {c} ({d}%)'
			},
			legend: {
				orient: 'vertical',
				right: '10%',
				top: 'middle',
				icon: 'rect', // 图例方块样式
				itemWidth: 12,
				itemHeight: 12,
				textStyle: {
					fontSize: 14
				}
			},
			series: [{
				name: '工程分类',
				type: 'pie',
				radius: ['40%','50%'], // 内半径和外半径，实现环形
				left: '-30%',
				avoidLabelOverlap: false,
				label: {
					show: false
				}, // 隐藏扇区上的文字
				emphasis: {
					label: {
						show: false
					}
				},
				data: [{
						value: 35,
						name: '房屋及结构物',
						itemStyle: {
							color: '#4A90E2'
						}
					},
					{
						value: 30,
						name: '专用设备',
						itemStyle: {
							color: '#50E3C2'
						}
					},
					{
						value: 20,
						name: '通用设备',
						itemStyle: {
							color: '#F5A623'
						}
					},
					{
						value: 10,
						name: '文物和陈列品',
						itemStyle: {
							color: '#9B59B6'
						}
					},
					{
						value: 5,
						name: '图书、档案',
						itemStyle: {
							color: '#F8BBD0'
						}
					}
				]
			}]
		};

		myChart.setOption(option);

		// 监听窗口大小改变，使图表自适应
		window.addEventListener('resize', () => {
			myChart.resize();
		});
	});
</script>

<style scoped>
	
</style>