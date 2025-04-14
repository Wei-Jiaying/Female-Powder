<template>
    <div>
        <div class="title">
            <!-- 左边返回键 -->
            <image class="bg-image1" src="/static/back.png" @click="goBack" mode="widthFix">在页面顶部的左边，为左返回键</image>
            <!-- 右边标题艺术字 -->
            <image class="bg-image2" src="/static/Health/title.png" mode="widthFix">在页面的右边，为标题艺术字</image>
        </div>
        <div class="bg-container">
            <image class="bg-image1" src="/static/Health/bg1.png" alt="背景图1"></image>
            <image class="bg-image2" src="/static/Health/bg2.png" alt="背景图2"></image>
        </div>
        <swiper class="swiper-container" indicator-dots autoplay interval="5000" circular>
            <swiper-item v-for="(image, index) in ImagesList" :key="index">
                <image :src="image" mode="aspectFill"></image>
            </swiper-item>
        </swiper>
        <div class="function-container">
            <div v-for="(functionItem, index) in functionItems" :key="index" class="function-item" @click="ClickFunctionItem(functionItem.title)">
                <image :src="functionItem.image" mode="widthFix"></image>
                <span>{{functionItem.title}}</span>
            </div>
        </div>
        <div class="recommend-container">
            <div class="recommend-title">
                <div class="recommend-title-square"></div>
                <div class="recommend-title-text">今日推荐</div>
            </div>
            <div class="recommend-images">
                <image v-for="(recommendImage, index) in recommendImages" :key="index" :src="recommendImage" mode="widthFix" class="recommend-image" @click="ClickRecommend(recommendImage)"></image>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BackgroundPage',
    data() {
        return { 
            ImagesList: [
                // 这里可以替换为实际的图片链接
                'https://picsum.photos/800/600?random=1',
                'https://picsum.photos/800/600?random=2',
                'https://picsum.photos/800/600?random=3'
            ],
            functionItems: [
                { image: '/static/Health/lg1.png', title: '膳食养生' },
                { image: '/static/Health/lg2.png', title: '中药养生' },
                { image: '/static/Health/lg3.png', title: '中医听诊' },
                { image: '/static/Health/lg4.png', title: '经络医学' },
                { image: '/static/Health/lg5.png', title: '在线开方' },
                { image: '/static/Health/lg6.png', title: '中医古籍' },
                { image: '/static/Health/lg7.png', title: '诀窍常识' }
            ],
            recommendImages: [
                // 这里可以替换为实际的推荐图片链接
                'https://picsum.photos/300/200?random=1',
                'https://picsum.photos/300/200?random=2',
                'https://picsum.photos/300/200?random=3',
                'https://picsum.photos/300/200?random=4'
            ]
        };
    },
    methods: {
        // 返回上一页的方法
        goBack() {
            uni.navigateBack({
                delta: 1
            });
        },
        ClickFunctionItem(title) {
            console.log(title);
        },
        ClickRecommend(image) {
            console.log(image);
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 7vh;
    padding: 10px;
    position: relative;
    z-index: 1; // 确保标题在背景图之上
}

.title .bg-image1 {
    width: 10vw;
}

.title .bg-image2 {
    width: 30vw;
    transform: translateY(50%);
}

.bg-container {
    background: linear-gradient(6.78deg, #F7F1E1 41.18%, #DDCAA0 93.37%);
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0; // 确保背景图在最底层
    overflow: hidden;
}

.bg-container .bg-image1 {
    position: absolute;
    top: 0;
    left: 0;
    width: 80%;
    height: 20%;
    object-fit: cover;
    opacity: 0.8;
}

.bg-container .bg-image2 {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 70%;
    height: 30%;
    object-fit: cover;
}

.swiper-container {
    width: 90vw;
    height: 20vh;
    margin: 0 auto;
    margin-top: 7vh; /* 标题栏高度 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* 黑色背景阴影 */
    border-radius: 25rpx;
}

.swiper-container image {
    width: 100%;
    height: 100%;
    border-radius: 25rpx;
    overflow: hidden;
}

.function-container {
    width: 80vw;
    margin: 0 auto;
    margin-top: 5vh; /* 轮播图下方的间距 */
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    position: relative;
}

.function-container::before,
.function-container::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 98%;
    height: 3rpx;
    background-color: #9C6A251F;
}

.function-container::before {
    top: -2.5vh; /* 上分割线位置 */
}

.function-container::after {
    bottom: -2.5vh; /* 下分割线位置 */
}

.function-item {
    width: 23%; /* 每个小模块宽度占1/4，这里设置为23%以留出一些间隙 */
    height: auto; /* 高度自适应 */
    margin-bottom: 0vh; /* 增加底部间距 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 8px; /* 圆角边框 */
    padding: 10px; /* 内边距 */
    scale: 1.2;
}

.function-item image {
    width: 50%;
    height: auto; /* 图片高度自适应 */
}

.function-item span {
    margin-top: 1vh;
    font-size: 14px;
    color: #333; /* 明确文字颜色 */
}

.recommend-container {
    width: 100vw;
    height: 30vh;
    margin-top: 5vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.recommend-title {
    width: 80vw;
    display: flex;
    align-items: center;
    margin-bottom: 2vh;
    z-index: 3;
}

.recommend-title-square {
    width: 10px;
    height: 30px;
    background-color: #9C6A25;
    margin-right: 10px;
}

.recommend-title-text {
    font-size: 18px;
    font-weight: bold;
}

.recommend-images {
    width: 80vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.recommend-image {
    width: 45%;
    height: auto;
    border-radius: 10px;
    margin-bottom: 1vh;
}
</style>    