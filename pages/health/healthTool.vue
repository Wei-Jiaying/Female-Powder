<template>
    <div class="pregnancy-health-container">
        <!-- 顶部背景 -->
        <div class="background"></div>
        
        <!-- 孕期状态与功能区 -->
        <div class="exercise-guide-container">
            <div class="title-bar">
                <img class="icon-image" src="/static/HealthTool/ic1.png" alt="健康工具图标">
                <img class="title-image" src="/static/HealthTool/title1.png" alt="健康工具标题">
                <div class="pregnancy-status-box" @click="changePregnancyStatus">
                    <span>{{pregnancyStatus}}</span>
                    <div class="triangle"></div>
                </div>
            </div>
            
            <div class="function-container">
                <div v-for="(functionItem, index) in functionItems" :key="index" class="function-item" @click="ClickFunctionItem(functionItem.title)">
                    <img :src="functionItem.image" alt="功能图标">
                    <span>{{functionItem.title}}</span>
                </div>
            </div>
        </div>
        
        <!-- 今日心情选择 -->
        <div class="today-mood-guide">
            <div class="title-bar">
                <img src="/static/HealthTool/ic2.png" alt="心情图标">
                <img src="/static/HealthTool/title2.png" alt="今日心情标题">
            </div>
            <div class="mood-images">
                <img v-for="(image, index) in moodImages" :key="index" :src="image" alt="心情图标" 
                     :style="{ opacity: selectedMoodIndex === index ? 1 : 0.2 }" @click="selectMood(index)">
            </div>
        </div>
        
        <!-- 胎儿信息与健康参数 -->
        <div class="today-mood-guide">
            <div class="title-bar">
                <img src="/static/HealthTool/ic3.png" alt="胎儿信息图标">
                <img src="/static/HealthTool/title3.png" alt="胎儿信息标题">
            </div>
            
            <div class="card fetal-card">
                <div class="fetal-info">
                    <p>孕三周5天 怀孕时间</p>
                    <p>预计还有 {{dueDays}} 天出生</p>
                    
                    <div class="indicator-item">
                        <span class="indicator-title">胎儿预估</span>
                        <span>体重：{{fetalWeight}}，身长：{{fetalLength}}</span>
                    </div>
                    
                    <div class="indicator-item">
                        <span class="indicator-title">发育情况</span>
                        <span>器官开始形成，心脏开始跳动</span>
                    </div>
                    
                    <div class="indicator-item">
                        <span class="indicator-title">胎心监测</span>
                        <span>{{heartRateStatus}}</span>
                    </div>
                    
                    <div class="indicator-item">
                        <span class="indicator-title">产检提醒</span>
                        <label class="toggle-switch" @click="toggleCheckupReminder">
                            <input type="checkbox" :checked="checkupReminder" @change="toggleCheckupReminder"/>
                            <span class="slider" :class="{ 'slider-on': checkupReminder }"></span>
                        </label>
                    </div>
                </div>
                <img src="/static/HealthTool/dc1.png" alt="胎儿发育图" class="decorative-image">
            </div>
            
            <div class="card health-params-card">
                <label class="toggle-switch" @click="toggleShowHealthParams">
                    <input type="checkbox" :checked="showHealthParams" @change="toggleShowHealthParams">
                    <span class="slider" :class="{ 'slider-on': showHealthParams }"></span>
                </label>
                
                <div v-if="showHealthParams" class="health-params-container">
                    <div class="health-param" style="border-color: #B8B7FF;">我的体重：{{myWeight}}</div>
                    <div class="health-param" style="border-color: #5CC9FB;">血氧：{{bloodOxygen}}</div>
                    <div class="health-param" style="border-color: #FF0000;">血压：{{bloodPressure}}</div>
                </div>
            </div>
        </div>
        
        <!-- 运动指南区域 -->
        <div class="exercise-guide">
            <div class="title-bar">
                <img src="/static/HealthSport/titleDc.png" alt="运动指南装饰">
                <img src="/static/HealthSport/sprotTitle.png" alt="运动指南标题">
            </div>
            
            <div class="exercise-details">
                <scroll-view scroll-y style="height: 100%;">
                    <div class="cardItem" v-for="(exercise, index) in visibleExercises" :key="index">
                        <div class="exercise-name">{{ exercise.name }}</div>
                        
                        <div class="info-item">
                            <img src="/static/HealthSport/bt1.png" alt="安全性图标">
                            <div>安全性：{{ exercise.safety }}</div>
                        </div>
                        
                        <div class="info-item">
                            <img src="/static/HealthSport/bt2.png" alt="环境图标">
                            <div>环境选择：{{ exercise.environment }}</div>
                        </div>
                        
                        <div class="info-item">
                            <img src="/static/HealthSport/bt3.png" alt="反应图标">
                            <div>身体反应：{{ exercise.reaction }}</div>
                        </div>
                    </div>
                </scroll-view>
            </div>
        </div>
        
        <!-- 环境指南区域 -->
        <div class="exercise-guide environment-guide">
            <div class="title-bar">
                <img src="/static/HealthSport/titleDc2.png" alt="环境指南装饰">
                <img src="/static/HealthSport/sportTitle2.png" alt="环境指南标题">
            </div>
            
            <div class="environment-data-wrapper">
                <div class="environment-data">
                    <div class="card-item" v-for="(item, index) in environmentItems" :key="index">
                        <div class="item-title">
                            <img :src="`/static/HealthSport/dc${index + 1}.png`" alt="环境指标图标">
                            <div>{{ item.title }}</div>
                        </div>
                        <div class="item-content" :style="{ background: item.bgColor, color: item.textColor }">
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
import {getWeatherApi} from '../../request/aip/weather.js'
export default {
    data() {
        return {
            // 孕期状态相关数据
            pregnancyStatus: '孕期状态',
            pregnancyStatusOptions: ['孕早期', '孕中期', '孕晚期'],
            currentIndex: 0,
            
            // 功能区数据
            functionItems: [
                { image: '/static/HealthTool/fc1.png', title: '情绪调节' },
                { image: '/static/HealthTool/fc2.png', title: '社区交流' },
                { image: '/static/HealthTool/fc3.png', title: '家人关怀' },
                { image: '/static/HealthTool/fc4.png', title: 'B超分析' },
                { image: '/static/HealthTool/fc5.png', title: '孕期百科' },
                { image: '/static/HealthTool/fc6.png', title: '穿搭指南' },
                { image: '/static/HealthTool/fc7.png', title: '孕期资讯' }
            ],
            
            // 心情选择数据
            moodImages: [
                '/static/HealthTool/bq0.png',
                '/static/HealthTool/bq1.png',
                '/static/HealthTool/bq2.png',
                '/static/HealthTool/bq3.png',
            ],
            selectedMoodIndex: -1,
            
            // 胎儿信息数据
            dueDays: 200,
            fetalWeight: '100g',
            fetalLength: '5cm',
            heartRateStatus: '在正常范围内',
            checkupReminder: true,
            
            // 健康参数数据
            showHealthParams: false,
            myWeight: '55kg',
            bloodOxygen: '98%',
            bloodPressure: '120/80mmHg',
            
            // 运动指南数据
            exercises: [
                { name: '散步', safety: '高', environment: '公园、操场等开阔地', reaction: '呼吸加快、微微出汗' },
                { name: '孕妇瑜伽', safety: '中', environment: '安静舒适的室内', reaction: '身体微微发热、放松' },
                { name: '游泳', safety: '高', environment: '游泳池', reaction: '心跳加快、肌肉舒展' },
                { name: '孕妇操', safety: '中', environment: '家中客厅', reaction: '全身舒展、轻微疲劳' }
            ],
            
            // 环境指南数据
            environmentItems: [
                { title: '地点', content: '上海', bgColor: '#FFC7C7', textColor: '#B00014' },
                { title: '天气', content: '晴', bgColor: '#B3CFFF', textColor: '#0038A1' },
                { title: '空气质量', content: '优', bgColor: '#ABEBED', textColor: '#00A9C7' },
                { title: '噪音检测', content: '正常', bgColor: '#FFD09B', textColor: '#D86800' },
                { title: '温湿度', content: '25℃，50%', bgColor: '#6AD4E8', textColor: '#04ACAC' },
                { title: '辐射/紫外线', content: '低', bgColor: '#D1A9FC', textColor: '#6310CC' }
            ],
            
            // 温馨提示数据
            tips: [
                '运动前记得做好热身运动',
                '保持适当的运动强度，避免过度疲劳',
                '运动后要进行拉伸放松',
                '注意补充水分，保持身体水分平衡',
                '穿着舒适、透气的运动服装和鞋子'
            ],
            currentTip: '',
            tipInterval: null
        };
    },
    onLoad() {
    	console.log('触发了')
		this.initWeatherData()
    },
    computed: {
        visibleExercises() {
            // 显示所有运动项目
            return this.exercises;
        }
    },
    
    mounted() {
        // 启动温馨提示轮换
        this.changeTip();
        this.tipInterval = setInterval(this.changeTip, 5000);
    },
    
    beforeDestroy() {
        // 清除定时器
        clearInterval(this.tipInterval);
    },
    
    methods: {
		async initWeatherData(){
				console.log('获取天气')
				const res=await getWeatherApi('滨海新区')
				console.log(res.data.data.data[0])
				this.environmentItems= [
                { title: '地点', content: `${res.data.data.city}`, bgColor: '#FFC7C7', textColor: '#B00014' },
                { title: '天气', content: `${res.data.data.data[0].phrase}`, bgColor: '#B3CFFF', textColor: '#0038A1' },
                { title: '空气质量', content: `${res.data.data.data[0].air_level}`, bgColor: '#ABEBED', textColor: '#00A9C7' },
                { title: '噪音检测', content: '正常', bgColor: '#FFD09B', textColor: '#D86800' },
                { title: '温湿度', content: `${res.data.data.data[0].tem1}℃`, bgColor: '#6AD4E8', textColor: '#04ACAC' },
                { title: '辐射/紫外线', content: `${res.data.data.data[0].uvDescription}`, bgColor: '#D1A9FC', textColor: '#6310CC' }
            ]
		},
        // 切换孕期状态
        changePregnancyStatus() {
            this.currentIndex = (this.currentIndex + 1) % this.pregnancyStatusOptions.length;
            this.pregnancyStatus = this.pregnancyStatusOptions[this.currentIndex];
            console.log('当前选择的怀孕状态：', this.pregnancyStatus);
        },
        
        // 点击功能项
        ClickFunctionItem(title) {
            console.log(`点击了 ${title} 功能`);
        },
        
        // 选择心情
        selectMood(index) {
            this.selectedMoodIndex = index;
            console.log(`选择了第 ${index + 1} 张心情图片`);
        },
        
        // 切换产检提醒
        toggleCheckupReminder() {
            this.checkupReminder = !this.checkupReminder;
            console.log('产检提醒开关状态：', this.checkupReminder);
        },
        
        // 切换显示健康参数
        toggleShowHealthParams() {
            this.showHealthParams = !this.showHealthParams;
            console.log('身体数据显示开关状态：', this.showHealthParams);
        },
        
        // 更换温馨提示
        changeTip() {
            const randomIndex = Math.floor(Math.random() * this.tips.length);
            this.currentTip = this.tips[randomIndex];
        }
    }
};
</script>

