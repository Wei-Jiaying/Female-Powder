<template>
	<div class="ai-chat-page">
		<!-- 背景区域 -->
		<div class="bg">
			<div class="bgImg"></div>
		</div>

		<!-- 机器人与标题区域 -->
		<div class="ai-robot-box">
			<div :class="{ 'robot-title': true, 'fade': isFading }">{{ currentTitle }}</div>
			<image @click="handleRobotClick" src="/static/AI/AIRobot.png" mode="aspectFit" class="robot-img"></image>
		</div>

		<!-- 聊天主区域 -->
		<div class="chatting-box">
			<!-- 猜你想问 -->
			<div class="guess-your-asking">
				<div class="guess-title">
					<div class="guess-title-left">
						<image class="guess-icon icon1" src="/static/AI/icon1.png" mode="aspectFit"></image>
						<div class="guess-title-text">猜你想问</div>
					</div>
					<div class="guess-title-right" @click="changeGuessAsking">
						<image class="guess-icon icon2" src="/static/AI/icon2.png" mode="aspectFit"></image>
						<div class="guess-change-text">换一批</div>
					</div>
				</div>
				<div v-for="(question, index) in guessedQuestions[currentGuessedIndex]" :key="`guess-${index}`"
					class="guess-question" @click="handleGuessQuestionClick(question)">
					<span class="question-circle"></span>
					<div class="question-text">{{ question }}</div>
				</div>
			</div>

			<!-- 聊天记录 -->
			<div class="chatting-container">
				<div v-for="(item, index) in getCombinedChats" :key="`chat-${index}-${item.type}`" class="chat-item">
					<div v-if="item.type === 'question'" class="chat-container question-container">
						<div class="chat-bubble question-bubble">{{ item.content }}</div>
					</div>
					<div v-else class="chat-container answer-container">
						<div class="chat-bubble answer-bubble">{{ item.content }}</div>
					</div>
				</div>
			</div>

			<!-- 发送区域 -->
			<div class="sending-container">
				<image src="/static/AI/rabbit.png" mode="aspectFit" class="rabbit-image"></image>
				<div class="input-container">
					<input v-model="inputQuestion" type="text" placeholder="有问题尽管问我哦" class="chat-input"
						@confirm="sendQuestion">
					<image @click="sendQuestion" src="/static/AI/icon6.png" mode="aspectFit" class="send-icon"></image>
				</div>
				<div class="upload-options">
					<div class="upload-item" @click="handleUpload('image')">
						<image src="/static/AI/icon3.png" mode="aspectFit" class="upload-icon"></image>
						<div class="upload-text">上传图片</div>
					</div>
					<div class="upload-item" @click="handleUpload('camera')">
						<image src="/static/AI/icon4.png" mode="aspectFit" class="upload-icon"></image>
						<div class="upload-text">拍照上传</div>
					</div>
					<div class="upload-item" @click="handleUpload('file')">
						<image src="/static/AI/icon5.png" mode="aspectFit" class="upload-icon"></image>
						<div class="upload-text">上传文件</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'AIChatPage',
		data() {
			return {
				// 机器人标题相关
				robotTitle: ['AI帮您解惑~', '随时为您服务！', '一起探索知识吧！', '有问题尽管问！'],
				currentTitleIndex: 0,
				currentTitle: 'AI帮您解惑~',
				isFading: false,
				intervalId: null,

				// 猜你想问相关
				guessedQuestions: [
					[
						'备孕前需要做哪些检查？',
						'孕期如何补充叶酸？',
						'孕早期孕吐严重怎么办？'
					],
					[
						'新生儿多久喂一次奶？',
						'宝宝黄疸怎么护理？',
						'产后多久可以恢复运动？'
					],
					[
						'哺乳期饮食有哪些禁忌？',
						'宝宝湿疹怎么处理？',
						'孕期可以吃海鲜吗？'
					]
				],
				currentGuessedIndex: 0,

				// 聊天记录相关
				questions: [], // 用户问题
				answers: [], // AI回答
				inputQuestion: '' // 输入框内容
			};
		},
		computed: {
			// 合并聊天记录（保证一问一答顺序）
			getCombinedChats() {
				const combined = [];
				const maxLen = Math.max(this.questions.length, this.answers.length);

				for (let i = 0; i < maxLen; i++) {
					// 先添加用户问题（存在才添加）
					if (this.questions[i]) {
						combined.push({
							type: 'question',
							content: this.questions[i]
						});
					}
					// 再添加AI回答（存在才添加）
					if (this.answers[i]) {
						combined.push({
							type: 'answer',
							content: this.answers[i]
						});
					}
				}
				return combined;
			}
		},
		mounted() {
			// 初始化：启动标题轮播、加载初始猜你想问列表
			this.startTitleInterval();
			this.questions = [...this.guessedQuestions[this.currentGuessedIndex]];
		},
		beforeDestroy() {
			// 销毁前清除定时器，避免内存泄漏
			if (this.intervalId) {
				clearInterval(this.intervalId);
				this.intervalId = null;
			}
		},
		methods: {
			// 返回上一页
			goBack() {
				uni.navigateBack({
					delta: 1,
					fail: (err) => {
						console.error('返回上一页失败:', err);
						// 失败时兜底：返回首页
						uni.redirectTo({
							url: '/pages/index/index'
						});
					}
				});
			},

			// 查看历史记录（待实现）
			getHistory() {
				console.log('查看历史记录');
				uni.showToast({
					title: '历史记录功能待实现',
					icon: 'none',
					duration: 1500
				});
			},

			// 点击机器人切换标题
			handleRobotClick() {
				// 清除现有定时器
				if (this.intervalId) {
					clearInterval(this.intervalId);
					this.intervalId = null;
				}
				// 执行渐变切换
				this.isFading = true;
				setTimeout(() => {
					this.changeRobotTitle();
					this.isFading = false;
					// 重新启动定时器
					this.startTitleInterval();
				}, 300);
			},

			// 切换机器人标题
			changeRobotTitle() {
				this.currentTitleIndex = (this.currentTitleIndex + 1) % this.robotTitle.length;
				this.currentTitle = this.robotTitle[this.currentTitleIndex];
			},

			// 启动标题轮播定时器
			startTitleInterval() {
				this.intervalId = setInterval(() => {
					this.isFading = true;
					setTimeout(() => {
						this.changeRobotTitle();
						this.isFading = false;
					}, 300);
				}, 5000); // 5秒切换一次，避免过快
			},

			// 切换猜你想问列表
			changeGuessAsking() {
				this.currentGuessedIndex = (this.currentGuessedIndex + 1) % this.guessedQuestions.length;
				this.questions = [...this.guessedQuestions[this.currentGuessedIndex]];
			},

			// 点击猜你想问的问题，自动发送
			handleGuessQuestionClick(question) {
				this.inputQuestion = question;
				this.sendQuestion();
			},

			// 发送问题
			sendQuestion() {
				const question = this.inputQuestion.trim();
				// 避免空内容发送
				if (!question) return;

				// 添加用户问题到聊天记录
				this.questions.push(question);
				this.inputQuestion = '';

				// 模拟AI思考（800ms延迟），实际项目替换为API调用
				setTimeout(() => {
					const aiAnswer = `已收到你的问题：「${question}」\n（实际场景中，此处会替换为AI接口返回的真实回答）`;
					this.answers.push(aiAnswer);
					// 滚动到最新聊天记录
					this.scrollToChatBottom();
				}, 800);
			},

			// 滚动到最新聊天记录
			scrollToChatBottom() {
				this.$nextTick(() => {
					// 1. 创建查询实例并绑定当前页面
					const query = uni.createSelectorQuery().in(this);

					// 2. 先获取最后一条聊天记录的位置信息
					query.select('.chat-item:last-child').boundingClientRect(rect => {
						if (rect) {
							// 3. 选中视口（滚动容器），调用 scrollIntoView 滚动到目标元素
							query.selectViewport().scrollIntoView({
								// 目标元素的选择器（最后一条聊天记录）
								selector: '.chat-item:last-child',
								// 滚动行为：平滑滚动
								duration: 300
							});
						}
					}).exec(); // 执行查询
				});
			},
			// 处理上传操作（待实现）
			handleUpload(type) {
				const typeMap = {
					image: '图片',
					camera: '拍照',
					file: '文件'
				};
				uni.showToast({
					title: `${typeMap[type]}上传功能待实现`,
					icon: 'none',
					duration: 1500
				});
			}
		}
	};
