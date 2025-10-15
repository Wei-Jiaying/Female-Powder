<template>
	<view class="page-container">
		<!-- 背景层：简化渐变，避免溢出 -->
		<view class="bg"></view>

		<!-- 搜索栏：固定高度，优化间距 -->
		<view class="search-bar">
			<image src="/static/Index/SearchDc.png" alt="装饰图标" class="decorative-icon" />
			<view class="search-container">
				<image src="/static/Index/SearchingImg.png" alt="搜索图标" class="search-icon" />
				<input type="text" placeholder="请输入搜索内容" class="search-input" />
				<view class="search-button">搜索</view>
			</view>
		</view>

		<!-- 轮播图：调整比例，优化阴影 -->
		<view class="swiper-wrap">
			<swiper class="swiper-container" indicator-dots autoplay interval="5000" circular>
				<swiper-item v-for="(image, index) in ImagesList" :key="index">
					<image :src="image" mode="aspectFill" class="swiper-img" />
				</swiper-item>
			</swiper>
		</view>

		<!-- 功能模块：统一间距，优化点击区域 -->
		<view class="function-wrap">
			<view class="function-container">
				<view v-for="(functionItem, index) in functionItems" :key="index" class="function-item"
					@click="handleFunctionClick(functionItem)">
					<image :src="functionItem.image" mode="widthFix" class="function-icon" />
					<view class="function-name">{{functionItem.title}}</view>
				</view>
			</view>
		</view>

		<!-- 推文/社区：优化标签栏，统一内容布局 -->
		<view class="tweet-wrap">
			<view class="tweet-title">
				<image src="/static/Index/twDc.png" mode="widthFix" class="tweet-title-img" />
				<view class="tab-container">
					<view class="tab-item" :class="{ active: activeTab === 'tweet' }" @click="activeTab = 'tweet'">
						推文
					</view>
					<view class="tab-item" :class="{ active: activeTab === 'community' }"
						@click="activeTab = 'community'">
						社区
					</view>
				</view>
				<view class="decoration-line" :style="{ left: lineLeft, width: lineWidth }"></view>
			</view>

			<!-- 内容区域：区分推文/社区（当前默认显示推文） -->
			<view class="tweet-content">
				<view v-if="activeTab === 'tweet'" class="tweet-list">
					<view v-for="(tweet, index) in tweets" :key="index" class="tweet-item" @click="ClickTweet(tweet)">
						<view class="tweet-time">{{ tweet.time }}</view>
						<view class="tweet-main">
							<view class="tweet-text">
								<view class="tweet-title-text">{{ tweet.title }}</view>
								<view class="stats-container">
									<view class="stats">阅读: {{ tweet.readCount }}</view>
									<view class="stats">赞: {{ tweet.likeCount }}</view>
									<view class="stats">分享: {{ tweet.shareCount }}</view>
								</view>
							</view>
							<image :src="tweet.image" mode="aspectFill" class="tweet-img" />
						</view>
					</view>
				</view>

				<view v-else class="community-list">
					<!-- 社区内容可后续补充，这里先放占位提示 -->
					<view class="empty-tip">社区内容即将上线，敬请期待～</view>
				</view>
			</view>
		</view>

		<!-- 1. 中医小宝典弹窗 -->
		<view class="popup-mask" v-if="showBiblePopup" @click="closeAllPopups"></view>
		<view class="popup bible-popup" v-if="showBiblePopup">
			<view class="popup-header">
				<text class="popup-title">中医小宝典</text>
				<text class="popup-close" @click="closeAllPopups">✕</text>
			</view>
			<view class="popup-content">
				<view class="bible-category">
					<view class="category-item" :class="{ active: activeCategory === 'herb' }"
						@click="activeCategory = 'herb'">
						<text class="category-icon">🌿</text>
						<text class="category-name">中草药</text>
					</view>
					<view class="category-item" :class="{ active: activeCategory === 'acupoint' }"
						@click="activeCategory = 'acupoint'">
						<text class="category-icon">🗺️</text>
						<text class="category-name">穴位图解</text>
					</view>
					<view class="category-item" :class="{ active: activeCategory === 'prescription' }"
						@click="activeCategory = 'prescription'">
						<text class="category-icon">📝</text>
						<text class="category-name">经典方剂</text>
					</view>
				</view>
				<view class="bible-list">
					<view class="bible-item" v-for="(item, index) in bibleList[activeCategory]" :key="index">
						<text class="item-name">{{item.name}}</text>
						<text class="item-desc">{{item.desc}}</text>
					</view>
				</view>
			</view>
			<view class="popup-footer">
				<view class="popup-btn cancel-btn" @click="closeAllPopups">关闭</view>
				<view class="popup-btn confirm-btn" @click="openMedicine">查看更多</view>
			</view>
		</view>

		<!-- 2. 拍照帮识图弹窗 -->
		<view class="popup-mask" v-if="showRecogPopup" @click="closeAllPopups"></view>
		<view class="popup recog-popup" v-if="showRecogPopup">
			<view class="popup-header">
				<text class="popup-title">拍照帮识图</text>
				<text class="popup-close" @click="closeAllPopups">✕</text>
			</view>
			<view class="popup-content">
				<view class="recog-placeholder">
					<text class="placeholder-icon">📷</text>
					<text class="placeholder-text">点击下方按钮拍摄或选择图片</text>
				</view>
				<view class="recog-buttons">
					<view class="recog-btn" @click="openScan">
						<text class="btn-icon">📸</text>
						<text class="btn-text">拍照识别</text>
					</view>
					<view class="recog-btn" @click="closeAllPopups">
						<text class="btn-icon">🖼️</text>
						<text class="btn-text">选择图片</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 3. 随心记便签弹窗 -->
		<view class="popup-mask" v-if="showNotePopup" @click="closeAllPopups"></view>
		<view class="popup note-popup" v-if="showNotePopup">
			<view class="popup-header">
				<text class="popup-title">随心记便签</text>
				<text class="popup-close" @click="closeAllPopups">✕</text>
			</view>
			<view class="popup-content">
				<view class="note-date">{{currentDate}}</view>
				<textarea class="note-input" v-model="noteContent" placeholder="请输入今日健康笔记..."></textarea>
				<view class="note-tags">
					<view class="tag-item" :class="{ active: selectedTag === tag }" @click="selectedTag = tag"
						v-for="tag in noteTags" :key="tag">
						{{tag}}
					</view>
				</view>
			</view>
			<view class="popup-footer">
				<view class="popup-btn cancel-btn" @click="closeAllPopups">取消</view>
				<view class="popup-btn confirm-btn" @click="saveNote">保存笔记</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ImagesList: [
					'https://picsum.photos/750/300',
					'https://picsum.photos/750/301',
					'https://picsum.photos/750/302'
				],
				functionItems: [{
						image: '/static/Index/fc1.png',
						title: '健康知识库',
						type: 'page' // 适合跳转页面，暂不做弹窗
					},
					{
						image: '/static/Index/fc2.png',
						title: '中医小宝典',
						type: 'popup', // 适合弹窗
						popupType: 'bible'
					},
					{
						image: '/static/Index/fc3.png',
						title: '随心记便签',
						type: 'popup', // 适合弹窗
						popupType: 'note'
					},
					{
						image: '/static/Index/fc4.png',
						title: '看懂病历单',
						type: 'page' // 适合跳转页面
					},
					{
						image: '/static/Index/fc5.png',
						title: '拍照帮识图',
						type: 'popup', // 适合弹窗
						popupType: 'recog'
					},
					{
						image: '/static/Index/fc6.png',
						title: '直播指导课',
						type: 'page' // 重复功能，暂不处理
					},
					{
						image: '/static/Index/fc7.png',
						title: '经验交流区',
						type: 'page' // 适合跳转社区
					},
					{
						image: '/static/Index/fc8.png',
						title: '专家咨询室',
						type: 'page' // 适合跳转咨询页
					}
				],
				activeTab: 'tweet',
				tweets: [{
						time: '2024-01-01',
						title: '冬季养生：这3个穴位按摩方法，帮你缓解手脚冰凉',
						readCount: 1280,
						likeCount: 236,
						shareCount: 58,
						image: 'https://picsum.photos/120/120'
					},
					{
						time: '2024-01-02',
						title: '体检报告里的“结节”是什么？哪些需要警惕？',
						readCount: 1850,
						likeCount: 312,
						shareCount: 76,
						image: 'https://picsum.photos/120/121'
					},
					{
						time: '2024-01-03',
						title: '晨起喝温水到底好不好？这几类人要注意',
						readCount: 960,
						likeCount: 189,
						shareCount: 42,
						image: 'https://picsum.photos/120/122'
					}
				],
				// 弹窗控制
				showBiblePopup: false,
				showRecogPopup: false,
				showNotePopup: false,
				// 中医小宝典数据
				activeCategory: 'herb',
				bibleList: {
					herb: [{
							name: '黄芪',
							desc: '补气升阳，固表止汗，利水消肿'
						},
						{
							name: '当归',
							desc: '补血活血，调经止痛，润肠通便'
						},
						{
							name: '枸杞',
							desc: '滋补肝肾，益精明目'
						}
					],
					acupoint: [{
							name: '足三里',
							desc: '健脾和胃，调理气血，扶正培元'
						},
						{
							name: '涌泉穴',
							desc: '滋阴降火，补肾益精'
						},
						{
							name: '合谷穴',
							desc: '疏风解表，镇痛通络'
						}
					],
					prescription: [{
							name: '四物汤',
							desc: '补血调血，主治血虚滞证'
						},
						{
							name: '六味地黄丸',
							desc: '滋阴补肾，主治肾阴亏损'
						},
						{
							name: '桂枝汤',
							desc: '解肌发表，调和营卫'
						}
					]
				},
				// 便签数据
				currentDate: '',
				noteContent: '',
				noteTags: ['养生记录', '症状笔记', '饮食记录', '运动打卡'],
				selectedTag: '养生记录'
			};
		},
		computed: {
			lineLeft() {
				return this.activeTab === 'tweet' ? '25%' : '71%';
			},
			lineWidth() {
				return '12%';
			}
		},
		onLoad() {
			// 初始化日期
			const date = new Date();
			this.currentDate =
				`${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
		},
		methods: {
			async openScan() {
				try {
					// 先检查相机权限
					const setting = await new Promise((resolve, reject) => {
						uni.getSetting({
							success: (res) => resolve(res),
							fail: (err) => reject(err)
						});
					});

					// 权限被拒：引导用户开启
					if (setting.authSetting['scope.camera'] === false) {
						await new Promise((resolve) => {
							uni.showModal({
								title: '权限不足',
								content: '需要相机权限才能使用扫一扫，请在设置中开启',
								success: (res) => {
									if (res.confirm) {
										// 跳转至权限设置页
										uni.openSetting({
											success: (res) => resolve(res)
										});
									} else {
										resolve(res); // 用户取消弹窗，也resolve避免阻塞
									}
								}
							});
						});
						return; // 无权限，终止后续逻辑
					}

					// 将 uni.scanCode 封装为 Promise，确保获取结果
					const scanRes = await new Promise((resolve) => {
						uni.scanCode({
							onlyFromCamera: false, // 仅相机扫码（符合进场场景）
							scanType: ['qrCode'], // 只识别二维码
							// 扫码成功
							success: (res) => {
								resolve({
									...res,
									cancel: false
								}); // 标记未取消
							},
							// 扫码失败（含用户取消）
							fail: (err) => {
								// 用户主动取消：标记 cancel 为 true
								if (err.errMsg === 'scanCode:fail cancel') {
									resolve({
										cancel: true
									});
								} else {
									// 其他错误（如相机故障）：提示并返回错误状态
									uni.showToast({
										title: '扫码失败，请重试',
										icon: 'none',
										duration: 2000
									});
									resolve({
										cancel: false,
										error: err
									});
								}
							}
						});
					});

					// 处理扫码结果（此时 scanRes 一定有值，不会是 undefined）
					if (scanRes.error) {
						throw scanRes.error; // 抛出其他错误，进入 catch 处理
					}
					if (scanRes.cancel) {
						return; // 用户取消，不做任何操作
					}

					// 扫码成功：执行你的业务逻辑（如解析预约码、调用接口等）
					// console.log('扫码成功，结果：', scanRes);
					// const resultArr = scanRes.result.split(','); // 使用中文逗号分割
					// // 提取 appId 和 userId
					// this.appId = resultArr[0] ? resultArr[0].trim() : ''; // 去除可能的空格
					// this.userId = resultArr[1] ? resultArr[1].trim() : '';
					// // console.log(scanRes.result);
					// this.applicationUserId = scanRes.result;
					// await this.entryReservationDetail();

					// const orderInfo = JSON.parse(scanRes.result);
					// uni.navigateTo({ url: `/pages/confirmEntry?orderId=${orderInfo.orderId}` });

				} catch (err) {
					// 捕获所有异常，避免页面崩溃
					console.error('扫一扫功能异常：', err);
					uni.showToast({
						title: '操作异常，请稍后再试',
						icon: 'none',
						duration: 2000
					});
				}
			},
			// 功能点击统一处理
			handleFunctionClick(item) {
				// 关闭所有弹窗
				this.closeAllPopups();
				// 区分弹窗/页面类型
				if (item.type === 'popup') {
					switch (item.popupType) {
						case 'bible':
							this.showBiblePopup = true;
							break;
						case 'recog':
							this.showRecogPopup = true;
							break;
						case 'note':
							this.showNotePopup = true;
							break;
					}
				} else {
					// 适合跳转页面的功能，暂提示
					if (item.title === '健康知识库') {
						wx.navigateTo({
							url: '/pages/health/knowledge'
						});
					} else if (item.title === '看懂病历单') {
						wx.navigateTo({
							url: '/pages/health/hospital'
						});
					} else if (item.title === '直播指导课') {
						wx.navigateTo({
							url: '/pages/health/course'
						});
					} else if (item.title === '专家咨询室') {
						wx.navigateTo({
							url: '/pages/health/room'
						});
					} else {
						uni.showToast({
							title: `${item.title}功能待开发`,
							icon: 'none'
						});
					}
				}
			},
			// 关闭所有弹窗
			closeAllPopups() {
				this.showBiblePopup = false;
				this.showRecogPopup = false;
				this.showNotePopup = false;
			},
			// 保存便签
			saveNote() {
				if (!this.noteContent.trim()) {
					uni.showToast({
						title: '请输入笔记内容',
						icon: 'none'
					});
					return;
				}
				this.closeAllPopups();
				uni.showToast({
					title: '笔记保存成功',
					icon: 'none'
				});
			},
			// 推文点击
			ClickTweet(tweet) {
				console.log('点击推文：', tweet);
				uni.showToast({
					title: '查看推文详情',
					icon: 'none'
				});
			},
			openMedicine() {
				uni.navigateTo({
					url: "/pages/health/medicine"
				})
			}
		}
	};
</script>

<style lang="scss">
	/* 基础重置：适配小程序 */
	page {
		width: 100vw;
		height: 100vh;
		overflow-x: hidden;
		background-color: #fff;
		font-size: 28rpx;
		color: #333;
	}

	.page-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	/* 背景：简化渐变，避免溢出 */
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 50vh;
		background: linear-gradient(180deg, #FDF7D5 0%, #F9DFEF 30%, #F2DDFF 50%, #FFFFFF 80%);
		z-index: -1;
	}

	/* 搜索栏：固定高度，优化布局 */
	.search-bar {
		height: 120rpx;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		box-sizing: border-box;
		margin-bottom: 30rpx;
		margin-top: 30rpx;
	}

	.decorative-icon {
		width: 60rpx;
		height: 60rpx;
		margin-right: 20rpx;
	}

	.search-container {
		flex: 1;
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
		font-size: 28rpx;
		color: #333;
		height: 100%;
	}

	.search-button {
		width: 140rpx;
		height: 56rpx;
		background-color: #FFCC00;
		color: #333;
		border-radius: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-weight: 500;
	}

	/* 轮播图：调整比例，优化阴影 */
	.swiper-wrap {
		padding: 0 30rpx;
		box-sizing: border-box;
		margin-bottom: 40rpx;
	}

	.swiper-container {
		width: 100%;
		height: 280rpx;
		border-radius: 30rpx;
		overflow: hidden;
		box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.12);
	}

	.swiper-img {
		width: 100%;
		height: 100%;
	}

	/* 功能模块：统一间距，优化比例 */
	.function-wrap {
		padding: 0 30rpx;
		box-sizing: border-box;
		margin-bottom: 40rpx;
	}

	.function-container {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		background-color: #fff;
		border-radius: 30rpx;
		padding: 40rpx 0rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
	}

	.function-item {
		width: 25%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20rpx;
		padding: 10rpx;
		box-sizing: border-box;
		cursor: pointer;
		transition: all 0.2s;
	}

	.function-item:active {
		transform: scale(0.95);
	}

	.function-icon {
		width: 80rpx;
		height: 80rpx;
		margin-bottom: 16rpx;
	}

	.function-name {
		font-size: 24rpx;
		color: #333;
		text-align: center;
		line-height: 32rpx;
	}

	/* 推文/社区：优化标签栏和内容布局 */
	.tweet-wrap {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 0 30rpx 20rpx;
		box-sizing: border-box;
	}

	.tweet-content {
		overflow-y: auto;
		flex: 1;
		max-height: 800rpx;
	}

	.tweet-title {
		display: flex;
		align-items: center;
		position: relative;
		height: 80rpx;
		margin-bottom: 30rpx;
	}

	.tweet-title-img {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}

	.tab-container {
		flex: 1;
		display: flex;
		height: 100%;
	}

	.tab-item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		color: #999;
		font-weight: 500;
		cursor: pointer;
	}

	.tab-item.active {
		color: #333;
	}

	.decoration-line {
		position: absolute;
		bottom: 0;
		height: 4rpx;
		background-color: #F3B7B6;
		transition: left 0.3s ease;
	}

	/* 推文列表：统一间距，优化排版 */
	.tweet-list {
		width: 100%;
	}

	.tweet-item {
		width: 100%;
		padding: 24rpx 0;
		border-bottom: 2rpx solid #F5F5F5;
		box-sizing: border-box;
		cursor: pointer;
	}

	.tweet-time {
		font-size: 22rpx;
		color: #999;
		margin-bottom: 12rpx;
	}

	.tweet-main {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.tweet-text {
		flex: 1;
		margin-right: 24rpx;
	}

	.tweet-title-text {
		font-size: 28rpx;
		font-weight: 500;
		line-height: 44rpx;
		margin-bottom: 16rpx;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.stats-container {
		display: flex;
		gap: 24rpx;
	}

	.stats {
		font-size: 22rpx;
		color: #F3B7B6;
	}

	.tweet-img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 16rpx;
		object-fit: cover;
	}

	/* 社区占位：统一风格 */
	.community-list {
		width: 100%;
		height: 300rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.empty-tip {
		font-size: 28rpx;
		color: #999;
	}

	/* 弹窗通用样式 */
	.popup-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 998;
	}

	.popup {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 85%;
		background-color: #fff;
		border-radius: 30rpx;
		box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.15);
		z-index: 999;
		overflow: hidden;
	}

	.popup-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 25rpx 30rpx;
		border-bottom: 2rpx solid #F5F5F5;
	}

	.popup-title {
		font-size: 32rpx;
		font-weight: 600;
		color: #333;
	}

	.popup-close {
		font-size: 36rpx;
		color: #999;
		cursor: pointer;
	}

	.popup-content {
		padding: 30rpx;
		max-height: 400rpx;
		overflow-y: auto;
	}

	.popup-footer {
		display: flex;
		gap: 20rpx;
		padding: 20rpx 30rpx;
		border-top: 2rpx solid #F5F5F5;
	}

	.popup-btn {
		flex: 1;
		height: 70rpx;
		border-radius: 16rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 26rpx;
		font-weight: 500;
		cursor: pointer;
	}

	.cancel-btn {
		background-color: #F5F5F5;
		color: #666;
	}

	.confirm-btn {
		background-color: #F3B7B6;
		color: #fff;
	}

	/* 中医小宝典弹窗样式 */
	.bible-category {
		display: flex;
		gap: 20rpx;
		margin-bottom: 25rpx;
		overflow-x: auto;
		padding-bottom: 10rpx;
	}

	.category-item {
		min-width: 160rpx;
		height: 60rpx;
		border-radius: 30rpx;
		background-color: #F5F5F5;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10rpx;
		cursor: pointer;
	}

	.category-item.active {
		background-color: #F2DDFF;
		color: #9966CC;
	}

	.category-icon {
		font-size: 24rpx;
	}

	.category-name {
		font-size: 24rpx;
	}

	.bible-list {
		display: flex;
		flex-direction: column;
		gap: 25rpx;
	}

	.bible-item {
		padding: 20rpx;
		background-color: #F9F9F9;
		border-radius: 16rpx;
	}

	.item-name {
		font-size: 26rpx;
		font-weight: 500;
		color: #333;
		margin-bottom: 8rpx;
		display: block;
	}

	.item-desc {
		font-size: 22rpx;
		color: #666;
	}

	/* 拍照识图弹窗样式 */
	.recog-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 200rpx;
		background-color: #F9F9F9;
		border-radius: 16rpx;
		margin-bottom: 30rpx;
	}

	.placeholder-icon {
		font-size: 60rpx;
		color: #999;
		margin-bottom: 15rpx;
	}

	.placeholder-text {
		font-size: 24rpx;
		color: #666;
	}

	.recog-buttons {
		display: flex;
		gap: 20rpx;
	}

	.recog-btn {
		flex: 1;
		height: 80rpx;
		border-radius: 16rpx;
		background-color: #F9F9F9;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 15rpx;
		cursor: pointer;
	}

	.btn-icon {
		font-size: 32rpx;
		color: #F3B7B6;
	}

	.btn-text {
		font-size: 26rpx;
		color: #333;
	}

	/* 便签弹窗样式 */
	.note-date {
		font-size: 22rpx;
		color: #999;
		margin-bottom: 15rpx;
		display: block;
	}

	.note-input {
		width: 100%;
		min-height: 180rpx;
		padding: 20rpx;
		background-color: #F9F9F9;
		border-radius: 16rpx;
		border: none;
		outline: none;
		font-size: 24rpx;
		color: #333;
		margin-bottom: 25rpx;
		box-sizing: border-box;
	}

	.note-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 15rpx;
	}

	.tag-item {
		padding: 10rpx 20rpx;
		background-color: #F5F5F5;
		border-radius: 20rpx;
		font-size: 22rpx;
		color: #666;
		cursor: pointer;
	}

	.tag-item.active {
		background-color: #F2DDFF;
		color: #9966CC;
	}
</style>