<style scoped>
/* 整体容器 */
.pregnancy-health-container {
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
}

/* 背景样式 */
.background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: linear-gradient(to bottom, #FDF7D5 0%, #F9DFEF 25%, #F2DDFF 44.5%);
    z-index: -1;
}

/* 通用卡片样式 */
.card, .cardItem {
    width: 90vw;
    margin: 0 auto 15px;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    padding: 15px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, #FFFFFF 50%, rgba(255, 255, 255, 0.5) 100%);
    box-sizing: border-box;
}

/* 标题栏样式 */
.title-bar {
    display: flex;
    align-items: center;
    height: 5vh;
    padding: 10px 20px;
}

.title-bar img:first-child {
    height: 100%;
    width: 4vh;
    margin-right: 10px;
    object-fit: contain;
}

.title-bar img:last-child {
    width: 15vw;
    height: 2vh;
    object-fit: contain;
}

/* 孕期状态选择框 */
.pregnancy-status-box {
    margin-left: auto;
    background-color: white;
    color: #92646E;
    padding: 5px 10px;
    border-radius: 4px;
    position: relative;
    cursor: pointer;
    font-size: 14px;
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

/* 功能区样式 */
.function-container {
    display: flex;
    flex-wrap: wrap;
    padding: 15px;
}

.function-item {
    width: calc(20% - 10px);
    margin: 0 5px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 10px;
    border-radius: 10px;
    transition: transform 0.2s ease-in-out;
}


/* 移除最后一个元素的右侧额外间距 */
.function-item:last-child {
    margin-right: 0;
}
    
.function-item:hover {
    transform: scale(1.05);
    background-color: rgba(255, 255, 255, 0.5);
}

.function-item img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    margin-bottom: 8px;
}

