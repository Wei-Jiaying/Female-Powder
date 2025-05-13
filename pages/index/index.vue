<template>
    <div class="page-container">
        <div class="bg">
            <div class="bgImg"></div>
        </div>
        <div class="SearchBAr">
            <img src="/static/Index/SearchDc.png" alt="装饰图标" class="decorative-icon">
            <div class="search-container">
                <img src="/static/Index/SearchingImg.png" alt="搜索形状图标" class="search-icon">
                <input type="text" placeholder="请输入搜索内容" class="search-input">
                <span class="search-button">搜索</span>
            </div>
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
        <div class="tweet-section">
            <div class="tweet-title">
                <image src="/static/Index/twDc.png" mode="widthFix" class="tweet-title-img"></image>
                <span :class="{ 'active': activeTab === 'tweet' }" @click="activeTab = 'tweet'">推文</span>
                <span :class="{ 'active': activeTab === 'community' }" @click="activeTab = 'community'">社区</span>
                <div class="decoration-line" :style="{ left: lineLeft, width: lineWidth }"></div>
            </div>
            <div class="tweet-items-container">
                <div v-for="(tweet, index) in tweets" :key="index" class="tweet-item" @click="ClickTweet(tweet)">
                    <div class="tweet-time">{{ formatDate(tweet.createTime) }}</div>
                    <div class="tweet-content">
                        <div class="item-left">
                            <div class="tweet-title-text">{{ tweet.title }}</div>
                            <div class="stats-container">
                                <span class="stats">阅读: {{ tweet.viewCounts }}</span>
                                <span class="stats">赞：{{ tweet.likeCounts }}</span>
                                <span class="stats">分享：{{ tweet.shareCounts }}</span>
                            </div>
                        </div>
                        <div class="item-right">
                            <image :src="getImageUrl(tweet.imageUrl)" mode="aspectFill"></image>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		<div class="zw">___</div>
    </div>
</template>

<script>
import {getArticleApi} from '../../request/aip/article.js'

export default {
    data() {
        return {
            ImagesList: [
                        'https://picsum.photos/id/1000/800/400', // 女性健康相关图片
                        'https://picsum.photos/id/1011/800/400', // 家庭与生育相关图片
                        'https://picsum.photos/id/1027/800/400'  // 女性自我关爱相关图片
                    ],
            functionItems: [
                { image: '/static/Index/fc1.png', title: '健康知识库' },
                { image: '/static/Index/fc2.png', title: '中医小宝典' },
                { image: '/static/Index/fc3.png', title: '随心记便签' },
                { image: '/static/Index/fc4.png', title: '看懂病历单' },
                { image: '/static/Index/fc5.png', title: '拍照帮识图' },
                { image: '/static/Index/fc6.png', title: '看懂病历单' },
                { image: '/static/Index/fc7.png', title: '经验交流区' },
                { image: '/static/Index/fc8.png', title: '专家咨询室' }
            ],
            activeTab: 'tweet',
            tweets: []
        };
    },
    computed: {
        lineLeft() {
            if (this.activeTab === 'tweet') {
                return '33.33%';
            } else {
                return '66.66%';
            }
        },
        lineWidth() {
            return '33.33%';
        }
    },
    onLoad() {
        console.log(123)
        this.initArticleData()
    },
    methods: {
        async initArticleData(){
            try {
                const res = await getArticleApi()
                console.log('获取推文数据成功:', res.data.data)
                if (res.data && res.data.data) {
                    this.tweets = res.data.data
                }
            } catch (error) {
                console.error('获取推文数据失败:', error)
                uni.showToast({
                    title: '获取推文数据失败',
                    icon: 'none'
                })
            }
        },
        ClickFunctionItem(moduleName) {
            console.log(`点击的功能模块名：${moduleName}`);
            // 修正 switch 语句语法
            switch (moduleName) {
                case '中医小宝典':
                    console.log(123);
                    //跳转到中医页
                    uni.navigateTo({
                        url:'/pages/health/health'
                    })
                    break;
                default:
                    break;
            }
        },
        ClickTweet(tweet) {
            console.log('点击的推文信息：', tweet);
        },
        formatDate(dateString) {
            if (!dateString) return ''
            // 处理ISO格式的日期字符串
            const date = new Date(dateString)
            return date.toLocaleDateString() // 返回类似 "2025/03/30" 的格式
        },
        getImageUrl(imageUrl) {
            // 处理图片URL，如果为"0"或空则使用默认图片
            if (!imageUrl || imageUrl === '0') {
                return 'https://picsum.photos/100/100' // 默认图片
            }
            return imageUrl
        }
    }
};
</script>

