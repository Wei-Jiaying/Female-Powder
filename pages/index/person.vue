<template>
	<view class="container">
		<!-- 头部信息（无图片版） -->
		<view class="header">
			<!-- 替代头像：用彩色圆形+首字母 -->
			<view class="avatar">
				<text class="avatar-initial">{{username.slice(0,1)}}</text>
			</view>
			<view class="user-info">
				<view class="user-top">
					<text class="username">{{username}}</text>
					<text class="level">LV1</text>
				</view>
				<text class="id">ID: {{userId}}</text>
			</view>
			<view class="header-icons">
				<!-- 替代铃铛图标：用文字+红点提示 -->
				<view class="icon-item bell-icon">
					<text class="icon-text">🔔</text>
					<view class="notify-dot"></view>
				</view>
				<!-- 替代设置图标：用文字符号 -->
				<view class="icon-item setting-icon">
					<text class="icon-text">⚙️</text>
				</view>
			</view>
		</view>

		<!-- 签到模块（优化视觉层次） -->
		<view class="sign-in">
			<view class="sign-in-header">
				<text class="sign-in-title">每日签到</text>
				<button class="sign-in-button">签到订阅</button>
			</view>
			<view class="sign-in-info">
				<text class="sign-desc">已连续签到1天</text>
				<text class="sign-reward">获得10积分~</text>
			</view>
			<!-- 签到奖励进度 -->
			<view class="sign-in-bonus">
				<view class="bonus-item bonus-today">
					<text class="bonus-num">+10</text>
					<text class="bonus-tag">今日</text>
				</view>
				<view class="bonus-item">
					<text class="bonus-num">+10</text>
				</view>
				<view class="bonus-item">
					<text class="bonus-num">+10</text>
				</view>
				<view class="bonus-item">
					<text class="bonus-num">+10</text>
				</view>
				<view class="bonus-item">
					<text class="bonus-num">+10</text>
				</view>
				<view class="bonus-item">
					<text class="bonus-num">+10</text>
				</view>
				<view class="bonus-item bonus-week">
					<text class="bonus-num">+20</text>
					<text class="bonus-tag">周奖</text>
				</view>
			</view>
			<!-- 签到天数标签 -->
			<view class="sign-in-days">
				<text class="day-item day-active">今天</text>
				<text class="day-item">第2天</text>
				<text class="day-item">第3天</text>
				<text class="day-item">第4天</text>
				<text class="day-item">第5天</text>
				<text class="day-item">第6天</text>
				<text class="day-item">第7天</text>
			</view>
		</view>

		<!-- 模式选择模块（优化点击反馈，添加emoji） -->
		<view class="mode-select">
			<text class="section-title">模式选择</text>
			<view class="mode-list">
				<view class="mode-item" hover-class="mode-item-active" @click="goToHealthPage('prepare')">
					<view class="mode-icon mode-icon-prepare">
						<text class="emoji">🌸</text>
					</view>
					<text class="mode-name">备孕</text>
				</view>
				<view class="mode-item" hover-class="mode-item-active" @click="goToHealthPage('pregnancy')">
					<view class="mode-icon mode-icon-pregnancy">
						<text class="emoji">🤰</text>
					</view>
					<text class="mode-name">孕期</text>
				</view>
				<view class="mode-item" hover-class="mode-item-active" @click="goToHealthPage('postpartum')">
					<view class="mode-icon mode-icon-postpartum">
						<text class="emoji">👩‍🍼</text>
					</view>
					<text class="mode-name">产后</text>
				</view>
			</view>
		</view>

		<!-- 功能列表模块（优化布局与交互） -->
		<view class="function-list">
			<text class="section-title">我的功能</text>
			<view class="function-grid">
				<view class="function-item" hover-class="function-item-active">
					<view class="func-icon func-icon-info"></view>
					<text class="func-name">我的资料</text>
				</view>
				<view class="function-item" hover-class="function-item-active">
					<view class="func-icon func-icon-collect"></view>
					<text class="func-name">我的收藏</text>
				</view>
				<view class="function-item" hover-class="function-item-active">
					<view class="func-icon func-icon-like"></view>
					<text class="func-name">我的喜欢</text>
				</view>
				<view class="function-item" hover-class="function-item-active">
					<view class="func-icon func-icon-history"></view>
					<text class="func-name">我的历史</text>
				</view>
				<view class="function-item" hover-class="function-item-active">
					<view class="func-icon func-icon-exchange"></view>
					<text class="func-name">积分兑换</text>
				</view>
				<view class="function-item" hover-class="function-item-active">
					<view class="func-icon func-icon-service"></view>
					<text class="func-name">客服中心</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '晴晴',
				userId: '123456789'
			};
		},
		methods: {
			goToHealthPage(mode) {
				wx.reLaunch({
					url: `/pages/health/health?mode=${mode}` // 这里的参数会被正确传递
				})
			}
		}
	};
</script>

