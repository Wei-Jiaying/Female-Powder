<template>
	<div class="person-center">
		<div class="title">
			<div class="big-title">
				<div class="logo">
					<image src="/static/logo.png"></image>
				</div>
				<div class="text">
					<image src="/static/Gadget/title1.png"></image>
				</div>
			</div>
			<div class="small-title">
				<image src="/static/Gadget/title2.png"></image>
			</div>
		</div>
		<div class="content"></div>
		<div class="login">
			<div class="login-item" @click="handleLogin">
				<div class="icon">
					<image src="/static/Gadget/icon1.png"></image>
				</div>
				<div class="text1">
					<image src="/static/Gadget/text1.png"></image>
				</div>
			</div>
			<div class="login-item">
				<div class="icon">
					<image src="/static/Gadget/icon2.png"></image>
				</div>
				<div class="text2">
					<image src="/static/Gadget/text2.png"></image>
				</div>
			</div>
		</div>
		<div class="register" @click="handleRegister">
			<image src="/static/Gadget/text3.png"></image>
		</div>
	</div>
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
			}
		},

	}
</script>

<style scoped lang="scss">
	.person-center {
		width: 100vw;
		height: 100vh;
		padding-top: 60rpx;
		background-image: url('/static/Gadget/gadget.png');
		background-size: cover;
		display: flex;
		flex-direction: column;
		align-items: center;

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
			background-image: url('/static/Gadget/personCenter.png');
			background-size: 100% 100%;
		}

		.login {
			display: flex;
			flex-direction: column;

			.login-item {
				width: 650rpx;
				height: 100rpx;
				background-image: url('/static/Gadget/Rectangle1.png');
				background-size: 100% 100%;
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
			width: 270rpx;
			height: 55rpx;
			padding-left: 40rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>