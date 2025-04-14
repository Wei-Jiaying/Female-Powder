<template>
    <div>
        <div class="bg">
            <div class="bgImg"></div>
        </div>
        <div class="AITitle">
            <div class="left-section">
                <image @click="goBack" src="/static/back.png" mode="aspectFit" class="left-icon"></image>
            </div>
            <div class="center-section">
                <image src="/static/AI/AIArtWord.png" mode="aspectFit" class="center-icon"></image>
            </div>
            <div class="right-section">
                <image @click="getHistory" src="/static/AI/HistroyCloud.png" mode="aspectFit"></image>
            </div>
        </div>
        <div class="imgRobotBox">
            <div :class="{ 'text': true, 'fade': isFading }">{{ currentTitle }}</div>
            <image @click="handleRobotClick" src="/static/AI/AIRobot.png" mode="aspectFit" class="robot-img"></image>
        </div>
        <div class="chattingBox">
            <div class="guessYourAsking" style="transform: scale(1.1); top: -10vh; position: relative;">
                <div class="guess-title">
                    <div class="guess-title-left">
                        <image class="guessYourAskingIcon1" src="/static/AI/icon1.png" mode="aspectFit"></image>
                        <div style="color: #3250AA; font-size: 30rpx;">猜你想问</div>
                    </div>
                    <div class="guess-title-right">
                        <image class="guessYourAskingIcon2" @click="ChangeGuessAsking" src="/static/AI/icon2.png" mode="aspectFit"></image>
                        <div @click="ChangeGuessAsking" style="font-size: 30rpx;">换一批</div>
                    </div>
                </div>
                <div v-for="(question, index) in guessedQuestions[currentGuessedIndex]" :key="index" class="guess-question">
                    <span class="question-circle"></span>
                    <div style="font-size: 26rpx;">{{ question }}</div>
                </div>
            </div>
            <div class="Chatting">
                <div v-for="(item, index) in getCombinedChats" :key="index" class="chat-item">
                    <div v-if="item.type === 'question'" class="question-container">
                        <div class="chat-bubble question-bubble">{{ item.content }}</div>
                    </div>
                    <div v-else class="answer-container">
                        <div class="chat-bubble answer-bubble">{{ item.content }}</div>
                    </div>
                </div>
            </div>
            <div class="Sending">
                <!-- 添加图片元素 -->
                <image src="/static/AI/rabbit.png" mode="aspectFit" class="rabbit-image"></image>
                <div class="input-container">
                    <input v-model="inputQuestion" type="text" placeholder="有问题尽管问我哦" class="input-70">
                    <image @click="sendQuestion" src="/static/AI/icon6.png" mode="aspectFit" class="image-30"></image>
                </div>
                <div class="upload-options">
                    <div class="upload-item">
                        <image src="/static/AI/icon3.png" mode="aspectFit" class="upload-image"></image>
                        <div>上传图片</div>
                    </div>
                    <div class="upload-item">
                        <image src="/static/AI/icon4.png" mode="aspectFit" class="upload-image"></image>
                        <div>拍照上传</div>
                    </div>
                    <div class="upload-item">
                        <image src="/static/AI/icon5.png" mode="aspectFit" class="upload-image"></image>
                        <div>上传文件</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BackgroundPage',
    data() {
        return {
            robotTitle: ['AI帮您解惑~', '随时为您服务！', '一起探索知识吧！', '有问题尽管问！'],
            currentTitleIndex: 0,
            currentTitle: 'AI帮您解惑~',
            isFading: false,
            intervalId: null,
            guessedQuestions: [
                ['问题1', '问题2', '问题3'],
                ['问题4', '问题5', '问题6'],
                ['问题7', '问题8', '问题9']
            ],
            currentGuessedIndex: 0,
            questions: [],
            answers: [],
            inputQuestion: ''
        };
    },
    computed: {
        getCombinedChats() {
            const combined = [];
            for (let i = 0; i < Math.max(this.questions.length, this.answers.length); i++) {
                if (this.questions[i]) {
                    combined.push({ type: 'question', content: this.questions[i] });
                }
                if (this.answers[i]) {
                    combined.push({ type: 'answer', content: this.answers[i] });
                }
            }
            return combined;
        }
    },
    mounted() {
        this.startInterval();
        this.questions = this.guessedQuestions[this.currentGuessedIndex];
    },
    beforeDestroy() {
        clearInterval(this.intervalId);
    },
    methods: {
        goBack() {
            uni.navigateBack({
                delta: 1,
                fail: (err) => {
                    console.error('返回上一页失败:', err);
                }
            });
        },
        getHistory() {
            console.log(123);
        },
        handleRobotClick() {
            clearInterval(this.intervalId);
            this.isFading = true;
            setTimeout(() => {
                this.changeTitle();
                this.isFading = false;
                this.startInterval();
            }, 300);
        },
        changeTitle() {
            this.isFading = true;
            setTimeout(() => {
                this.currentTitleIndex = (this.currentTitleIndex + 1) % this.robotTitle.length;
                this.currentTitle = this.robotTitle[this.currentTitleIndex];
                this.isFading = false;
            }, 300);
        },
        startInterval() {
            this.intervalId = setInterval(() => {
                this.changeTitle();
            }, 2500);
        },
        changeQuestions() {
            this.currentGuessedIndex = (this.currentGuessedIndex + 1) % this.guessedQuestions.length;
            this.questions = this.guessedQuestions[this.currentGuessedIndex];
        },
        sendQuestion() {
            if (this.inputQuestion) {
                this.questions.push(this.inputQuestion);
                // 模拟 AI 回答，实际应用中需调用 API
                this.answers.push('这是 AI 对问题的回答');
                this.inputQuestion = '';
            }
        },
        ChangeGuessAsking() {
            console.log(234);
        }
    }
};
</script>