</script>

<style lang="scss">
	/* 全局样式重置与基础设置 */
	.ai-chat-page {
		width: 100vw;
		min-height: 100vh;
		box-sizing: border-box;
		overflow-x: hidden;
	}

	/* 背景样式 */
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		z-index: -1;
	}

	.bgImg {
		position: absolute;
		top: 0;
		left: 0;
		width: 160%;
		height: 70%;
		border-radius: 0 0 100% 0;
		background: linear-gradient(110.06deg, #FEFDF0 1.6%, #C5DFFE 72.87%, #E8D4FF 92.97%);
		transform-origin: top left;
	}

	/* 标题栏样式 */
	.ai-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 30rpx;
		position: relative;
		z-index: 1;
	}

	.title-section {
		width: 33.33%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.left-section {
		justify-content: flex-start;
	}

	.right-section {
		justify-content: flex-end;
	}

	.title-icon {
		max-height: 60rpx;
		max-width: 100%;
	}

	.left-icon {
		margin-left: 10rpx;
	}

	.right-icon {
		margin-right: 10rpx;
	}

	/* 机器人区域样式 */
	.ai-robot-box {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		width: 100%;
		height: 200rpx;
		margin: 10rpx 0;
		z-index: 1;
	}

	.robot-title {
		color: #333;
		font-size: 50rpx;
		font-weight: 500;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		opacity: 1;
		transition: opacity 0.3s ease;
	}

	.fade {
		opacity: 0;
	}

	.robot-img {
		width: 120rpx;
		height: 120rpx;
		object-fit: contain;
		position: absolute;
		right: 60rpx;
		transform: scaleX(-1);
		transition: transform 0.2s ease;
		cursor: pointer;
	}

	.robot-img:active {
		transform: scaleX(-1.05) scaleY(1.05);
	}

	/* 聊天主区域样式 */
	.chatting-box {
		position: relative;
		width: 100%;
		padding: 0 20rpx 30rpx;
		box-sizing: border-box;
	}

	/* 猜你想问样式 */
	.guess-your-asking {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 25rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
	}

	.guess-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin-bottom: 20rpx;
	}

	.guess-title-left,
	.guess-title-right {
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	.guess-icon {
		width: 30rpx;
		height: 30rpx;
		margin: 0 10rpx;
	}

	.guess-title-text {
		color: #3250AA;
		font-size: 30rpx;
		font-weight: 500;
	}

	.guess-change-text {
		font-size: 30rpx;
		color: #666;
	}

	.guess-question {
		display: flex;
		align-items: center;
		margin-bottom: 18rpx;
		padding: 12rpx 0;
		color: #333;
		cursor: pointer;
		transition: color 0.2s ease;
	}

	.guess-question:hover {
		color: #3250AA;
	}

	.question-circle {
		width: 12rpx;
		height: 12rpx;
		background-color: #3250AA;
		border-radius: 50%;
		margin-right: 15rpx;
	}

	.question-text {
		font-size: 26rpx;
	}

	/* 聊天记录样式 */
	.chatting-container {
		height: 400rpx;
		/* 固定高度，可根据需求调整 */
		overflow-y: auto;
		padding: 15rpx;
		margin-bottom: 20rpx;
		box-sizing: border-box;
	}

	.chat-item {
		width: 100%;
		margin-bottom: 20rpx;
	}

	.chat-container {
		display: flex;
		width: 100%;
	}

	.question-container {
		justify-content: flex-end;
	}

	.answer-container {
		justify-content: flex-start;
	}

	.chat-bubble {
		max-width: 80%;
		padding: 20rpx 25rpx;
		border-radius: 20rpx;
		font-size: 28rpx;
		line-height: 1.5;
		word-wrap: break-word;
	}

	.question-bubble {
		background-color: #C5DFFE;
		border-top-right-radius: 5rpx;
		color: #333;
	}

	.answer-bubble {
		background-color: #E8D4FF;
		border-top-left-radius: 5rpx;
		color: #333;
	}

	/* 发送区域样式 */
	.sending-container {
		display: flex;
		flex-direction: column;
		box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.05);
		padding-top: 20rpx;
		background-color: #fff;
		border-radius: 30rpx 30rpx 0 0;
	}

	.rabbit-image {
		position: absolute;
		top: -12vh;
		left: -8vw;
		width: 35vw;
		height: 18vh;
		z-index: 1;
		transform: scaleX(-1);
		object-fit: contain;
	}

	.input-container {
		display: flex;
		align-items: center;
		margin: 0 20rpx 20rpx;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		border-radius: 50px;
		background: #fff;
		padding: 15rpx 25rpx;
	}

	.chat-input {
		flex: 1;
		padding: 10rpx 0;
		border: none;
		background: transparent;
		font-size: 28rpx;
		outline: none;
		color: #333;
	}

	.chat-input::placeholder {
		color: #999;
		font-size: 26rpx;
	}

	.send-icon {
		width: 50rpx;
		height: 50rpx;
		margin-left: 10rpx;
		cursor: pointer;
		object-fit: contain;
	}

	.upload-options {
		display: flex;
		justify-content: space-around;
		padding: 10rpx 0 20rpx;
	}

	.upload-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		cursor: pointer;
	}

	.upload-icon {
		width: 55rpx;
		height: 55rpx;
		margin-bottom: 8rpx;
		object-fit: contain;
	}

	.upload-text {
		font-size: 24rpx;
		color: #666;
	}
</style>