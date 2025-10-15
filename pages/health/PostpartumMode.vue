<template>
	<div class="postpartum-page">
		<!-- 背景层 -->
		<div class="background"></div>

		<!-- 顶部产后状态与功能区 -->
		<view class="top-container">
			<view class="title">
				<view class="icon">👩‍🍼</view>
				<text class="title-text">产后健康管理</text>
				<view class="postpartum-status-box">产后第{{ repairDays }}天</view>
			</view>

			<!-- 功能按钮区 -->
			<view class="function-grid">
				<view class="function-item" v-for="(item, index) in functionItems" :key="index"
					@click="handleFunctionClick(item)">
					<view class="function-icon">{{ item.icon }}</view>
					<text class="function-name">{{ item.name }}</text>
				</view>
			</view>
		</view>

		<!-- 今日心情 -->
		<view class="mood-record">
			<view class="title">
				<view class="icon">😊</view>
				<text class="title-text">今日份心情</text>
			</view>
			<view class="emoji-list">
				<text class="emoji" @click="setMood(emoji)" :class="{ 'emoji-active': selectedMood === emoji }"
					v-for="(emoji, index) in moodEmojis" :key="index">
					{{ emoji }}
				</text>
			</view>
		</view>

		<!-- 产后修复 -->
		<view class="card postpartum-repair">
			<view class="title">
				<view class="icon">🌱</view>
				<text class="title-text">产后修复</text>
			</view>
			<view class="repair-info">
				<view class="wound-tracking">
					<view class="tracking-item">
						<text class="tracking-label">伤口愈合跟踪</text>
					</view>
					<view class="tracking-item">
						<text class="tracking-sub-label">恢复情况</text>
						<text class="tracking-value">{{ woundStatus }}</text>
					</view>
					<view class="tracking-notes">
						<text class="notes-text">注意事项：{{ woundNotes }}</text>
					</view>
				</view>
				<view class="repair-buttons">
					<view class="button-item" @click="takePhoto">
						<view class="button-icon">📷</view>
						<text class="button-text">拍照上传</text>
					</view>
					<view class="button-item" @click="openNoteForm">
						<view class="button-icon">✏️</view>
						<text class="button-text">云备注</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 营养膳食 -->
		<view class="card nutrition-diet">
			<view class="title">
				<view class="icon">🍱</view>
				<text class="title-text">营养膳食</text>
			</view>
			<view class="meal-status">
				<view class="meal-circles">
					<view class="meal-circle" :class="{ 'circle-active': breakfastCompleted }" @click="toggleBreakfast">
						<text class="meal-name">早餐</text>
					</view>
					<view class="meal-circle" :class="{ 'circle-active': lunchCompleted }" @click="toggleLunch">
						<text class="meal-name">午餐</text>
					</view>
					<view class="meal-circle" :class="{ 'circle-active': dinnerCompleted }" @click="toggleDinner">
						<text class="meal-name">晚餐</text>
					</view>
				</view>
				<view class="photo-identify" @click="openPhotoIdentify">
					<view class="button-icon">📷</view>
					<text class="button-text">拍照鉴定</text>
				</view>
			</view>
			<view class="nutrition-params">
				<view class="param-item">
					<text class="param-name">蛋白质</text>
					<view class="param-bar">
						<view class="bar-fill" :style="{ width: proteinPercent }"></view>
					</view>
					<text class="param-value">{{ proteinValue }}g</text>
				</view>
				<view class="param-item">
					<text class="param-name">脂肪</text>
					<view class="param-bar">
						<view class="bar-fill" :style="{ width: fatPercent }"></view>
					</view>
					<text class="param-value">{{ fatValue }}g</text>
				</view>
				<view class="param-item">
					<text class="param-name">维生素</text>
					<view class="param-bar">
						<view class="bar-fill" :style="{ width: vitaminPercent }"></view>
					</view>
					<text class="param-value">{{ vitaminValue }}mg</text>
				</view>
				<view class="param-item">
					<text class="param-name">卡路里</text>
					<view class="param-bar">
						<view class="bar-fill" :style="{ width: caloriePercent }"></view>
					</view>
					<text class="param-value">{{ calorieValue }}千卡</text>
				</view>
			</view>
			<view class="diet-tips">
				<text class="tips-text">{{ dietTip }}</text>
			</view>
			<view class="recommend-meals">
				<text class="recommend-title">推荐餐食</text>
				<view class="meals-list">
					<view class="meal-item" v-for="(meal, index) in recommendMeals" :key="index">
						<text class="meal-name">{{ meal.name }}</text>
					</view>
					<text class="view-more" @click="viewMoreMeals">查看更多...</text>
				</view>
			</view>
			<view class="grocery-list">
				<text class="list-title">智能采购清单</text>
				<text class="list-content">{{ groceryContent }}</text>
			</view>
			<view class="diet-actions">
				<view class="action-item" @click="openPurchaseForm">
					<text class="action-icon">📍</text>
					<text class="action-text">最近购买点</text>
				</view>
				<view class="action-item" @click="openTabooForm">
					<text class="action-icon">⚠️</text>
					<text class="action-text">饮食禁忌</text>
				</view>
			</view>
		</view>

		<!-- 运动康复 -->
		<view class="card exercise-rehabilitation">
			<view class="title">
				<view class="icon">🏃‍♀️</view>
				<text class="title-text">运动康复</text>
			</view>
			<view class="course-status">
				<text class="course-title">产后运动课程</text>
				<text class="plan-btn" @click="openExercisePlanForm">制定计划</text>
			</view>
			<view class="courses-list">
				<view class="course-item" v-for="(course, index) in exerciseCourses" :key="index">
					<text class="course-name">{{ course.name }}</text>
				</view>
			</view>
		</view>

		<!-- 拍照鉴定弹窗 -->
		<view class="scan-popup" v-if="showScanPopup">
			<view class="scan-mask" @click="closeScanPopup"></view>
			<view class="scan-container">
				<view class="scan-box">
					<view class="scan-frame"></view>
					<view class="scan-line"></view>
				</view>
				<text class="scan-tip">请将食物对准扫描框</text>
				<view class="scan-buttons">
					<view class="scan-btn cancel-btn" @click="closeScanPopup">
						<text>取消</text>
					</view>
					<view class="scan-btn confirm-btn" @click="handlePhotoIdentify">
						<text>拍照鉴定</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 云备注表单弹窗 -->
		<view class="form-popup" v-if="showNoteForm">
			<view class="form-mask" @click="closeNoteForm"></view>
			<view class="form-content">
				<view class="form-header">
					<text class="form-title">伤口恢复备注</text>
					<text class="form-close" @click="closeNoteForm">✕</text>
				</view>
				<view class="form-body">
					<view class="form-item">
						<text class="form-label">备注日期</text>
						<text class="form-value">{{ currentDate }}</text>
					</view>
					<view class="form-item">
						<text class="form-label">伤口状态</text>
						<picker @change="onWoundStatusChange" :value="woundStatusIndex" :range="woundStatusOptions">
							<view class="picker-view">
								{{ woundStatusOptions[woundStatusIndex] }}
								<text class="picker-arrow">▼</text>
							</view>
						</picker>
					</view>
					<view class="form-item">
						<text class="form-label">备注内容</text>
						<textarea class="form-textarea" v-model="noteContent" placeholder="请输入伤口恢复情况..."
							rows="4"></textarea>
					</view>
					<view class="form-item">
						<text class="form-label">是否用药</text>
						<view class="radio-group">
							<view class="radio-item" @click="setMedicine(true)">
								<view class="radio-circle" :class="{ 'radio-checked': isMedicine }"></view>
								<text class="radio-text">是</text>
							</view>
							<view class="radio-item" @click="setMedicine(false)">
								<view class="radio-circle" :class="{ 'radio-checked': !isMedicine }"></view>
								<text class="radio-text">否</text>
							</view>
						</view>
					</view>
				</view>
				<view class="form-footer">
					<button class="form-btn cancel" @click="closeNoteForm">取消</button>
					<button class="form-btn confirm" @click="saveNote">保存备注</button>
				</view>
			</view>
		</view>

		<!-- 其他功能表单弹窗（示例：运动计划制定） -->
		<view class="form-popup" v-if="showExercisePlanForm">
			<view class="form-mask" @click="closeExercisePlanForm"></view>
			<view class="form-content">
				<view class="form-header">
					<text class="form-title">运动计划制定</text>
					<text class="form-close" @click="closeExercisePlanForm">✕</text>
				</view>
				<view class="form-body">
					<view class="form-item">
						<text class="form-label">运动频率</text>
						<picker @change="onFrequencyChange" :value="frequencyIndex" :range="frequencyOptions">
							<view class="picker-view">
								{{ frequencyOptions[frequencyIndex] }}
								<text class="picker-arrow">▼</text>
							</view>
						</picker>
					</view>
					<view class="form-item">
						<text class="form-label">每次时长</text>
						<picker @change="onDurationChange" :value="durationIndex" :range="durationOptions">
							<view class="picker-view">
								{{ durationOptions[durationIndex] }}
								<text class="picker-arrow">▼</text>
							</view>
						</picker>
					</view>
					<view class="form-item">
						<text class="form-label">运动类型</text>
						<view class="checkbox-group">
							<view class="checkbox-item" v-for="(type, index) in exerciseTypeOptions" :key="index"
								@click="toggleExerciseType(index)">
								<view class="checkbox-box" :class="{ 'checkbox-checked': type.checked }">
									<text class="checkbox-icon" v-if="type.checked">✓</text>
								</view>
								<text class="checkbox-text">{{ type.name }}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="form-footer">
					<button class="form-btn cancel" @click="closeExercisePlanForm">取消</button>
					<button class="form-btn confirm" @click="saveExercisePlan">生成计划</button>
				</view>
			</view>
		</view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 产后状态
				repairDays: 15,
				woundStatus: '伤口基本愈合，轻微色素沉着',
				woundNotes: '避免剧烈运动，保持清洁干燥',

				// 心情记录
				moodEmojis: ['😀', '😊', '😕', '😟', '😡', '😭', '😤'],
				selectedMood: '',

				// 功能按钮
				functionItems: [{
						name: '恶露记录',
						icon: '📝'
					},
					{
						name: '睡眠监测',
						icon: '💤'
					},
					{
						name: '育儿知识',
						icon: '📚'
					},
					{
						name: '体重管理',
						icon: '⚖️'
					},
					{
						name: '乳汁监测',
						icon: '🍼'
					},
					{
						name: '心理疏导',
						icon: '🧘‍♀️'
					}
				],

				// 营养膳食
				breakfastCompleted: true,
				lunchCompleted: false,
				dinnerCompleted: false,
				proteinValue: 65,
				proteinPercent: '65%',
				fatValue: 25,
				fatPercent: '50%',
				vitaminValue: 80,
				vitaminPercent: '80%',
				calorieValue: 1800,
				caloriePercent: '60%',
				dietTip: '今日蛋白质摄入充足，可适当增加膳食纤维',
				recommendMeals: [{
						name: '红枣桂圆粥'
					},
					{
						name: '清蒸鲈鱼'
					},
					{
						name: '西兰花炒虾仁'
					}
				],
				groceryContent: '红枣、桂圆、鲈鱼、西兰花、虾仁',

				// 运动康复
				exerciseCourses: [{
						name: '【产后腰痛缓解】5个瑜伽动作'
					},
					{
						name: '【产后康复操】盆底肌修复'
					},
					{
						name: '【腹式呼吸三部曲】核心训练'
					},
					{
						name: '【产后瘦肚子】早晨10分钟'
					}
				],

				// 弹窗控制
				showScanPopup: false,
				showNoteForm: false,
				showExercisePlanForm: false,

				// 云备注表单数据
				currentDate: '',
				woundStatusOptions: ['正常愈合', '轻微红肿', '有分泌物', '疼痛加剧'],
				woundStatusIndex: 0,
				noteContent: '',
				isMedicine: false,

				// 运动计划表单数据
				frequencyOptions: ['每周2次', '每周3次', '每周4次', '每周5次以上'],
				frequencyIndex: 1,
				durationOptions: ['10分钟', '20分钟', '30分钟', '40分钟以上'],
				durationIndex: 1,
				exerciseTypeOptions: [{
						name: '瑜伽',
						checked: true
					},
					{
						name: '散步',
						checked: true
					},
					{
						name: '盆底肌训练',
						checked: false
					},
					{
						name: '呼吸练习',
						checked: false
					}
				]
			};
		},
		onLoad() {
			// 初始化当前日期
			const date = new Date();
			this.currentDate =
				`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
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

			// 产后修复相关
			takePhoto() {
				uni.showToast({
					title: '拍照上传功能待开启',
					icon: 'none',
					duration: 1500
				});
			},

			// 云备注表单控制
			openNoteForm() {
				this.showNoteForm = true;
			},
			closeNoteForm() {
				this.showNoteForm = false;
			},
			onWoundStatusChange(e) {
				this.woundStatusIndex = e.detail.value;
			},
			setMedicine(flag) {
				this.isMedicine = flag;
			},
			saveNote() {
				this.closeNoteForm();
				uni.showToast({
					title: '备注已保存',
					icon: 'none',
					duration: 1500
				});
			},

			// 营养膳食相关
			toggleBreakfast() {
				this.breakfastCompleted = !this.breakfastCompleted;
			},
			toggleLunch() {
				this.lunchCompleted = !this.lunchCompleted;
			},
			toggleDinner() {
				this.dinnerCompleted = !this.dinnerCompleted;
			},

			openPhotoIdentify() {
				this.showScanPopup = true;
			},
			closeScanPopup() {
				this.showScanPopup = false;
			},
			handlePhotoIdentify() {
				this.closeScanPopup();
				uni.showToast({
					title: '食物鉴定功能待开启',
					icon: 'none',
					duration: 1500
				});
			},

			viewMoreMeals() {
				uni.showToast({
					title: '查看更多推荐餐食',
					icon: 'none'
				});
			},
			openPurchaseForm() {
				uni.showToast({
					title: '最近购买点功能待开启',
					icon: 'none'
				});
			},
			openTabooForm() {
				uni.showToast({
					title: '饮食禁忌功能待开启',
					icon: 'none'
				});
			},

			// 运动计划表单控制
			openExercisePlanForm() {
				this.showExercisePlanForm = true;
			},
			closeExercisePlanForm() {
				this.showExercisePlanForm = false;
			},
			onFrequencyChange(e) {
				this.frequencyIndex = e.detail.value;
			},
			onDurationChange(e) {
				this.durationIndex = e.detail.value;
			},
			toggleExerciseType(index) {
				this.exerciseTypeOptions[index].checked = !this.exerciseTypeOptions[index].checked;
			},
			saveExercisePlan() {
				this.closeExercisePlanForm();
				uni.showToast({
					title: '运动计划已生成',
					icon: 'none',
					duration: 1500
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	/* 全局样式保持不变 */
	.postpartum-page {
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

	/* 顶部容器、功能按钮、心情记录等样式保持不变 */
	.top-container {
		background-color: #fff;
		border-radius: 24rpx;
		padding: 25rpx;
		margin-bottom: 25rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
	}

	.postpartum-status-box {
		position: absolute;
		right: 0;
		background-color: #c5dffe;
		color: #3250aa;
		font-size: 22rpx;
		font-weight: 500;
		padding: 6rpx 16rpx;
		border-radius: 16rpx;
	}

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

	/* 产后修复样式 */
	.repair-info {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.wound-tracking {
		flex: 1;
		margin-right: 20rpx;
	}

	.tracking-item {
		margin-bottom: 15rpx;
	}

	.tracking-label {
		font-size: 26rpx;
		font-weight: 600;
		color: #333;
	}

	.tracking-sub-label {
		display: inline-block;
		width: 120rpx;
		font-size: 24rpx;
		color: #666;
	}

	.tracking-value {
		font-size: 24rpx;
		color: #333;
	}

	.tracking-notes {
		margin-top: 10rpx;
		padding: 15rpx;
		background-color: #f5f5f5;
		border-radius: 12rpx;
	}

	.notes-text {
		font-size: 22rpx;
		color: #666;
		line-height: 1.5;
	}

	.repair-buttons {
		display: flex;
		flex-direction: column;
		gap: 15rpx;
	}

	.button-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 140rpx;
		height: 100rpx;
		background-color: #f0e6f5;
		border-radius: 16rpx;
		cursor: pointer;
	}

	.button-icon {
		font-size: 36rpx;
		margin-bottom: 8rpx;
		color: #92646e;
	}

	.button-text {
		font-size: 22rpx;
		color: #92646e;
	}

	/* 营养膳食样式 */
	.meal-status {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.meal-circles {
		display: flex;
		gap: 30rpx;
	}

	.meal-circle {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		background-color: #f5f5f5;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		transition: all 0.3s;
	}

	.circle-active {
		background-color: #e6f3ff;
		color: #0066cc;
		box-shadow: 0 4rpx 8rpx rgba(0, 102, 204, 0.15);
	}

	.meal-name {
		font-size: 24rpx;
		font-weight: 500;
	}

	.photo-identify {
		display: flex;
		align-items: center;
		padding: 12rpx 20rpx;
		background-color: #e6f3ff;
		border-radius: 16rpx;
		cursor: pointer;
	}

	.nutrition-params {
		margin-bottom: 30rpx;
	}

	.param-item {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.param-name {
		width: 100rpx;
		font-size: 24rpx;
		color: #666;
	}

	.param-bar {
		flex: 1;
		height: 20rpx;
		background-color: #f0f0f0;
		border-radius: 10rpx;
		overflow: hidden;
		margin: 0 15rpx;
	}

	.bar-fill {
		height: 100%;
		background-color: #8ab4f8;
		border-radius: 10rpx;
		transition: width 0.5s;
	}

	.param-value {
		font-size: 24rpx;
		color: #333;
		width: 120rpx;
		text-align: right;
	}

	.diet-tips {
		padding: 15rpx;
		background-color: #fff0f5;
		border-radius: 16rpx;
		margin-bottom: 30rpx;
	}

	.tips-text {
		font-size: 22rpx;
		color: #92646e;
		line-height: 1.5;
	}

	.recommend-meals {
		margin-bottom: 30rpx;
	}

	.recommend-title {
		display: block;
		font-size: 26rpx;
		font-weight: 600;
		color: #333;
		margin-bottom: 15rpx;
	}

	.meals-list {
		display: flex;
		flex-wrap: wrap;
		gap: 15rpx;
	}

	.meal-item {
		padding: 10rpx 20rpx;
		background-color: #f5f5f5;
		border-radius: 16rpx;
	}

	.meal-name {
		font-size: 22rpx;
		color: #666;
	}

	.view-more {
		font-size: 22rpx;
		color: #0066cc;
		text-decoration: underline;
		margin-left: 10rpx;
		cursor: pointer;
	}

	.grocery-list {
		margin-bottom: 30rpx;
		padding: 15rpx;
		background-color: #f5f7ff;
		border-radius: 16rpx;
	}

	.list-title {
		display: block;
		font-size: 24rpx;
		font-weight: 600;
		color: #3250aa;
		margin-bottom: 10rpx;
	}

	.list-content {
		font-size: 22rpx;
		color: #666;
	}

	.diet-actions {
		display: flex;
		gap: 15rpx;
	}

	.action-item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 15rpx;
		background-color: #f9f9f9;
		border-radius: 16rpx;
		cursor: pointer;
	}

	.action-icon {
		margin-right: 8rpx;
		font-size: 24rpx;
		color: #666;
	}

	.action-text {
		font-size: 22rpx;
		color: #666;
	}

	/* 运动康复样式 */
	.course-status {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.course-title {
		font-size: 26rpx;
		font-weight: 600;
		color: #333;
	}

	.plan-btn {
		padding: 8rpx 20rpx;
		background-color: #e6f3ff;
		color: #0066cc;
		border-radius: 16rpx;
		font-size: 22rpx;
		cursor: pointer;
	}

	.courses-list {
		display: flex;
		flex-direction: column;
		gap: 15rpx;
	}

	.course-item {
		padding: 20rpx;
		background-color: #f9f9f9;
		border-radius: 16rpx;
	}

	.course-name {
		font-size: 24rpx;
		color: #333;
		line-height: 1.5;
	}

	/* 拍照鉴定弹窗样式 */
	.scan-popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
	}

	.scan-mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
	}

	.scan-container {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 30%;
		box-sizing: border-box;
	}

	.scan-box {
		width: 60%;
		height: 40%;
		position: relative;
		border: 2rpx solid #fff;
		box-shadow: 0 0 0 100vh rgba(0, 0, 0, 0.5);
		margin-bottom: 50rpx;
	}

	.scan-frame {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: 10rpx solid rgba(255, 255, 255, 0.3);
		box-sizing: border-box;
		pointer-events: none;
	}

	.scan-line {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 6rpx;
		background-color: #00cc66;
		animation: scanMove 2s infinite linear;
	}

	@keyframes scanMove {
		0% {
			top: 0;
		}

		100% {
			top: calc(100% - 6rpx);
		}
	}

	.scan-tip {
		color: #fff;
		font-size: 28rpx;
		margin-bottom: 80rpx;
		text-align: center;
		padding: 0 20rpx;
	}

	.scan-buttons {
		display: flex;
		gap: 40rpx;
		margin-top: auto;
		margin-bottom: 80rpx;
	}

	.scan-btn {
		width: 200rpx;
		height: 70rpx;
		border-radius: 35rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		color: #fff;
		cursor: pointer;
	}

	.cancel-btn {
		background-color: rgba(255, 255, 255, 0.3);
	}

	.confirm-btn {
		background-color: #00cc66;
	}

	/* 表单弹窗通用样式 */
	.form-popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
	}

	.form-mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.form-content {
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

	.form-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 25rpx;
		padding-bottom: 15rpx;
		border-bottom: 1px solid #f0f0f0;
	}

	.form-title {
		font-size: 30rpx;
		font-weight: 600;
		color: #333;
	}

	.form-close {
		font-size: 36rpx;
		color: #999;
		cursor: pointer;
	}

	.form-body {
		max-height: calc(80vh - 180rpx);
		overflow-y: auto;
		padding-right: 10rpx;
	}

	.form-item {
		margin-bottom: 30rpx;
	}

	.form-label {
		display: block;
		font-size: 24rpx;
		color: #666;
		margin-bottom: 10rpx;
	}

	.form-value {
		font-size: 24rpx;
		color: #333;
		padding: 12rpx 15rpx;
		background-color: #f5f5f5;
		border-radius: 12rpx;
		display: block;
	}

	.picker-view {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12rpx 15rpx;
		background-color: #f5f5f5;
		border-radius: 12rpx;
		font-size: 24rpx;
		color: #333;
	}

	.picker-arrow {
		font-size: 20rpx;
		color: #999;
	}

	.form-textarea {
		width: 100%;
		padding: 15rpx;
		background-color: #f5f5f5;
		border-radius: 12rpx;
		border: none;
		outline: none;
		font-size: 24rpx;
		color: #333;
		min-height: 120rpx;
		box-sizing: border-box;
	}

	.radio-group {
		display: flex;
		gap: 30rpx;
	}

	.radio-item {
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	.radio-circle {
		width: 28rpx;
		height: 28rpx;
		border-radius: 50%;
		border: 2rpx solid #999;
		margin-right: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.radio-checked {
		border-color: #8ab4f8;
		background-color: #8ab4f8;
	}

	.radio-text {
		font-size: 24rpx;
		color: #333;
	}

	.checkbox-group {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
	}

	.checkbox-item {
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
		cursor: pointer;
	}

	.checkbox-box {
		width: 28rpx;
		height: 28rpx;
		border-radius: 6rpx;
		border: 2rpx solid #999;
		margin-right: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.checkbox-checked {
		border-color: #8ab4f8;
		background-color: #8ab4f8;
	}

	.checkbox-icon {
		font-size: 20rpx;
		color: #fff;
	}

	.checkbox-text {
		font-size: 24rpx;
		color: #333;
	}

	.form-footer {
		display: flex;
		gap: 20rpx;
		margin-top: 20rpx;
		padding-top: 15rpx;
		border-top: 1px solid #f0f0f0;
	}

	.form-btn {
		flex: 1;
		height: 70rpx;
		border-radius: 16rpx;
		font-size: 26rpx;
		font-weight: 500;
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
	}

	.form-btn.cancel {
		background-color: #f5f5f5;
		color: #666;
	}

	.form-btn.confirm {
		background-color: #8ab4f8;
		color: #fff;
	}
</style>