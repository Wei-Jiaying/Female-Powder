<template>
	<view class="live-course-page">
		<!-- 顶部导航栏 -->
		<view class="page-header">
			<view class="back-btn" @click="goBack">
				<text class="back-icon">←</text>
			</view>
			<text class="header-title">女性生育直播指导课</text>
			<view class="header-share" @click="sharePage">
				<text class="share-icon">📤</text>
			</view>
		</view>

		<!-- 轮播Banner：展示热门直播 -->
		<view class="banner-swiper">
			<swiper class="swiper" indicator-dots autoplay interval="5000" circular>
				<swiper-item v-for="(item, index) in bannerList" :key="index">
					<view class="banner-item" :style="{backgroundImage: `url(${item.bgUrl})`}">
						<view class="banner-info">
							<text class="banner-tag">{{ item.tag }}</text>
							<text class="banner-title">{{ item.title }}</text>
							<view class="banner-meta">
								<text class="meta-time">{{ item.time }}</text>
								<text class="meta-viewers">{{ item.viewers }}人已预约</text>
							</view>
							<view class="banner-btn" @click="enterLive(item.id)">
								{{ item.status === 'live' ? '进入直播' : '立即预约' }}
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<!-- 直播状态标签：区分进行中/预告 -->
		<view class="live-tabs">
			<view class="tab-item" :class="{ active: activeTab === 'living' }" @click="activeTab = 'living'">
				<text class="live-dot" v-if="hasLiving"></text>
				<text class="tab-text">正在直播</text>
			</view>
			<view class="tab-item" :class="{ active: activeTab === 'upcoming' }" @click="activeTab = 'upcoming'">
				<text class="tab-text">即将开始</text>
			</view>
			<view class="tab-item" :class="{ active: activeTab === 'record' }" @click="activeTab = 'record'">
				<text class="tab-text">回放课程</text>
			</view>
		</view>

		<!-- 课程列表：按标签切换内容 -->
		<view class="course-list">
			<!-- 正在直播 -->
			<view v-if="activeTab === 'living'">
				<view class="course-item" v-for="(course, index) in livingCourses" :key="index">
					<view class="live-indicator">
						<text class="live-text">正在直播</text>
						<view class="live-pulse"></view>
					</view>
					<image :src="course.cover" mode="aspectFill" class="course-cover" />
					<view class="course-info">
						<text class="course-title">{{ course.title }}</text>
						<view class="course-teacher">
							<image :src="course.teacherAvatar" mode="aspectFill" class="teacher-avatar" />
							<text class="teacher-name">{{ course.teacherName }} {{ course.teacherTitle }}</text>
						</view>
						<view class="course-meta">
							<text class="meta-watchers">{{ course.watchers }}人观看</text>
							<text class="meta-time">{{ course.time }}</text>
						</view>
					</view>
					<view class="enter-btn" @click="enterLive(course.id)">进入直播</view>
				</view>
			</view>

			<!-- 即将开始 -->
			<view v-if="activeTab === 'upcoming'">
				<view class="course-item" v-for="(course, index) in upcomingCourses" :key="index">
					<view class="upcoming-indicator">
						<text class="upcoming-text">即将开始</text>
					</view>
					<image :src="course.cover" mode="aspectFill" class="course-cover" />
					<view class="course-info">
						<text class="course-title">{{ course.title }}</text>
						<view class="course-teacher">
							<image :src="course.teacherAvatar" mode="aspectFill" class="teacher-avatar" />
							<text class="teacher-name">{{ course.teacherName }} {{ course.teacherTitle }}</text>
						</view>
						<view class="course-meta">
							<text class="meta-date">{{ course.date }}</text>
							<text class="meta-time">{{ course.time }}</text>
						</view>
						<view class="countdown" v-if="course.countdown">
							<text class="countdown-text">距离开始：</text>
							<text class="countdown-value">{{ course.countdown }}</text>
						</view>
					</view>
					<view class="reserve-btn" @click="reserveCourse(course.id)">预约</view>
				</view>
			</view>

			<!-- 回放课程 -->
			<view v-if="activeTab === 'record'">
				<view class="course-item" v-for="(course, index) in recordCourses" :key="index">
					<image :src="course.cover" mode="aspectFill" class="course-cover" />
					<view class="course-info">
						<text class="course-title">{{ course.title }}</text>
						<view class="course-teacher">
							<image :src="course.teacherAvatar" mode="aspectFill" class="teacher-avatar" />
							<text class="teacher-name">{{ course.teacherName }} {{ course.teacherTitle }}</text>
						</view>
						<view class="course-meta">
							<text class="meta-watchers">{{ course.watchers }}人观看</text>
							<text class="meta-date">{{ course.date }}</text>
						</view>
					</view>
					<view class="play-btn" @click="playRecord(course.id)">回放</view>
				</view>
			</view>
		</view>

		<!-- 推荐讲师 -->
		<view class="teachers-section">
			<text class="section-title">推荐讲师</text>
			<view class="teachers-list">
				<view class="teacher-card" v-for="(teacher, index) in recommendedTeachers" :key="index">
					<image :src="teacher.avatar" mode="aspectFill" class="teacher-card-avatar" />
					<text class="teacher-card-name">{{ teacher.name }}</text>
					<text class="teacher-card-title">{{ teacher.title }}</text>
					<text class="teacher-card-courses">{{ teacher.courseCount }}门课程</text>
				</view>
			</view>
		</view>

		<!-- 预约成功弹窗 -->
		<view class="popup-mask" v-if="showReservePopup" @click="showReservePopup = false"></view>
		<view class="reserve-popup" v-if="showReservePopup">
			<text class="popup-icon">🎉</text>
			<text class="popup-title">预约成功</text>
			<text class="popup-desc">课程开始前15分钟将提醒您观看</text>
			<view class="popup-confirm" @click="showReservePopup = false">确定</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 导航状态
				activeTab: 'living',
				hasLiving: true,

				// 轮播Banner数据
				bannerList: [{
						id: 1,
						bgUrl: 'https://picsum.photos/750/300?random=50',
						tag: '正在直播',
						title: '孕期40周营养搭配全指南',
						time: '19:30-21:00',
						viewers: 1258,
						status: 'live'
					},
					{
						id: 2,
						bgUrl: 'https://picsum.photos/750/300?random=51',
						tag: '明日直播',
						title: '产后修复黄金期训练方案',
						time: '15:00-16:30',
						viewers: 896,
						status: 'upcoming'
					}
				],

				// 正在直播课程
				livingCourses: [{
					id: 101,
					cover: 'https://picsum.photos/200/200?random=60',
					title: '孕期40周营养搭配全指南：从备孕到分娩的饮食方案',
					teacherAvatar: 'https://picsum.photos/60/60?random=70',
					teacherName: '张敏',
					teacherTitle: '妇产科营养师',
					watchers: 1258,
					time: '19:30-21:00'
				}],

				// 即将开始课程
				upcomingCourses: [{
						id: 201,
						cover: 'https://picsum.photos/200/200?random=61',
						title: '产后修复黄金期训练方案：盆底肌与腹直肌恢复',
						teacherAvatar: 'https://picsum.photos/60/60?random=71',
						teacherName: '李婷',
						teacherTitle: '产后康复师',
						date: '6月15日',
						time: '15:00-16:30',
						countdown: '23:45:30'
					},
					{
						id: 202,
						cover: 'https://picsum.photos/200/200?random=62',
						title: '备孕必知：提高卵子质量的5个关键因素',
						teacherAvatar: 'https://picsum.photos/60/60?random=72',
						teacherName: '王芳',
						teacherTitle: '生殖医学专家',
						date: '6月16日',
						time: '20:00-21:30',
						countdown: '1天1小时'
					}
				],

				// 回放课程
				recordCourses: [{
						id: 301,
						cover: 'https://picsum.photos/200/200?random=63',
						title: '自然分娩全过程解析与减痛技巧',
						teacherAvatar: 'https://picsum.photos/60/60?random=73',
						teacherName: '赵丽',
						teacherTitle: '产科主任医师',
						watchers: 3562,
						date: '6月10日'
					},
					{
						id: 302,
						cover: 'https://picsum.photos/200/200?random=64',
						title: '新生儿护理入门：洗澡、换尿布与睡眠指导',
						teacherAvatar: 'https://picsum.photos/60/60?random=74',
						teacherName: '陈静',
						teacherTitle: '儿科护士',
						watchers: 2891,
						date: '6月8日'
					}
				],

				// 推荐讲师
				recommendedTeachers: [{
						avatar: 'https://picsum.photos/100/100?random=80',
						name: '张敏',
						title: '妇产科营养师',
						courseCount: 12
					},
					{
						avatar: 'https://picsum.photos/100/100?random=81',
						name: '赵丽',
						title: '产科主任医师',
						courseCount: 8
					},
					{
						avatar: 'https://picsum.photos/100/100?random=82',
						name: '李婷',
						title: '产后康复师',
						courseCount: 15
					}
				],

				// 弹窗控制
				showReservePopup: false
			};
		},
		methods: {
			// 返回上一页
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 分享页面
			sharePage() {
				uni.showToast({
					title: '分享成功',
					icon: 'none'
				});
			},
			// 进入直播
			enterLive(id) {
				uni.showToast({
					title: `进入直播 ${id}`,
					icon: 'none'
				});
				// 实际项目中添加跳转逻辑
				// uni.navigateTo({ url: `/pages/live/room?id=${id}` });
			},
			// 预约课程
			reserveCourse(id) {
				this.showReservePopup = true;
				console.log(`预约课程 ${id}`);
			},
			// 播放回放
			playRecord(id) {
				uni.showToast({
					title: `播放回放 ${id}`,
					icon: 'none'
				});
				// 实际项目中添加跳转逻辑
				// uni.navigateTo({ url: `/pages/live/record?id=${id}` });
			}
		}
	};
