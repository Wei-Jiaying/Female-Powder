<template>
    <div>
        <div class="bg"></div>
        <!-- 这里可以添加其他内容 -->
        <div class="exercise-guide">
            <div class="title-bar">
                <image src="/static/HealthSport/titleDc.png" mode=""></image>
                <image src="/static/HealthSport/sprotTitle.png" mode=""></image>
            </div>
            <div class="exercise-details">
                <scroll-view scroll-y style="height: 100%;">
                    <div class="cardItem" v-for="(exercise, index) in visibleExercises" :key="index">
                        <div class="exercise-name">{{ exercise.name }}</div>
                        <div class="info-item">
                            <image src="/static/HealthSport/bt1.png" mode=""></image>
                            <div>安全性：{{ exercise.safety }}</div>
                        </div>
                        <div class="info-item">
                            <image src="/static/HealthSport/bt2.png" mode=""></image>
                            <div>环境选择：{{ exercise.environment }}</div>
                        </div>
                        <div class="info-item">
                            <image src="/static/HealthSport/bt3.png" mode=""></image>
                            <div>身体反应：{{ exercise.reaction }}</div>
                        </div>
                    </div>
                </scroll-view>
            </div>
        </div>

        <div class="exercise-guide environment-guide">
            <div class="title-bar">
                <image src="/static/HealthSport/titleDc2.png" mode=""></image>
                <image src="/static/HealthSport/sportTitle2.png" mode=""></image>
            </div>
            <div class="environment-data-wrapper">
                <div class="environment-data">
                    <div class="card-item" v-for="(item, index) in environmentItems" :key="index">
                        <div class="item-title">
                            <image :src="`/static/HealthSport/dc${index + 1}.png`" mode=""></image>
                            <div>{{ item.title }}</div>
                        </div>
                        <div class="item-content" :style="{ background: item.bgColor }">
                            {{ item.content }}
                        </div>
                    </div>
                </div>
                <div class="warm-tip">
                    <div class="tip-title">温馨小提示</div>
                    <span>{{ currentTip }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            exercises: [
                { 
                    name: '跑步', 
                    safety: '高', 
                    environment: '公园、操场等开阔地', 
                    reaction: '呼吸加快、微微出汗' 
                },
                { 
                    name: '孕妇瑜伽', 
                    safety: '中', 
                    environment: '安静舒适的室内', 
                    reaction: '身体微微发热、放松' 
                },
                { 
                    name: '游泳', 
                    safety: '高', 
                    environment: '游泳池', 
                    reaction: '心跳加快、肌肉舒展' 
                }
            ],
            environmentItems: [
                { title: '地点', content: '上海', bgColor: '#FFC7C7', textColor: '#B00014' },
                { title: '天气', content: '晴', bgColor: '#B3CFFF', textColor: '#0038A1' },
                { title: '空气质量', content: '优', bgColor: '#ABEBED', textColor: '#00A9C7' },
                { title: '噪音检测', content: '正常', bgColor: '#FFD09B', textColor: '#D86800' },
                { title: '温湿度', content: '25℃，50%', bgColor: '#6AD4E8', textColor: '#04ACAC' },
                { title: '辐射/紫外线', content: '低', bgColor: '#D1A9FC', textColor: '#6310CC' }
            ],
            tips: [
                '运动前记得做好热身运动',
                '保持适当的运动强度',
                '运动后要进行拉伸放松'
            ],
            currentTip: '',
            tipInterval: null
        };
    },
    computed: {
        visibleExercises() {
            // 显示所有运动项目，而不是只显示前两个
            return this.exercises;
        }
    },
    mounted() {
        this.changeTip();
        this.tipInterval = setInterval(this.changeTip, 5000);
    },
    beforeDestroy() {
        clearInterval(this.tipInterval);
    },
    methods: {
        changeTip() {
            const randomIndex = Math.floor(Math.random() * this.tips.length);
            this.currentTip = this.tips[randomIndex];
        }
    }
};
</script>

<style scoped>
.bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: linear-gradient(to bottom, #FDF7D5 0%, #F9DFEF 25%, #F2DDFF 44.5%);
    z-index: -1;
}

body {
    overflow: hidden; /* 禁止整个页面上下滚动 */
}

.exercise-guide {
    width: calc(100% - 40px); /* 考虑四周间距 */
    height: 45vh;
    margin: 20px;
    border-radius: 8px; /* 圆角 */
}

.environment-guide {
    margin-top: 10px; /* 环境分析模块向上移一小点 */
    border-radius: 16px; /* 增大环境分析模块的圆角 */
}

.title-bar {
    display: flex;
    align-items: center;
    height: 5vh; /* 设置标题栏高度为 5vh */
    padding: 10px;
}

.title-bar image:first-child {
    height: 100%; /* 第一张图片高度占满标题栏 */
    width: 4vh;
    margin-right: 10px;
    object-fit: contain; /* 确保图片完整显示 */
}

.title-bar image:last-child {
    width: 15vw;
    height: 2vh; /* 第二张图片高度占满标题栏 */
    object-fit: contain; /* 确保图片完整显示 */
}

.exercise-details {
    height: calc(100% - 5vh); /* 减去标题栏高度 */
    overflow-y: auto;
    padding: 10px;
}

.cardItem {
    margin-bottom: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 20px; /* 增大卡片的圆角 */
    padding: 10px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.5) 100%);
}

.exercise-name {
    color: #92646E;
    margin-bottom: 10px;
    font-weight: bold;
}

.info-item {
    border-radius: 30rpx; 
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}

.info-item image {
    margin-right: 10px;
    width: 3vh;
    height: 3vh;
}

.environment-data-wrapper {
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.5) 100%);
    padding: 10px;
    border-radius: 16px; /* 增大环境分析模块内部容器的圆角 */
    height: calc(100% - 5vh);
}

.environment-data {
    height: 70%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.card-item {
    width: 30%;
    margin-bottom: 10px;
    border-radius: 16px; /* 增大环境分析模块内卡片的圆角 */
}

.item-title {
    display: flex;
    align-items: center;
    font-size: 25rpx;
}

.item-title image {
    width: 20px;
    height: 20px;
    margin-right: 5px;
}

.item-content {
    height: 50%;
    border-radius: 16px; /* 增大环境分析模块内卡片内容的圆角 */
    display: flex;
    align-items: center;
    justify-content: center;
}

.warm-tip {
    border: 1px solid black;
    border-radius: 16px; /* 增大温馨提示模块的圆角 */
    padding: 10px;
    position: relative;
    height: 30%;
}

.tip-title {
    position: absolute;
    top: 0;
    left: 0;
    padding: 5px;
    color: black;
}

.warm-tip span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>    