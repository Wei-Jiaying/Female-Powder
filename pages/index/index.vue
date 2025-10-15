<template>
	<view class="begin">
		<image src="/static/Gadget/gadget.png" class="image"></image>
		<view class="title">
			<view class="big-title">
				<view class="logo">
					<image src="/static/logo.png"></image>
				</view>
				<view class="text">
					<image src="/static/Gadget/title1.png"></image>
				</view>
			</view>
			<view class="small-title">
				<image src="/static/Gadget/title2.png"></image>
			</view>
		</view>
		<view class="content">
			<image src="/static/Gadget/personCenter.png" class="image-content"></image>
		</view>
		<view class="login">
			<view class="login-item" @click="handleLogin">
				<view class="icon">
					<image src="/static/Gadget/icon1.png"></image>
				</view>
				<view class="text1">
					<image src="/static/Gadget/text1.png"></image>
				</view>
			</view>
			<view class="login-item">
				<view class="icon">
					<image src="/static/Gadget/icon2.png"></image>
				</view>
				<view class="text2">
					<image src="/static/Gadget/text2.png"></image>
				</view>
			</view>
		</view>
		<view class="register" @click="handleRegister">
			<image src="/static/Gadget/text3.png"></image>
		</view>
		<!-- 新增：游客模式按钮 -->
		<view class="guest-mode" @click="handleGuestEnter">
			游客模式进入首页
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {

		},
		methods: {
			handleRegister() {
				uni.navigateTo({
					url: 'register'
				});
			},
			handleLogin() {
				uni.navigateTo({
					url: 'login'
				});
			},
			// 新增：游客模式跳转逻辑
			handleGuestEnter() {
				uni.switchTab({
					url: '/pages/home/home'
				});
			}
		},

	}
</script>

<style scoped lang="scss">
	.begin {
		position: relative;
		width: 100vw;
		height: 100vh;
		padding-top: 60rpx;
		box-sizing: border-box;
		background-size: cover;
		display: flex;
		flex-direction: column;
		align-items: center;
		// 增加底部内边距，避免按钮被遮挡
		padding-bottom: 80rpx;
	}

	.image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -1;
		object-fit: cover;
	}

	.title {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.big-title {
			display: flex;
			justify-content: center;
			align-items: center;

			.logo {
				width: 107rpx;
				height: 112rpx;
				border-radius: 20rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.text {
				width: 380rpx;
				height: 100rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.small-title {
			width: 350rpx;
			height: 75rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.content {
		width: 690rpx;
		height: 620rpx;

		.image-content {
			width: 690rpx;
			height: 620rpx;
		}
	}

	.login {
		display: flex;
		flex-direction: column;

		.login-item {
			width: 650rpx;
			height: 100rpx;
			border-radius: 50rpx;
			background: linear-gradient(to bottom, #F7D6F8, #FFFFFF, #E8D4FF);
			box-shadow: 4px 4px 4px 0px rgba(55, 0, 205, 0.25);
			margin-top: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.icon {
				width: 80rpx;
				height: 80rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.text1 {
				width: 230rpx;
				height: 80rpx;
				transform: translateY(-7rpx);

				image {
					width: 100%;
					height: 100%;
				}
			}

			.text2 {
				width: 320rpx;
				height: 80rpx;
				transform: translateY(2rpx);

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.register {
		margin-top: 10rpx;
		width: 270rpx;
		height: 65rpx;
		padding-left: 40rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	// 新增：游客模式按钮样式
	.guest-mode {
		// 与登录按钮同宽、同渐变背景，保持风格统一
		width: 650rpx;
		height: 100rpx;
		border-radius: 50rpx;
		// background: linear-gradient(to bottom, #F7D6F8, #FFFFFF, #E8D4FF);
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05),
			0 1px 3px rgba(0, 0, 0, 0.03);
		backdrop-filter: blur(8px);
		/* 配合半透明，增强毛玻璃效果 */
		font-size: 32rpx;
		font-weight: 600;
		color: #333;
		display: flex;
		justify-content: center;
		align-items: center;
		// 与上方注册按钮保持间距
		margin-top: 30rpx;
		// 点击反馈
		cursor: pointer;
	}
</style>