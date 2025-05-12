<template>
	<view class="left-page-container">
		<!-- 今日份心情 -->
		<view class="mood-record">
			<view class="title">
				<image class="icon" src="/static/healthPrepare/icon1.png"></image>
				<div class="text">
					<image src="/static/healthPrepare/text1.png"></image>
				</div>
				<div class="pregnancy-status-box">
					备孕
				</div>
			</view>
			<view class="emoji-list">
				<text class="emoji" @click="setMood('😀')">😀</text>
				<text class="emoji" @click="setMood('😊')">😊</text>
				<text class="emoji" @click="setMood('😕')">😕</text>
				<text class="emoji" @click="setMood('😟')">😟</text>
				<text class="emoji" @click="setMood('😡')">😡</text>
				<text class="emoji" @click="setMood('😭')">😭</text>
			</view>
		</view>
		<!-- 经期记录 -->
		<view class="menstrual-record">
			<view class="title">
				<image class="icon" src="/static/healthPrepare/icon2.png"></image>
				<div class="text">
					<image src="/static/healthPrepare/text2.png"></image>
				</div>
			</view>
			<view class="calendar">
				<view class="calendar-container">
					<view class="year-month">
						<picker @change="changeYear" :value="selectedYear" :range="yearList">
							<text>{{ selectedYear }} 年 ▼</text>
						</picker>
						<picker @change="changeMonth" :value="selectedMonth" :range="monthList" class="month">
							<text>{{ selectedMonth }} 月 ➤</text>
						</picker>
					</view>
					<view class="weekdays">
						<text>日</text><text>一</text><text>二</text><text>三</text><text>四</text><text>五</text><text>六</text>
					</view>
					<view class="calendar-days">
						<view v-for="(day, index) in daysInMonth" :key="index" class="calendar-day" :class="{
				  'luteal-phase': day.phase === 'luteal',
				  'menstrual-phase': day.phase ==='menstrual',
				  'ovulation-phase': day.phase === 'ovulation',
				  'ovulation-day': day.phase === 'ovulation-day',
				  'intercourse-day': day.phase === 'intercourse'
				}" @click="selectDay(day)">
							<text>{{ day.date }}</text>
						</view>
					</view>
				</view>
				<view class="calendar-right">
					<span class="legend-item" data-color="brown">黄体期</span>
					<span class="legend-item" data-color="pink">月经期</span>
					<span class="legend-item" data-color="lightgray">排卵期</span>
					<span class="legend-item" data-color="plum">排卵日</span>
					<span class="legend-item" data-color="red">同房日</span>
				</view>
			</view>
			<view class="tips">
				<image class="icon" src="/static/healthPrepare/icon3.png"></image>
				<div class="text">
					<image src="/static/healthPrepare/text3.png"></image>
				</div>
			</view>
			<view class="today-info">
				<text style="margin-right: 5rpx;">今日是</text>
				<text class="highlight">{{ currentPhase }}</text>
				<button class="setting-btn">经期设置 ➤</button>
			</view>
		</view>
		<!-- 健康体检 -->
		<view class="health-check">
			<view class="title">
				<image class="icon" src="/static/health-icon.png"></image>
				<text>健康体检</text>
			</view>
			<view class="form">
				<view class="form-item">
					<text>体重:</text>
					<input type="number" v-model="weight" placeholder="kg" />
				</view>
				<view class="form-item">
					<text>身高:</text>
					<input type="number" v-model="height" placeholder="cm" />
				</view>
				<view class="result">
					<text>您的MBI值为</text>
					<text>{{ bmi }}</text>
					<text>是否健康</text>
					<text>{{ isHealthy }}</text>
				</view>
				<text class="hint">备孕女性健康MBI:18.5 - 24kg/m²</text>
			</view>
		</view>
		<!-- 运动计划 -->
		<view class="exercise-plan">
			<view class="title">
				<image class="icon" src="/static/sport-icon.png"></image>
				<text>运动计划</text>
			</view>
			<view class="plan-info">
				<text>已连续打卡 1 天</text>
				<view class="select-type">
					<text>选择运动类型</text>
					<picker @change="changeExerciseType" :value="selectedExerciseType" :range="exerciseTypeList">
						<text>{{ selectedExerciseType }}</text>
					</picker>
				</view>
				<view class="exercise-data">
					<view class="data-item">
						<image class="icon" src="/static/time-icon.png"></image>
						<text>时长(分钟)</text>
						<text>{{ exerciseTime }}</text>
					</view>
					<view class="data-item">
						<image class="icon" src="/static/calorie-icon.png"></image>
						<text>消耗(千卡)</text>
						<text>{{ exerciseCalorie }}</text>
					</view>
					<view class="data-item">
						<image class="icon" src="/static/distance-icon.png"></image>
						<text>距离(公里)</text>
						<text>{{ exerciseDistance }}</text>
					</view>
				</view>
				<button class="start-btn">开始</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectedYear: 2025,
				selectedMonth: 4,
				yearList: [],
				monthList: Array.from({
					length: 12
				}, (_, i) => i + 1),
				daysInMonth: [],
				currentPhase: '',
				weight: '',
				height: '',
				bmi: '',
				isHealthy: '',
				selectedExerciseType: '跑步',
				exerciseTypeList: ['跑步', '跳绳', '瑜伽'],
				exerciseTime: 0,
				exerciseCalorie: 0,
				exerciseDistance: 0
			};
		},
		onLoad() {
			// 初始化年份列表
			const currentYear = new Date().getFullYear();
			for (let i = currentYear - 10; i <= currentYear + 10; i++) {
				this.yearList.push(i);
			}
			this.generateCalendar();
		},
		methods: {
			setMood(mood) {
				this.mood = mood;
			},
			changeYear(e) {
				this.selectedYear = e.target.value;
				this.generateCalendar();
			},
			changeMonth(e) {
				this.selectedMonth = e.target.value;
				this.generateCalendar();
			},
			generateCalendar() {
				const daysInMonth = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
				const firstDay = new Date(this.selectedYear, this.selectedMonth - 1, 1).getDay();
				const calendarDays = [];
				let dayIndex = 0;
				for (let i = 0; i < firstDay; i++) {
					calendarDays.push({});
				}
				for (let i = 1; i <= daysInMonth; i++) {
					calendarDays.push({
						date: i,
						phase: this.getPhase(i)
					});
				}
				this.daysInMonth = calendarDays;
			},
			getPhase(day) {
				if (day >= 1 && day <= 5) return 'luteal';
				if (day >= 6 && day <= 10) return 'menstrual';
				if (day >= 11 && day <= 15) return 'ovulation';
				if (day === 17) return 'ovulation-day';
				if (day === 20) return 'intercourse';
				return '';
			},
			selectDay(day) {
				this.currentPhase = day.phase;
			},
			calculateBMI() {
				if (this.weight && this.height) {
					const bmi = (this.weight / ((this.height / 100) ** 2)).toFixed(2);
					this.bmi = bmi;
					if (bmi >= 18.5 && bmi <= 24) {
						this.isHealthy = '是';
					} else {
						this.isHealthy = '否';
					}
				}
			},
			changeExerciseType(e) {
				this.selectedExerciseType = e.target.value;
			}
		}
	};
