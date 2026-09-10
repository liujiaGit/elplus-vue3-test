<template>
  <div ref="chartRef"></div>
</template>

<script setup>
import * as echarts from 'echarts';

const chartRef = ref(null);
let myChart = null;

// 初始化图表
const initChart = () => {
  myChart = echarts.init(chartRef.value);

  const option = {
    // 标题
    title: {
      text: '地热开发利用',
      left: '2%',
      top: '2%',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    // 鼠标悬浮提示
    tooltip: {
      trigger: 'axis'
    },
    // 图例
    legend: {
      data: ['供温', '回温', '压力值(Mpa)'],
      right: '2%',
      top: '2%',
      icon: 'circle' // 设置图例图标为圆形
    },
    // 网格布局
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    // X轴 (类目轴)
    xAxis: {
      type: 'category',
      boundaryGap: true, // 柱状图需要留白
      data: ['1km', '2km', '3km', '4km', '5km', '6km'],
      axisLine: { show: false },
      axisTick: { show: false }
    },
    // Y轴 (双轴)
    yAxis: [
      {
        type: 'value',
        name: '供回温温度(℃)',
        min: 0,
        max: 80,
        interval: 10,
        position: 'left',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#e0e0e0'
          }
        }
      },
      {
        type: 'value',
        name: '压力值(Mpa)',
        min: 0,
        max: 70,
        interval: 10,
        position: 'right',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false } // 右侧轴不显示网格线
      }
    ],
    // 数据系列
    series: [
      {
        name: '供温',
        type: 'line',
        yAxisIndex: 0, // 使用左侧 Y 轴
        smooth: true, // 平滑曲线
        symbol: 'triangle', // 三角形标记
        symbolSize: 8,
        data: [1, 2, 3, 8, 1, 0], // 模拟数据，请替换
        itemStyle: { color: '#ff9900' },
        lineStyle: { width: 2, color: '#ff9900' }
      },
      {
        name: '回温',
        type: 'line',
        yAxisIndex: 0, // 使用左侧 Y 轴
        smooth: true,
        symbol: 'emptyCircle', // 空心圆标记
        symbolSize: 8,
        data: [30, 35, 55, 25, 72, 22], // 模拟数据，请替换
        itemStyle: { color: '#33cc66', borderWidth: 2 },
        lineStyle: { width: 2, color: '#33cc66' },
        areaStyle: { // 填充底部半透明绿色
          color: '#33cc66',
          opacity: 0.1
        }
      },
      {
        name: '压力值(Mpa)',
        type: 'bar',
        yAxisIndex: 1, // 使用右侧 Y 轴
        barWidth: '15%', // 柱子宽度
        data: [10, 35, 58, 40, 72, 20], // 模拟数据，请替换
        itemStyle: {
          // 半透明淡紫色，顶部圆角
          color: 'rgba(153, 153, 255, 0.4)',
          borderRadius: [10, 10, 0, 0]
        }
      }
    ]
  };

  myChart.setOption(option);
};

// 监听窗口大小变化
const handleResize = () => {
  if (myChart) myChart.resize();
};

onMounted(() => {
  initChart();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  if (myChart) {
    myChart.dispose();
  }
});
</script>