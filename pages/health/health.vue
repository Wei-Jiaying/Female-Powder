<template>
	<view class="health-page">
		<!-- 页面标题 -->
		<view class="page-header">
			<text class="header-title">母婴健康管理</text>
		</view>

		<!-- 模式选择器 -->
		<view class="mode-selector">
			<view v-for="(mode, index) in modeList" :key="index"
				:class="['mode-item', currentMode === mode.value ? 'mode-active' : '']" @click="switchMode(mode.value)">
				<view class="mode-icon" :style="{'background-color': mode.color}">
					<text class="emoji">{{ mode.emoji }}</text>
				</view>
				<text class="mode-name">{{mode.name}}</text>
			</view>
		</view>

		<!-- 模式对应内容 -->
		<view class="mode-content">
			<prepare-mode v-if="currentMode === 'prepare'"></prepare-mode>
			<pregnancy-mode v-else-if="currentMode === 'pregnancy'"></pregnancy-mode>
			<postpartum-mode v-else-if="currentMode === 'postpartum'"></postpartum-mode>
			<view class="default-tip" v-else>
				<view class="tip-icon">💡</view>
				<text class="tip-text">请选择对应的模式，获取专属健康服务</text>
			</view>
		</view>
	</view>
</template>

<script>
	import PrepareMode from '@/pages/health/PrepareMode.vue'
	import PregnancyMode from '@/pages/health/PregnancyMode.vue'
	import PostpartumMode from '@/pages/health/PostpartumMode.vue'

	export default {
		components: {
			PrepareMode,
			PregnancyMode,
			PostpartumMode
		},
		data() {
			return {
				modeList: [{
						name: '备孕',
						value: 'prepare',
						color: '#8ab4f8',
						emoji: '🌸'
					},
					{
						name: '孕期',
						value: 'pregnancy',
						color: '#c199f6',
						emoji: '🤰'
					},
					{
						name: '产后',
						value: 'postpartum',
						color: '#ff9a9e',
						emoji: '👩‍🍼'
					}
				],
				currentMode: ''
			}
		},
		// 新增：页面加载时接收参数并自动匹配模式
		onLoad(options) {
			// console.log('接收的参数：', options) // 打印参数，在控制台查看
			const targetMode = options.mode
			// console.log('目标模式：', targetMode)
			if (!targetMode) return // 若没有参数，不处理

			// 校验参数是否在合法的模式列表中
			const isValidMode = this.modeList.some(item => item.value === targetMode)
			if (isValidMode) {
				this.currentMode = targetMode // 自动切换到对应模式
			}
		},
		methods: {
			switchMode(modeValue) {
				this.currentMode = modeValue
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
			}
		}
	}
</script>

<style scoped>
	/* 页面全局样式 */
	.health-page {
		background-color: #fef4ff;
		min-height: 100vh;
		padding: 20rpx;
		box-sizing: border-box;
	}

	/* 页面标题 */
	.page-header {
		padding: 25rpx 0;
		margin-bottom: 30rpx;
	}

	.header-title {
		font-size: 34rpx;
		font-weight: 700;
		color: #333;
	}

	/* 模式选择器 */
	.mode-selector {
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		border-radius: 24rpx;
		padding: 25rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
	}

	.mode-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 30%;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	/* 模式图标（含emoji） */
	.mode-icon {
		width: 80rpx;
		height: 80rpx;
		border-radius: 20rpx;
		margin-bottom: 15rpx;
		transition: transform 0.2s ease;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* emoji样式优化 */
	.emoji {
		font-size: 44rpx;
		/* 适中大小，确保清晰可见 */
		line-height: 1;
		color: #fff;
		/* 白色emoji与彩色背景形成对比 */
		text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.1);
		/* 轻微阴影增强立体感 */
	}

	.mode-name {
		font-size: 28rpx;
		font-weight: 600;
		color: #666;
	}

	/* 选中模式样式 */
	.mode-active .mode-icon {
		transform: scale(1.1);
		box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
	}

	.mode-active .mode-name {
		color: #333;
	}

	/* 模式内容区 */
	.mode-content {
		background-color: #fff;
		border-radius: 24rpx;
		padding: 30rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
		min-height: 500rpx;
		display: flex;
		flex-direction: column;
	}

	/* 默认提示 */
	.default-tip {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 500rpx;
		color: #999;
	}

	.tip-icon {
		width: 120rpx;
		height: 120rpx;
		margin-bottom: 20rpx;
		opacity: 0.6;
	}

	.tip-text {
		font-size: 26rpx;
		text-align: center;
		max-width: 80%;
	}
</style>