<style lang="scss">
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
    width: 160%;
    height: 70%;
    border-radius: 0 0 100% 0;
    background: linear-gradient(110.06deg, #FEFDF0 1.6%, #C5DFFE 72.87%, #E8D4FF 92.97%);
    transform-origin: top left;
    transform: scaleY(0.5);
}

.AITitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px;
    position: relative;
    z-index: 1;
}

.left-section,
.right-section {
    width: 33.33%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.center-section {
    width: 33.33%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.left-icon,
.center-icon {
    max-height: 60rpx;
    max-width: 100%;
}

.right-section image {
    max-height: 60rpx;
    max-width: 100%;
}

.left-section {
    transform: translateX(-80rpx);
}

.right-section {
    transform: translateX(80rpx);
}

.imgRobotBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 10%;
    left: -20%;
    width: 100%;
    height: 40vh;
    z-index: 1;
}

.text {
    color: black;
    font-size: 50rpx;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    opacity: 1;
    transition: opacity 0.3s ease;
}

.fade {
    opacity: 0;
}

.robot-img {
    max-height: 100rpx;
    max-width: 100rpx;
    margin-right: 20rpx;
    scale: 5;
    position: absolute;
    right: 0rpx;
    transform: scaleX(-1);
    transition: transform 0.3s ease;
}

.robot-img:active {
    transform: scaleX(-1.1) scaleY(1.1);
}

.chattingBox {
    position: absolute;
    top: calc(10% + 40vh);
    left: 0;
    width: 100%;
    padding: 20rpx;
    box-sizing: border-box;
}

.guessYourAsking {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: white;
    border-radius: 10rpx;
    padding: 20rpx;
    margin: 20rpx;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    scale: 0.9;
}

.guess-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 10rpx;
}

.guess-title-left {
    display: flex;
    align-items: center;
}

.guess-title-right {
    display: flex;
    align-items: center;
}

.guessYourAskingIcon1,
.guessYourAskingIcon2 {
    width: 30rpx;
    height: 30rpx;
    margin: 0 5rpx;
}

.guess-question {
    display: flex;
    align-items: center;
    margin-bottom: 10rpx;
}

.question-circle {
    width: 10rpx;
    height: 10rpx;
    background-color: #007aff;
    border-radius: 50%;
    margin-right: 10rpx;
}

.Chatting {
    // 修改部分：设置固定高度和滚动条
    height: 250rpx; 
    overflow-y: auto; 
    border: none;
    padding: 5rpx;
    margin-bottom: 0rpx;
}

.chat-item {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10rpx;
}

.question-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
}

.answer-container {
    display: flex;
    justify-content: flex-start;
    width: 100%;
}

.chat-bubble {
    max-width: 85%;
    padding: 15rpx 20rpx;
    border-radius: 10rpx;
    background-color: #E8D4FF;
    font-size: 28rpx;
}

.question-bubble {
    background-color: #E8D4FF;
}

.answer-bubble {
    background-color: #E8D4FF;
}

.Sending {
    display: flex;
    flex-direction: column;
    // 添加上方黑色阴影
    box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.2); 
    position: relative;
}

.input-container {
    display: flex;
    margin-bottom: 10rpx;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    border-radius: 50px;
    background: #EAEAEA;
    padding: 5rpx 15rpx;
    transform:translateY(1vh) scaleX(.8);
	z-index:11
}

.input-70 {
    flex: 0 0 70%;
    padding: 10rpx;
    border: none;
    background: transparent;
    font-size: 24rpx;
}

.image-30 {
    flex: 0 0 30%;
    width: 40rpx;
    height: 40rpx;
    margin-left: 10rpx;
    cursor: pointer;
    display: flex;
    justify-content: center;
    transform: translateX(20vw) scale(1.5);
    align-items: center;
}	

.Sending input::placeholder {
    color: #999;
}

.upload-options {
    display: flex;
    justify-content: space-around;
}

.upload-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.upload-image {
    width: 55rpx;
    height: 55rpx;
    transform: scale(1.1);
    text-align: center;
    margin-bottom: 5rpx;
}

// 修改图片样式
.rabbit-image {
    position: absolute;
    top: -10vh; // 调整为负的图片高度
    left: -10vw;
    width: 40vw;
    height: 20vh;
    z-index: 1;
    transform: scaleX(-1); // 镜面翻转
}
</style>    