.function-item span {
    font-size: 12px;
    color: #333;
}

/* 心情选择区样式 */
.mood-images {
    display: flex;
    justify-content: space-around;
    padding: 15px 0;
}

.mood-images img {
    width: 60px;
    height: 60px;
    object-fit: contain;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.mood-images img:hover {
    transform: scale(1.1);
}

/* 胎儿信息卡片 */
.fetal-card {
    display: flex;
    flex-direction: column;
}

.fetal-info {
    width: 100%;
}

.fetal-info p {
    margin: 8px 0;
    font-size: 14px;
}

.decorative-image {
    width: 80px;
    height: 80px;
    object-fit: contain;
    align-self: flex-end;
    margin-top: -20px;
}

/* 指标项样式 */
.indicator-item {
    display: flex;
    align-items: center;
    margin: 10px 0;
}

.indicator-title {
    background-color: #DCECFF;
    border-radius: 4px;
    padding: 3px 8px;
    margin-right: 10px;
    font-size: 12px;
    color: #333;
}

/* 开关样式 */
.toggle-switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
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
    transition: .4s;
    border-radius: 34px;
    border: 1px solid #FFC5F8;
}

.slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}

.slider-on {
    background-color: #F8D6F4;
}

.slider-on:before {
    transform: translateX(26px);
}

