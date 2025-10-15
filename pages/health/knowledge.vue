<template>
	<view class="knowledge-page">
		<!-- 顶部导航栏：统一返回+标题样式 -->
		<view class="page-header">
			<view class="back-btn" @click="goBack">
				<text class="back-icon">←</text>
			</view>
			<text class="header-title">女性生育健康知识库</text>
			<view class="header-placeholder"></view>
		</view>

		<!-- 搜索栏：复用首页风格，增加生育关键词提示 -->
		<view class="search-bar">
			<view class="search-container">
				<image src="/static/Index/SearchingImg.png" alt="搜索图标" class="search-icon" />
				<input type="text" placeholder="搜索生育知识（如：备孕饮食、孕期护理）" class="search-input" />
				<view class="search-button" @click="handleSearch">搜索</view>
			</view>
		</view>

		<!-- 阶段分类标签：核心导航，覆盖生育全周期 -->
		<view class="stage-tabs">
			<view class="tab-item" :class="{ active: activeStage === 'prepare' }" @click="activeStage = 'prepare'">
				<text class="tab-icon">🌸</text>
				<text class="tab-text">备孕阶段</text>
			</view>
			<view class="tab-item" :class="{ active: activeStage === 'pregnancy' }" @click="activeStage = 'pregnancy'">
				<text class="tab-icon">🤰</text>
				<text class="tab-text">孕期阶段</text>
			</view>
			<view class="tab-item" :class="{ active: activeStage === 'postpartum' }"
				@click="activeStage = 'postpartum'">
				<text class="tab-icon">👩‍🍼</text>
				<text class="tab-text">产后阶段</text>
			</view>
		</view>

		<!-- 知识分类列表：按阶段切换内容 -->
		<view class="knowledge-container">
			<!-- 备孕阶段知识 -->
			<view class="knowledge-list" v-if="activeStage === 'prepare'">
				<view class="category-title">
					<text class="title-icon">📚</text>
					<text class="title-text">备孕核心知识</text>
				</view>
				<view class="knowledge-card" v-for="(item, index) in prepareKnowledge" :key="index"
					@click="goToDetail(item)">
					<image :src="item.cover" mode="aspectFill" class="card-cover" />
					<view class="card-content">
						<text class="card-title">{{ item.title }}</text>
						<text class="card-desc">{{ item.desc }}</text>
						<view class="card-meta">
							<text class="meta-view">{{ item.viewCount }} 阅读</text>
							<text class="meta-date">{{ item.date }}</text>
						</view>
					</view>
				</view>

				<view class="category-title" style="margin-top: 40rpx;">
					<text class="title-icon">💡</text>
					<text class="title-text">备孕常见问题</text>
				</view>
				<view class="faq-list">
					<view class="faq-item" v-for="(faq, index) in prepareFaq" :key="index"
						@click="showFaqAnswer(index)">
						<view class="faq-header">
							<text class="faq-question">{{ faq.question }}</text>
							<text class="faq-arrow" :class="{ active: faq.showAnswer }">▼</text>
						</view>
						<text class="faq-answer" v-if="faq.showAnswer">{{ faq.answer }}</text>
					</view>
				</view>
			</view>

			<!-- 孕期阶段知识 -->
			<view class="knowledge-list" v-else-if="activeStage === 'pregnancy'">
				<view class="category-title">
					<text class="title-icon">📚</text>
					<text class="title-text">孕期核心知识</text>
				</view>
				<view class="knowledge-card" v-for="(item, index) in pregnancyKnowledge" :key="index"
					@click="goToDetail(item)">
					<image :src="item.cover" mode="aspectFill" class="card-cover" />
					<view class="card-content">
						<text class="card-title">{{ item.title }}</text>
						<text class="card-desc">{{ item.desc }}</text>
						<view class="card-meta">
							<text class="meta-view">{{ item.viewCount }} 阅读</text>
							<text class="meta-date">{{ item.date }}</text>
						</view>
					</view>
				</view>

				<view class="category-title" style="margin-top: 40rpx;">
					<text class="title-icon">💡</text>
					<text class="title-text">孕期常见问题</text>
				</view>
				<view class="faq-list">
					<view class="faq-item" v-for="(faq, index) in pregnancyFaq" :key="index"
						@click="showFaqAnswer(index, 'pregnancy')">
						<view class="faq-header">
							<text class="faq-question">{{ faq.question }}</text>
							<text class="faq-arrow" :class="{ active: faq.showAnswer }">▼</text>
						</view>
						<text class="faq-answer" v-if="faq.showAnswer">{{ faq.answer }}</text>
					</view>
				</view>
			</view>

			<!-- 产后阶段知识 -->
			<view class="knowledge-list" v-else-if="activeStage === 'postpartum'">
				<view class="category-title">
					<text class="title-icon">📚</text>
					<text class="title-text">产后核心知识</text>
				</view>
				<view class="knowledge-card" v-for="(item, index) in postpartumKnowledge" :key="index"
					@click="goToDetail(item)">
					<image :src="item.cover" mode="aspectFill" class="card-cover" />
					<view class="card-content">
						<text class="card-title">{{ item.title }}</text>
						<text class="card-desc">{{ item.desc }}</text>
						<view class="card-meta">
							<text class="meta-view">{{ item.viewCount }} 阅读</text>
							<text class="meta-date">{{ item.date }}</text>
						</view>
					</view>
				</view>

				<view class="category-title" style="margin-top: 40rpx;">
					<text class="title-icon">💡</text>
					<text class="title-text">产后常见问题</text>
				</view>
				<view class="faq-list">
					<view class="faq-item" v-for="(faq, index) in postpartumFaq" :key="index"
						@click="showFaqAnswer(index, 'postpartum')">
						<view class="faq-header">
							<text class="faq-question">{{ faq.question }}</text>
							<text class="faq-arrow" :class="{ active: faq.showAnswer }">▼</text>
						</view>
						<text class="faq-answer" v-if="faq.showAnswer">{{ faq.answer }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部信息栏：增加主题相关提示 -->
		<view class="bottom-bar">
			<text class="bottom-text">专业生育健康知识，助力母婴安全</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'FertilityKnowledgePage',
		data() {
			return {
				// 当前激活的阶段
				activeStage: 'prepare',
				// 备孕阶段知识数据
				prepareKnowledge: [{
						title: '备孕前3个月必做的5项检查',
						desc: '全面了解备孕检查项目，排查健康隐患，为优质受孕做准备',
						cover: 'https://picsum.photos/200/140?random=10',
						viewCount: '2.3万',
						date: '2024-03-15'
					},
					{
						title: '备孕饮食黄金搭配：补充叶酸的正确方式',
						desc: '不止叶酸！备孕期间蛋白质、维生素的科学摄入方案',
						cover: 'https://picsum.photos/200/140?random=11',
						viewCount: '1.8万',
						date: '2024-02-28'
					},
					{
						title: '备孕期间如何调整作息：远离这些不良习惯',
						desc: '熬夜、久坐、压力大对备孕的影响及改善方法',
						cover: 'https://picsum.photos/200/140?random=12',
						viewCount: '1.5万',
						date: '2024-01-20'
					}
				],
				// 备孕常见问题
				prepareFaq: [{
						question: '备孕多久没成功需要去医院检查？',
						answer: '一般情况下，若夫妻双方无避孕措施、规律性生活，年轻夫妻（25-30岁）超过1年未受孕，30岁以上夫妻超过6个月未受孕，建议到医院进行生育相关检查，排查是否存在排卵异常、输卵管堵塞、精子质量等问题。',
						showAnswer: false
					},
					{
						question: '男性备孕需要补充哪些营养？',
						answer: '男性备孕需重点补充锌、硒、维生素E和蛋白质：锌可提升精子活力（多吃牡蛎、瘦肉），硒能减少精子畸形率（多吃坚果、深海鱼），维生素E保护精子细胞膜（多吃菠菜、杏仁），同时避免烟酒、高温环境（如蒸桑拿）影响精子质量。',
						showAnswer: false
					}
				],
				// 孕期阶段知识
				pregnancyKnowledge: [{
						title: '孕期40周产检时间表：每个阶段重点项目',
						desc: '详解孕早期、中期、晚期必做产检，提前了解检查目的和注意事项',
						cover: 'https://picsum.photos/200/140?random=20',
						viewCount: '3.5万',
						date: '2024-03-20'
					},
					{
						title: '孕期水肿缓解指南：3个简单有效方法',
						desc: '区分生理性与病理性水肿，通过饮食、姿势、运动改善孕期水肿',
						cover: 'https://picsum.photos/200/140?random=21',
						viewCount: '2.7万',
						date: '2024-02-15'
					}
				],
				// 孕期常见问题
				pregnancyFaq: [{
					question: '孕期可以吃火锅、烧烤吗？',
					answer: '孕期可少量食用，但需注意：1. 确保食材完全煮熟（避免寄生虫、细菌感染）；2. 避免辛辣刺激锅底（减少便秘、痔疮风险）；3. 控制频率（每月1-2次为宜），避免高油高盐饮食影响孕期健康，同时避免食用生鱼片、未熟透的肉类等高危食物。',
					showAnswer: false
				}],
				// 产后阶段知识
				postpartumKnowledge: [{
						title: '产后恶露排净时间表：正常vs异常判断',
						desc: '详解恶露不同阶段变化，教你识别异常情况（如持续出血、异味）',
						cover: 'https://picsum.photos/200/140?random=30',
						viewCount: '4.2万',
						date: '2024-03-10'
					},
					{
						title: '产后盆底肌修复：黄金期与训练方法',
						desc: '产后42天-6个月是修复关键期，3个在家就能做的凯格尔运动教程',
						cover: 'https://picsum.photos/200/140?random=31',
						viewCount: '3.8万',
						date: '2024-02-05'
					}
				],
				// 产后常见问题
				postpartumFaq: [{
					question: '产后多久可以开始运动？',
					answer: '需根据分娩方式和恢复情况判断：1. 顺产无撕裂/侧切：产后1-2周可做简单散步、腹式呼吸；2. 顺产有撕裂/侧切：伤口愈合后（约2-3周）再开始轻度运动；3. 剖腹产：产后4-6周，伤口完全愈合后，从散步、产后瑜伽等低强度运动开始，避免过早做腹部用力、跳跃等运动，防止腹压过高影响恢复。',
					showAnswer: false
				}]
			};
		},
		methods: {
			// 返回上一页
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 搜索功能
			handleSearch() {
				uni.showToast({
					title: '搜索功能待开启',
					icon: 'none'
				});
			},
			// 跳转知识详情页
			goToDetail(item) {
				uni.showToast({
					title: `查看《${item.title}》详情`,
					icon: 'none'
				});
				// 实际项目中可添加跳转逻辑：
				// uni.navigateTo({ url: `/pages/knowledge/detail?title=${item.title}` });
			},
			// 显示/隐藏FAQ答案
			showFaqAnswer(index, stage = 'prepare') {
				switch (stage) {
					case 'prepare':
						this.prepareFaq[index].showAnswer = !this.prepareFaq[index].showAnswer;
						break;
					case 'pregnancy':
						this.pregnancyFaq[index].showAnswer = !this.pregnancyFaq[index].showAnswer;
						break;
					case 'postpartum':
						this.postpartumFaq[index].showAnswer = !this.postpartumFaq[index].showAnswer;
						break;
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	/* 页面全局样式：延续首页柔和渐变 */
	.knowledge-page {
		background: linear-gradient(180deg, #FDF7D5 0%, #F9F5F0 100%);
		min-height: 100vh;
		padding: 0 24rpx 60rpx;
		box-sizing: border-box;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
	}

	/* 顶部导航栏：统一风格 */
	.page-header {
		display: flex;
		align-items: center;
		height: 90rpx;
		margin-bottom: 20rpx;
	}

	.back-btn {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		background-color: #F9DFEF;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.back-icon {
		font-size: 32rpx;
		color: #F3B7B6;
		font-weight: bold;
	}

	.header-title {
		flex: 1;
		text-align: center;
		font-size: 32rpx;
		color: #333;
		font-weight: 600;
	}

	.header-placeholder {
		width: 60rpx;
	}

	/* 搜索栏：复用首页样式，适配主题 */
	.search-bar {
		margin-bottom: 30rpx;
	}

	.search-container {
		display: flex;
		align-items: center;
		background-color: #fff;
		border-radius: 60rpx;
		padding: 0 30rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
		height: 72rpx;
	}

	.search-icon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}

	.search-input {
		flex: 1;
		border: none;
		outline: none;
		font-size: 24rpx;
		color: #333;
		height: 100%;
	}

	.search-button {
		width: 140rpx;
		height: 56rpx;
		background-color: #F3B7B6;
		color: #fff;
		border-radius: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		font-weight: 500;
	}

	/* 阶段分类标签：核心导航，突出当前阶段 */
	.stage-tabs {
		display: flex;
		gap: 15rpx;
		margin-bottom: 35rpx;
		overflow-x: auto;
		padding-bottom: 10rpx;
	}

	.tab-item {
		min-width: 220rpx;
		height: 70rpx;
		border-radius: 35rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
		cursor: pointer;
		transition: all 0.2s;
	}

	.tab-item.active {
		background-color: #F2DDFF;
		color: #9966CC;
		box-shadow: 0 4rpx 12rpx rgba(153, 102, 204, 0.15);
	}

	.tab-icon {
		font-size: 28rpx;
	}

	.tab-text {
		font-size: 26rpx;
		font-weight: 500;
	}

	/* 知识容器：统一布局 */
	.knowledge-container {
		margin-bottom: 40rpx;
	}

	/* 分类标题：区分知识类型 */
	.category-title {
		display: flex;
		align-items: center;
		margin-bottom: 25rpx;
	}

	.title-icon {
		font-size: 28rpx;
		color: #F3B7B6;
		margin-right: 15rpx;
	}

	.title-text {
		font-size: 26rpx;
		color: #333;
		font-weight: 600;
	}

	/* 知识卡片：图文结合，突出重点 */
	.knowledge-list {
		display: flex;
		flex-direction: column;
		gap: 25rpx;
	}

	.knowledge-card {
		display: flex;
		gap: 20rpx;
		background-color: #fff;
		border-radius: 24rpx;
		overflow: hidden;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
		padding: 20rpx;
		transition: all 0.2s;
	}

	.knowledge-card:active {
		transform: scale(0.98);
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.03);
	}

	.card-cover {
		width: 160rpx;
		height: 120rpx;
		border-radius: 16rpx;
		object-fit: cover;
	}

	.card-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.card-title {
		font-size: 26rpx;
		color: #333;
		font-weight: 500;
		margin-bottom: 8rpx;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card-desc {
		font-size: 22rpx;
		color: #666;
		line-height: 1.5;
		margin-bottom: 12rpx;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card-meta {
		display: flex;
		justify-content: space-between;
		font-size: 20rpx;
		color: #999;
	}

	/* 常见问题：折叠面板样式 */
	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 15rpx;
	}

	.faq-item {
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
		overflow: hidden;
	}

	.faq-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 22rpx 25rpx;
		cursor: pointer;
	}

	.faq-question {
		font-size: 24rpx;
		color: #333;
		flex: 1;
		margin-right: 20rpx;
	}

	.faq-arrow {
		font-size: 20rpx;
		color: #999;
		transition: transform 0.3s;
	}

	.faq-arrow.active {
		transform: rotate(180deg);
		color: #F3B7B6;
	}

	.faq-answer {
		font-size: 22rpx;
		color: #666;
		line-height: 1.6;
		padding: 0 25rpx 22rpx;
		border-top: 2rpx solid #F5F5F5;
	}

	/* 底部信息栏：统一风格 */
	.bottom-bar {
		width: 100%;
		height: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20rpx;
	}

	.bottom-text {
		font-size: 22rpx;
		color: #999;
		letter-spacing: 1rpx;
	}

	/* 小屏适配：保证内容不溢出 */
	@media (max-width: 320px) {
		.tab-item {
			min-width: 180rpx;
		}

		.card-cover {
			width: 140rpx;
			height: 100rpx;
		}

		.card-title {
			font-size: 24rpx;
		}
	}
</style>