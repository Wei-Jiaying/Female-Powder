<template>
	<div class="page-container">
		<!-- 背景层：柔和渐变提升质感 -->
		<view class="bg"></view>
		<!-- 搜索栏：修复输入框语法错误 -->
		<view class="search-bar" :class="{ 'focused': searchFocused }">
			<view class="search-icon">🔍</view>
			<input type="text" placeholder="搜索母婴用品、孕期营养、产后恢复..." class="search-input" @focus="searchFocused = true"
				@blur="searchFocused = false" v-model="searchKeyword" @input="handleSearchInput" />
			<!-- 清除按钮：输入内容时显示 -->
			<view class="clear-btn" v-if="searchKeyword" @click="clearSearch" :class="{ 'pressed': clearBtnPressed }">
				×
			</view>
			<view class="search-btn" @click="handleSearch" :class="{ 'pressed': searchBtnPressed }">
				搜索
			</view>
		</view>

		<!-- 分类标签栏：文字主导，简化样式 -->
		<view class="category-tabs">
			<view class="tab-item"
				:class="{ active: activeCategory === index, 'tab-pressed': pressedTabIndex === index }"
				v-for="(category, index) in categories" :key="index" @click="activeCategory = index"
				@touchstart="tabPressStart(index)" @touchend="tabPressEnd">
				{{ category }}
			</view>
		</view>

		<!-- 优惠活动区：突出文字信息 -->
		<view class="promotion-banner" @click="handlePromotionClick" :class="{ 'pressed': bannerPressed }">
			<view class="banner-text">
				<view class="main-text">新用户专享</view>
				<view class="sub-text">满299减100 | 全场包邮</view>
			</view>
			<view class="banner-cta">立即领取</view>
		</view>

		<!-- 精品推荐区：删除图片，用色块+文字优化卡片 -->
		<view class="recommend-section">
			<view class="section-header">
				<view class="section-title">精品推荐</view>
				<!-- 搜索结果提示：有搜索词时显示 -->
				<view class="search-result-tip" v-if="searchKeyword">
					找到 {{ filteredProducts.length }} 个相关商品
				</view>
				<view class="section-more" @click="showMoreProducts" v-else>查看更多 →</view>
			</view>

			<!-- 搜索空状态：无匹配商品时显示 -->
			<view class="empty-state" v-if="searchKeyword && filteredProducts.length === 0">
				<view class="empty-icon">🔍</view>
				<view class="empty-text">未找到 "{{ searchKeyword }}" 相关商品</view>
				<view class="empty-hint">试试其他关键词吧~</view>
			</view>

			<view class="product-grid" v-else>
				<!-- 商品卡片：渲染筛选后的商品 -->
				<view class="product-card" v-for="(product, index) in filteredProducts" :key="product.id"
					@click="handleProductClick(product)"
					:class="{ 'pressed': product.pressed, [`card-color-${index % 4}`]: true }"
					@touchstart="productPressStart(product.id)" @touchend="productPressEnd(product.id)">
					<view class="product-tag" v-if="product.tag">{{ product.tag }}</view>
					<view class="product-name">{{ product.name }}</view>
					<view class="product-desc">{{ product.desc }}</view>
					<view class="product-footer">
						<view class="product-price">
							<span class="current-price">¥{{ product.price }}</span>
							<span class="original-price"
								v-if="product.originalPrice">¥{{ product.originalPrice }}</span>
						</view>
						<view class="add-cart" @click.stop="addToCart(product)"
							:class="{ 'pressed': product.cartPressed }">
							加入购物车
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 购物车浮动提示 -->
		<view class="cart-toast" v-if="showCartToast" :class="{ 'show': showCartToast }">
			已加入购物车
		</view>

		<!-- 底部导航栏：纯文字设计，删除图标 -->
		<view class="footer-nav">
			<view class="nav-item" :class="{ active: activeNav === index }" v-for="(nav, index) in navs" :key="index"
				@click="activeNav = index">
				<view class="nav-text">{{ nav.name }}</view>
				<!-- 购物车数量提示 -->
				<view class="cart-badge" v-if="index === 2 && cartCount > 0">
					{{ cartCount > 99 ? '99+' : cartCount }}
				</view>
			</view>
		</view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 交互状态
				backPressed: false,
				searchFocused: false,
				searchBtnPressed: false,
				clearBtnPressed: false, // 清除按钮按压状态
				activeCategory: 0,
				bannerPressed: false,
				pressedTabIndex: -1,
				showCartToast: false,
				activeNav: 0,
				cartCount: 0,
				searchKeyword: '', // 搜索关键词

				// 分类数据
				categories: ['全部商品', '孕期必备', '产后恢复', '婴儿用品', '营养保健'],

				// 底部导航数据（无图标）
				navs: [{
						name: '首页'
					},
					{
						name: '分类'
					},
					{
						name: '购物车'
					},
					{
						name: '我的'
					}
				],

				// 商品数据
				products: [{
						id: 1,
						name: '孕妇专用叶酸片',
						desc: '孕早期必备，补充叶酸预防胎儿畸形',
						tag: '热销',
						price: 89,
						originalPrice: 129,
						pressed: false,
						cartPressed: false
					},
					{
						id: 2,
						name: '产妇月子护理套装',
						desc: '包含产褥垫、护理巾等6件套，舒适透气',
						tag: '新品',
						price: 159,
						originalPrice: 239,
						pressed: false,
						cartPressed: false
					},
					{
						id: 3,
						name: '婴儿纯棉连体衣',
						desc: '0-6个月宝宝适用，柔软亲肤无荧光剂',
						tag: '特惠',
						price: 69,
						originalPrice: 99,
						pressed: false,
						cartPressed: false
					},
					{
						id: 4,
						name: '电动吸奶器静音款',
						desc: '双边吸奶，低噪音设计，可充电便携',
						tag: '推荐',
						price: 299,
						originalPrice: 459,
						pressed: false,
						cartPressed: false
					},
					{
						id: 5,
						name: '孕妇钙片柠檬酸钙',
						desc: '孕中晚期补钙，易吸收不便秘，添加维生素D',
						tag: '热销',
						price: 109,
						originalPrice: 159,
						pressed: false,
						cartPressed: false
					},
					{
						id: 6,
						name: '婴儿防胀气奶瓶',
						desc: '宽口径设计，防呛奶防胀气，食品级硅胶奶嘴',
						tag: '新品',
						price: 129,
						originalPrice: 189,
						pressed: false,
						cartPressed: false
					},
					{
						id: 7,
						name: '产后收腹带纯棉',
						desc: '顺产剖腹产通用，透气不闷汗，三段式加压',
						tag: '特惠',
						price: 89,
						originalPrice: 139,
						pressed: false,
						cartPressed: false
					},
					{
						id: 8,
						name: '婴儿恒温调奶器',
						desc: '快速加热至45℃，恒温保持，夜灯功能',
						tag: '推荐',
						price: 229,
						originalPrice: 329,
						pressed: false,
						cartPressed: false
					},
					{
						id: 9,
						name: '孕妇孕期DHA藻油',
						desc: '孕妇专用，促进胎儿大脑发育，无鱼腥味',
						tag: '热销',
						price: 169,
						originalPrice: 239,
						pressed: false,
						cartPressed: false
					},
					{
						id: 10,
						name: '婴儿隔尿垫防水',
						desc: '一次性使用，透气不闷，吸收快防漏',
						tag: '平价',
						price: 49,
						originalPrice: 79,
						pressed: false,
						cartPressed: false
					},
					{
						id: 11,
						name: '产后月子鞋软底',
						desc: '防滑软底，保暖透气，魔术贴调节松紧',
						tag: '新品',
						price: 59,
						originalPrice: 99,
						pressed: false,
						cartPressed: false
					},
					{
						id: 12,
						name: '婴儿安抚奶嘴',
						desc: '医用级硅胶，仿母乳设计，防尘收纳盒',
						tag: '特惠',
						price: 39,
						originalPrice: 69,
						pressed: false,
						cartPressed: false
					},
					{
						id: 13,
						name: '孕妇托腹带',
						desc: '减轻腰部负担，透气不勒，可调节松紧',
						tag: '推荐',
						price: 79,
						originalPrice: 119,
						pressed: false,
						cartPressed: false
					},
					{
						id: 14,
						name: '婴儿湿巾大包装',
						desc: '80抽×5包，无酒精无香精，加厚柔软',
						tag: '热销',
						price: 69,
						originalPrice: 99,
						pressed: false,
						cartPressed: false
					},
					{
						id: 15,
						name: '产后哺乳文胸',
						desc: '无钢圈设计，聚拢防下垂，透气舒适',
						tag: '新品',
						price: 89,
						originalPrice: 139,
						pressed: false,
						cartPressed: false
					},
					{
						id: 16,
						name: '婴儿护臀膏',
						desc: '预防红屁屁，天然成分，温和无刺激',
						tag: '平价',
						price: 59,
						originalPrice: 89,
						pressed: false,
						cartPressed: false
					},
					{
						id: 17,
						name: '孕妇防辐射服',
						desc: '银纤维材质，透气轻薄，可水洗',
						tag: '推荐',
						price: 259,
						originalPrice: 359,
						pressed: false,
						cartPressed: false
					},
					{
						id: 18,
						name: '婴儿床围栏',
						desc: '防摔防护，高度可调节，安全锁设计',
						tag: '特惠',
						price: 329,
						originalPrice: 459,
						pressed: false,
						cartPressed: false
					},
					{
						id: 19,
						name: '产后红糖姜茶',
						desc: '独立包装，驱寒暖宫，帮助恶露排出',
						tag: '新品',
						price: 39,
						originalPrice: 69,
						pressed: false,
						cartPressed: false
					},
					{
						id: 20,
						name: '婴儿辅食研磨碗',
						desc: '手动研磨，食品级材质，多件套组合',
						tag: '热销',
						price: 79,
						originalPrice: 119,
						pressed: false,
						cartPressed: false
					}
				]
			};
		},
		computed: {
			// 筛选后的商品：根据搜索关键词模糊匹配
			filteredProducts() {
				if (!this.searchKeyword.trim()) {
					return this.products;
				}
				const keyword = this.searchKeyword.trim().toLowerCase();
				return this.products.filter(product =>
					product.name.toLowerCase().includes(keyword) ||
					product.desc.toLowerCase().includes(keyword) ||
					(product.tag && product.tag.toLowerCase().includes(keyword))
				);
			}
		},
		methods: {
			// 实时监听搜索输入
			handleSearchInput() {
				// 自动响应searchKeyword变化
			},

			// 点击搜索按钮
			handleSearch() {
				this.searchBtnPressed = true;
				setTimeout(() => {
					this.searchBtnPressed = false;
					uni.hideKeyboard();
					if (!this.searchKeyword.trim()) {
						uni.showToast({
							title: '请输入搜索关键词',
							icon: 'none'
						});
					}
				}, 200);
			},

			// 清除搜索关键词
			clearSearch() {
				this.clearBtnPressed = true;
				setTimeout(() => {
					this.clearBtnPressed = false;
					this.searchKeyword = '';
				}, 200);
			},

			// 标签点击效果
			tabPressStart(index) {
				this.pressedTabIndex = index;
			},
			tabPressEnd() {
				this.pressedTabIndex = -1;
			},

			// 商品卡片点击效果
			productPressStart(productId) {
				const product = this.products.find(item => item.id === productId);
				if (product) product.pressed = true;
			},
			productPressEnd(productId) {
				const product = this.products.find(item => item.id === productId);
				if (product) product.pressed = false;
			},

			// 商品点击跳转
			handleProductClick(product) {
				uni.navigateTo({
					url: `/pages/product/detail?id=${product.id}`
				});
			},

			// 加入购物车
			addToCart(product) {
				product.cartPressed = true;
				setTimeout(() => {
					product.cartPressed = false;
					this.cartCount++;
					this.showCartToast = true;
					setTimeout(() => {
						this.showCartToast = false;
					}, 1500);
				}, 200);
			},

			// 优惠活动点击
			handlePromotionClick() {
				this.bannerPressed = true;
				setTimeout(() => {
					this.bannerPressed = false;
					uni.showToast({
						title: '领取成功，快去购物吧',
						icon: 'none'
					});
				}, 200);
			},

			// 查看更多商品
			showMoreProducts() {
				uni.showToast({
					title: '更多商品加载中...',
					icon: 'none'
				});
			}
		},
		watch: {
			// 底部导航切换
			activeNav(newVal) {
				// 导航逻辑保持原样
			}
		}
	};
