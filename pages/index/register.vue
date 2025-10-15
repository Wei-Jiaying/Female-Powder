<template>
	<view class="register">
		<view class="header">
			<image src="/static/Gadget/register.png" class="image"></image>
			<view class="logo">
				<image src="/static/logo.png"></image>
			</view>
		</view>
		<view class="content">
			<view class="register-container">
				<!-- 输入框部分 -->
				<view class="input-group">
					<view class="input-item item1">
						<image src="/static/Gadget/icon3.png" class="input-icon"></image>
						<input type="text" placeholder="请输入账号" class="input-box" v-model="username" />
					</view>
					<view class="input-item item2">
						<image :src="showPassword ? '/static/Gadget/icon5.png' : '/static/Gadget/icon4.png'"
							class="input-icon" @click="showPassword = !showPassword"></image>
						<input :type="showPassword ? 'text' : 'password'" placeholder="请输入密码" class="input-box"
							v-model="password" />
					</view>
					<view class="input-item item2">
						<image :src="showConfirmPassword ? '/static/Gadget/icon5.png' : '/static/Gadget/icon4.png'"
							class="input-icon" @click="showConfirmPassword = !showConfirmPassword"></image>
						<input :type="showConfirmPassword ? 'text' : 'password'" placeholder="再次输入密码" class="input-box"
							v-model="confirmPassword" />
					</view>
				</view>

				<!-- 确定按钮 -->
				<view class="confirm-btn">
					<view class="btn" @click="handleRegister">
						确定
					</view>
				</view>

				<!-- 协议部分 -->
				<view class="agreement-group">
					<checkbox-group @change="onAgreeChange">
						<label>
							<checkbox value="1" />
						</label>
					</checkbox-group>
					<view class="agreement-text">
						阅读并同意<text class="agreement-link">《业务开展协议》</text>和<text class="agreement-link">《隐私协议》</text>
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
				username: '',
				password: '',
				confirmPassword: '',
				agreePrivacy: [], // 使用数组来存储勾选的值
				showPassword: false, // 控制密码是否可见
				showConfirmPassword: false // 控制确认密码是否可见
			};
		},
		methods: {
			onAgreeChange(e) {
				this.agreePrivacy = e.detail.value; // 更新 agreePrivacy
			},
			handleRegister() {
				console.log('最终提交的表单数据：', {
					username: this.username,
					password: this.password,
					confirmPassword: this.confirmPassword,
					agreePrivacy: 1 // 直接使用 agreePrivacy
				});

				if (!this.username) {
					uni.showToast({
						title: '请输入账号',
						icon: 'none'
					});
					return;
				}
				if (!this.password) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					});
					return;
				}
				if (this.password !== this.confirmPassword) {
					uni.showToast({
						title: '两次输入密码不一致',
						icon: 'none'
					});
					return;
				}
				if (!this.agreePrivacy.includes('1')) {
					uni.showToast({
						title: '请同意隐私协议',
						icon: 'none'
					});
					return;
				}


				uni.request({
					url: '/api/register',
					method: 'POST',
					header: {
						'Content-Type': 'application/json',
						// 'X-Bypass-Auth': 'true' 
					},
					data: {
						username: this.username,
						password: this.password,
						confirmpassword: this.confirmPassword,
						agreePrivacy: 1 // 将协议值传递为 '1' 或 '0'
					},
					success: (res) => {
						console.log('注册接口返回数据:', res.data); // 新增打印返回数据
						if (res.data.code === 1) {
							uni.showToast({
								title: '注册成功',
								icon: 'success'
							});
							uni.navigateTo({
								url: '/pages/Gadget/login'
							});
						} else {
							uni.showToast({
								title: res.data.msg || '登录失败',
								icon: 'none',
							});
						}
					},
					fail: (err) => {
						console.error('注册请求失败', err);
						uni.showToast({
							title: '网络请求失败',
							icon: 'none'
						});
					}
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	.register {
		display: flex;
		flex-direction: column;
		align-items: center;

		.header {
			width: 100vw;
			height: 530rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;

			.image {
				position: absolute;
				top: 0;
				left: 0;
				width: 100vw;
				height: 530rpx;
				z-index: -1;
				object-fit: cover;
			}

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

				.text {
					margin: 0 auto;
					width: 280rpx;
					height: 72rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.logo {
				margin-top: 65rpx;
				width: 190rpx;
				height: 185rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.content {
			width: 670rpx;
			transform: translateY(-180rpx);
			background-color: #FFFFFF;
			box-shadow: 1px 0 3px 0 rgba(0, 0, 0, 0.05);
			border-radius: 60rpx;
			padding-top: 100rpx;

			.register-container {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 0 60rpx;

				.input-group {
					width: 100%;
					margin-bottom: 40rpx;

					.input-item {
						display: flex;
						height: 90rpx;
						/* 增加高度提升体验 */
						border-radius: 43rpx;
						align-items: center;
						margin-bottom: 45rpx;
						padding: 0 25rpx;
						/* 调整内边距 */
						background-color: #F2F9FF;
						box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.1);
						/* 优化阴影柔和度 */

						.input-icon {
							width: 50rpx;
							/* 微调图标大小 */
							height: 50rpx;
							margin-right: 25rpx;
							flex-shrink: 0;
							/* 防止图标被压缩 */
						}

						.input-box {
							flex: 1;
							border: none;
							background: transparent;
							font-size: 30rpx;
							height: 100%;
							/* 占满输入框高度 */
							line-height: 90rpx;
							/* 垂直居中 */
						}

						/* 密码可见性图标样式 */
						.eye-icon {
							width: 45rpx;
							height: 45rpx;
							margin-left: 15rpx;
							flex-shrink: 0;
							/* 防止图标被压缩 */
							cursor: pointer;
							/* 提示可点击 */
						}
					}
				}

				.confirm-btn {
					display: flex;
					justify-content: center;
					width: 100%;
					margin-bottom: 160rpx;

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

				.agreement-group {
					width: 100%;
					margin-left: -20rpx;
					display: flex;
					align-items: center;

					checkbox-group {
						transform: scale(0.7);
					}

					.agreement-text {
						font-size: 28rpx;
						font-weight: 600;
						white-space: nowrap;
					}

					.agreement-link {
						color: #FF0000;
					}
				}
			}

		}
	}
</style>