<template>
	<div class="bar-view">
		柱状图
	</div>
</template>

<script setup>

</script>

<style scoped>
	.bar-view {
		background-color: #ffffff;
		border: 1px #f0f2f4 solid;
		border-radius: 5px;
	}

	.bar-view:hover {
		/* 悬停时显示阴影，数值越大阴影越明显 */
		box-shadow: 100px 50px 150px #f0f2f4;
		transform: translateZ(10px);
		/* 顺便微微上浮，效果更佳 */
	}
</style>