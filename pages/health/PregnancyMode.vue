<template>
	<div class="pregnancy-page">
		<!-- 背景层 -->
		<div class="background"></div>

		<!-- 顶部孕期状态与功能区 -->
		<view class="top-container">
			<view class="title">
				<view class="icon">🤰</view>
				<text class="title-text">孕期健康管理</text>
				<view class="pregnancy-status-box">{{ currentTrimester }}</view>
			</view>

			<!-- 功能按钮区 -->
			<view class="function-grid">
				<view class="function-item" v-for="(item, index) in functionItems" :key="index" @click="handleFunctionClick(item)">
					<view class="function-icon">{{ item.icon }}</view>
					<text class="function-name">{{ item.name }}</text>
				</view>
			</view>
		</view>

		<!-- 今日心情 -->
		<view class="mood-record">
			<view class="title">
				<view class="icon">😊</view>
				<text class="title-text">今日心情</text>
			</view>
			<view class="emoji-list">
				<text class="emoji" @click="setMood(emoji)" :class="{ 'emoji-active': selectedMood === emoji }" 
					v-for="(emoji, index) in moodEmojis" :key="index">
					{{ emoji }}
				</text>
			</view>
		</view>

		<!-- 胎儿发育监测 -->
		<view class="card fetal-monitor">
			<view class="title">
				<view class="icon">👶</view>
				<text class="title-text">胎儿发育监测</text>
			</view>
			<view class="fetal-info">
				<view class="pregnancy-progress">
					<text class="progress-text">孕{{ currentWeek }}周{{ currentDay }}天</text>
					<text class="due-text">预计还有 {{ daysToDue }} 天出生</text>
				</view>
				
				<view class="fetal-indicators">
					<view class="indicator-item">
						<text class="indicator-label">胎儿预估</text>
						<text class="indicator-value">体重 {{ fetalWeight }} | 身长 {{ fetalLength }}</text>
					</view>
					<view class="indicator-item">
						<text class="indicator-label">胎心监测</text>
						<text class="indicator-value">{{ heartRateStatus }}</text>
					</view>
					<view class="indicator-item">
						<text class="indicator-label">产检提醒</text>
						<view class="toggle-switch" @click="toggleCheckupReminder">
							<view class="switch-track" :class="{ 'switch-on': checkupReminder }"></view>
							<view class="switch-thumb" :class="{ 'thumb-on': checkupReminder }"></view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 妈妈身体数据 -->
		<view class="card health-data">
			<view class="title">
				<view class="icon">💖</view>
				<text class="title-text">妈妈身体数据</text>
				<button class="toggle-btn" @click="toggleDataDisplay">
					{{ showHealthData ? '隐藏' : '显示' }}
				</button>
			</view>
			
			<view class="health-params" v-if="showHealthData">
				<view class="param-item">
					<text class="param-name">体重</text>
					<text class="param-value">{{ weight }} kg</text>
					<text class="param-status" :class="getWeightStatusClass()">{{ getWeightStatusText() }}</text>
				</view>
				<view class="param-item">
					<text class="param-name">血压</text>
					<text class="param-value">{{ bloodPressure }}</text>
					<text class="param-status" :class="getPressureStatusClass()">{{ getPressureStatusText() }}</text>
				</view>
				<view class="param-item">
					<text class="param-name">血糖</text>
					<text class="param-value">{{ bloodSugar }} mmol/L</text>
					<text class="param-status" :class="getSugarStatusClass()">{{ getSugarStatusText() }}</text>
				</view>
			</view>
			
			<view class="health-tips" v-if="showHealthData">
				<text class="tips-text">小贴士：孕期体重每周增长建议不超过0.5kg，定期监测血压和血糖~</text>
			</view>
		</view>

		<!-- 孕期运动指导 -->
		<view class="card exercise-guide">
			<view class="title">
				<view class="icon">🧘</view>
				<text class="title-text">孕期运动指导</text>
			</view>
			
			<view class="exercise-selector">
				<text class="selector-label">适合运动：</text>
				<picker @change="changeExerciseType" :value="exerciseTypeIndex" :range="exerciseTypes">
					<text class="selected-exercise">{{ exerciseTypes[exerciseTypeIndex] }}</text>
				</picker>
			</view>
			
			<view class="exercise-details">
				<view class="detail-item">
					<text class="detail-label">时长建议：</text>
					<text class="detail-value">{{ exerciseDuration }}</text>
				</view>
				<view class="detail-item">
					<text class="detail-label">注意事项：</text>
					<text class="detail-value">{{ exerciseNote }}</text>
				</view>
				<view class="detail-item">
					<text class="detail-label">适宜环境：</text>
					<text class="detail-value">{{ exerciseEnv }}</text>
				</view>
			</view>
			
			<button class="start-btn" @click="startExercise">开始运动</button>
		</view>

		<!-- 环境与温馨提示（新增省份选择功能） -->
		<view class="card environment-tips">
			<view class="title">
				<view class="icon">🌱</view>
				<text class="title-text">环境与健康提示</text>
			</view>
			
			<!-- 新增：位置选择区域 -->
			<view class="location-selector">
				<text class="location-label">当前省份：</text>
				<text class="location-value" @click="openProvincePopup">{{ selectedProvince }}</text>
				<text class="arrow-icon">▼</text>
			</view>
			
			<view class="environment-stats">
				<view class="env-item" v-for="(item, index) in envStats" :key="index">
					<text class="env-name">{{ item.name }}</text>
					<text class="env-value" :class="item.status">{{ item.value }}</text>
				</view>
			</view>
			
			<view class="daily-tip">
				<text class="tip-title">今日提示</text>
				<text class="tip-content">{{ dailyTip }}</text>
			</view>
		</view>

		<!-- 省份选择弹窗 -->
		<view class="province-popup" v-if="showProvincePopup">
			<view class="popup-mask" @click="closeProvincePopup"></view>
			<view class="popup-content">
				<view class="popup-header">
					<text class="popup-title">选择省份</text>
					<text class="popup-close" @click="closeProvincePopup">✕</text>
				</view>
				
				<!-- 搜索框 -->
				<view class="search-box">
					<text class="search-icon">🔍</text>
					<input type="text" v-model="provinceSearch" placeholder="搜索省份..." class="search-input"/>
				</view>
				
				<!-- 省份列表 -->
				<scroll-view class="province-list" scroll-y>
					<view class="province-item" 
						v-for="(province, index) in filteredProvinces" 
						:key="index"
						@click="selectProvince(province)">
						{{ province }}
					</view>
				</scroll-view>
			</view>
		</view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 孕期状态
				currentTrimester: '孕中期',
				currentWeek: 18,
				currentDay: 3,
				daysToDue: 152,
				
				// 心情记录
				moodEmojis: ['😀', '😊', '😕', '😟', '😡', '😭'],
				selectedMood: '',
				
				// 功能按钮
				functionItems: [
					{ name: '产检记录', icon: '📋' },
					{ name: '营养建议', icon: '🥗' },
					{ name: '胎动计数', icon: '📱' },
					{ name: '体重曲线', icon: '📈' },
					{ name: '孕期知识', icon: '📚' },
					{ name: '家属指南', icon: '👪' }
				],
				
				// 胎儿信息
				fetalWeight: '200g',
				fetalLength: '14cm',
				heartRateStatus: '145次/分（正常）',
				checkupReminder: true,
				
				// 妈妈健康数据
				showHealthData: false,
				weight: 58,
				bloodPressure: '125/80',
				bloodSugar: 5.1,
				
				// 运动指导
				exerciseTypes: ['孕妇瑜伽', '温和散步', '盆底肌训练', '呼吸练习'],
				exerciseTypeIndex: 0,
				exerciseDuration: '20-30分钟',
				exerciseNote: '避免平躺动作，感到不适立即停止',
				exerciseEnv: '室内常温环境，铺防滑垫',
				
				// 环境与提示（新增省份选择相关）
				envStats: [
					{ name: '温度', value: '24℃', status: 'normal' },
					{ name: '湿度', value: '55%', status: 'normal' },
					{ name: '空气质量', value: '优', status: 'good' },
					{ name: '紫外线', value: '中等', status: 'warning' }
				],
				dailyTip: '今日宜补充钙质，建议晒太阳15分钟促进吸收，避免正午暴晒。',
				
				// 省份选择数据
				provinces: [
					'北京市', '天津市', '河北省', '山西省', '内蒙古自治区',
					'辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省',
					'浙江省', '安徽省', '福建省', '江西省', '山东省',
					'河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区',
					'海南省', '重庆市', '四川省', '贵州省', '云南省',
					'西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区',
					'新疆维吾尔自治区', '台湾省', '香港特别行政区', '澳门特别行政区'
				],
				selectedProvince: '北京市',
				showProvincePopup: false,
				provinceSearch: ''
			};
		},
		computed: {
			// 过滤省份列表
			filteredProvinces() {
				if (!this.provinceSearch) return this.provinces;
				return this.provinces.filter(province => 
					province.includes(this.provinceSearch)
				);
			}
		},
		methods: {
			// 心情记录
			setMood(emoji) {
				this.selectedMood = emoji;
				uni.showToast({
					title: `已记录心情：${emoji}`,
					icon: 'none',
					duration: 1200
				});
			},
			
			// 功能按钮点击
			handleFunctionClick(item) {
				uni.showToast({
					title: `${item.name}功能待开启`,
					icon: 'none',
					duration: 1500
				});
			},
			
			// 产检提醒开关
			toggleCheckupReminder() {
				this.checkupReminder = !this.checkupReminder;
			},
			
			// 健康数据显示切换
			toggleDataDisplay() {
				this.showHealthData = !this.showHealthData;
			},
			
			// 健康数据状态判断
			getWeightStatusClass() {
				const gain = this.weight - 50;
				if (gain < 3) return 'status-low';
				if (gain > 7) return 'status-high';
				return 'status-normal';
			},
			
			getWeightStatusText() {
				const gain = this.weight - 50;
				if (gain < 3) return '（增长偏慢）';
				if (gain > 7) return '（增长偏快）';
				return '（正常）';
			},
			
			getPressureStatusClass() {
				const sys = parseInt(this.bloodPressure.split('/')[0]);
				return sys > 130 ? 'status-high' : 'status-normal';
			},
			
			getPressureStatusText() {
				const sys = parseInt(this.bloodPressure.split('/')[0]);
				return sys > 130 ? '（轻度升高）' : '（正常）';
			},
			
			getSugarStatusClass() {
				return this.bloodSugar > 5.1 ? 'status-high' : 'status-normal';
			},
			
			getSugarStatusText() {
				return this.bloodSugar > 5.1 ? '（略高）' : '（正常）';
			},
			
			// 运动类型切换
			changeExerciseType(e) {
				this.exerciseTypeIndex = e.detail.value;
				switch (this.exerciseTypeIndex) {
					case 0: // 孕妇瑜伽
						this.exerciseDuration = '20-30分钟';
						this.exerciseNote = '避免平躺动作，感到不适立即停止';
						this.exerciseEnv = '室内常温环境，铺防滑垫';
						break;
					case 1: // 温和散步
						this.exerciseDuration = '15-40分钟';
						this.exerciseNote = '选择平坦路面，穿防滑鞋';
						this.exerciseEnv = '公园等空气清新处，避开早晚高峰';
						break;
					case 2: // 盆底肌训练
						this.exerciseDuration = '每组10分钟，每日3组';
						this.exerciseNote = '保持呼吸均匀，避免过度用力';
						this.exerciseEnv = '舒适坐姿或卧姿，放松状态下进行';
						break;
					case 3: // 呼吸练习
						this.exerciseDuration = '每次5-10分钟';
						this.exerciseNote = '缓慢深呼吸，为分娩做准备';
						this.exerciseEnv = '安静室内，可配合轻音乐';
						break;
				}
			},
			
			// 开始运动
			startExercise() {
				uni.showToast({
					title: `开始${this.exerciseTypes[this.exerciseTypeIndex]}`,
					icon: 'none',
					duration: 1500
				});
			},
			
			// 省份选择弹窗控制
			openProvincePopup() {
				this.showProvincePopup = true;
				this.provinceSearch = ''; // 重置搜索
			},
			
			closeProvincePopup() {
				this.showProvincePopup = false;
			},
			
			// 选择省份
			selectProvince(province) {
				this.selectedProvince = province;
				this.closeProvincePopup();
				// 可以在这里添加切换省份后的逻辑（如更新环境数据）
				uni.showToast({
					title: `已选择：${province}`,
					icon: 'none',
					duration: 1200
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	/* 全局样式 */
	.pregnancy-page {
		padding: 20rpx;
		background-color: #fef4ff;
		min-height: 100vh;
		box-sizing: border-box;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
	}

	.background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(180deg, #fff9e8 0%, #ffeeef 30%, #f8e8ff 100%);
		z-index: -1;
		opacity: 0.5;
	}

	/* 标题样式 */
	.title {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		position: relative;

		.icon {
			width: 48rpx;
			height: 48rpx;
			border-radius: 12rpx;
			background-color: #c5dffe;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
			margin-right: 15rpx;
		}

		.title-text {
			font-size: 30rpx;
			font-weight: 600;
			color: #333;
		}
	}

	/* 卡片样式 */
	.card {
		background-color: #fff;
		border-radius: 24rpx;
		padding: 25rpx;
		margin-bottom: 25rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
	}

	/* 顶部容器 */
	.top-container {
		background-color: #fff;
		border-radius: 24rpx;
		padding: 25rpx;
		margin-bottom: 25rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
	}

	.pregnancy-status-box {
		position: absolute;
		right: 0;
		background-color: #c5dffe;
		color: #3250aa;
		font-size: 22rpx;
		font-weight: 500;
		padding: 6rpx 16rpx;
		border-radius: 16rpx;
	}

	/* 功能按钮网格 */
	.function-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 15rpx;
	}

	.function-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 15rpx;
		background-color: #f9f9f9;
		border-radius: 16rpx;
		cursor: pointer;
		transition: all 0.2s;

		&:active {
			background-color: #f0f0f0;
		}
	}

	.function-icon {
		width: 50rpx;
		height: 50rpx;
		background-color: #e6f3ff;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		margin-bottom: 10rpx;
	}

	.function-name {
		font-size: 24rpx;
		color: #666;
		text-align: center;
	}

	/* 心情记录 */
	.mood-record {
		background-color: #fff;
		border-radius: 24rpx;
		padding: 25rpx;
		margin-bottom: 25rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
	}

	.emoji-list {
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
	}

	.emoji {
		font-size: 60rpx;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.emoji-active {
		transform: scale(1.1);
		color: #8ab4f8;
	}

	/* 胎儿监测 */
	.fetal-info {
		padding-left: 10rpx;
	}

	.pregnancy-progress {
		margin-bottom: 25rpx;
	}

	.progress-text {
		font-size: 28rpx;
		color: #333;
		font-weight: 500;
		margin-right: 20rpx;
	}

	.due-text {
		font-size: 24rpx;
		color: #666;
	}

	.fetal-indicators {
		display: flex;
		flex-direction: column;
		gap: 15rpx;
	}

	.indicator-item {
		display: flex;
		align-items: center;
		font-size: 24rpx;
	}

	.indicator-label {
		background-color: #e6f3ff;
		color: #0066cc;
		border-radius: 16rpx;
		padding: 5rpx 15rpx;
		font-size: 22rpx;
		margin-right: 15rpx;
	}

	.indicator-value {
		color: #666;
		flex: 1;
	}

	/* 开关样式 */
	.toggle-switch {
		width: 60rpx;
		height: 34rpx;
		background-color: #eee;
		border-radius: 34rpx;
		position: relative;
		cursor: pointer;

		.switch-track {
			width: 100%;
			height: 100%;
			border-radius: 34rpx;
			background-color: #c5dffe;
			transition: background-color 0.3s;
		}

		.switch-thumb {
			position: absolute;
			width: 30rpx;
			height: 30rpx;
			border-radius: 50%;
			background-color: #fff;
			top: 2rpx;
			left: 2rpx;
			transition: transform 0.3s;
		}

		.switch-on {
			background-color: #8ab4f8;
		}

		.thumb-on {
			transform: translateX(26rpx);
		}
	}

	/* 健康数据 */
	.toggle-btn {
		position: absolute;
		right: 0;
		background-color: #f0e6f5;
		color: #92646e;
		border: none;
		border-radius: 16rpx;
		padding: 6rpx 16rpx;
		font-size: 22rpx;
		font-weight: 500;
	}

	.health-params {
		padding-left: 10rpx;
		margin-bottom: 20rpx;
	}

	.param-item {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.param-name {
		width: 120rpx;
		font-size: 24rpx;
		color: #666;
	}

	.param-value {
		font-size: 24rpx;
		color: #333;
		font-weight: 500;
		margin-right: 15rpx;
	}

	.param-status {
		font-size: 22rpx;
	}

	.status-low {
		color: #ff7d00;
	}

	.status-normal {
		color: #00b42a;
	}

	.status-high {
		color: #ff4d4f;
	}

	.health-tips {
		padding: 0 10rpx;
	}

	.tips-text {
		font-size: 22rpx;
		color: #666;
		background-color: #f5f5f5;
		padding: 12rpx 20rpx;
		border-radius: 12rpx;
		display: block;
	}

	/* 运动指导 */
	.exercise-selector {
		display: flex;
		align-items: center;
		margin-bottom: 25rpx;
		padding-left: 10rpx;
	}

	.selector-label {
		font-size: 24rpx;
		color: #666;
		margin-right: 15rpx;
	}

	.selected-exercise {
		font-size: 24rpx;
		color: #333;
		font-weight: 500;
	}

	.exercise-details {
		padding-left: 10rpx;
		margin-bottom: 25rpx;
	}

	.detail-item {
		display: flex;
		margin-bottom: 15rpx;
	}

	.detail-label {
		width: 140rpx;
		font-size: 24rpx;
		color: #666;
	}

	.detail-value {
		font-size: 24rpx;
		color: #333;
		flex: 1;
	}

	.start-btn {
		width: 100%;
		height: 70rpx;
		background-color: #8ab4f8;
		color: #fff;
		border: none;
		border-radius: 16rpx;
		font-size: 26rpx;
		font-weight: 600;
	}

	/* 环境与提示（新增样式） */
	.location-selector {
		display: flex;
		align-items: center;
		margin-bottom: 25rpx;
		padding-left: 10rpx;
	}

	.location-label {
		font-size: 24rpx;
		color: #666;
		margin-right: 15rpx;
	}

	.location-value {
		font-size: 24rpx;
		color: #333;
		font-weight: 500;
		cursor: pointer;
		text-decoration: underline;
		text-underline-offset: 4rpx;
	}

	.arrow-icon {
		font-size: 20rpx;
		color: #999;
		margin-left: 8rpx;
	}

	.environment-stats {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 15rpx;
		margin-bottom: 25rpx;
	}

	.env-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15rpx;
		background-color: #f9f9f9;
		border-radius: 16rpx;
	}

	.env-name {
		font-size: 24rpx;
		color: #666;
	}

	.env-value {
		font-size: 24rpx;
		font-weight: 500;
	}

	.env-value.normal {
		color: #00b42a;
	}

	.env-value.good {
		color: #0066cc;
	}

	.env-value.warning {
		color: #ff7d00;
	}

	.daily-tip {
		background-color: #fff0f5;
		border-radius: 16rpx;
		padding: 20rpx;
	}

	.tip-title {
		display: block;
		font-size: 24rpx;
		font-weight: 600;
		color: #92646e;
		margin-bottom: 10rpx;
	}

	.tip-content {
		font-size: 22rpx;
		color: #666;
		line-height: 1.6;
	}

	/* 省份选择弹窗样式 */
	.province-popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
	}

	.popup-mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.popup-content {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
		border-radius: 24rpx 24rpx 0 0;
		padding: 25rpx;
		max-height: 80vh;
		box-sizing: border-box;
	}

	.popup-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 25rpx;
	}

	.popup-title {
		font-size: 30rpx;
		font-weight: 600;
		color: #333;
	}

	.popup-close {
		font-size: 36rpx;
		color: #999;
		cursor: pointer;
	}

	/* 搜索框样式 */
	.search-box {
		display: flex;
		align-items: center;
		background-color: #f5f5f5;
		border-radius: 16rpx;
		padding: 12rpx 20rpx;
		margin-bottom: 20rpx;
	}

	.search-icon {
		font-size: 24rpx;
		color: #999;
		margin-right: 15rpx;
	}

	.search-input {
		flex: 1;
		font-size: 24rpx;
		color: #333;
		background-color: transparent;
		border: none;
		outline: none;
		height: 40rpx;
	}

	/* 省份列表样式 */
	.province-list {
		height: calc(80vh - 180rpx);
	}

	.province-item {
		font-size: 26rpx;
		color: #333;
		padding: 20rpx 10rpx;
		border-bottom: 1px solid #f0f0f0;
		cursor: pointer;

		&:last-child {
			border-bottom: none;
		}

		&:active {
			background-color: #f5f5f5;
		}
	}
</style>