/* 健康参数容器 */
.health-params-container {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}

.health-param {
    font-size: 14px;
    padding: 8px 15px;
    border-radius: 20px;
    min-width: 80px;
    text-align: center;
}

/* 运动指南区 */
.exercise-details {
    max-height: 200px;
    overflow-y: auto;
}

.exercise-name {
    color: #92646E;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 16px;
}

.info-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    font-size: 14px;
}

.info-item img {
    margin-right: 10px;
    width: 20px;
    height: 20px;
    object-fit: contain;
}

/* 环境指南区 */
.environment-data {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 15px;
	background-color: white;
	border-radius: 20px;
/* 	scale:.9 */;
}

.card-item {
    width: calc(33.333% - 10px);
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.7);
}

.item-title {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    font-size: 14px;
}

.item-title img {
    width: 18px;
    height: 18px;
    margin-right: 5px;
    object-fit: contain;
}

.item-content {
    padding: 8px;
    border-radius: 8px;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
}

/* 温馨提示区 */
.warm-tip {
    position: relative;
    padding: 15px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.7);
    min-height: 60px;
	margin:15px;
}

.tip-title {
    position: absolute;
    top: -10px;
    left: 20px;
    background-color: #F9DFEF;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: bold;
}

.warm-tip span {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 14px;
    color: #333;
}

/* 滚动条样式 */
::-webkit-scrollbar {
    width: 4px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: #F9DFEF;
    border-radius: 2px;
}
.title-image{
	scale: 0.4!important;
	transform:translateX(-100px);
}
</style>    