</script>

<style scoped lang="scss">
	.left-page-container {
		padding: 20rpx;
		background-color: #fcf0ff;
	}

	.mood-record {
		margin-bottom: 20rpx;
		border-bottom: 1px solid #ccc;
		padding-bottom: 20rpx;

		.title {
			display: flex;
			align-items: center;
			margin-bottom: 10rpx;
			position: relative;

			.icon {
				width: 60rpx;
				height: 60rpx;
			}

			.text {
				width: 200rpx;
				height: 43rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.pregnancy-status-box {
				position: absolute;
				right: 0;
			}
		}

		.emoji-list {
			display: flex;
			justify-content: space-between;
			margin-top: 10rpx;

			.emoji {
				font-size: 40rpx;
			}
		}
	}

	.menstrual-record {
		margin-bottom: 20rpx;
		border-bottom: 1px solid #ccc;
		padding-bottom: 20rpx;

		.title {
			display: flex;
			align-items: center;
			margin-bottom: 10rpx;

			.icon {
				width: 60rpx;
				height: 60rpx;
			}

			.text {
				width: 155rpx;
				height: 43rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.calendar {
			display: flex;
			align-items: center;
		}

		.calendar-container {
			border: 4rpx solid #C7909C;
			border-radius: 20rpx;
			padding: 10rpx;
			width: 85%;
			padding-right: 27rpx;

			.year-month {
				display: flex;
				color: #92646E;
				font-size: 25rpx;
				margin-bottom: 10rpx;
				position: relative;

				.month {
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
				}
			}

			.weekdays {
				display: flex;
				justify-content: space-between;
				margin-bottom: 10rpx;
				margin-left: 27rpx;
				margin-right: 10rpx;
			}

			.calendar-days {
				display: flex;
				flex-wrap: wrap;
			}

			.calendar-day {
				width: 55rpx;
				height: 55rpx;
				margin-left: 25rpx;
				margin-bottom: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 24rpx;
				border-radius: 50%;

				&.luteal-phase {
					background-color: #92646E;
				}

				&.menstrual-phase {
					background-color: #F7D6F8;
				}

				&.ovulation-phase {
					background-color: #e3fe5c;
				}

				&.ovulation-day {
					background-color: #B8B7FF;
				}

				&.intercourse-day {
					background-color: #FF0000;
				}
			}
		}

		.calendar-right {
			width: 15%;
			padding-left: 10rpx;
			display: flex;
			flex-direction: column;
			gap: 10rpx;
			font-size: 24rpx;

			.legend-item::before {
				content: "";
				display: inline-block;
				width: 18rpx;
				height: 18rpx;
				margin-right: 5rpx;
				border-radius: 50%;
			}

			.legend-item[data-color="brown"]::before {
				background-color: #92646E;
			}

			.legend-item[data-color="pink"]::before {
				background-color: #F7D6F8;
			}

			.legend-item[data-color="lightgray"]::before {
				background-color: #e3fe5c;
			}

			.legend-item[data-color="plum"]::before {
				background-color: #B8B7FF;
			}

			.legend-item[data-color="red"]::before {
				background-color: #FF0000;
			}
		}

		.tips {
			display: flex;
			align-items: center;
			margin-top: 10rpx;

			.icon {
				width: 90rpx;
				height: 120rpx;
				margin-right: 10rpx;
				transform: translate(25rpx, -50rpx);
			}

			.text {
				box-sizing: content-box;
				width: 350rpx;
				height: 40rpx;
				transform: translate(40rpx, -20rpx);
				background-color: #fff;
				padding: 10rpx;
				border-radius: 100rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.today-info {
			display: flex;
			position: relative;
			align-items: center;
			
			text{
				color: #92646E;
			}

			.highlight {
				font-weight: 800;
				text-decoration: underline;
				margin-left: 5rpx;
			}

			.setting-btn {
				position: absolute;
				right: 0;
				background-color: #CFF8FF;
				width: 170rpx;
				text-align: center;
				height: 45rpx;
				line-height: 35rpx;
				font-size: 26rpx;
				padding: 5rpx;
				outline: 0;
				border-radius: 20rpx;
				color: #000000;
				border: 3rpx solid #92646E;
			}
		}
	}

	.health-check {
		margin-bottom: 20rpx;
		border-bottom: 1px solid #ccc;
		padding-bottom: 20rpx;

		.title {
			display: flex;
			align-items: center;
			margin-bottom: 10rpx;

			.icon {
				width: 40rpx;
				height: 40rpx;
				margin-right: 10rpx;
			}
		}

		.form {
			.form-item {
				display: flex;
				align-items: center;
				margin-bottom: 10rpx;

				text {
					width: 80rpx;
				}

				input {
					width: 200rpx;
					height: 40rpx;
					border: 1px solid #ccc;
					border-radius: 5rpx;
					padding: 0 10rpx;
				}
			}

			.result {
				display: flex;
				align-items: center;
				margin-bottom: 10rpx;
			}

			.hint {
				color: #999;
				font-size: 24rpx;
			}
		}
	}

	.exercise-plan {
		.title {
			display: flex;
			align-items: center;
			margin-bottom: 10rpx;

			.icon {
				width: 40rpx;
				height: 40rpx;
				margin-right: 10rpx;
			}
		}

		.plan-info {
			border: 1px solid #ccc;
			padding: 10rpx;
			background-color: #f0f0ff;

			.select-type {
				display: flex;
				align-items: center;
				margin-bottom: 10rpx;
			}

			.exercise-data {
				display: flex;
				justify-content: space-around;
				margin-bottom: 10rpx;

				.data-item {
					display: flex;
					flex-direction: column;
					align-items: center;

					.icon {
						width: 30rpx;
						height: 30rpx;
						margin-bottom: 5rpx;
					}
				}
			}

			.start-btn {
				background-color: #f0f0ff;
				border: 1px solid #ccc;
				padding: 5rpx 10rpx;
				border-radius: 5rpx;
				color: #999;
			}
		}
	}
</style>