<style scoped>
	/* 全局样式：统一基础风格 */
	.container {
		background-color: #fef4ff;
		min-height: 100vh;
		padding: 20rpx;
		box-sizing: border-box;
	}

	/* 头部样式：优化布局与质感 */
	.header {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 15rpx 20rpx;
		margin-bottom: 25rpx;
		background-color: #fff;
		border-radius: 24rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
	}

	/* 文字头像：替代图片，更有辨识度 */
	.avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background: linear-gradient(135deg, #ffccd5 0%, #ff9a9e 100%);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.avatar-initial {
		font-size: 36rpx;
		color: #fff;
		font-weight: 700;
	}

	/* 用户信息：优化排版层次 */
	.user-info {
		margin-left: 20rpx;
		flex: 1;
	}

	.user-top {
		display: flex;
		align-items: center;
		margin-bottom: 8rpx;
	}

	.username {
		font-size: 30rpx;
		font-weight: 700;
		color: #333;
	}

	.level {
		font-size: 18rpx;
		padding: 3rpx 12rpx;
		border-radius: 16rpx;
		background-color: #ff9900;
		color: #fff;
		margin-left: 12rpx;
	}

	.id {
		font-size: 24rpx;
		color: #999;
	}

	/* 头部图标：替代图片，增加提示 */
	.header-icons {
		display: flex;
		gap: 30rpx;
	}

	.icon-item {
		width: 48rpx;
		height: 48rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.icon-text {
		font-size: 32rpx;
	}

	/* 通知红点：增强提醒 */
	.notify-dot {
		position: absolute;
		top: 0;
		right: 0;
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
		background-color: #ff4d4f;
	}

	/* 签到模块：优化视觉流程 */
	.sign-in {
		background-color: #fff;
		border-radius: 24rpx;
		padding: 25rpx;
		margin-bottom: 25rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
	}

	.sign-in-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15rpx;
	}

	.sign-in-title {
		font-size: 28rpx;
		font-weight: 600;
		color: #333;
	}

	/* 签到按钮：优化样式与交互 */
	.sign-in-button {
		background-color: #ff6600;
		color: #fff;
		border: none;
		border-radius: 16rpx;
		padding: 8rpx 20rpx;
		font-size: 24rpx;
		font-weight: 500;
	}

	.sign-in-button:hover {
		background-color: #e55c00;
	}

	/* 签到信息：增强可读性 */
	.sign-in-info {
		text-align: center;
		margin-bottom: 20rpx;
	}

	.sign-desc {
		font-size: 26rpx;
		color: #333;
		margin-right: 15rpx;
	}

	.sign-reward {
		font-size: 26rpx;
		color: #ff6600;
		font-weight: 500;
	}

	/* 签到奖励：优化视觉区分 */
	.sign-in-bonus {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12rpx;
		padding: 0 10rpx;
	}

	.bonus-item {
		width: 65rpx;
		height: 65rpx;
		border-radius: 50%;
		background-color: #f5f5f5;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.bonus-num {
		font-size: 24rpx;
		font-weight: 600;
		color: #666;
	}

	/* 今日奖励：突出显示 */
	.bonus-today {
		background-color: #ffcc00;
	}

	.bonus-today .bonus-num {
		color: #fff;
	}

	/* 周奖励：特殊标记 */
	.bonus-week {
		background-color: #ff9a9e;
	}

	.bonus-week .bonus-num {
		color: #fff;
	}

	/* 奖励标签：增加信息维度 */
	.bonus-tag {
		font-size: 14rpx;
		color: #fff;
		font-weight: 500;
	}

	/* 签到天数：优化选中状态 */
	.sign-in-days {
		display: flex;
		justify-content: space-between;
		padding: 0 15rpx;
	}

	.day-item {
		font-size: 22rpx;
		color: #999;
	}

	.day-active {
		color: #ff6600;
		font-weight: 600;
	}

	/* 模式选择：优化视觉与交互，添加emoji */
	.mode-select {
		background-color: #fff;
		border-radius: 24rpx;
		padding: 30rpx 20rpx 20rpx;
		margin-bottom: 25rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
	}

	/* section标题：统一风格 */
	.section-title {
		font-size: 26rpx;
		font-weight: 600;
		color: #333;
		margin-bottom: 30rpx;
		display: block;
	}

	.mode-list {
		display: flex;
		justify-content: space-around;
	}

	/* 模式项：增加图标与反馈，含emoji */
	.mode-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 140rpx;
	}

	/* 模式图标：替代图片，用彩色块区分，包含emoji */
	.mode-icon {
		width: 100rpx;
		height: 100rpx;
		border-radius: 20rpx;
		margin-bottom: 15rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.mode-icon-prepare {
		background: linear-gradient(135deg, #c5dffe 0%, #8ab4f8 100%);
	}

	.mode-icon-pregnancy {
		background: linear-gradient(135deg, #e8d4ff 0%, #c199f6 100%);
	}

	.mode-icon-postpartum {
		background: linear-gradient(135deg, #ffccd5 0%, #ff9a9e 100%);
	}

	/* emoji样式优化 */
	.emoji {
		font-size: 44rpx;
		line-height: 1;
		color: #fff;
		text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.1);
	}

	.mode-name {
		font-size: 28rpx;
		font-weight: 600;
		color: #333;
	}

	/* 模式项点击反馈 */
	.mode-item-active {
		opacity: 0.8;
	}

	/* 功能列表：优化网格布局 */
	.function-list {
		background-color: #fff;
		border-radius: 24rpx;
		padding: 30rpx 20rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
	}

	.function-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20rpx;
	}

	/* 功能项：增加图标与交互 */
	.function-item {
		display: flex;
		align-items: center;
		padding: 20rpx;
		background-color: #fafafa;
		border-radius: 16rpx;
	}

	/* 功能图标：替代图片，用简洁色块 */
	.func-icon {
		width: 50rpx;
		height: 50rpx;
		border-radius: 12rpx;
		margin-right: 18rpx;
	}

	.func-icon-info {
		background-color: #c5dffe;
	}

	.func-icon-collect {
		background-color: #e8d4ff;
	}

	.func-icon-like {
		background-color: #ffccd5;
	}

	.func-icon-history {
		background-color: #d4f2e7;
	}

	.func-icon-exchange {
		background-color: #fff2cc;
	}

	.func-icon-service {
		background-color: #ffe5cc;
	}

	.func-name {
		font-size: 26rpx;
		color: #333;
	}

	/* 功能项点击反馈 */
	.function-item-active {
		background-color: #f5f5f5;
	}
</style>