</script>

<style lang="scss" scoped>
	/* 基础样式：温馨粉紫主题 */
	.live-course-page {
		background-color: #fff8f9;
		min-height: 100vh;
		padding: 0 24rpx 60rpx;
		box-sizing: border-box;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
	}

	/* 顶部导航 */
	.page-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 90rpx;
		padding: 0 10rpx;
		margin-bottom: 20rpx;
	}

	.back-btn,
	.header-share {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		background-color: #fce4ec;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.back-icon,
	.share-icon {
		font-size: 30rpx;
		color: #e91e63;
	}

	.header-title {
		font-size: 32rpx;
		color: #c2185b;
		font-weight: 600;
	}

	/* 轮播Banner */
	.banner-swiper {
		margin-bottom: 35rpx;
	}

	.swiper {
		width: 100%;
		height: 280rpx;
		border-radius: 24rpx;
		overflow: hidden;
	}

	.banner-item {
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		position: relative;
		display: flex;
		align-items: center;
	}

	.banner-info {
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		background: linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2));
		color: #fff;
	}

	.banner-tag {
		display: inline-block;
		background-color: #e91e63;
		padding: 5rpx 15rpx;
		border-radius: 15rpx;
		font-size: 20rpx;
		margin-bottom: 15rpx;
	}

	.banner-title {
		font-size: 30rpx;
		font-weight: 600;
		margin-bottom: 15rpx;
		display: block;
		line-height: 1.4;
	}

	.banner-meta {
		display: flex;
		justify-content: space-between;
		font-size: 22rpx;
		opacity: 0.9;
		margin-bottom: 20rpx;
	}

	.banner-btn {
		width: 160rpx;
		height: 50rpx;
		background-color: #e91e63;
		color: #fff;
		border-radius: 25rpx;
		text-align: center;
		line-height: 50rpx;
		font-size: 24rpx;
		font-weight: 500;
	}

	/* 直播标签栏 */
	.live-tabs {
		display: flex;
		justify-content: space-around;
		margin-bottom: 30rpx;
	}

	.tab-item {
		display: flex;
		align-items: center;
		padding: 10rpx 20rpx;
		font-size: 28rpx;
		color: #999;
		font-weight: 500;
		position: relative;
	}

	.tab-item.active {
		color: #c2185b;
	}

	.tab-item.active::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 10%;
		width: 80%;
		height: 4rpx;
		background-color: #f06292;
		border-radius: 2rpx;
	}

	.live-dot {
		display: inline-block;
		width: 16rpx;
		height: 16rpx;
		background-color: #e53935;
		border-radius: 50%;
		margin-right: 8rpx;
		position: relative;
	}

	.live-dot::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(229, 57, 53, 0.6);
		border-radius: 50%;
		animation: pulse 1.5s infinite;
	}

	@keyframes pulse {
		0% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(229, 57, 53, 0.7);
		}

		70% {
			transform: scale(1.2);
			box-shadow: 0 0 0 10rpx rgba(229, 57, 53, 0);
		}

		100% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(229, 57, 53, 0);
		}
	}

	/* 课程列表 */
	.course-list {
		display: flex;
		flex-direction: column;
		gap: 25rpx;
		margin-bottom: 40rpx;
	}

	.course-item {
		display: flex;
		background-color: #fff;
		border-radius: 20rpx;
		overflow: hidden;
		box-shadow: 0 4rpx 15rpx rgba(233, 30, 99, 0.08);
		padding: 20rpx;
		position: relative;
	}

	.live-indicator,
	.upcoming-indicator {
		position: absolute;
		top: 20rpx;
		left: 20rpx;
		z-index: 1;
	}

	.live-text {
		display: inline-block;
		background-color: #e53935;
		color: #fff;
		font-size: 20rpx;
		padding: 3rpx 10rpx;
		border-radius: 4rpx;
		margin-right: 8rpx;
	}

	.live-pulse {
		display: inline-block;
		width: 12rpx;
		height: 12rpx;
		background-color: #e53935;
		border-radius: 50%;
		vertical-align: middle;
		animation: pulse 1.5s infinite;
	}

	.upcoming-text {
		display: inline-block;
		background-color: #f57c00;
		color: #fff;
		font-size: 20rpx;
		padding: 3rpx 10rpx;
		border-radius: 4rpx;
	}

	.course-cover {
		width: 160rpx;
		height: 160rpx;
		border-radius: 12rpx;
		object-fit: cover;
	}

	.course-info {
		flex: 1;
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.course-title {
		font-size: 26rpx;
		color: #333;
		font-weight: 500;
		line-height: 1.4;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.course-teacher {
		display: flex;
		align-items: center;
		margin-top: 10rpx;
	}

	.teacher-avatar {
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		object-fit: cover;
	}

	.teacher-name {
		font-size: 22rpx;
		color: #666;
		margin-left: 10rpx;
	}

	.course-meta {
		display: flex;
		justify-content: space-between;
		font-size: 20rpx;
		color: #999;
		margin-top: 10rpx;
	}

	.countdown {
		display: flex;
		align-items: center;
		margin-top: 10rpx;
	}

	.countdown-text {
		font-size: 22rpx;
		color: #f57c00;
	}

	.countdown-value {
		font-size: 22rpx;
		color: #e53935;
		font-weight: 500;
		margin-left: 5rpx;
	}

	.enter-btn,
	.reserve-btn,
	.play-btn {
		width: 90rpx;
		height: 50rpx;
		border-radius: 25rpx;
		color: #fff;
		text-align: center;
		line-height: 50rpx;
		font-size: 22rpx;
		align-self: center;
	}

	.enter-btn {
		background-color: #e53935;
	}

	.reserve-btn {
		background-color: #f06292;
	}

	.play-btn {
		background-color: #ba68c8;
	}

	/* 推荐讲师区域 */
	.teachers-section {
		margin-bottom: 30rpx;
	}

	.section-title {
		font-size: 28rpx;
		color: #c2185b;
		font-weight: 600;
		margin-bottom: 25rpx;
		display: block;
		padding-left: 10rpx;
		border-left: 4rpx solid #f06292;
	}

	.teachers-list {
		display: flex;
		gap: 30rpx;
		overflow-x: auto;
		padding-bottom: 15rpx;
	}

	.teacher-card {
		min-width: 180rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #fff;
		border-radius: 16rpx;
		padding: 20rpx 10rpx;
		box-shadow: 0 3rpx 10rpx rgba(233, 30, 99, 0.05);
	}

	.teacher-card-avatar {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		object-fit: cover;
		margin-bottom: 15rpx;
		border: 4rpx solid #fce4ec;
	}

	.teacher-card-name {
		font-size: 26rpx;
		color: #333;
		font-weight: 500;
		margin-bottom: 5rpx;
	}

	.teacher-card-title {
		font-size: 22rpx;
		color: #666;
		margin-bottom: 8rpx;
		text-align: center;
	}

	.teacher-card-courses {
		font-size: 20rpx;
		color: #999;
	}

	/* 预约成功弹窗 */
	.popup-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 998;
	}

	.reserve-popup {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 60%;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 40rpx 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 999;
	}

	.popup-icon {
		font-size: 60rpx;
		margin-bottom: 25rpx;
	}

	.popup-title {
		font-size: 30rpx;
		color: #c2185b;
		font-weight: 600;
		margin-bottom: 15rpx;
	}

	.popup-desc {
		font-size: 24rpx;
		color: #666;
		text-align: center;
		margin-bottom: 30rpx;
		line-height: 1.5;
	}

	.popup-confirm {
		width: 160rpx;
		height: 50rpx;
		background-color: #f06292;
		color: #fff;
		border-radius: 25rpx;
		text-align: center;
		line-height: 50rpx;
		font-size: 24rpx;
	}

	/* 响应式调整 */
	@media (max-width: 320px) {
		.course-title {
			font-size: 24rpx;
		}

		.course-cover {
			width: 140rpx;
			height: 140rpx;
		}

		.enter-btn,
		.reserve-btn,
		.play-btn {
			width: 80rpx;
			font-size: 20rpx;
		}
	}
</style>