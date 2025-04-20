<template>
    <div>
        <div class="background"></div>
        <div class="exercise-guide-container">
            <div class="title-bar">
                <img class="icon-image" src="/static/HealthTool/ic1.png" alt="Icon">
                <img class="title-image" src="/static/HealthTool/title1.png" alt="Title">
                <div class="pregnancy-status-box" @click="changePregnancyStatus">
                    <span>{{pregnancyStatus}}</span>
                    <div class="triangle"></div>
                </div>
            </div>
            <div class="function-container">
                <div v-for="(functionItem, index) in functionItems" :key="index" class="function-item" @click="ClickFunctionItem(functionItem.title)">
                    <img :src="functionItem.image" alt="Function Icon">
                    <span>{{functionItem.title}}</span>
                </div>
            </div>
        </div>
        <div class="today-mood-guide">
            <div class="title-bar">
                <img src="/static/HealthTool/ic2.png" alt="Icon">
                <img src="/static/HealthTool/title2.png" alt="Title">
            </div>
            <div class="mood-images">
                <img v-for="(image, index) in moodImages" :key="index" :src="image" alt="Mood" :style="{ opacity: selectedMoodIndex === index ? 1 : 0.2 }" @click="selectMood(index)">
            </div>
        </div>
        <div class="today-mood-guide">
            <div class="title-bar">
                <img src="/static/HealthTool/ic3.png" alt="Icon">
                <img src="/static/HealthTool/title3.png" alt="Title">
            </div>
            <div class="card">
                <div class="fetal-info">
                    <p>孕三周5天 怀孕时间</p>
                    <p>预计还有 {{dueDays}} 天出生</p>
                    <div class="indicator-item">
                        <span class="indicator-title">胎儿预估</span>
                        <span>
                            体重：{{fetalWeight}}
                            身长：{{fetalLength}}
                        </span>
                    </div>
                    <div class="indicator-item">
                        <span class="indicator-title">胎儿预估</span>
                        <span>
                            体重：{{fetalWeight}}
                            身长：{{fetalLength}}
                        </span>
                    </div>
                    <div class="indicator-item">
                        <span class="indicator-title">胎心监测</span>
                        <span>{{heartRateStatus}}</span>
                    </div>
                    <div class="indicator-item">
                        <span class="indicator-title">产检提醒</span>
                        <label class="toggle-switch" @click="toggleCheckupReminder">
                            <input type="checkbox" :checked="checkupReminder" @change="toggleCheckupReminder">
                            <span class="slider" :class="{ 'slider-on': checkupReminder }"></span>
                        </label>
                    </div>
                </div>
                <img src="/static/HealthTool/dc1.png" alt="Decorative Image" class="decorative-image">
            </div>
            <div class="card">
                <label class="toggle-switch" @click="toggleShowHealthParams">
                    <input type="checkbox" :checked="showHealthParams" @change="toggleShowHealthParams">
                    <span class="slider" :class="{ 'slider-on': showHealthParams }"></span>
                </label>
                <div v-if="showHealthParams" class="health-params-container">
                    <div class="health-param" style="border: 1.5px solid #B8B7FF;">我的体重：{{myWeight}}</div>
                    <div class="health-param" style="border: 1.5px solid #5CC9FB;">血氧：{{bloodOxygen}}</div>
                    <div class="health-param" style="border: 1.5px solid #FF0000;">血压：{{bloodPressure}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pregnancyStatus: '孕期状态',
            pregnancyStatusOptions: ['孕早期', '孕中期', '孕晚期'],
            currentIndex: 0,
            functionItems: [
                { image: '/static/HealthTool/fc1.png', title: '情绪调节' },
                { image: '/static/HealthTool/fc2.png', title: '社区交流' },
                { image: '/static/HealthTool/fc3.png', title: '家人关怀' },
                { image: '/static/HealthTool/fc4.png', title: 'B超分析' },
                { image: '/static/HealthTool/fc5.png', title: '孕期百科' },
                { image: '/static/HealthTool/fc6.png', title: '穿搭指南' },
                { image: '/static/HealthTool/fc7.png', title: '孕期资讯' }
            ],
            moodImages: [
                '/static/HealthTool/bq0.png',
                '/static/HealthTool/bq1.png',
                '/static/HealthTool/bq2.png',
                '/static/HealthTool/bq3.png',
            ],
            selectedMoodIndex: -1,
            dueDays: 200,
            fetalWeight: '100g',
            fetalLength: '5cm',
            heartRateStatus: '在正常范围内',
            checkupReminder: true,
            showHealthParams: false,
            myWeight: '55kg',
            bloodOxygen: '98%',
            bloodPressure: '120/80mmHg'
        };
    },
    methods: {
        changePregnancyStatus() {
            this.currentIndex = (this.currentIndex + 1) % this.pregnancyStatusOptions.length;
            this.pregnancyStatus = this.pregnancyStatusOptions[this.currentIndex];
            console.log('当前选择的怀孕状态：', this.pregnancyStatus);
        },
        ClickFunctionItem(title) {
            console.log(`点击了 ${title} 功能`);
        },
        selectMood(index) {
            this.selectedMoodIndex = index;
            console.log(`选择了第 ${index + 1} 张图片`);
        },
        toggleCheckupReminder() {
            this.checkupReminder = !this.checkupReminder;
            console.log('产检提醒开关状态：', this.checkupReminder);
        },
        toggleShowHealthParams() {
            this.showHealthParams = !this.showHealthParams;
            console.log('身体数据显示开关状态：', this.showHealthParams);
        }
    }
};
</script>

