<template>
	<view class="expert-consult-page">
		<!-- 顶部导航栏 -->
		<view class="page-header">
			<view class="back-btn" @click="goBack">
				<text class="back-icon">←</text>
			</view>
			<text class="header-title">生育专家咨询室</text>
			<view class="header-placeholder"></view>
		</view>

		<!-- 咨询类型筛选栏 -->
		<view class="consult-tabs">
			<view class="tab-item" :class="{ active: activeType === 'all' }" @click="activeType = 'all'">
				全部专家
			</view>
			<view class="tab-item" :class="{ active: activeType === 'prepare' }" @click="activeType = 'prepare'">
				备孕咨询
			</view>
			<view class="tab-item" :class="{ active: activeType === 'pregnancy' }" @click="activeType = 'pregnancy'">
				孕期指导
			</view>
			<view class="tab-item" :class="{ active: activeType === 'postpartum' }" @click="activeType = 'postpartum'">
				产后恢复
			</view>
		</view>

		<!-- 快速咨询入口 -->
		<view class="quick-consult">
			<view class="quick-icon">💬</view>
			<view class="quick-text">
				<text class="quick-title">有紧急问题？</text>
				<text class="quick-desc">优先匹配在线专家，15分钟内响应</text>
			</view>
			<view class="quick-btn" @click="quickConsult">立即咨询</view>
		</view>

		<!-- 专家列表：按咨询类型筛选 -->
		<view class="expert-list">
			<view class="section-title">
				<text class="title-text">{{ typeTitle }}</text>
				<text class="title-count">{{ filteredExperts.length }}位专家在线</text>
			</view>

			<view class="expert-card" v-for="(expert, index) in filteredExperts" :key="index">
				<image :src="expert.avatar" mode="aspectFill" class="expert-avatar" />
				<view class="expert-info">
					<view class="info-top">
						<text class="expert-name">{{ expert.name }}</text>
						<text class="expert-title">{{ expert.title }}</text>
						<text class="online-tag" v-if="expert.online">在线</text>
					</view>
					<text class="expert-hospital">{{ expert.hospital }} · {{ expert.department }}</text>
					<view class="expert-tags">
						<text class="tag" v-for="(tag, idx) in expert.tags" :key="idx">{{ tag }}</text>
					</view>
					<view class="expert-meta">
						<view class="meta-item">
							<text class="meta-icon">⭐</text>
							<text class="meta-text">{{ expert.rating }}分</text>
						</view>
						<view class="meta-item">
							<text class="meta-icon">👥</text>
							<text class="meta-text">{{ expert.consultCount }}人咨询</text>
						</view>
						<view class="meta-item">
							<text class="meta-icon">⏱️</text>
							<text class="meta-text">{{ expert.responseTime }}</text>
						</view>
					</view>
				</view>
				<view class="consult-btn" @click="showReservePopup(expert)">预约咨询</view>
			</view>
		</view>

		<!-- 常见问题快捷入口 -->
		<view class="faq-section">
			<text class="faq-title">常见生育问题</text>
			<view class="faq-grid">
				<view class="faq-item" @click="goToFaqDetail(item)" v-for="(item, index) in commonFaq" :key="index">
					<text class="faq-icon">❓</text>
					<text class="faq-text">{{ item }}</text>
				</view>
			</view>
		</view>

		<!-- 预约咨询弹窗 -->
		<view class="popup-mask" v-if="showPopup" @click="closePopup"></view>
		<view class="reserve-popup" v-if="showPopup">
			<view class="popup-header">
				<text class="popup-title">预约{{ currentExpert.name }}专家咨询</text>
				<text class="popup-close" @click="closePopup">✕</text>
			</view>
			<view class="popup-content">
				<view class="expert-brief">
					<image :src="currentExpert.avatar" mode="aspectFill" class="brief-avatar" />
					<view class="brief-info">
						<text class="brief-name">{{ currentExpert.name }} {{ currentExpert.title }}</text>
						<text class="brief-hospital">{{ currentExpert.hospital }} {{ currentExpert.department }}</text>
					</view>
				</view>

				<view class="form-item">
					<text class="form-label">咨询类型</text>
					<view class="form-select">
						<text class="select-option" :class="{ active: selectedConsultType === type }" 
							v-for="(type, idx) in consultTypes" :key="idx" @click="selectedConsultType = type">
							{{ type }}
						</text>
					</view>
				</view>

				<view class="form-item">
					<text class="form-label">咨询时间</text>
					<view class="time-select">
						<text class="time-option" :class="{ active: selectedTime === time }" 
							v-for="(time, idx) in availableTimes" :key="idx" @click="selectedTime = time">
							{{ time }}
						</text>
					</view>
				</view>

				<view class="form-item">
					<text class="form-label">问题描述</text>
					<textarea class="problem-input" v-model="problemDesc" placeholder="请简要描述您的生育相关问题（如备孕困难、孕期不适等）"></textarea>
				</view>
			</view>
			<view class="popup-footer">
				<view class="popup-cancel" @click="closePopup">取消</view>
				<view class="popup-confirm" @click="submitReserve">提交预约</view>
			</view>
		</view>

		<!-- 预约成功弹窗 -->
		<view class="popup-mask" v-if="showSuccessPopup" @click="showSuccessPopup = false"></view>
		<view class="success-popup" v-if="showSuccessPopup">
			<text class="success-icon">✅</text>
			<text class="success-title">预约成功</text>
			<text class="success-desc">专家将在{{ selectedTime }}前联系您，请保持电话畅通</text>
			<view class="success-btn" @click="showSuccessPopup = false">确认</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 筛选类型
				activeType: 'all',
				// 专家数据
				experts: [
					{
						id: 1,
						avatar: 'https://picsum.photos/100/100?random=90',
						name: '陈丽',
						title: '主任医师',
						hospital: '市妇幼保健院',
						department: '生殖科',
						tags: ['备孕指导', '排卵监测', '不孕咨询'],
						rating: 4.9,
						consultCount: 1280,
						responseTime: '平均5分钟',
						online: true,
						type: 'prepare'
					},
					{
						id: 2,
						avatar: 'https://picsum.photos/100/100?random=91',
						name: '王敏',
						title: '副主任医师',
						hospital: '省人民医院',
						department: '产科',
						tags: ['孕期护理', '产检解读', '分娩指导'],
						rating: 4.8,
						consultCount: 960,
						responseTime: '平均8分钟',
						online: true,
						type: 'pregnancy'
					},
					{
						id: 3,
						avatar: 'https://picsum.photos/100/100?random=92',
						name: '李娟',
						title: '康复师',
						hospital: '产后康复中心',
						department: '产后康复科',
						tags: ['盆底肌修复', '月子护理', '母乳指导'],
						rating: 4.7,
						consultCount: 750,
						responseTime: '平均10分钟',
						online: false,
						type: 'postpartum'
					},
					{
						id: 4,
						avatar: 'https://picsum.photos/100/100?random=93',
						name: '赵华',
						title: '主治医师',
						hospital: '市第一医院',
						department: '妇科',
						tags: ['备孕调理', '孕期营养', '产后恢复'],
						rating: 4.9,
						consultCount: 1120,
						responseTime: '平均6分钟',
						online: true,
						type: 'all'
					}
				],
				// 常见问题
				commonFaq: [
					'备孕多久没成功需要就医？',
					'孕期可以吃哪些保健品？',
					'产后多久可以恢复运动？',
					'孕期失眠怎么缓解？',
					'母乳不足怎么办？',
					'排卵期怎么准确计算？'
				],
				// 弹窗相关
				showPopup: false,
				currentExpert: {},
				consultTypes: ['图文咨询', '语音咨询', '视频咨询'],
				selectedConsultType: '图文咨询',
				availableTimes: ['今天 15:00-16:00', '今天 19:00-20:00', '明天 10:00-11:00'],
				selectedTime: '今天 15:00-16:00',
				problemDesc: '',
				showSuccessPopup: false
			};
		},
		computed: {
			// 筛选后的专家列表
			filteredExperts() {
				if (this.activeType === 'all') {
					return this.experts;
				}
				return this.experts.filter(expert => expert.type === this.activeType || expert.type === 'all');
			},
			// 类型标题
			typeTitle() {
				const titleMap = {
					all: '全部生育专家',
					prepare: '备孕咨询专家',
					pregnancy: '孕期指导专家',
					postpartum: '产后恢复专家'
				};
				return titleMap[this.activeType];
			}
		},
		methods: {
			// 返回上一页
			goBack() {
				uni.navigateBack({ delta: 1 });
			},
			// 快速咨询
			quickConsult() {
				uni.showToast({ title: '正在匹配在线专家...', icon: 'none' });
			},
			// 显示预约弹窗
			showReservePopup(expert) {
				this.currentExpert = expert;
				this.showPopup = true;
			},
			// 关闭预约弹窗
			closePopup() {
				this.showPopup = false;
			},
			// 提交预约
			submitReserve() {
				if (!this.problemDesc.trim()) {
					uni.showToast({ title: '请简要描述您的问题', icon: 'none' });
					return;
				}
				this.closePopup();
				this.showSuccessPopup = true;
			},
			// 前往常见问题详情
			goToFaqDetail(question) {
				uni.showToast({ title: `查看《${question}》详情`, icon: 'none' });
				// 实际项目中添加跳转逻辑
				// uni.navigateTo({ url: `/pages/faq/detail?question=${question}` });
			}
		}
	};
