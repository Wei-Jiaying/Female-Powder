<template>
	<view class="container">
		<!-- 头部信息 -->
		<view class="header">
			<image class="avatar" :src="avatarUrl"></image>
			<view class="user-info">
				<text class="username">{{username}}123</text>
				<text class="level">LV1</text>
				<text class="id">ID: {{userId}}</text>
			</view>
			<view class="header-icons">
				<image class="bell-icon" :src="bellIconUrl"></image>
				<image class="setting-icon" :src="settingIconUrl"></image>
			</view>
		</view>
		<!-- 签到模块 -->
		<view class="sign-in">
			<view class="sign-in-info">
				<text>已连续签到1天</text>
				<text>获得10积分~</text>
			</view>
			<view class="sign-in-bonus">
				<view class="bonus-item bonus-today">+10</view>
				<view class="bonus-item">+10</view>
				<view class="bonus-item">+10</view>
				<view class="bonus-item">+10</view>
				<view class="bonus-item">+10</view>
				<view class="bonus-item">+10</view>
				<view class="bonus-item">+20</view>
			</view>
			<view class="sign-in-days">
				<text>今天</text>
				<text>第2天</text>
				<text>第3天</text>
				<text>第4天</text>
				<text>第5天</text>
				<text>第6天</text>
				<text>第7天</text>
			</view>
			<button class="sign-in-button">签到订阅</button>
		</view>
		<!-- 模式选择模块 -->
		<view class="mode-select">
			<div class="title">模式选择</div>
			<view class="mode-item">
				<image :src="preparingIconUrl"></image>
				<text>备孕</text>
			</view>
			<view class="mode-item">
				<image :src="pregnancyIconUrl"></image>
				<text>孕期</text>
			</view>
			<view class="mode-item">
				<image :src="postpartumIconUrl"></image>
				<text>产后</text>
			</view>
		</view>
		<!-- 功能列表模块 -->
		<view class="function-list">
			<view class="function-item">
				<image :src="userInfoIconUrl"></image>
			</view>
			<view class="function-item">
				<image :src="favoritesIconUrl"></image>
			</view>
			<view class="function-item">
				<image :src="likesIconUrl"></image>
			</view>
			<view class="function-item">
				<image :src="browseHistoryIconUrl"></image>
			</view>
			<view class="function-item">
				<image :src="exchangeIconUrl"></image>
			</view>
			<view class="function-item">
				<image :src="customerServiceIconUrl"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatarUrl: '/static/Person/头像.png', // 头像路径，需替换为实际路径
				username: '晴晴',
				userId: '123456789',
				bellIconUrl: '/static/Person/bell.png', // 铃铛图标路径
				settingIconUrl: '/static/Person/setting.png', // 设置图标路径
				preparingIconUrl: '/static/Person/preparing.png', // 备孕图标路径
				pregnancyIconUrl: '/static/Person/pregnancy.png', // 孕期图标路径
				postpartumIconUrl: '/static/Person/postpartum.png', // 产后图标路径
				userInfoIconUrl: '/static/Person/user_info.png', // 我的资料图标路径
				favoritesIconUrl: '/static/Person/favorites.png', // 我的收藏图标路径
				likesIconUrl: '/static/Person/likes.png', // 我的喜欢图标路径
				browseHistoryIconUrl: '/static/Person/browse_history.png', // 浏览历史图标路径
				exchangeIconUrl: '/static/Person/exchange.png', // 积分兑换图标路径
				customerServiceIconUrl: '/static/Person/customer_service.png' // 客服中心图标路径
			};
		}
	};
</script>

<style scoped>
	.container {
		background-color: #fef4ff;
		padding: 20rpx;
	}

	/* 头部样式 */
	.header {
		position: relative;
		width: 100%;
		display: flex;
		align-items: center;
		padding: 10rpx 0;
		margin-bottom: 20rpx;
	}

	.avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.user-info {
		position: relative;
		display: flex;
		margin-left: 20rpx;
		flex-direction: column;
	}

	.username {
		font-size: 30rpx;
		font-weight: 800;
	}

	.level {
		position: absolute;
		top: 10rpx;
		left: 130rpx;
		font-size: 15rpx;
		padding: 2rpx 10rpx;
		border-radius: 12rpx;
		background-color: #ff9900;
	}

	.id {
		font-size: 24rpx;
		color: #999;
	}

	.header-icons {
		display: flex;
		gap:20rpx;
		position: absolute;
		right: 5rpx;
		top: 5rpx;
	}

	.bell-icon,
	.setting-icon {
		width: 40rpx;
		height: 40rpx;
	}

	/* 签到样式 */
	.sign-in {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
		position: relative;
	}

	.sign-in-info {
		text-align: center;
		margin-bottom: 10rpx;
	}

	.sign-in-bonus {
		display: flex;
		justify-content: center;
		margin-bottom: 10rpx;
	}

	.bonus-item {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		background-color: #eee;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		margin: 0 10rpx;
	}

	.bonus-today {
		background-color: #ffcc00;
		color: #fff;
	}

	.sign-in-days {
		display: flex;
		justify-content: center;
		font-size: 24rpx;
		color: #999;
	}

	.sign-in-button {
		position: absolute;
		right: 20rpx;
		top: 20rpx;
		background-color: #ff6600;
		color: #fff;
		border: none;
		border-radius: 10rpx;
		padding: 10rpx 20rpx;
		font-size: 24rpx;
	}

	/* 模式选择样式 */
	.mode-select {
		position: relative;
		background-color: #fff;
		border-radius: 20rpx;
		display: flex;
		justify-content: space-around;
		padding-top: 40rpx;
		padding-bottom: 20rpx;
		margin-bottom: 20rpx;
	}

	.title {
		position: absolute;
		left: 5rpx;
		top: 5rpx;
		font-size: 25rpx;
		color: #D8D8D8;
		z-index: 5;
	}

	.mode-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-weight: 800;
		font-size: 34rpx;

	}

	.mode-item image {
		width: 180rpx;
		height: 180rpx;
		margin-bottom: 10rpx;
	}

	/* 功能列表样式 */
	.function-list {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 20rpx;
	}

	.function-item {
		display: flex;
		align-items: center;
		margin-bottom: 15rpx;
	}

	.function-item image {
		width: 250rpx;
		height: 70rpx;
		margin-right: 20rpx;
	}
</style>