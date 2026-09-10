<template>
	<!-- 1. 创建一个DOM容器，并添加ref引用 -->
	<div ref="chartRef" class="line-test"></div>
</template>

<script setup>
	import * as echarts from 'echarts'

	const chartData = reactive({
		months: [],
		queueData: [],
		priceData: []
	})
	const resData = {
		months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
		// 预购队列数据 (橙色)
		queueData: [0, 40, 30, 65, 53, 53, 53, 40, 30, 65, 53, 10],
		// 最新成交价数据 (紫色)
		priceData: [0, 23, 7, 15, 42, 42, 42, 23, 7, 15, 42, 0]
	}
	Object.assign(chartData, resData)

	const resizeChart = () => {
		myChart?.resize()
	}
	// 获取DOM元素的引用
	const chartRef = ref(null)
	let myChart = null
	const initChart = () => {
		if (!chartRef.value) return
		// 如果已存在实例，先销毁
		if (myChart) {
			myChart.dispose()
		}
		myChart = echarts.init(chartRef.value)
		let option = {
			title: {
				text: '政策补贴额度',
				left: '2%',
				top: '2%',
				textStyle: {
					fontSize: 18,
					fontWeight: 'bold',
					color: '#333'
				}
			},
			tooltip: {
				trigger: 'axis', // 鼠标悬浮显示数据轴
				axisPointer: {
					type: 'line'
				}
			},
			legend: {
				data: ['预购队列', '最新成交价'],
				right: '4%',
				top: '4%',
				icon: 'circle'
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				boundaryGap: false, // 让线条从起点开始
				data: chartData.months,
				axisLine: {
					lineStyle: {
						color: '#ccc'
					}
				},
				axisLabel: {
					color: '#666'
				}
			},
			yAxis: {
				type: 'value',
				name: '价格',
				min: 0,
				max: 70,
				axisLabel: {
					color: '#666'
				},
				splitLine: {
					lineStyle: {
						type: 'dashed' // 虚线网格
					}
				}
			},
			series: [{
					name: '预购队列',
					type: 'line',
					smooth: true, // 平滑曲线
					symbol: 'circle', // 实心圆点
					symbolSize: 8,
					data: chartData.queueData,
					itemStyle: {
						color: '#F47C6E'
					}, // 橙色
					lineStyle: {
						width: 3
					},
					// 渐变面积填充
					areaStyle: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: 'rgba(244, 124, 110, 0.5)'
							},
							{
								offset: 1,
								color: 'rgba(244, 124, 110, 0)'
							}
						])
					}
				},
				{
					name: '最新成交价',
					type: 'line',
					smooth: true,
					symbol: 'circle',
					symbolSize: 8,
					data: chartData.priceData,
					itemStyle: {
						color: '#9E7BF0'
					}, // 紫色
					lineStyle: {
						width: 3
					},
					// 渐变面积填充
					areaStyle: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: 'rgba(158, 123, 240, 0.5)'
							},
							{
								offset: 1,
								color: 'rgba(158, 123, 240, 0)'
							}
						])
					}
				}
			]
		};
		myChart.setOption(option)
	}
	//渲染成功后初始化页面
	onMounted(() => {
		initChart()
		window.addEventListener('resize', resizeChart)
	})
	onBeforeUnmount(() => {
		if (myChart) {
			window.removeEventListener('resize', resizeChart)
			myChart.dispose()
			myChart = null
		}
	})
</script>

<style scoped>

</style>