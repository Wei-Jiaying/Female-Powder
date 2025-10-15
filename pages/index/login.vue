<template>
	<view class="login">
		<image src="/static/Gadget/gadget.png" class="image"></image>
		<view class="header">
			<view class="logo">
				<view class="logo-first">
					<view class="logo-icon">
						<image src="/static/logo.png"></image>
					</view>
					<view class="logo-text">
						<image src="/static/Gadget/title4.png"></image>
					</view>
				</view>
				<view class="rabbit">
					<image src="/static/Gadget/rabbit.png"></image>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="login-container">
				<!-- 输入框部分 -->
				<view class="input-group">
					<view class="input-item item1">
						<image src="/static/Gadget/icon3.png" class="input-icon"></image>
						<input type="text" placeholder="账号" class="input-box" v-model="username" />
					</view>
					<view class="input-item item2">
						<image
							:src="showPassword ? '/static/Gadget/icon5.png' : '/static/Gadget/icon6.png'"
							class="input-icon" 
							@click="showPassword = !showPassword"
						></image>
						<input 
							:type="showPassword ? 'text' : 'password'" 
							placeholder="密码" 
							class="input-box" 
							v-model="password" 
						/>
					</view>
					<view class="forget-password">
						忘记密码？
					</view>
				</view>

				<!-- 确定按钮 -->
				<view class="confirm-btn">
					<view class="btn" @click="handleLogin">
						登录
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '', // 绑定账号输入框
				password: '', // 绑定密码输入框
				showPassword: false // 新增：控制密码显示/隐藏的状态
			};
		},
		methods: {
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
							uni.switchTab({
								url: '/pages/index/index'
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
		position: relative;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;

		.image {
			position: absolute;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			z-index: -1;
			object-fit: cover;
		}


		.header {
			width: 100%;
			height: 550rpx;
			margin-top: 40rpx;
			display: flex;
			flex-direction: column;
			align-items: center;


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
						height: 240rpx;

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
					bottom: 20rpx;

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
						height: 70rpx;
						align-items: center;
						margin-bottom: 45rpx;
						padding: 20rpx 25rpx;
						border-radius: 43rpx;
						background-color: #F2F9FF;
						box-shadow: 4px 2px 4px 0px rgba(55, 0, 205, 0.25);
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

						// 新增：密码显示/隐藏图标样式
						.eye-icon {
							width: 50rpx;
							height: 50rpx;
							margin-left: 15rpx;
							cursor: pointer; // 提示可点击
							flex-shrink: 0; // 防止图标被压缩
						}
					}

					.forget-password {
						position: absolute;
						width: 180rpx;
						height: 55rpx;
						right: 0;
						bottom: -20rpx;
						font-size: 36rpx;
						color: #333;

					}
				}

				.confirm-btn {
					display: flex;
					justify-content: center;
					width: 100%;

					.btn {
						width: 240rpx;
						height: 80rpx;
						border-radius: 43rpx;
						background: linear-gradient(to bottom, #F7D6F8, #FFFFFF, #E8D4FF);
						box-shadow: 4px 4px 4px 0px rgba(55, 0, 205, 0.25);
						padding: 0rpx 20rpx;
						padding-bottom: 10rpx;
						text-align: center;
						font-weight: 600;
						font-size: 48rpx;
						line-height: 80rpx;
					}
				}
			}
		}
	}
</style>