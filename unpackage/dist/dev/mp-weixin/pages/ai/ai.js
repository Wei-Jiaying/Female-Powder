"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  name: "AIChatPage",
  data() {
    return {
      // 机器人标题相关
      robotTitle: ["AI帮您解惑~", "随时为您服务！", "一起探索知识吧！", "有问题尽管问！"],
      currentTitleIndex: 0,
      currentTitle: "AI帮您解惑~",
      isFading: false,
      intervalId: null,
      // 猜你想问相关
      guessedQuestions: [
        [
          "备孕前需要做哪些检查？",
          "孕期如何补充叶酸？",
          "孕早期孕吐严重怎么办？"
        ],
        [
          "新生儿多久喂一次奶？",
          "宝宝黄疸怎么护理？",
          "产后多久可以恢复运动？"
        ],
        [
          "哺乳期饮食有哪些禁忌？",
          "宝宝湿疹怎么处理？",
          "孕期可以吃海鲜吗？"
        ]
      ],
      currentGuessedIndex: 0,
      // 聊天记录相关
      questions: [],
      // 用户问题
      answers: [],
      // AI回答
      inputQuestion: ""
      // 输入框内容
    };
  },
  computed: {
    // 合并聊天记录（保证一问一答顺序）
    getCombinedChats() {
      const combined = [];
      const maxLen = Math.max(this.questions.length, this.answers.length);
      for (let i = 0; i < maxLen; i++) {
        if (this.questions[i]) {
          combined.push({
            type: "question",
            content: this.questions[i]
          });
        }
        if (this.answers[i]) {
          combined.push({
            type: "answer",
            content: this.answers[i]
          });
        }
      }
      return combined;
    }
  },
  mounted() {
    this.startTitleInterval();
    this.questions = [...this.guessedQuestions[this.currentGuessedIndex]];
  },
  beforeDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  },
  methods: {
    // 返回上一页
    goBack() {
      common_vendor.index.navigateBack({
        delta: 1,
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/ai/ai.vue:155", "返回上一页失败:", err);
          common_vendor.index.redirectTo({
            url: "/pages/index/index"
          });
        }
      });
    },
    // 查看历史记录（待实现）
    getHistory() {
      common_vendor.index.__f__("log", "at pages/ai/ai.vue:166", "查看历史记录");
      common_vendor.index.showToast({
        title: "历史记录功能待实现",
        icon: "none",
        duration: 1500
      });
    },
    // 点击机器人切换标题
    handleRobotClick() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      this.isFading = true;
      setTimeout(() => {
        this.changeRobotTitle();
        this.isFading = false;
        this.startTitleInterval();
      }, 300);
    },
    // 切换机器人标题
    changeRobotTitle() {
      this.currentTitleIndex = (this.currentTitleIndex + 1) % this.robotTitle.length;
      this.currentTitle = this.robotTitle[this.currentTitleIndex];
    },
    // 启动标题轮播定时器
    startTitleInterval() {
      this.intervalId = setInterval(() => {
        this.isFading = true;
        setTimeout(() => {
          this.changeRobotTitle();
          this.isFading = false;
        }, 300);
      }, 5e3);
    },
    // 切换猜你想问列表
    changeGuessAsking() {
      this.currentGuessedIndex = (this.currentGuessedIndex + 1) % this.guessedQuestions.length;
      this.questions = [...this.guessedQuestions[this.currentGuessedIndex]];
    },
    // 点击猜你想问的问题，自动发送
    handleGuessQuestionClick(question) {
      this.inputQuestion = question;
      this.sendQuestion();
    },
    // 发送问题
    sendQuestion() {
      const question = this.inputQuestion.trim();
      if (!question)
        return;
      this.questions.push(question);
      this.inputQuestion = "";
      setTimeout(() => {
        const aiAnswer = `已收到你的问题：「${question}」
（实际场景中，此处会替换为AI接口返回的真实回答）`;
        this.answers.push(aiAnswer);
        this.scrollToChatBottom();
      }, 800);
    },
    // 滚动到最新聊天记录
    scrollToChatBottom() {
      this.$nextTick(() => {
        const query = common_vendor.index.createSelectorQuery().in(this);
        query.select(".chat-item:last-child").boundingClientRect((rect) => {
          if (rect) {
            query.selectViewport().scrollIntoView({
              // 目标元素的选择器（最后一条聊天记录）
              selector: ".chat-item:last-child",
              // 滚动行为：平滑滚动
              duration: 300
            });
          }
        }).exec();
      });
    },
    // 处理上传操作（待实现）
    handleUpload(type) {
      const typeMap = {
        image: "图片",
        camera: "拍照",
        file: "文件"
      };
      common_vendor.index.showToast({
        title: `${typeMap[type]}上传功能待实现`,
        icon: "none",
        duration: 1500
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.currentTitle),
    b: $data.isFading ? 1 : "",
    c: common_vendor.o((...args) => $options.handleRobotClick && $options.handleRobotClick(...args)),
    d: common_assets._imports_0$4,
    e: common_assets._imports_1$1,
    f: common_assets._imports_2$4,
    g: common_vendor.o((...args) => $options.changeGuessAsking && $options.changeGuessAsking(...args)),
    h: common_vendor.f($data.guessedQuestions[$data.currentGuessedIndex], (question, index, i0) => {
      return {
        a: common_vendor.t(question),
        b: `guess-${index}`,
        c: common_vendor.o(($event) => $options.handleGuessQuestionClick(question), `guess-${index}`)
      };
    }),
    i: common_vendor.f($options.getCombinedChats, (item, index, i0) => {
      return common_vendor.e({
        a: item.type === "question"
      }, item.type === "question" ? {
        b: common_vendor.t(item.content)
      } : {
        c: common_vendor.t(item.content)
      }, {
        d: `chat-${index}-${item.type}`
      });
    }),
    j: common_assets._imports_3$2,
    k: common_vendor.o((...args) => $options.sendQuestion && $options.sendQuestion(...args)),
    l: $data.inputQuestion,
    m: common_vendor.o(($event) => $data.inputQuestion = $event.detail.value),
    n: common_vendor.o((...args) => $options.sendQuestion && $options.sendQuestion(...args)),
    o: common_assets._imports_4$1,
    p: common_assets._imports_5$1,
    q: common_vendor.o(($event) => $options.handleUpload("image")),
    r: common_assets._imports_6$1,
    s: common_vendor.o(($event) => $options.handleUpload("camera")),
    t: common_assets._imports_7$1,
    v: common_vendor.o(($event) => $options.handleUpload("file"))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/ai/ai.js.map
