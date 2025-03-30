<template>
	<div class="login">
		<div class="header">
			<div class="title">
				<div class="back" @click="goBack">
					<image src="/static/back.png" mode=""></image>
				</div>
			</div>
			<div class="logo">
				<div class="logo-first">
					<div class="logo-icon">
						<image src="/static/logo.png"></image>
					</div>
					<div class="logo-text">
						<image src="/static/Gadget/title4.png"></image>
					</div>
				</div>
				<div class="rabbit">
					<image src="/static/Gadget/rabbit.png"></image>
				</div>
			</div>
		</div>
		<div class="content">
			<view class="login-container">
				<!-- 输入框部分 -->
				<view class="input-group">
					<view class="input-item item1">
						<image src="/static/Gadget/icon3.png" class="input-icon"></image>
						<input type="text" placeholder="账号" class="input-box" v-model="username" />
					</view>
					<view class="input-item item2">
						<image src="/static/Gadget/icon6.png" class="input-icon"></image>
						<input type="password" placeholder="密码" class="input-box" v-model="password" />
					</view>
					<div class="forget-password">
						<image src="/static/Gadget/text6.png"></image>
					</div>
				</view>

				<!-- 确定按钮 -->
				<view class="confirm-btn">
					<div class="btn" @click="handleLogin">
						<image src="/static/Gadget/text5.png"></image>
					</div>
				</view>
			</view>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				username: '', // 绑定账号输入框
				password: '' // 绑定密码输入框
			};
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			handleLogin() {
				// 校验输入是否为空
				if (!this.username || !this.password) {
					uni.showToast({
						title: '账号或密码不能为空',
						icon: 'none'
					});
					return;
				}

				uni.request({
					url: '/api/common/login', // 登录接口地址
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					data: {
						username: this.username,
						password: this.password,
						agreePrivacy: 1 // 根据接口要求补充参数
					},
					success: (res) => {
						console.log('登录接口响应', res.data);
						if (res.data.code === 1) { // 假设 code 为 1 表示成功
							const {
								token,
								username: userName
							} = res.data.data;

							// 存储 token（同步存储示例）
							uni.setStorageSync('userToken', token);
							// 可选：存储用户名等其他信息
							uni.setStorageSync('userName', userName);

							uni.showToast({
								title: '登录成功',
								icon: 'success'
							});
							// 登录成功后跳转页面（示例）
							uni.navigateTo({
								url: '/pages/Gadget/personCenter'
							});
						} else {
							uni.showToast({
								title: res.data.msg || '登录失败',
								icon: 'none'
							});
						}
					},
					fail: (err) => {
						console.error('登录接口请求失败', err);
						uni.showToast({
							title: '网络请求失败，请检查网络',
							icon: 'none'
						});
					}
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	.login {
		width: 100vw;
		height: 100vh;
		background-image: url('/static/Gadget/gadget.png');
		background-size: cover;
		display: flex;
		flex-direction: column;
		align-items: center;

		.header {
			width: 100%;
			height: 550rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.title {
				position: relative;
				width: 100%;
				height: 100rpx;
				display: flex;
				align-items: center;

				.back {
					position: absolute;
					width: 80rpx;
					height: 75rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.logo {
				position: relative;
				display: flex;
				height: 100%;
				flex-direction: column;

				.logo-first {
					display: flex;
					align-items: center;

					.logo-icon {
						width: 190rpx;
						height: 185rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.logo-text {
						width: 480rpx;
						height: 250rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}

				.rabbit {
					position: absolute;
					width: 230rpx;
					height: 260rpx;
					right: -20rpx;
					bottom: 0;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.content {
			display: flex;
			flex-direction: column;
			width: 670rpx;
			padding-top: 50rpx;
			height: calc(100vh - 550rpx);

			.login-container {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 0 60rpx;

				.input-group {
					position: relative;
					width: 100%;
					margin-bottom: 60rpx;

					.input-item {
						display: flex;
						height: 95rpx;
						align-items: center;
						margin-bottom: 45rpx;
						padding: 20rpx 25rpx;
						border-radius: 30rpx;
						background-image: url('/static/Gadget/Rectangle 4.png');
						background-size: 100% 100%;

						.input-icon {
							width: 60rpx;
							height: 60rpx;
							margin-right: 25rpx;
						}

						.input-box {
							flex: 1;
							border: none;
							background: transparent;
							font-size: 30rpx;
						}
					}

					.forget-password {
						position: absolute;
						width: 180rpx;
						height: 55rpx;
						right: 0;
						bottom: -8rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}

				.confirm-btn {
					display: flex;
					justify-content: center;
					width: 100%;

					.btn {
						width: 240rpx;
						height: 105rpx;
						background-image: url('/static/Gadget/Rectangle 3.png');
						background-size: 100% 100%;
						padding: 0rpx 20rpx;
						padding-bottom: 10rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
	}
</style>