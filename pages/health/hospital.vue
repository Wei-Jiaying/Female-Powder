<template>
	<view class="medical-record-page">
		<!-- 顶部导航栏 -->
		<view class="page-header">
			<view class="back-btn" @click="goBack">
				<text class="back-icon">←</text>
			</view>
			<text class="header-title">看懂病历单</text>
			<view class="header-menu" @click="showHelp">
				<text class="menu-icon">?</text>
			</view>
		</view>

		<!-- 功能入口区 -->
		<view class="function-entrance">
			<view class="upload-card" @click="uploadRecord">
				<view class="upload-icon">📁</view>
				<text class="upload-text">上传病历单照片</text>
				<text class="upload-desc">自动识别并解读关键指标</text>
			</view>

			<view class="manual-card" @click="switchToManual">
				<view class="manual-icon">🔍</view>
				<text class="manual-text">手动查询指标</text>
				<text class="manual-desc">输入项目名称查询含义及参考值</text>
			</view>
		</view>

		<!-- 内容区：根据模式切换显示 -->
		<view class="content-area" v-if="currentMode === 'upload'">
			<!-- 示例病历单解读 -->
			<view class="example-section">
				<text class="section-title">示例解读</text>

				<view class="record-example">
					<view class="record-header">
						<text class="record-type">血常规检查</text>
						<text class="record-date">2024-05-12</text>
					</view>

					<view class="index-table">
						<view class="table-header">
							<text class="header-item">项目名称</text>
							<text class="header-item">检查结果</text>
							<text class="header-item">参考范围</text>
							<text class="header-item">解读</text>
						</view>

						<view class="table-row" v-for="(item, index) in bloodIndex" :key="index">
							<text class="row-item">{{ item.name }}</text>
							<text class="row-item" :class="{ abnormal: item.abnormal }">{{ item.result }}</text>
							<text class="row-item">{{ item.range }}</text>
							<text class="row-item desc-item">{{ item.desc }}</text>
						</view>
					</view>

					<view class="conclusion">
						<text class="conclusion-title">综合结论：</text>
						<text class="conclusion-content">
							您的血常规检查中白细胞计数略高于正常范围，可能存在轻微炎症反应，其余指标基本正常。
							建议结合临床症状，一周后复查。
						</text>
					</view>
				</view>
			</view>
		</view>

		<view class="content-area" v-if="currentMode === 'manual'">
			<!-- 手动查询区 -->
			<view class="search-box">
				<input type="text" v-model="searchKeyword" placeholder="输入检查项目（如：白细胞、血糖）" class="search-input" />
				<view class="search-btn" @click="searchIndex">查询</view>
			</view>

			<!-- 搜索结果 -->
			<view class="search-result" v-if="searchResult.length > 0">
				<view class="result-item" v-for="(item, index) in searchResult" :key="index">
					<text class="result-name">{{ item.name }}</text>
					<view class="result-detail">
						<view class="detail-row">
							<text class="detail-label">参考范围：</text>
							<text class="detail-value">{{ item.range }}</text>
						</view>
						<view class="detail-row">
							<text class="detail-label">含义：</text>
							<text class="detail-value">{{ item.meaning }}</text>
						</view>
						<view class="detail-row">
							<text class="detail-label">异常提示：</text>
							<text class="detail-value">{{ item.abnormalHint }}</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 热门查询 -->
			<view class="hot-search" v-if="searchResult.length === 0">
				<text class="hot-title">热门查询</text>
				<view class="hot-tags">
					<text class="tag" @click="searchKeyword = tag; searchIndex()" v-for="(tag, index) in hotTags"
						:key="index">
						{{ tag }}
					</text>
				</view>
			</view>
		</view>

		<!-- 帮助弹窗 -->
		<view class="help-mask" v-if="showHelpPopup" @click="showHelpPopup = false"></view>
		<view class="help-popup" v-if="showHelpPopup">
			<text class="help-title">使用帮助</text>
			<view class="help-content">
				<text class="help-item">1. 上传病历单照片：支持常见检查报告（血常规、尿常规、肝功能等）</text>
				<text class="help-item">2. 手动查询：输入检查项目名称，获取指标含义及参考范围</text>
				<text class="help-item">3. 解读结果仅供参考，具体请遵医嘱</text>
			</view>
			<text class="help-close" @click="showHelpPopup = false">知道了</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 模式切换：upload-上传解读，manual-手动查询
				currentMode: 'upload',
				// 搜索相关
				searchKeyword: '',
				searchResult: [],
				hotTags: ['白细胞', '红细胞', '血糖', '肌酐', '转氨酶', '血小板'],
				// 示例血常规指标
				bloodIndex: [{
						name: '白细胞（WBC）',
						result: '10.2×10⁹/L',
						range: '4-10×10⁹/L',
						desc: '略高，可能存在炎症',
						abnormal: true
					},
					{
						name: '红细胞（RBC）',
						result: '4.8×10¹²/L',
						range: '3.8-5.1×10¹²/L',
						desc: '正常',
						abnormal: false
					},
					{
						name: '血红蛋白（Hb）',
						result: '145g/L',
						range: '115-150g/L',
						desc: '正常',
						abnormal: false
					},
					{
						name: '血小板（PLT）',
						result: '230×10⁹/L',
						range: '125-350×10⁹/L',
						desc: '正常',
						abnormal: false
					}
				],
				// 检查指标数据库（用于模拟查询）
				indexDatabase: [{
						name: '白细胞（WBC）',
						range: '成人4-10×10⁹/L，儿童5-12×10⁹/L',
						meaning: '白细胞是免疫系统的重要组成部分，帮助身体抵抗感染',
						abnormalHint: '升高：可能提示感染、炎症或应激；降低：可能提示免疫功能低下、药物影响'
					},
					{
						name: '血糖（GLU）',
						range: '空腹3.9-6.1mmol/L，餐后2小时<7.8mmol/L',
						meaning: '血液中的葡萄糖浓度，是身体能量的主要来源',
						abnormalHint: '升高：可能提示糖尿病、糖耐量异常；降低：可能提示低血糖、营养不良'
					},
					{
						name: '红细胞（RBC）',
						range: '女性3.8-5.1×10¹²/L，男性4.3-5.8×10¹²/L',
						meaning: '携带氧气至身体各组织的血细胞',
						abnormalHint: '升高：可能提示脱水、高原适应；降低：可能提示贫血'
					}
				],
				// 帮助弹窗控制
				showHelpPopup: false
			};
		},
		methods: {
			// 返回上一页
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 显示帮助弹窗
			showHelp() {
				this.showHelpPopup = true;
			},
			// 切换模式
			switchToManual() {
				this.currentMode = 'manual';
				this.searchResult = [];
			},
			// 上传病历单
			uploadRecord() {
				uni.showToast({
					title: '请选择照片上传',
					icon: 'none'
				});
				// 实际项目中可调用选择图片API
				// uni.chooseImage({
				// 	count: 1,
				// 	success: (res) => { /* 处理图片 */ }
				// });
			},
			// 搜索指标
			searchIndex() {
				if (!this.searchKeyword.trim()) {
					uni.showToast({
						title: '请输入查询项目',
						icon: 'none'
					});
					return;
				}

				// 模拟搜索逻辑
				const results = this.indexDatabase.filter(item =>
					item.name.includes(this.searchKeyword)
				);

				this.searchResult = results;
				if (results.length === 0) {
					uni.showToast({
						title: '未找到相关指标',
						icon: 'none'
					});
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	/* 基础样式：蓝白主题 */
	.medical-record-page {
		background-color: #f5f8fc;
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
		background-color: #e6f0fb;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.back-icon {
		font-size: 30rpx;
		color: #1e88e5;
		font-weight: bold;
	}

	.header-title {
		font-size: 32rpx;
		color: #1a5ca3;
		font-weight: 600;
	}

	.header-menu {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		background-color: #e6f0fb;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.menu-icon {
		font-size: 28rpx;
		color: #1e88e5;
		font-weight: bold;
	}

	/* 功能入口区 */
	.function-entrance {
		display: flex;
		gap: 24rpx;
		margin-bottom: 35rpx;
	}

	.upload-card,
	.manual-card {
		flex: 1;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 30rpx 20rpx;
		text-align: center;
		box-shadow: 0 4rpx 12rpx rgba(30, 136, 229, 0.08);
		transition: all 0.2s;
	}

	.upload-card:active,
	.manual-card:active {
		transform: scale(0.98);
		box-shadow: 0 2rpx 8rpx rgba(30, 136, 229, 0.05);
	}

	.upload-icon,
	.manual-icon {
		font-size: 60rpx;
		color: #1e88e5;
		margin-bottom: 20rpx;
		display: inline-block;
	}

	.upload-text,
	.manual-text {
		font-size: 28rpx;
		color: #1a5ca3;
		font-weight: 500;
		margin-bottom: 10rpx;
		display: block;
	}

	.upload-desc,
	.manual-desc {
		font-size: 22rpx;
		color: #6495b7;
		line-height: 1.5;
	}

	/* 内容区通用样式 */
	.content-area {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 25rpx;
		box-shadow: 0 4rpx 12rpx rgba(30, 136, 229, 0.08);
	}

	.section-title {
		font-size: 28rpx;
		color: #1a5ca3;
		font-weight: 600;
		margin-bottom: 25rpx;
		display: block;
		padding-left: 10rpx;
		border-left: 4rpx solid #1e88e5;
	}

	/* 示例病历单样式 */
	.record-example {
		border: 1rpx solid #e6f0fb;
		border-radius: 16rpx;
		overflow: hidden;
	}

	.record-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #f0f7ff;
		padding: 18rpx 20rpx;
	}

	.record-type {
		font-size: 26rpx;
		color: #1a5ca3;
		font-weight: 500;
	}

	.record-date {
		font-size: 22rpx;
		color: #6495b7;
	}

	/* 指标表格样式 */
	.index-table {
		width: 100%;
	}

	.table-header {
		display: flex;
		background-color: #e6f0fb;
		border-bottom: 1rpx solid #d1e4f7;
	}

	.header-item {
		flex: 1;
		padding: 15rpx 10rpx;
		font-size: 22rpx;
		color: #1a5ca3;
		font-weight: 500;
		text-align: center;
	}

	.table-row {
		display: flex;
		border-bottom: 1rpx solid #f0f7ff;
	}

	.table-row:last-child {
		border-bottom: none;
	}

	.row-item {
		flex: 1;
		padding: 18rpx 10rpx;
		font-size: 22rpx;
		color: #333;
		text-align: center;
		word-break: break-all;
	}

	.desc-item {
		text-align: left;
	}

	.abnormal {
		color: #e53935;
		font-weight: 500;
	}

	/* 结论区域 */
	.conclusion {
		padding: 20rpx;
		background-color: #f9fcfd;
		border-top: 1rpx solid #e6f0fb;
	}

	.conclusion-title {
		font-size: 24rpx;
		color: #1a5ca3;
		font-weight: 500;
	}

	.conclusion-content {
		font-size: 22rpx;
		color: #333;
		line-height: 1.6;
	}

	/* 手动查询区样式 */
	.search-box {
		display: flex;
		gap: 15rpx;
		margin-bottom: 30rpx;
	}

	.search-input {
		flex: 1;
		height: 70rpx;
		background-color: #f5f8fc;
		border: 1rpx solid #d1e4f7;
		border-radius: 10rpx;
		padding: 0 20rpx;
		font-size: 24rpx;
		color: #333;
		outline: none;
	}

	.search-btn {
		width: 120rpx;
		height: 70rpx;
		background-color: #1e88e5;
		color: #fff;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		font-weight: 500;
	}

	/* 搜索结果样式 */
	.search-result {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}

	.result-item {
		border-bottom: 1rpx solid #f0f7ff;
		padding-bottom: 20rpx;
	}

	.result-item:last-child {
		border-bottom: none;
	}

	.result-name {
		font-size: 26rpx;
		color: #1a5ca3;
		font-weight: 500;
		margin-bottom: 15rpx;
		display: block;
	}

	.result-detail {
		padding-left: 10rpx;
	}

	.detail-row {
		display: flex;
		margin-bottom: 12rpx;
	}

	.detail-row:last-child {
		margin-bottom: 0;
	}

	.detail-label {
		font-size: 22rpx;
		color: #6495b7;
		min-width: 120rpx;
	}

	.detail-value {
		font-size: 22rpx;
		color: #333;
		flex: 1;
		line-height: 1.6;
	}

	/* 热门查询样式 */
	.hot-search {
		padding-top: 10rpx;
	}

	.hot-title {
		font-size: 24rpx;
		color: #6495b7;
		margin-bottom: 20rpx;
		display: block;
	}

	.hot-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 15rpx;
	}

	.tag {
		padding: 12rpx 20rpx;
		background-color: #f0f7ff;
		border-radius: 20rpx;
		font-size: 22rpx;
		color: #1a5ca3;
	}

	/* 帮助弹窗样式 */
	.help-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 998;
	}

	.help-popup {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 80%;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		z-index: 999;
	}

	.help-title {
		font-size: 28rpx;
		color: #1a5ca3;
		font-weight: 600;
		display: block;
		margin-bottom: 25rpx;
		text-align: center;
	}

	.help-content {
		margin-bottom: 30rpx;
	}

	.help-item {
		display: block;
		font-size: 22rpx;
		color: #333;
		line-height: 1.8;
		margin-bottom: 15rpx;
	}

	.help-close {
		display: block;
		width: 100%;
		height: 60rpx;
		background-color: #1e88e5;
		color: #fff;
		border-radius: 10rpx;
		text-align: center;
		line-height: 60rpx;
		font-size: 24rpx;
	}

	/* 响应式调整 */
	@media (max-width: 320px) {

		.row-item,
		.header-item {
			font-size: 20rpx;
			padding: 15rpx 5rpx;
		}

		.upload-text,
		.manual-text {
			font-size: 26rpx;
		}
	}
</style>