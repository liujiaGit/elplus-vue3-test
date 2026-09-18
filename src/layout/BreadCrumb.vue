<template>
	<div class="breadcrumb-container">
		<div class="collapse" v-if="flagStore.isCollapse === true" @click="flagStore.toggleMenu">
			<el-icon><i-ep-Expand /></el-icon>
		</div>
		<div class="collapse" v-if="flagStore.isCollapse === false" @click="flagStore.toggleMenu">
			<el-icon><i-ep-Fold /></el-icon>
		</div>
		<el-breadcrumb separator="/">
			<transition-group name="breadcrumb" tag="span">
				<el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
					<span class="breadcrumb-item">
						<el-icon v-if="item.icon" class="item-icon">
							<component :is="item.icon" />
						</el-icon>
						<!-- 最后一项：始终不可点击，显示为当前页 -->
						<span v-if="index === breadcrumbList.length - 1" class="current">
							{{ item.title }}
						</span>
						<!-- 非最后一项：根据 isLink 决定是否可点击 -->
						<span v-else :class="['link', { 'disabled-link': !item.isLink }]" @click="handleNavigate(item)">
							{{ item.title }}
						</span>
					</span>
				</el-breadcrumb-item>
			</transition-group>
		</el-breadcrumb>
	</div>
</template>

<script setup>
	import {
		useRoute,
		useRouter
	} from 'vue-router';
	import {
		useFlagStore
	} from '@/stores/flag.ts'

	const route = useRoute();
	const router = useRouter();
	// 控制菜单的伸缩
	const flagStore = useFlagStore()

	const breadcrumbList = ref([]);

	/**
	 * 生成首页项（固定）
	 */
	const getHomeItem = () => ({
		path: '/home',
		title: '首页',
		isLink: true,
	});

	/**
	 * 判断是否为首页路由
	 */
	const isHomeRoute = (item) => {
		return item.path === '/home' || item.path === '';
	};

	/**
	 * 根据路由路径生成面包屑
	 * 规则：
	 * 1. 过滤掉 meta.breadcrumb === false 的项
	 * 2. 标记 isLink 状态（meta.isLink === false 时不可点击）
	 * 3. 始终在最前面插入“首页”，但如果第一个已经是首页则不重复
	 */
	const generateBreadcrumb = (matched) => {
		// 第一步：过滤掉 meta.breadcrumb === false 的项
		let filtered = matched.filter(item => item.meta?.breadcrumb !== false);

		// 第二步：提取数据，标记 isLink 状态
		let list = filtered.map(item => ({
			path: item.path,
			title: item.meta?.title || item.name || '未命名',
			icon: item.meta?.icon || null,
			isLink: item.meta?.isLink !== false,
		}));

		// 如果路由有自定义面包屑（meta.breadcrumbList），则覆盖
		if (route.meta?.breadcrumbList && Array.isArray(route.meta.breadcrumbList)) {
			list = route.meta.breadcrumbList.map(item => ({
				path: item.path || '',
				title: item.title || '未命名',
				icon: item.icon || null,
				isLink: item.isLink !== false,
			}));
		}

		// ⭐ 核心逻辑：检查第一个项是否为首页
		// 情况1：列表为空 → 只显示首页
		if (list.length === 0) {
			return [getHomeItem()];
		}

		// 情况2：第一个项是首页 → 直接返回（不重复插入）
		const firstItem = list[0];
		if (isHomeRoute(firstItem)) {
			// 确保首页的 isLink 为 true
			list[0] = {
				...firstItem,
				isLink: true
			};
			return list;
		}

		// 情况3：第一个项不是首页 → 在开头插入首页
		return [getHomeItem(), ...list];
	};

	/**
	 * 处理导航点击
	 */
	const handleNavigate = (item) => {
		if (item.isLink && item.path && item.path !== route.path) {
			router.push(item.path);
		}
	};

	/**
	 * 更新面包屑
	 */
	const updateBreadcrumb = () => {
		const matched = route.matched || [];
		breadcrumbList.value = generateBreadcrumb(matched);
	};

	// 监听路由变化
	watch(() => route.path, () => {
		updateBreadcrumb();
	}, {
		immediate: true
	});

	onMounted(() => {
		updateBreadcrumb();
	});
</script>

<style scoped>
	.breadcrumb-container {
		border-radius: 4px;
		margin-top: 15px;
	}
	.collapse {
		float: left;
	}
	.el-breadcrumb {
		padding-left: 30px;
		margin-top: 2px;
	}
	/* 过渡动画 - 切换面包屑时的淡入淡出效果 */
	.breadcrumb-enter-active,
	.breadcrumb-leave-active {
		transition: all 0.2s ease;
	}

	.breadcrumb-enter-from {
		opacity: 0;
		transform: translateX(-6px);
	}

	.breadcrumb-leave-to {
		opacity: 0;
		transform: translateX(6px);
	}

	.breadcrumb-item {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 16px;
	}

	.item-icon {
		margin-right: 2px;
	}

	.link {
		color: #409eff;
		cursor: pointer;
		transition: color 0.15s;
	}

	.link:hover:not(.disabled-link) {
		color: #66b1ff;
	}

	/* isLink: false 时的样式 —— 灰色不可点击 */
	.disabled-link {
		color: #909399;
		cursor: default;
	}

	.disabled-link:hover {
		text-decoration: none;
		color: #909399;
	}

	.current {
		color: #606266;
		font-weight: 600;
		cursor: default;
	}
</style>