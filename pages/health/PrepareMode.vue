<template>
	<view class="left-page-container">
		<!-- 今日份心情 -->
		<view class="mood-record">
			<view class="title">
				<view class="icon">😊</view>
				<text class="title-text">今日份心情</text>
				<view class="pregnancy-status-box">备孕</view>
			</view>
			<view class="emoji-list">
				<text class="emoji" @click="setMood('😀')" :class="{ 'emoji-active': selectedMood === '😀' }">😀</text>
				<text class="emoji" @click="setMood('😊')" :class="{ 'emoji-active': selectedMood === '😊' }">😊</text>
				<text class="emoji" @click="setMood('😕')" :class="{ 'emoji-active': selectedMood === '😕' }">😕</text>
				<text class="emoji" @click="setMood('😟')" :class="{ 'emoji-active': selectedMood === '😟' }">😟</text>
				<text class="emoji" @click="setMood('😡')" :class="{ 'emoji-active': selectedMood === '😡' }">😡</text>
				<text class="emoji" @click="setMood('😭')" :class="{ 'emoji-active': selectedMood === '😭' }">😭</text>
			</view>
		</view>

		<!-- 经期记录 -->
		<view class="menstrual-record">
			<view class="title">
				<view class="icon">📅</view>
				<text class="title-text">经期记录</text>
			</view>
			<view class="calendar">
				<view class="calendar-container">
					<view class="year-month">
						<picker @change="changeYear" :value="yearIndex" :range="yearList">
							<text>{{ selectedYear }} 年 ▼</text>
						</picker>
						<picker @change="changeMonth" :value="selectedMonth - 1" :range="monthList" class="month">
							<text>{{ selectedMonth }} 月 ▼</text>
						</picker>
					</view>
					<view class="weekdays">
						<text>日</text><text>一</text><text>二</text><text>三</text><text>四</text><text>五</text><text>六</text>
					</view>
					<view class="calendar-days">
						<view v-for="(day, index) in daysInMonth" :key="index" class="calendar-day" :class="{
								'luteal-phase': day.phase === 'luteal',
								'menstrual-phase': day.phase === 'menstrual',
								'ovulation-phase': day.phase === 'ovulation',
								'ovulation-day': day.phase === 'ovulation-day',
								'intercourse-day': day.phase === 'intercourse',
								'day-active': selectedDay === day.date,
								'empty-day': !day.date
							}" @click="selectDay(day)">
							<text>{{ day.date || '' }}</text>
						</view>
					</view>
				</view>
				<view class="calendar-right">
					<span class="legend-item" data-phase="luteal">黄体期</span>
					<span class="legend-item" data-phase="menstrual">月经期</span>
					<span class="legend-item" data-phase="ovulation">排卵期</span>
					<span class="legend-item" data-phase="ovulation-day">排卵日</span>
					<span class="legend-item" data-phase="intercourse">同房日</span>
				</view>
			</view>
			<view class="tips">
				<text class="tips-text">小贴士：记录经期有助于精准预测排卵日，提高备孕成功率~</text>
			</view>
			<view class="today-info">
				<text>今日是</text>
				<text class="highlight">{{ getPhaseText(currentPhase) }}</text>
				<button class="setting-btn" @click="goToMenstrualSetting">经期设置 ➤</button>
			</view>
		</view>

		<!-- 健康体检（强化版：前端完整实现） -->
		<view class="health-check">
			<view class="title">
				<view class="icon">💪</view>
				<text class="title-text">健康体检</text>
				<!-- 新增：历史记录入口 -->
				<button class="history-btn" @click="showHistory">历史记录</button>
			</view>
			<view class="form">
				<!-- 新增：性别选择（用于更精准计算体脂率） -->
				<view class="form-item">
					<text class="form-label">性别:</text>
					<picker @change="changeGender" :value="genderIndex" :range="genderList">
						<text class="gender-value">{{ genderList[genderIndex] }}</text>
					</picker>
				</view>
				<!-- 新增：年龄输入（用于体脂率计算） -->
				<view class="form-item">
					<text class="form-label">年龄:</text>
					<input type="number" v-model="age" placeholder="请输入年龄" min="18" max="55" />
				</view>
				<view class="form-item">
					<text class="form-label">体重:</text>
					<input type="number" v-model="weight" placeholder="请输入体重(kg)" step="0.1"
						@input="calculateHealthData" />
				</view>
				<view class="form-item">
					<text class="form-label">身高:</text>
					<input type="number" v-model="height" placeholder="请输入身高(cm)" step="0.1"
						@input="calculateHealthData" />
				</view>
				<!-- 新增：腰围输入（用于体脂率计算） -->
				<view class="form-item">
					<text class="form-label">腰围:</text>
					<input type="number" v-model="waist" placeholder="请输入腰围(cm)" step="0.1"
						@input="calculateHealthData" />
				</view>

				<!-- 新增：健康数据结果展示（BMI+体脂率） -->
				<view class="health-result">
					<view class="result-row">
						<text class="result-label">BMI值：</text>
						<text class="result-value" :class="getBMIStatusClass()">{{ bmi || '--' }}</text>
						<text class="result-desc">{{ getBMIStatusText() }}</text>
					</view>
					<view class="result-row">
						<text class="result-label">体脂率：</text>
						<text class="result-value" :class="getFatRateStatusClass()">{{ fatRate || '--' }}%</text>
						<text class="result-desc">{{ getFatRateStatusText() }}</text>
					</view>
				</view>

				<!-- 新增：备孕专属健康建议 -->
				<view class="health-advice" v-if="bmi && fatRate">
					<text class="advice-title">备孕健康建议：</text>
					<view class="advice-list">
						<text class="advice-item" v-for="(item, index) in adviceList" :key="index">• {{ item }}</text>
					</view>
				</view>

				<!-- 新增：保存记录按钮 -->
				<button class="save-btn" @click="saveHealthRecord" :disabled="!bmi || !fatRate">保存体检记录</button>

				<text class="hint">备孕女性健康标准：BMI 18.5-24，体脂率 20%-28%</text>
			</view>
		</view>

		<!-- 运动计划 -->
		<view class="exercise-plan">
			<view class="title">
				<view class="icon">🏃</view>
				<text class="title-text">运动计划</text>
			</view>
			<view class="plan-info">
				<text class="check-in-text">已连续打卡 1 天</text>
				<view class="select-type">
					<text class="type-label">选择运动类型：</text>
					<picker @change="changeExerciseType" :value="exerciseTypeIndex" :range="exerciseTypeList">
						<text class="selected-type">{{ selectedExerciseType }}</text>
					</picker>
				</view>
				<view class="exercise-data">
					<view class="data-item">
						<view class="data-icon">⏱️</view>
						<text class="data-label">时长(分钟)</text>
						<text class="data-value">{{ exerciseTime }}</text>
					</view>
					<view class="data-item">
						<view class="data-icon">🔥</view>
						<text class="data-label">消耗(千卡)</text>
						<text class="data-value">{{ exerciseCalorie }}</text>
					</view>
					<view class="data-item">
						<view class="data-icon">📏</view>
						<text class="data-label">距离(公里)</text>
						<text class="data-value">{{ exerciseDistance }}</text>
					</view>
				</view>
				<button class="start-btn" @click="startExercise">开始运动</button>
			</view>
		</view>

		<!-- 新增：历史记录弹窗 -->
		<uni-popup ref="historyPopup" type="bottom" :mask="true">
			<view class="popup-content">
				<view class="popup-header">
					<text class="popup-title">体检历史记录</text>
					<text class="popup-close" @click="$refs.historyPopup.close()">✕</text>
				</view>
				<view class="history-list" v-if="healthHistory.length">
					<view class="history-item" v-for="(item, index) in healthHistory" :key="index">
						<view class="history-date">{{ item.date }}</view>
						<view class="history-data">
							<text>BMI: {{ item.bmi }}</text>
							<text>体脂率: {{ item.fatRate }}%</text>
						</view>
					</view>
				</view>
				<view class="empty-history" v-else>
					<text>暂无体检记录</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	// 引入uni-app弹窗组件（用于历史记录展示）
	import uniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue';
	import uniPopupDialog from '@dcloudio/uni-ui/lib/uni-popup-dialog/uni-popup-dialog.vue';

	export default {
		components: {
			uniPopup,
			uniPopupDialog
		},
		data() {
			return {
				selectedMood: '',
				// 日历相关
				selectedYear: new Date().getFullYear(),
				selectedMonth: new Date().getMonth() + 1,
				yearList: [],
				monthList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
				yearIndex: 0,
				daysInMonth: [],
				currentPhase: '',
				selectedDay: new Date().getDate(),

				// 健康体检新增数据
				genderList: ['女', '男'], // 默认为备孕女性，保留男性选项适配更多场景
				genderIndex: 0,
				age: '',
				waist: '',
				bmi: '',
				fatRate: '',
				adviceList: [],
				// 体检历史记录（存储在本地缓存）
				healthHistory: [],

				// 原有健康数据
				weight: '',
				height: '',
				isHealthy: false,

				// 运动计划相关
				exerciseTypeList: ['跑步', '跳绳', '瑜伽'],
				selectedExerciseType: '跑步',
				exerciseTypeIndex: 0,
				exerciseTime: 30,
				exerciseCalorie: 240,
				exerciseDistance: 3
			};
		},
		onLoad() {
			// 初始化年份列表
			const currentYear = new Date().getFullYear();
			for (let i = currentYear - 5; i <= currentYear + 5; i++) {
				this.yearList.push(i + '');
			}
			this.yearIndex = this.yearList.indexOf(this.selectedYear + '');
			this.generateFullCalendar();

			// 初始化：读取本地缓存的体检历史记录
			this.loadHealthHistory();
		},
		methods: {
			// 心情记录
			setMood(mood) {
				this.selectedMood = mood;
				uni.showToast({
					title: `已记录心情：${mood}`,
					icon: 'none',
					duration: 1200
				});
			},

			// 日历相关方法（保持不变）
			generateFullCalendar() {
				const year = this.selectedYear;
				const month = this.selectedMonth;
				const daysInMonth = new Date(year, month, 0).getDate();
				const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
				const totalCells = 42;
				const calendarDays = [];

				for (let i = 0; i < firstDayOfMonth; i++) {
					calendarDays.push({
						date: '',
						phase: ''
					});
				}
				for (let i = 1; i <= daysInMonth; i++) {
					calendarDays.push({
						date: i,
						phase: this.getPhase(i)
					});
				}
				const remainingCells = totalCells - calendarDays.length;
				for (let i = 0; i < remainingCells; i++) {
					calendarDays.push({
						date: '',
						phase: ''
					});
				}

				this.daysInMonth = calendarDays;
				if (month === new Date().getMonth() + 1 && year === new Date().getFullYear()) {
					this.currentPhase = this.getPhase(this.selectedDay);
				}
			},
			getPhase(day) {
				if (day >= 1 && day <= 5) return 'luteal';
				if (day >= 6 && day <= 10) return 'menstrual';
				if (day >= 11 && day <= 16) return 'ovulation';
				if (day === 17) return 'ovulation-day';
				if (day === 20) return 'intercourse';
				return '';
			},
			getPhaseText(phase) {
				const phaseMap = {
					'luteal': '黄体期',
					'menstrual': '月经期',
					'ovulation': '排卵期',
					'ovulation-day': '排卵日',
					'intercourse': '同房日',
					'': '未记录'
				};
				return phaseMap[phase] || '未记录';
			},
			changeYear(e) {
				uni.showToast({
					title: '改功能有待进一步完善',
					icon: 'none',
					duration: 1500
				});
			},
			changeMonth(e) {
				this.selectedMonth = parseInt(this.monthList[e.detail.value]);
				this.generateFullCalendar();
			},
			selectDay(day) {
				if (day.date) {
					this.selectedDay = day.date;
					this.currentPhase = day.phase;
				}
			},
			goToMenstrualSetting() {
				uni.showToast({
					title: '经期设置页面待跳转',
					icon: 'none',
					duration: 1500
				});
			},

			// 新增：健康数据计算（BMI+体脂率+建议）
			calculateHealthData() {
				// 验证输入：必须填写体重、身高，年龄和腰围可选（无则用简化公式）
				if (!this.weight || !this.height || this.height <= 0) {
					this.bmi = '';
					this.fatRate = '';
					this.adviceList = [];
					return;
				}

				// 1. 计算BMI（体重kg / 身高m²）
				const heightM = this.height / 100;
				const bmiValue = (this.weight / (heightM * heightM)).toFixed(1);
				this.bmi = bmiValue;
				this.isHealthy = bmiValue >= 18.5 && bmiValue <= 24;

				// 2. 计算体脂率（采用适合备孕女性的简化公式）
				let fatRateValue = 0;
				if (this.genderIndex === 0) { // 女性
					if (this.age && this.waist) {
						// 精准公式：基于年龄、腰围、身高（更准确）
						fatRateValue = (163.205 * Math.log10(this.waist - heightM * 21) - 97.684 * Math.log10(heightM) -
							78.387).toFixed(1);
					} else {
						// 简化公式：基于BMI（无年龄/腰围时使用）
						fatRateValue = (1.2 * bmiValue + 0.23 * (this.age || 28) - 5.4).toFixed(1);
					}
				} else { // 男性（预留适配）
					fatRateValue = (1.2 * bmiValue + 0.23 * (this.age || 30) - 16.2).toFixed(1);
				}
				// 体脂率范围限制（避免异常值）
				if (fatRateValue < 5) fatRateValue = 5;
				if (fatRateValue > 50) fatRateValue = 50;
				this.fatRate = fatRateValue;

				// 3. 生成备孕专属健康建议（根据BMI和体脂率动态生成）
				this.generateAdvice();
			},

			// 新增：生成备孕健康建议
			generateAdvice() {
				const advice = [];
				const bmiNum = parseFloat(this.bmi);
				const fatRateNum = parseFloat(this.fatRate);

				// BMI相关建议
				if (bmiNum < 18.5) {
					advice.push('BMI偏低，建议增加优质蛋白摄入（如鸡蛋、牛奶、瘦肉），避免过度节食');
					advice.push('可适当进行力量训练（如瑜伽、弹力带训练），增加肌肉量');
				} else if (bmiNum > 24) {
					advice.push('BMI偏高，建议控制总热量摄入，减少高糖高油食物');
					advice.push('推荐低强度有氧运动（如快走、游泳），每周3-5次，每次30分钟');
				} else {
					advice.push('BMI处于健康范围，继续保持均衡饮食，确保叶酸、铁、钙等营养素摄入');
				}

				// 体脂率相关建议
				if (fatRateNum < 20) {
					advice.push('体脂率偏低，可能影响激素平衡，建议适当增加健康脂肪（如坚果、牛油果）');
				} else if (fatRateNum > 28) {
					advice.push('体脂率偏高，建议减少精制碳水（如白米饭、甜点），增加膳食纤维（如蔬菜、全谷物）');
				} else {
					advice.push('体脂率处于备孕理想范围，注意保持规律作息，避免熬夜和过度压力');
				}

				// 通用备孕建议
				advice.push('每日补充0.4mg叶酸，避免接触烟酒、化学品和辐射环境');
				this.adviceList = advice;
			},

			// 新增：获取BMI状态样式（颜色区分）
			getBMIStatusClass() {
				if (!this.bmi) return '';
				const bmiNum = parseFloat(this.bmi);
				if (bmiNum < 18.5) return 'status-low';
				if (bmiNum > 24) return 'status-high';
				return 'status-normal';
			},

			// 新增：获取BMI状态文本
			getBMIStatusText() {
				if (!this.bmi) return '';
				const bmiNum = parseFloat(this.bmi);
				if (bmiNum < 18.5) return '（偏瘦）';
				if (bmiNum >= 18.5 && bmiNum <= 24) return '（正常）';
				if (bmiNum > 24 && bmiNum <= 28) return '（超重）';
				return '（肥胖）';
			},

			// 新增：获取体脂率状态样式（颜色区分）
			getFatRateStatusClass() {
				if (!this.fatRate) return '';
				const fatRateNum = parseFloat(this.fatRate);
				if (this.genderIndex === 0) { // 女性
					if (fatRateNum < 20) return 'status-low';
					if (fatRateNum > 28) return 'status-high';
				} else { // 男性
					if (fatRateNum < 10) return 'status-low';
					if (fatRateNum > 20) return 'status-high';
				}
				return 'status-normal';
			},

			// 新增：获取体脂率状态文本
			getFatRateStatusText() {
				if (!this.fatRate) return '';
				const fatRateNum = parseFloat(this.fatRate);
				if (this.genderIndex === 0) { // 女性
					if (fatRateNum < 20) return '（偏低）';
					if (fatRateNum >= 20 && fatRateNum <= 28) return '（理想）';
					return '（偏高）';
				} else { // 男性
					if (fatRateNum < 10) return '（偏低）';
					if (fatRateNum >= 10 && fatRateNum <= 20) return '（理想）';
					return '（偏高）';
				}
			},

			// 新增：加载本地体检历史记录
			loadHealthHistory() {
				const history = uni.getStorageSync('healthHistory');
				this.healthHistory = history ? JSON.parse(history) : [];
			},

			// 新增：保存体检记录到本地缓存
			saveHealthRecord() {
				// 生成当前日期（格式：YYYY-MM-DD）
				const date = new Date().toLocaleDateString().replace(/\//g, '-');
				// 组装记录数据
				const record = {
					date,
					bmi: this.bmi,
					fatRate: this.fatRate,
					weight: this.weight,
					height: this.height,
					waist: this.waist || '--'
				};
				// 添加到历史列表（最新记录在最前面）
				this.healthHistory.unshift(record);
				// 限制历史记录数量（最多保存30条）
				if (this.healthHistory.length > 30) {
					this.healthHistory.pop();
				}
				// 保存到本地缓存
				uni.setStorageSync('healthHistory', JSON.stringify(this.healthHistory));
				// 提示保存成功
				uni.showToast({
					title: '体检记录保存成功',
					icon: 'success',
					duration: 1200
				});
			},

			// 新增：显示历史记录弹窗
			showHistory() {
				this.$refs.historyPopup.open();
			},

			// 性别选择
			changeGender(e) {
				this.genderIndex = e.detail.value;
				// 切换性别后重新计算健康数据
				this.calculateHealthData();
			},

			// 运动计划相关方法（保持不变）
			changeExerciseType(e) {
				this.exerciseTypeIndex = e.detail.value;
				this.selectedExerciseType = this.exerciseTypeList[this.exerciseTypeIndex];
				switch (this.selectedExerciseType) {
					case '跑步':
						this.exerciseTime = 30;
						this.exerciseCalorie = 240;
						this.exerciseDistance = 3;
						break;
					case '跳绳':
						this.exerciseTime = 20;
						this.exerciseCalorie = 280;
						this.exerciseDistance = '';
						break;
					case '瑜伽':
						this.exerciseTime = 45;
						this.exerciseCalorie = 180;
						this.exerciseDistance = '';
						break;
				}
			},
			startExercise() {
				uni.showToast({
					title: `开始${this.selectedExerciseType}，加油！`,
					icon: 'none',
					duration: 1500
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	.left-page-container {
		padding: 20rpx;
		background-color: #fef4ff;
		min-height: 100vh;
		box-sizing: border-box;
	}

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

	/* 心情模块 */
	.mood-record {
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

	/* 日历模块（核心优化：固定网格布局） */
	.menstrual-record {
		background-color: #fff;
		border-radius: 24rpx;
		padding: 25rpx;
		margin-bottom: 25rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
	}

	.calendar {
		display: flex;
		gap: 20rpx;
		margin-bottom: 25rpx;
	}

	.calendar-container {
		flex: 1;
		border: 2rpx solid #c199f6;
		border-radius: 18rpx;
		padding: 20rpx;
	}

	.year-month {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
		color: #666;
		font-size: 24rpx;
	}

	.year-month picker {
		color: #333;
		font-weight: 500;
	}

	.weekdays {
		display: flex;
		justify-content: space-between;
		margin-bottom: 15rpx;
		color: #999;
		font-size: 22rpx;
		text-align: center;
	}

	.weekdays text {
		width: 14.28%;
		/* 7列均分 */
	}

	/* 关键：固定6行×7列网格，确保所有日期完整展示 */
	.calendar-days {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		/* 7列均分 */
		gap: 8rpx;
	}

	.calendar-day {
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		border-radius: 12rpx;
		cursor: pointer;
	}

	/* 空白日期样式（不响应点击） */
	.empty-day {
		cursor: default;
		opacity: 0;
		/* 空白占位透明，不影响视觉 */
	}

	/* 日期状态样式 */
	.luteal-phase {
		background-color: #f0e6f5;
		color: #92646e;
	}

	.menstrual-phase {
		background-color: #ffe5e8;
		color: #e66465;
	}

	.ovulation-phase {
		background-color: #e8f4c9;
		color: #8fbc8f;
	}

	.ovulation-day {
		background-color: #d8d8ff;
		color: #6a5acd;
		font-weight: 600;
	}

	.intercourse-day {
		background-color: #ffd6d6;
		color: #ff0000;
		font-weight: 600;
	}

	.day-active {
		border: 2rpx solid #c199f6;
		font-weight: 600;
	}

	/* 日历图例 */
	.calendar-right {
		width: 180rpx;
		display: flex;
		flex-direction: column;
		gap: 18rpx;
		font-size: 22rpx;
		color: #666;
	}

	.legend-item {
		display: flex;
		align-items: center;
	}

	.legend-item::before {
		content: "";
		display: inline-block;
		width: 20rpx;
		height: 20rpx;
		border-radius: 6rpx;
		margin-right: 12rpx;
	}

	.legend-item[data-phase="luteal"]::before {
		background-color: #f0e6f5;
	}

	.legend-item[data-phase="menstrual"]::before {
		background-color: #ffe5e8;
	}

	.legend-item[data-phase="ovulation"]::before {
		background-color: #e8f4c9;
	}

	.legend-item[data-phase="ovulation-day"]::before {
		background-color: #d8d8ff;
	}

	.legend-item[data-phase="intercourse"]::before {
		background-color: #ffd6d6;
	}

	/* 小贴士 */
	.tips {
		margin-bottom: 20rpx;
	}

	.tips-text {
		font-size: 22rpx;
		color: #666;
		background-color: #f5f5f5;
		padding: 12rpx 20rpx;
		border-radius: 12rpx;
		display: block;
	}

	/* 今日状态 */
	.today-info {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 24rpx;
		color: #333;
	}

	.highlight {
		color: #c199f6;
		font-weight: 600;
		margin: 0 8rpx;
	}

	.setting-btn {
		background-color: #f0e6f5;
		color: #92646e;
		border: none;
		border-radius: 16rpx;
		padding: 8rpx 20rpx;
		font-size: 22rpx;
		font-weight: 500;
	}

	/* 健康体检 */
	.health-check {
		background-color: #fff;
		border-radius: 24rpx;
		padding: 25rpx;
		margin-bottom: 25rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
	}

	.form {
		padding-left: 63rpx;
	}

	.form-item {
		display: flex;
		align-items: center;
		margin-bottom: 25rpx;
	}

	.form-label {
		width: 100rpx;
		font-size: 24rpx;
		color: #333;
	}

	.form-item input {
		flex: 1;
		height: 60rpx;
		border: 2rpx solid #eee;
		border-radius: 12rpx;
		padding: 0 20rpx;
		font-size: 24rpx;
		color: #333;
	}

	.result {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin-bottom: 20rpx;
		font-size: 24rpx;
		color: #333;
	}

	.result-label {
		color: #666;
		margin-right: 8rpx;
	}

	.bmi-value {
		color: #8ab4f8;
		font-weight: 600;
		margin-right: 15rpx;
	}

	.health-status {
		font-weight: 600;
	}

	.status-healthy {
		color: #00b42a;
	}

	.status-unhealthy {
		color: #ff7d00;
	}

	.hint {
		font-size: 22rpx;
		color: #999;
		display: block;
	}

	/* 运动计划 */
	.exercise-plan {
		background-color: #fff;
		border-radius: 24rpx;
		padding: 25rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
	}

	.plan-info {
		padding-left: 63rpx;
	}

	.check-in-text {
		font-size: 24rpx;
		color: #ff6600;
		font-weight: 500;
		margin-bottom: 25rpx;
		display: block;
	}

	.select-type {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
		font-size: 24rpx;
	}

	.type-label {
		color: #666;
		margin-right: 15rpx;
	}

	.selected-type {
		color: #333;
		font-weight: 500;
	}

	.exercise-data {
		display: flex;
		justify-content: space-between;
		margin-bottom: 30rpx;
	}

	.data-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 30%;
	}

	.data-icon {
		width: 40rpx;
		height: 40rpx;
		border-radius: 10rpx;
		background-color: #ffe5cc;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		margin-bottom: 10rpx;
	}

	.data-label {
		font-size: 22rpx;
		color: #999;
		margin-bottom: 8rpx;
	}

	.data-value {
		font-size: 26rpx;
		color: #333;
		font-weight: 600;
	}

	.start-btn {
		width: 100%;
		height: 70rpx;
		background-color: #ff9a9e;
		color: #fff;
		border: none;
		border-radius: 16rpx;
		font-size: 26rpx;
		font-weight: 600;
	}

	.health-check .title {
		justify-content: space-between;
	}

	.history-btn {
		background-color: #e8f4c9;
		color: #8fbc8f;
		border: none;
		border-radius: 16rpx;
		padding: 6rpx 16rpx;
		font-size: 22rpx;
		font-weight: 500;
	}

	.form-item {
		display: flex;
		align-items: center;
		margin-bottom: 25rpx;
	}

	.gender-value {
		font-size: 24rpx;
		color: #333;
		margin-left: 15rpx;
	}

	.health-result {
		background-color: #fafafa;
		border-radius: 18rpx;
		padding: 25rpx;
		margin: 30rpx 0;
	}

	.result-row {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		font-size: 24rpx;
	}

	.result-label {
		width: 120rpx;
		color: #666;
	}

	.result-value {
		font-weight: 600;
		margin-right: 15rpx;
	}

	.result-desc {
		color: #999;
		font-size: 22rpx;
	}

	/* 结果状态颜色：正常绿色，偏低/偏高橙色/红色 */
	.status-normal {
		color: #00b42a;
	}

	.status-low {
		color: #ff7d00;
	}

	.status-high {
		color: #ff4d4f;
	}

	.health-advice {
		background-color: #f0f7ff;
		border-radius: 18rpx;
		padding: 25rpx;
		margin-bottom: 30rpx;
	}

	.advice-title {
		display: block;
		font-size: 26rpx;
		font-weight: 600;
		color: #3250aa;
		margin-bottom: 15rpx;
	}

	.advice-list {
		display: flex;
		flex-direction: column;
		gap: 12rpx;
	}

	.advice-item {
		font-size: 22rpx;
		color: #666;
		line-height: 1.6;
	}

	.save-btn {
		width: 100%;
		height: 70rpx;
		background-color: #8ab4f8;
		color: #fff;
		border: none;
		border-radius: 16rpx;
		font-size: 26rpx;
		font-weight: 600;
		margin-bottom: 20rpx;
	}

	.save-btn:disabled {
		background-color: #c5dffe;
		cursor: not-allowed;
	}

	/* 历史记录弹窗样式 */
	.popup-content {
		background-color: #fff;
		border-radius: 24rpx 24rpx 0 0;
		padding: 25rpx;
		min-height: 300rpx;
	}

	.popup-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 25rpx;
	}

	.popup-title {
		font-size: 28rpx;
		font-weight: 600;
		color: #333;
	}

	.popup-close {
		font-size: 32rpx;
		color: #999;
		cursor: pointer;
	}

	.history-list {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}

	.history-item {
		background-color: #fafafa;
		border-radius: 16rpx;
		padding: 20rpx;
	}

	.history-date {
		font-size: 22rpx;
		color: #999;
		margin-bottom: 10rpx;
		display: block;
	}

	.history-data {
		display: flex;
		gap: 25rpx;
		font-size: 24rpx;
		color: #333;
	}

	.empty-history {
		text-align: center;
		color: #999;
		font-size: 24rpx;
		margin-top: 100rpx;
	}
</style>