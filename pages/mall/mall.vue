<template>
	<div>
		<div class="bg">
			<image src="/static/Mall/bg.png"></image>
		</div>
		<div class="MallTitle">
			<div class="back" @click="goBack">
				<image src="/static/Mall/back.png" mode="aspectFit" class="left-icon"></image>
			</div>
			<div class="text">海量商品任你选！</div>
		</div>
		<div class="search">
			<span class="icon">
				<image src='/static/Mall/Vector.png'></image>
			</span>
			<input type="text" placeholder="🔥品牌补贴 低至五折优惠">
			<div class="search-img">
				<image src='/static/Mall/search-img.png'></image>
			</div>
		</div>
		<div class="tab">
			<div class="tab-item">
				<image src="/static/Mall/tab1.png" </image>
			</div>
			<div class="tab-item">
				<image src="/static/Mall/tab2.png" </image>
			</div>
			<div class="tab-item">
				<image src="/static/Mall/tab3.png" </image>
			</div>
			<div class="tab-item">
				<image src="/static/Mall/tab4.png" </image>
			</div>
			<div class="tab-item">
				<image src="/static/Mall/tab5.png" </image>
			</div>
		</div>
		<div class="recommend">
			<div class="title">精品推荐</div>
			<div class="content">
				<div class="content1">
					<image src="/static/Mall/content1.png" mode=""></image>
				</div>
				<div class="content2">
					<image src="/static/Mall/content2.png" mode=""></image>
				</div>
				<div class="content3">
					<image src="/static/Mall/content3.png" mode=""></image>
				</div>
			</div>
		</div>
		<div class="footer">
			<div class="footer-item">
				<image src="/static/Mall/footer1.png" </image>
			</div>
			<div class="footer-item">
				<image src="/static/Mall/footer2.png" </image>
			</div>
			<div class="footer-item">
				<image src="/static/Mall/footer3.png" </image>
			</div>
			<div class="footer-item">
				<image src="/static/Mall/footer4.png" </image>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		z-index: -1;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.MallTitle {
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;

		.back {
			width: 80rpx;
			height: 75rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.text {
			color: #F57D67;
			font-weight: 700;
			font-size: 40rpx;
		}
	}

	.search {
		margin-top: 88rpx;
		width: 100%;
		height: 84rpx;
		padding: 0 25rpx;
		position: relative;
		display: flex;
		align-items: center;

		.icon {
			position: absolute;
			left: 45rpx;
			width: 48rpx;
			height: 50rpx;

			image {
				width: 100%;
				height: 100%;
			}

		}

		input {
			width: 100%;
			height: 100%;
			padding-left: 3em;
			border: 4rpx #F66452 solid;
			border-radius: 42rpx;
			font-size: 30rpx;
		}

		.search-img {
			position: absolute;
			top: -180rpx;
			right: 40rpx;
			width: 250rpx;
			height: 210rpx;

			image {
				width: 100%;
				height: 100%;
			}

		}
	}

	.tab {
		width: 100%;
		height: 215rpx;
		padding: 30rpx 25rpx;
		display: flex;
		justify-content: space-around;

		.tab-item {
			flex: 1;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.recommend {
		width: 100%;
		padding: 0rpx 30rpx;

		.title {
			height: 50rpx;
			border-left: 12rpx #F66452 solid;
			font-size: 30rpx;
			padding-left: 5rpx;
			font-weight: 700;
		}

		.content {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.content1 {
				width: 100%;
				height: 160rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.content2 {
				width: 100%;
				height: 190rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.content3 {
				width: 100%;
				height: 320rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.footer {
		width: 100%;
		height: 120rpx;
		display: flex;
		justify-content: space-around;

		.footer-item {
			width: 110rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>