</script>

<style lang="scss" scoped>
	/* 样式保持不变，与之前一致 */
	.page-container {
		width: 100%;
		min-height: 100vh;
		padding-bottom: 120rpx;
		box-sizing: border-box;
		position: relative;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: linear-gradient(180deg, #FFF9FA 0%, #FFEEF2 30%, #FFFFFF 80%);
		z-index: -1;
	}

	.search-bar {
		height: 84rpx;
		margin: 0 30rpx 30rpx;
		display: flex;
		align-items: center;
		background-color: #fff;
		border-radius: 42rpx;
		padding: 0 30rpx;
		box-shadow: 0 4rpx 16rpx rgba(243, 183, 182, 0.15);
		box-sizing: border-box;
		transition: box-shadow 0.3s;

		&.focused {
			box-shadow: 0 6rpx 20rpx rgba(243, 183, 182, 0.25);
		}

		.search-icon {
			font-size: 32rpx;
			color: #F3B7B6;
			margin-right: 20rpx;
		}

		.search-input {
			flex: 1;
			height: 100%;
			border: none;
			outline: none;
			font-size: 28rpx;
			color: #666;
			background: transparent;
		}

		.clear-btn {
			width: 40rpx;
			height: 40rpx;
			border-radius: 50%;
			background-color: #F5F5F5;
			color: #999;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 24rpx;
			margin-right: 16rpx;
			transition: all 0.2s;

			&.pressed {
				background-color: #EEEEEE;
				color: #666;
			}
		}

		.search-btn {
			width: 120rpx;
			height: 60rpx;
			background-color: #F57D67;
			color: #fff;
			border-radius: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			font-weight: 500;
			transition: all 0.2s;

			&.pressed {
				transform: scale(0.95);
				background-color: #e06a58;
			}
		}
	}

	.category-tabs {
		display: flex;
		height: 80rpx;
		padding: 0 20rpx;
		margin-bottom: 20rpx;
		overflow-x: auto;
		white-space: nowrap;
		scrollbar-width: none;
		-webkit-overflow-scrolling: touch;

		&::-webkit-scrollbar {
			display: none;
		}

		.tab-item {
			padding: 0 30rpx;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 30rpx;
			color: #666;
			border-radius: 40rpx;
			transition: all 0.2s;

			&.active {
				color: #F57D67;
				font-weight: 600;
				background-color: rgba(245, 125, 103, 0.1);
			}

			&.tab-pressed {
				background-color: rgba(245, 125, 103, 0.15);
			}
		}
	}

	.promotion-banner {
		margin: 0 30rpx 30rpx;
		height: 160rpx;
		background: linear-gradient(135deg, #FFE6EA 0%, #FFCAD4 100%);
		border-radius: 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 40rpx;
		box-shadow: 0 6rpx 16rpx rgba(245, 125, 103, 0.15);
		transition: all 0.2s;
		cursor: pointer;

		&.pressed {
			transform: scale(0.98);
			box-shadow: 0 4rpx 12rpx rgba(245, 125, 103, 0.1);
		}

		.banner-text {
			color: #F57D67;

			.main-text {
				font-size: 36rpx;
				font-weight: 700;
				margin-bottom: 8rpx;
			}

			.sub-text {
				font-size: 26rpx;
				opacity: 0.9;
			}
		}

		.banner-cta {
			width: 160rpx;
			height: 60rpx;
			background-color: #fff;
			color: #F57D67;
			border-radius: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			font-weight: 500;
			box-shadow: 0 2rpx 8rpx rgba(245, 125, 103, 0.2);
		}
	}

	.recommend-section {
		padding: 0 30rpx;
		margin-bottom: 40rpx;

		.section-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 24rpx;

			.section-title {
				font-size: 32rpx;
				font-weight: 600;
				color: #F57D67;
				padding-left: 16rpx;
				border-left: 8rpx solid #F57D67;
			}

			.search-result-tip {
				font-size: 24rpx;
				color: #F57D67;
			}

			.section-more {
				font-size: 26rpx;
				color: #F3B7B6;
				cursor: pointer;
				transition: color 0.2s;

				&:hover {
					color: #F57D67;
				}
			}
		}

		.empty-state {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 80rpx 0;

			.empty-icon {
				font-size: 80rpx;
				color: #F3B7B6;
				margin-bottom: 24rpx;
			}

			.empty-text {
				font-size: 28rpx;
				color: #666;
				margin-bottom: 16rpx;
			}

			.empty-hint {
				font-size: 24rpx;
				color: #999;
			}
		}

		.product-grid {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			gap: 24rpx;
		}

		.product-card {
			width: calc(50% - 60rpx);
			background-color: #fff;
			border-radius: 24rpx;
			padding: 24rpx;
			box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
			transition: all 0.3s;
			cursor: pointer;
			position: relative;
			overflow: hidden;

			&.pressed {
				transform: translateY(4rpx);
				box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.03);
			}

			&.card-color-0 {
				border-top: 8rpx solid #FFE6EA;
			}

			&.card-color-1 {
				border-top: 8rpx solid #E6F7FF;
			}

			&.card-color-2 {
				border-top: 8rpx solid #F0F9EB;
			}

			&.card-color-3 {
				border-top: 8rpx solid #FFF2E8;
			}

			.product-tag {
				position: absolute;
				top: 16rpx;
				right: 16rpx;
				padding: 4rpx 16rpx;
				background-color: #F57D67;
				color: #fff;
				font-size: 20rpx;
				border-radius: 16rpx;
			}

			.product-name {
				font-size: 28rpx;
				font-weight: 500;
				color: #333;
				margin-bottom: 12rpx;
				line-height: 40rpx;
			}

			.product-desc {
				font-size: 24rpx;
				color: #666;
				margin-bottom: 24rpx;
				line-height: 36rpx;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			.product-footer {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.product-price {
					.current-price {
						font-size: 30rpx;
						font-weight: 600;
						color: #F57D67;
					}

					.original-price {
						font-size: 22rpx;
						color: #999;
						text-decoration: line-through;
						margin-left: 12rpx;
					}
				}

				.add-cart {
					padding: 8rpx 20rpx;
					background-color: rgba(245, 125, 103, 0.1);
					color: #F57D67;
					border-radius: 16rpx;
					font-size: 24rpx;
					transition: all 0.2s;

					&.pressed {
						background-color: #F57D67;
						color: #fff;
					}
				}
			}
		}
	}

	.cart-toast {
		position: fixed;
		bottom: 150rpx;
		left: 50%;
		transform: translateX(-50%) translateY(100rpx);
		padding: 16rpx 30rpx;
		background-color: rgba(0, 0, 0, 0.7);
		color: #fff;
		border-radius: 30rpx;
		font-size: 28rpx;
		opacity: 0;
		transition: all 0.3s;
		pointer-events: none;
		z-index: 999;

		&.show {
			opacity: 1;
			transform: translateX(-50%) translateY(0);
		}
	}

	.footer-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 120rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.03);

		.nav-item {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: #999;
			font-size: 28rpx;
			position: relative;
			transition: color 0.3s;

			&.active {
				color: #F57D67;
				font-weight: 500;
			}

			.cart-badge {
				position: absolute;
				top: 16rpx;
				right: calc(50% - 40rpx);
				width: auto;
				min-width: 36rpx;
				height: 36rpx;
				background-color: #F57D67;
				color: white;
				font-size: 22rpx;
				border-radius: 18rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 10rpx;
				box-shadow: 0 2rpx 6rpx rgba(245, 125, 103, 0.3);
			}
		}
	}
</style>