<style scoped>
.background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: linear-gradient(to bottom, #FDF7D5 0%, #F9DFEF 25%, #F2DDFF 44.5%);
    z-index: -1;
}

.exercise-guide-container {
    width: calc(100% - 40px);
    height: auto;
    margin: 20px;
    border-radius: 8px;
}

.title-bar {
    display: flex;
    align-items: center;
    height: 5vh;
    padding: 10px;
}

.icon-image {
    height: 5vh;
    width: 4vh;
    margin-right: 10px;
    object-fit: contain;
}

.title-image {
    width: 15vw;
    height: 2vh;
    object-fit: contain;
}

.pregnancy-status-box {
    margin-left: auto;
    background-color: white;
    color: #92646E;
    padding: 5px 10px;
    border-radius: 4px;
    position: relative;
    cursor: pointer;
}

.triangle {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 0;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #92646E;
}

.function-container {
    width: 90vw;
    margin: 0 auto;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    position: relative;
    border-radius: 15px;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
    padding: 20px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, #FFFFFF 50%, rgba(255, 255, 255, 0.5) 100%);
    box-sizing: border-box;
    margin-bottom: 10px;
}

.function-item {
    width: calc(20% - 16px);
    height: auto;
    margin: 0 8px 2vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 8px;
    padding: 10px;
    transition: transform 0.2s ease-in-out;
}

.function-item:hover {
    transform: scale(1.1);
}

.function-item img {
    width: 50%;
    height: auto;
}

.function-item span {
    margin-top: 1vh;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #333;
}

.today-mood-guide {
    width: calc(100% - 40px);
    height: 20vh;
    margin: 20px;
    margin-top: 0;
    margin-bottom: 0;
    border-radius: 8px;
}

.today-mood-guide .title-bar {
    display: flex;
    align-items: center;
    height: 5vh;
    padding: 10px;
}

.today-mood-guide .title-bar img:first-child {
    height: 100%;
    width: 4vh;
    margin-right: 10px;
    object-fit: contain;
}

.today-mood-guide .title-bar img:last-child {
    width: 15vw;
    height: 2vh;
    object-fit: contain;
}

.mood-images {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: calc(100% - 5vh);
}

.mood-images img {
    width: calc(100% / 4);
    height: auto;
    object-fit: contain;
    cursor: pointer;
    transition: opacity 0.2s ease-in-out;
    scale: 0.5;
}

.fetal-info {
    width: 70%;
    float: left;
}

.decorative-image {
    width: 30%;
    float: right;
    object-fit: contain;
}

.indicator-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}
.indicator-item span:nth-child(2){
    color: #676767 !important;
}

.indicator-title {
    background-color: #DCECFF;
    border-radius: 4px;
    padding: 5px 10px;
    margin-right: 10px;
    font-size: 10rpx;
	scale:1.5;

}

.toggle-switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    cursor: pointer;
}

.toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #FF6B6B;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 34px;
    border: 1px solid #FFC5F8;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
}

.slider-on {
    background-color: #F8D6F4;
}

.slider-on:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

.card {
    width: 90vw;
    margin: 0 auto;
    height: 30vh;
    position: relative;
    border-radius: 15px;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
    padding: 20px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, #FFFFFF 50%, rgba(255, 255, 255, 0.5) 100%);
    box-sizing: border-box;
    margin-bottom: 10px;
    clear: both;
}

.health-params-container {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.health-param {
    font-size: 20rpx;
    padding: 5px 15px;
    margin:10rpx;
    border-radius: 20px;
}
</style>    