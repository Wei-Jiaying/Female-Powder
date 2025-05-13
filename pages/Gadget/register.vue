<template>
	<div class="register">
		<div class="header">
			<div class="title">
				<div class="back" @click="goBack">
					<image src="/static/back.png" mode=""></image>
				</div>
				<div class="text">
					<image src="/static/Gadget/title3.png"></image>
				</div>
			</div>
			<div class="logo">
				<image src="/static/logo.png"></image>
			</div>
		</div>
		<div class="content">
			<view class="register-container">
				<!-- 输入框部分 -->
				<view class="input-group">
					<view class="input-item item1">
						<image src="/static/Gadget/icon3.png" class="input-icon"></image>
						<input type="text" placeholder="请输入账号" class="input-box" v-model="username" />
					</view>
					<view class="input-item item2">
						<image src="/static/Gadget/icon4.png" class="input-icon"></image>
						<input type="password" placeholder="请输入密码" class="input-box" v-model="password" />
					</view>
					<view class="input-item item2">
						<image src="/static/Gadget/icon5.png" class="input-icon"></image>
						<input type="password" placeholder="再次输入密码" class="input-box" v-model="confirmPassword" />
					</view>
				</view>

				<!-- 确定按钮 -->
				<view class="confirm-btn">
					<div class="btn" @click="handleRegister">
						<image src="/static/Gadget/confirm.png"></image>
					</div>
				</view>

				<!-- 协议部分 -->
				<view class="agreement-group">
					<!-- <checkbox-group v-model="agreePrivacy" @change="onAgreeChange">
						<label>
							<checkbox value="1" />
						</label>
					</checkbox-group> -->
					<checkbox-group @change="onAgreeChange">
						<label>
							<checkbox value="1" />
						</label>
					</checkbox-group>
					<div class="agreement-text">
						<image src="/static/Gadget/text4.png"></image>
					</div>
				</view>
			</view>
		</div>
	</div>
</template>

<script>
	import {registApi} from '../../request/aip/login'
	
	export default {
		data() {
			return {
				username: '',
				password: '',
				confirmPassword: '',
				agreePrivacy: [] // 使用数组来存储勾选的值
			};
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			onAgreeChange(e) {
				// console.log('Checkbox changed, selected values:', e.detail.value); // 输出选中的值
				this.agreePrivacy = e.detail.value; // 更新 agreePrivacy
			},
			async handleRegister() {
			  try {
			    console.log('最终提交的表单数据：', {
			      username: this.username,
			      password: this.password,
			      confirmPassword: this.confirmPassword,
			      agreePrivacy: this.agreePrivacy ? '1' : '0'
			    });
			
			    // 表单验证
			    if (!this.username) {
			      uni.showToast({ title: '请输入账号', icon: 'none' });
			      return;
			    }
			    
			    if (!this.password) {
			      uni.showToast({ title: '请输入密码', icon: 'none' });
			      return;
			    }
			    
			    if (this.password !== this.confirmPassword) {
			      uni.showToast({ title: '两次输入密码不一致', icon: 'none' });
			      return;
			    }
			    
			    if (!this.agreePrivacy) {
			      uni.showToast({ title: '请同意隐私协议', icon: 'none' });
			      return;
			    }
			
			    // 调用注册API
			    const res = await registApi({
			      username: this.username,
			      password: this.password,
			      confirmpassword: this.confirmPassword,
			      agreePrivacy: '1'
			    });
			
			    console.log('注册接口返回数据:', res);
			    
			    // 处理API响应
			    if (res.data.code === 1) {
			      uni.showToast({
			        title: '注册成功',
			        icon: 'success',
			        duration: 2000
			      });
			      
			      // 注册成功后跳转到登录页
			      setTimeout(() => {
			        uni.navigateTo({
			          url: '/pages/Gadget/login'
			        });
			      }, 2000);
			      
			    } else {
			      // 业务错误处理
			      uni.showToast({
			        title: res.msg || '注册失败，请重试',
			        icon: 'none'
			      });
			    }
			    
			  } catch (error) {
			    // 网络错误处理
			    console.error('注册请求异常:', error);
			    uni.showToast({
			      title: '网络请求失败，请检查网络连接',
			      icon: 'none'
			    });
			  }
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
			background-image: url('/static/Gadget/register.png');
			background-size: 100% 100%;
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
				margin-top: 35rpx;
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
			transform: translateY(-135rpx);
			height: calc(100vh - 550rpx);
			background-image: url('/static/Gadget/register2.png');
			background-size: 100% 100%;
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
						height: 95rpx;
						align-items: center;
						margin-bottom: 45rpx;
						padding: 20rpx 25rpx;
						border-radius: 30rpx;

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

					.item1 {
						background-image: url('/static/Gadget/Rectangle 4.png');
						background-size: 100% 100%;
					}

					.item2 {
						background-image: url('/static/Gadget/Rectangle 6.png');
						background-size: 100% 100%;
					}
				}

				.confirm-btn {
					display: flex;
					justify-content: center;
					width: 100%;
					margin-bottom: 120rpx;

					.btn {
						width: 200rpx;
						height: 95rpx;
						background-image: url('/static/Gadget/Rectangle 3.png');
						background-size: 100% 100%;
						padding: 10rpx 20rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}

				.agreement-group {
					width: 100%;
					display: flex;
					align-items: center;

					checkbox-group {
						transform: scale(0.7);
					}

					.agreement-text {
						width: 600rpx;
						height: 60rpx;
						transform: translate(-20rpx, 8rpx);

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