<style lang="scss">
html, body {
    height: 100%;
    overflow: hidden;
}
.zw{
	display:block;
	width: 100vw;
	height: 50px;
	scale:5;
	
}
.page-container {
    height: 100%;
    overflow-y: auto; // 允许内容滚动
    padding-bottom: 60rpx; // 添加底部边距
    box-sizing: border-box;
}

.bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: -1;
}

.bgImg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70%;
    background: linear-gradient(180deg, #FDF7D5 0%, #F9DFEF 15%, #F2DDFF 23%, #FFFFFF 41.5%);
    transform-origin: top left;
    transform: scaleY(1.2);
}

.SearchBAr {
    height: 10vh;
    display: flex;
    align-items: center;
    padding: 0 40rpx;
}

.decorative-icon {
    height: 60%;
    margin-right: 20rpx;
}

.search-container {
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 50rpx;
    padding: 10rpx 30rpx;
    box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
    width: 95%;
}

.search-icon {
    height: 40rpx;
    margin-right: 20rpx;
}

.search-input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 32rpx;
}

.search-button {
    background-color: #FFCC00;
    color: black;
    border-radius: 40rpx;
    padding: 16rpx 40rpx;
    margin-left: 20rpx;
    cursor: pointer;
}

.swiper-container {
    width: 95vw;
    height: 20vh;
    margin: 0 auto;
    margin-top: 0vh;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    border-radius: 25rpx;
}

.swiper-container image {
    width: 100%;
    height: 100%;
    border-radius: 25rpx;
    overflow: hidden;
}

.function-container {
    width: 90vw;
    margin: 0 auto;
    margin-top: 3vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    position: relative;
    border-radius: 15px;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
    padding: 20px;
}

.function-item {
    width: 23%;
    height: auto;
    margin-bottom: 2vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 8px;
    padding: 10px;
    scale: 1.5;
}

.function-item image {
    width: 50%;
    height: auto;
}

.function-item span {
    margin-top: 1vh;
    font-size: 15rpx;
    color: #333;
}

.tweet-section {
    width: 90vw;
    margin: 0 auto;
    margin-top: 3vh;
    margin-bottom: 40rpx; // 为推文区域添加底部边距
}

.tweet-title {
    display: flex;
    align-items: center;
    position: relative;
    width: 50%;
}

.tweet-title-img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    flex: 1;
}

.tweet-title span {
    flex: 1;
    text-align: center;
    padding: 10px 0;
    cursor: pointer;
    color: #D4D4D4;
}

.tweet-title span.active {
    color: black;
}

.decoration-line {
    position: absolute;
    bottom: 0;
    height: 2px;
    background: #F3B7B6;
    transition: left 0.3s ease;
}

.tweet-items-container {
    width: 100%;
    overflow-y: auto;
    max-height: 40vh; // 使用视口高度百分比，更具响应性
}

.tweet-item {
    display: flex;
    margin-top: 20px;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
    width: 100%;
    position: relative;
    flex-direction: column;
}

.tweet-time {
    color: #D4D4D4;
    position: absolute;
    top: 0;
    left: 0;
}

.tweet-content {
    display: flex;
    margin-top: 20px;
}

.item-left {
    flex: 1;
    margin-left: 0;
    display: flex;
    flex-direction: column;
}

.tweet-title-text {
    font-weight: bold;
    margin-bottom: 5px;
}

.stats-container {
    display: flex;
    gap: 10px;
}

.item-right {
    width: 60px;
    height: 60px;
    margin-left: 20px;
    overflow: hidden;
}

.item-right image {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.stats {
    color: #F3B7B6;
}
</style>