<template>
	<div class="health-page">
		<!-- 顶部装饰条 -->
		<div class="top-decoration"></div>

		<!-- 轮播图区域：保持原有比例，稳定视觉基础 -->
		<div class="swiper-container">
			<swiper indicator-dots autoplay interval="5000" circular indicator-active-color="#885A1E"
				indicator-color="rgba(136,90,30,0.2)">
				<swiper-item v-for="(item, index) in swiperList" :key="index">
					<div class="swiper-card" :style="{background: item.bgColor}">
						<text class="swiper-icon">{{item.icon}}</text>
						<text class="swiper-title">{{item.title}}</text>
						<text class="swiper-desc">{{item.desc}}</text>
						<div class="swiper-line" :style="{background: item.lineColor}"></div>
					</div>
				</swiper-item>
			</swiper>
		</div>

		<!-- 功能按钮区：保持紧凑尺寸，避免喧宾夺主 -->
		<div class="function-section">
			<div class="section-header">
				<div class="header-decor left"></div>
				<div class="header-content">
					<text class="header-icon">🌿</text>
					<text class="header-text">核心功能</text>
				</div>
				<div class="header-decor right"></div>
			</div>

			<div class="function-grid">
				<div v-for="(item, index) in functionItems" :key="index" class="function-card"
					@click="ClickFunctionItem(item.title)">
					<div class="func-icon" :style="{background: item.iconBg, boxShadow: item.iconShadow}">
						<text class="icon-text">{{item.icon}}</text>
					</div>
					<text class="func-name">{{item.title}}</text>
				</div>
			</div>
		</div>

		<!-- 今日推荐区：重点放大，提升视觉占比 -->
		<div class="recommend-section">
			<!-- 推荐标题：放大字号+加粗，增强引导性 -->
			<div class="section-title">
				<div class="title-square"></div>
				<text class="title-text">今日推荐</text>
				<text class="more-btn" @click="showMoreRecommend">更多</text>
			</div>

			<!-- 推荐卡片：放大尺寸+增加内边距，内容更舒展 -->
			<div class="recommend-grid">
				<div v-for="(item, index) in recommendList" :key="index" class="recommend-card"
					@click="ClickRecommend(item.title)">
					<div class="card-header" :style="{background: item.headerBg}">
						<text class="card-icon">{{item.icon}}</text>
					</div>
					<div class="card-body">
						<text class="card-title">{{item.title}}</text>
						<text class="card-desc">{{item.desc}}</text>
					</div>
					<!-- 底部标签：新增推荐标签，丰富信息 -->
					<div class="card-tag" :style="{background: item.tagBg}">
						<text class="tag-text">推荐</text>
					</div>
				</div>
			</div>
		</div>

		<div class="bottom-bar">
			<text class="bottom-text">中医养生 · 顺时调理</text>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TraditionalChineseMedicinePage',
		data() {
			return {
				swiperList: [{
						bgColor: 'linear-gradient(135deg, #F0E6D0 0%, #E0D0B0 50%, #D0BC90 100%)',
						lineColor: 'rgba(136,90,30,0.4)',
						icon: '🧑⚕️',
						title: '中医体质辨识',
						desc: '专属体质分析，定制养生方案'
					},
					{
						bgColor: 'linear-gradient(135deg, #D0E8E0 0%, #B0D8C8 50%, #90C8B0 100%)',
						lineColor: 'rgba(60,120,80,0.4)',
						icon: '📅',
						title: '节气养生指南',
						desc: '顺应时节变化，调理身心状态'
					},
					{
						bgColor: 'linear-gradient(135deg, #D0D8E8 0%, #B0BCC8 50%, #909CB0 100%)',
						lineColor: 'rgba(60,80,120,0.4)',
						icon: '🗺️',
						title: '经络穴位查询',
						desc: '专业穴位图解，在家轻松按摩'
					}
				],
				functionItems: [{
						title: '膳食养生',
						icon: '🍲',
						iconBg: 'linear-gradient(135deg, #FFE0C0 0%, #FFD0A0 100%)',
						iconShadow: '0 3rpx 6rpx rgba(240,150,80,0.2)'
					},
					{
						title: '中药养生',
						icon: '🌿',
						iconBg: 'linear-gradient(135deg, #D0E8D0 0%, #B0D8B0 100%)',
						iconShadow: '0 3rpx 6rpx rgba(80,160,100,0.2)'
					},
					{
						title: '中医听诊',
						icon: '🔊',
						iconBg: 'linear-gradient(135deg, #D0D8E8 0%, #B0BCE0 100%)',
						iconShadow: '0 3rpx 6rpx rgba(80,120,180,0.2)'
					},
					{
						title: '经络医学',
						icon: '🗺️',
						iconBg: 'linear-gradient(135deg, #E8E0D0 0%, #D0C8B0 100%)',
						iconShadow: '0 3rpx 6rpx rgba(160,140,80,0.2)'
					},
					{
						title: '在线开方',
						icon: '📝',
						iconBg: 'linear-gradient(135deg, #E8D0E0 0%, #D0B0D0 100%)',
						iconShadow: '0 3rpx 6rpx rgba(160,80,160,0.2)'
					},
					{
						title: '中医古籍',
						icon: '📚',
						iconBg: 'linear-gradient(135deg, #D0E8E8 0%, #B0D0D8 100%)',
						iconShadow: '0 3rpx 6rpx rgba(80,160,180,0.2)'
					},
					{
						title: '诀窍常识',
						icon: '💡',
						iconBg: 'linear-gradient(135deg, #E8D8D0 0%, #D0C0B0 100%)',
						iconShadow: '0 3rpx 6rpx rgba(180,120,80,0.2)'
					}
				],
				// 推荐数据：新增标签背景色，丰富视觉
				recommendList: [{
						title: '秋季润燥汤谱',
						desc: '3款经典润燥食疗方，缓解秋燥口干、皮肤干痒等不适，适合全家饮用',
						icon: '🍂',
						headerBg: 'linear-gradient(135deg, #FFDFC0 0%, #FFCFA0 100%)',
						tagBg: 'rgba(240,150,80,0.2)'
					},
					{
						title: '肩颈经络疏通',
						desc: '5分钟穴位按摩法，针对风池、肩井、天宗等穴位，改善办公族肩颈僵硬',
						icon: '🙌',
						headerBg: 'linear-gradient(135deg, #D0DCE8 0%, #B0C0E0 100%)',
						tagBg: 'rgba(80,120,180,0.2)'
					},
					{
						title: '气虚体质调理',
						desc: '日常养生小妙招：晨起喝黄芪水、做八段锦"两手托天理三焦"式，补气效果佳',
						icon: '🌬️',
						headerBg: 'linear-gradient(135deg, #D0E8D8 0%, #B0D0C0 100%)',
						tagBg: 'rgba(80,160,100,0.2)'
					},
					{
						title: '睡前助眠功法',
						desc: '简单太极小动作：仰卧抱膝、按揉涌泉穴，配合腹式呼吸，助你快速入眠',
						icon: '😴',
						headerBg: 'linear-gradient(135deg, #E8D0E0 0%, #D0B0D0 100%)',
						tagBg: 'rgba(160,80,160,0.2)'
					}
				]
			};
		},
		methods: {
			ClickFunctionItem(title) {
				uni.showToast({
					title: `${title}功能待开启`,
					icon: 'none',
					duration: 1500
				});
			},
			ClickRecommend(title) {
				uni.showToast({
					title: `查看《${title}》`,
					icon: 'none',
					duration: 1500
				});
			},
			showMoreRecommend() {
				uni.showToast({
					title: '更多推荐待更新',
					icon: 'none',
					duration: 1500
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.health-page {
		background: linear-gradient(180deg, #F5EEE0 0%, #E9E0D0 100%);
		min-height: 100vh;
		padding: 0 24rpx 60rpx;
		box-sizing: border-box;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
		overflow-x: hidden;
	}

	.top-decoration {
		width: 100%;
		height: 10rpx;
		background: linear-gradient(90deg, #885A1E 0%, #C09850 50%, #885A1E 100%);
		margin-bottom: 25rpx;
	}

	/* 轮播图：保持稳定，不调整 */
	.swiper-container {
		width: 100%;
		height: 220rpx;
		border-radius: 24rpx;
		overflow: hidden;
		margin-bottom: 40rpx;
		box-shadow: 0 6rpx 24rpx rgba(136, 90, 30, 0.12);
	}

	.swiper-card {
		width: 100%;
		height: 100%;
		padding: 35rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.swiper-icon {
		font-size: 40rpx;
		color: rgba(136, 90, 30, 0.9);
		margin-bottom: 15rpx;
	}

	.swiper-title {
		font-size: 32rpx;
		color: #333;
		font-weight: 600;
		margin-bottom: 10rpx;
	}

	.swiper-desc {
		font-size: 22rpx;
		color: #555;
		line-height: 1.5;
	}

	.swiper-line {
		width: 70rpx;
		height: 3rpx;
		border-radius: 2rpx;
		margin-top: 20rpx;
	}

	/* 功能区：保持紧凑，与放大的推荐区形成对比 */
	.function-section {
		margin-bottom: 45rpx;
	}

	.section-header {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 25rpx;
	}

	.header-decor {
		width: 50rpx;
		height: 2rpx;
		background: linear-gradient(90deg, transparent, #885A1E, transparent);
	}

	.header-content {
		display: flex;
		align-items: center;
		margin: 0 15rpx;
	}

	.header-icon {
		font-size: 24rpx;
		color: #885A1E;
		margin-right: 10rpx;
	}

	.header-text {
		font-size: 26rpx;
		color: #885A1E;
		font-weight: 600;
		letter-spacing: 2rpx;
	}

	.function-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 18rpx;
	}

	.function-card {
		background: linear-gradient(180deg, #F9F5ED 0%, #F0E8D8 100%);
		border-radius: 18rpx;
		padding: 18rpx 10rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-shadow: 0 3rpx 10rpx rgba(136, 90, 30, 0.08);
		transition: all 0.2s ease;
	}

	.function-card:hover {
		transform: translateY(-4rpx);
		box-shadow: 0 8rpx 18rpx rgba(136, 90, 30, 0.1);
	}

	.func-icon {
		width: 58rpx;
		height: 58rpx;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 12rpx;
		border: 2rpx solid rgba(255, 255, 255, 0.7);
	}

	.icon-text {
		font-size: 30rpx;
		color: #885A1E;
	}

	.func-name {
		font-size: 20rpx;
		color: #444;
		text-align: center;
		font-weight: 500;
	}

	/* 今日推荐区：重点放大，提升视觉权重 */
	.recommend-section {
		margin-bottom: 35rpx;
	}

	/* 推荐标题：放大字号+加粗，增强引导 */
	.section-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 30rpx;
		/* 增加标题与卡片间距，避免拥挤 */
	}

	.title-square {
		width: 16rpx;
		/* 放大方形标识 */
		height: 36rpx;
		background: linear-gradient(180deg, #885A1E 0%, #C09850 100%);
		margin-right: 15rpx;
		border-radius: 3rpx;
	}

	.title-text {
		font-size: 32rpx;
		/* 标题字号放大，从24rpx→32rpx */
		color: #333;
		font-weight: 700;
		/* 加粗标题，更醒目 */
		flex: 1;
		letter-spacing: 3rpx;
	}

	/* 更多按钮：同步放大，保持比例 */
	.more-btn {
		font-size: 24rpx;
		/* 从20rpx→24rpx */
		color: #885A1E;
		padding: 8rpx 22rpx;
		/* 放大按钮内边距 */
		border: 2rpx solid #885A1E;
		border-radius: 22rpx;
		/* 同步放大圆角 */
		transition: all 0.2s;
	}

	.more-btn:active {
		background-color: #885A1E;
		color: #FFF;
	}

	/* 推荐网格：放大间距，避免卡片拥挤 */
	.recommend-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 35rpx;
		/* 从22rpx→35rpx，增加卡片间距 */
	}

	/* 推荐卡片：整体放大，提升视觉占比 */
	.recommend-card {
		background: rgba(255, 255, 255, 0.85);
		border-radius: 28rpx;
		/* 从18rpx→28rpx，放大圆角 */
		overflow: hidden;
		backdrop-filter: blur(10rpx);
		transition: all 0.2s ease;
		/* 增加卡片阴影，增强立体感 */
		box-shadow: 0 8rpx 25rpx rgba(136, 90, 30, 0.12);
	}

	.recommend-card:hover {
		transform: translateY(-6rpx);
		/* 放大悬浮效果 */
		box-shadow: 0 12rpx 35rpx rgba(136, 90, 30, 0.15);
	}

	/* 卡片头部：放大高度，图标更突出 */
	.card-header {
		height: 100rpx;
		/* 从65rpx→100rpx，放大头部区域 */
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* 卡片图标：同步放大 */
	.card-icon {
		font-size: 52rpx;
		/* 从36rpx→52rpx，放大图标 */
		color: rgba(136, 90, 30, 0.9);
	}

	/* 卡片主体：增加内边距，内容更舒展 */
	.card-body {
		padding: 35rpx 25rpx;
		/* 从18rpx→35rpx，大幅增加内边距 */
	}

	/* 卡片标题：放大字号，增强可读性 */
	.card-title {
		font-size: 28rpx;
		/* 从22rpx→28rpx */
		color: #333;
		font-weight: 600;
		margin-bottom: 15rpx;
		/* 增加标题与描述间距 */
	}

	/* 卡片描述：放大字号+增加行高，提升阅读体验 */
	.card-desc {
		font-size: 22rpx;
		/* 从18rpx→22rpx */
		color: #555;
		line-height: 1.8;
		/* 增加行高，避免文字拥挤 */
	}

	/* 新增推荐标签：丰富卡片细节 */
	.card-tag {
		padding: 6rpx 18rpx;
		margin: 0 25rpx 25rpx;
		border-radius: 20rpx;
		display: inline-block;
	}

	.tag-text {
		font-size: 18rpx;
		color: #885A1E;
		font-weight: 500;
	}

	.bottom-bar {
		width: 100%;
		height: 45rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 15rpx;
	}

	.bottom-text {
		font-size: 20rpx;
		color: rgba(136, 90, 30, 0.8);
		letter-spacing: 1rpx;
	}

	/* 小屏适配：保证推荐区不溢出 */
	@media (max-width: 320px) {
		.recommend-grid {
			gap: 25rpx;
		}

		.card-title {
			font-size: 24rpx;
		}
	}
</style>