</script>

<style lang="scss" scoped>
	/* 基础样式：粉蓝专业主题 */
	.expert-consult-page {
		background-color: #f9fbfd;
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

	.back-btn {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		background-color: #e6f4ff;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.back-icon {
		font-size: 30rpx;
		color: #1890ff;
	}

	.header-title {
		font-size: 32rpx;
		color: #0f62fe;
		font-weight: 600;
	}

	.header-placeholder {
		width: 60rpx;
	}

	/* 咨询类型筛选栏 */
	.consult-tabs {
		display: flex;
		overflow-x: auto;
		gap: 15rpx;
		margin-bottom: 25rpx;
		padding-bottom: 10rpx;
	}

	.tab-item {
		white-space: nowrap;
		padding: 12rpx 25rpx;
		background-color: #fff;
		border-radius: 30rpx;
		font-size: 24rpx;
		color: #666;
		box-shadow: 0 2rpx 8rpx rgba(24, 144, 255, 0.08);
		transition: all 0.2s;
	}

	.tab-item.active {
		background-color: #1890ff;
		color: #fff;
		box-shadow: 0 4rpx 12rpx rgba(24, 144, 255, 0.15);
	}

	/* 快速咨询入口 */
	.quick-consult {
		display: flex;
		align-items: center;
		background: linear-gradient(135deg, #fff0f5 0%, #e6f4ff 100%);
		border-radius: 20rpx;
		padding: 25rpx;
		margin-bottom: 35rpx;
	}

	.quick-icon {
		font-size: 60rpx;
		color: #0f62fe;
		margin-right: 25rpx;
	}

	.quick-text {
		flex: 1;
	}

	.quick-title {
		font-size: 28rpx;
		color: #333;
		font-weight: 600;
		display: block;
		margin-bottom: 8rpx;
	}

	.quick-desc {
		font-size: 22rpx;
		color: #666;
	}

	.quick-btn {
		width: 160rpx;
		height: 60rpx;
		background-color: #0f62fe;
		color: #fff;
		border-radius: 30rpx;
		text-align: center;
		line-height: 60rpx;
		font-size: 24rpx;
		font-weight: 500;
	}

	/* 专家列表区域 */
	.expert-list {
		margin-bottom: 40rpx;
	}

	.section-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 25rpx;
	}

	.title-text {
		font-size: 28rpx;
		color: #333;
		font-weight: 600;
	}

	.title-count {
		font-size: 22rpx;
		color: #1890ff;
	}

	/* 专家卡片 */
	.expert-card {
		display: flex;
		align-items: flex-start;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 25rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 4rpx 15rpx rgba(24, 144, 255, 0.08);
	}

	.expert-avatar {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		object-fit: cover;
		margin-right: 25rpx;
		border: 4rpx solid #e6f4ff;
	}

	.expert-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 12rpx;
	}

	.info-top {
		display: flex;
		align-items: center;
		gap: 15rpx;
	}

	.expert-name {
		font-size: 28rpx;
		color: #333;
		font-weight: 600;
	}

	.expert-title {
		font-size: 22rpx;
		color: #666;
		background-color: #f0f7ff;
		padding: 5rpx 15rpx;
		border-radius: 15rpx;
	}

	.online-tag {
		font-size: 20rpx;
		color: #fff;
		background-color: #52c41a;
		padding: 3rpx 10rpx;
		border-radius: 10rpx;
		margin-left: auto;
	}

	.expert-hospital {
		font-size: 22rpx;
		color: #666;
	}

	/* 专家标签 */
	.expert-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 10rpx;
	}

	.tag {
		font-size: 20rpx;
		color: #1890ff;
		background-color: #f0f7ff;
		padding: 5rpx 15rpx;
		border-radius: 15rpx;
	}

	/* 专家元信息 */
	.expert-meta {
		display: flex;
		gap: 25rpx;
		margin-top: 10rpx;
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: 8rpx;
		font-size: 20rpx;
		color: #999;
	}

	.meta-icon {
		font-size: 22rpx;
	}

	/* 咨询按钮 */
	.consult-btn {
		width: 140rpx;
		height: 60rpx;
		background-color: #1890ff;
		color: #fff;
		border-radius: 30rpx;
		text-align: center;
		line-height: 60rpx;
		font-size: 24rpx;
		margin-left: 15rpx;
		margin-top: 20rpx;
	}

	/* 常见问题区域 */
	.faq-section {
		margin-bottom: 30rpx;
	}

	.faq-title {
		font-size: 26rpx;
		color: #333;
		font-weight: 600;
		margin-bottom: 25rpx;
		display: block;
	}

	.faq-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 15rpx;
	}

	.faq-item {
		background-color: #fff;
		border-radius: 15rpx;
		padding: 20rpx;
		display: flex;
		align-items: center;
		gap: 15rpx;
		box-shadow: 0 2rpx 8rpx rgba(24, 144, 255, 0.05);
	}

	.faq-icon {
		font-size: 24rpx;
		color: #1890ff;
	}

	.faq-text {
		font-size: 22rpx;
		color: #333;
		flex: 1;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* 预约弹窗样式 */
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
		width: 85%;
		background-color: #fff;
		border-radius: 24rpx;
		overflow: hidden;
		z-index: 999;
	}

	.popup-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 25rpx 30rpx;
		background-color: #f0f7ff;
	}

	.popup-title {
		font-size: 28rpx;
		color: #0f62fe;
		font-weight: 600;
	}

	.popup-close {
		font-size: 32rpx;
		color: #666;
	}

	.popup-content {
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		gap: 30rpx;
	}

	/* 专家简介 */
	.expert-brief {
		display: flex;
		align-items: center;
		gap: 20rpx;
	}

	.brief-avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		object-fit: cover;
	}

	.brief-info {
		display: flex;
		flex-direction: column;
		gap: 8rpx;
	}

	.brief-name {
		font-size: 24rpx;
		color: #333;
		font-weight: 500;
	}

	.brief-hospital {
		font-size: 20rpx;
		color: #666;
	}

	/* 表单项 */
	.form-item {
		display: flex;
		flex-direction: column;
		gap: 15rpx;
	}

	.form-label {
		font-size: 24rpx;
		color: #333;
		font-weight: 500;
	}

	/* 咨询类型选择 */
	.form-select {
		display: flex;
		gap: 15rpx;
		flex-wrap: wrap;
	}

	.select-option {
		padding: 12rpx 25rpx;
		background-color: #f5f5f5;
		border-radius: 20rpx;
		font-size: 22rpx;
		color: #666;
	}

	.select-option.active {
		background-color: #1890ff;
		color: #fff;
	}

	/* 时间选择 */
	.time-select {
		display: flex;
		flex-direction: column;
		gap: 15rpx;
	}

	.time-option {
		padding: 15rpx;
		background-color: #f5f5f5;
		border-radius: 15rpx;
		font-size: 22rpx;
		color: #666;
	}

	.time-option.active {
		background-color: #e6f4ff;
		color: #1890ff;
		border: 2rpx solid #1890ff;
	}

	/* 问题输入框 */
	.problem-input {
		min-height: 150rpx;
		padding: 20rpx;
		background-color: #f5f5f5;
		border-radius: 15rpx;
		border: none;
		outline: none;
		font-size: 22rpx;
		color: #333;
	}

	/* 弹窗底部按钮 */
	.popup-footer {
		display: flex;
	}

	.popup-cancel, .popup-confirm {
		flex: 1;
		height: 70rpx;
		text-align: center;
		line-height: 70rpx;
		font-size: 24rpx;
		font-weight: 500;
	}

	.popup-cancel {
		background-color: #f5f5f5;
		color: #666;
		border-radius: 0 0 0 24rpx;
	}

	.popup-confirm {
		background-color: #1890ff;
		color: #fff;
		border-radius: 0 0 24rpx 0;
	}

	/* 预约成功弹窗 */
	.success-popup {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 70%;
		background-color: #fff;
		border-radius: 24rpx;
		padding: 40rpx 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 25rpx;
		z-index: 999;
	}

	.success-icon {
		font-size: 60rpx;
		color: #52c41a;
	}

	.success-title {
		font-size: 30rpx;
		color: #333;
		font-weight: 600;
	}

	.success-desc {
		font-size: 22rpx;
		color: #666;
		text-align: center;
		line-height: 1.6;
	}

	.success-btn {
		width: 180rpx;
		height: 65rpx;
		background-color: #1890ff;
		color: #fff;
		border-radius: 30rpx;
		text-align: center;
		line-height: 65rpx;
		font-size: 24rpx;
		font-weight: 500;
	}

	/* 响应式调整 */
	@media (max-width: 320px) {
		.expert-name {
			font-size: 24rpx;
		}
		.consult-btn {
			width: 120rpx;
			font-size: 22rpx;
		}
		.faq-text {
			font-size: 20rpx;
		}
	}
</style>