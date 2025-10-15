"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      ImagesList: [
        "https://picsum.photos/750/300",
        "https://picsum.photos/750/301",
        "https://picsum.photos/750/302"
      ],
      functionItems: [
        {
          image: "/static/Index/fc1.png",
          title: "健康知识库",
          type: "page"
          // 适合跳转页面，暂不做弹窗
        },
        {
          image: "/static/Index/fc2.png",
          title: "中医小宝典",
          type: "popup",
          // 适合弹窗
          popupType: "bible"
        },
        {
          image: "/static/Index/fc3.png",
          title: "随心记便签",
          type: "popup",
          // 适合弹窗
          popupType: "note"
        },
        {
          image: "/static/Index/fc4.png",
          title: "看懂病历单",
          type: "page"
          // 适合跳转页面
        },
        {
          image: "/static/Index/fc5.png",
          title: "拍照帮识图",
          type: "popup",
          // 适合弹窗
          popupType: "recog"
        },
        {
          image: "/static/Index/fc6.png",
          title: "直播指导课",
          type: "page"
          // 重复功能，暂不处理
        },
        {
          image: "/static/Index/fc7.png",
          title: "经验交流区",
          type: "page"
          // 适合跳转社区
        },
        {
          image: "/static/Index/fc8.png",
          title: "专家咨询室",
          type: "page"
          // 适合跳转咨询页
        }
      ],
      activeTab: "tweet",
      tweets: [
        {
          time: "2024-01-01",
          title: "冬季养生：这3个穴位按摩方法，帮你缓解手脚冰凉",
          readCount: 1280,
          likeCount: 236,
          shareCount: 58,
          image: "https://picsum.photos/120/120"
        },
        {
          time: "2024-01-02",
          title: "体检报告里的“结节”是什么？哪些需要警惕？",
          readCount: 1850,
          likeCount: 312,
          shareCount: 76,
          image: "https://picsum.photos/120/121"
        },
        {
          time: "2024-01-03",
          title: "晨起喝温水到底好不好？这几类人要注意",
          readCount: 960,
          likeCount: 189,
          shareCount: 42,
          image: "https://picsum.photos/120/122"
        }
      ],
      // 弹窗控制
      showBiblePopup: false,
      showRecogPopup: false,
      showNotePopup: false,
      // 中医小宝典数据
      activeCategory: "herb",
      bibleList: {
        herb: [
          {
            name: "黄芪",
            desc: "补气升阳，固表止汗，利水消肿"
          },
          {
            name: "当归",
            desc: "补血活血，调经止痛，润肠通便"
          },
          {
            name: "枸杞",
            desc: "滋补肝肾，益精明目"
          }
        ],
        acupoint: [
          {
            name: "足三里",
            desc: "健脾和胃，调理气血，扶正培元"
          },
          {
            name: "涌泉穴",
            desc: "滋阴降火，补肾益精"
          },
          {
            name: "合谷穴",
            desc: "疏风解表，镇痛通络"
          }
        ],
        prescription: [
          {
            name: "四物汤",
            desc: "补血调血，主治血虚滞证"
          },
          {
            name: "六味地黄丸",
            desc: "滋阴补肾，主治肾阴亏损"
          },
          {
            name: "桂枝汤",
            desc: "解肌发表，调和营卫"
          }
        ]
      },
      // 便签数据
      currentDate: "",
      noteContent: "",
      noteTags: ["养生记录", "症状笔记", "饮食记录", "运动打卡"],
      selectedTag: "养生记录"
    };
  },
  computed: {
    lineLeft() {
      return this.activeTab === "tweet" ? "25%" : "71%";
    },
    lineWidth() {
      return "12%";
    }
  },
  onLoad() {
    const date = /* @__PURE__ */ new Date();
    this.currentDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  },
  methods: {
    async openScan() {
      try {
        const setting = await new Promise((resolve, reject) => {
          common_vendor.index.getSetting({
            success: (res) => resolve(res),
            fail: (err) => reject(err)
          });
        });
        if (setting.authSetting["scope.camera"] === false) {
          await new Promise((resolve) => {
            common_vendor.index.showModal({
              title: "权限不足",
              content: "需要相机权限才能使用扫一扫，请在设置中开启",
              success: (res) => {
                if (res.confirm) {
                  common_vendor.index.openSetting({
                    success: (res2) => resolve(res2)
                  });
                } else {
                  resolve(res);
                }
              }
            });
          });
          return;
        }
        const scanRes = await new Promise((resolve) => {
          common_vendor.index.scanCode({
            onlyFromCamera: false,
            // 仅相机扫码（符合进场场景）
            scanType: ["qrCode"],
            // 只识别二维码
            // 扫码成功
            success: (res) => {
              resolve({
                ...res,
                cancel: false
              });
            },
            // 扫码失败（含用户取消）
            fail: (err) => {
              if (err.errMsg === "scanCode:fail cancel") {
                resolve({
                  cancel: true
                });
              } else {
                common_vendor.index.showToast({
                  title: "扫码失败，请重试",
                  icon: "none",
                  duration: 2e3
                });
                resolve({
                  cancel: false,
                  error: err
                });
              }
            }
          });
        });
        if (scanRes.error) {
          throw scanRes.error;
        }
        if (scanRes.cancel) {
          return;
        }
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/home/home.vue:403", "扫一扫功能异常：", err);
        common_vendor.index.showToast({
          title: "操作异常，请稍后再试",
          icon: "none",
          duration: 2e3
        });
      }
    },
    // 功能点击统一处理
    handleFunctionClick(item) {
      this.closeAllPopups();
      if (item.type === "popup") {
        switch (item.popupType) {
          case "bible":
            this.showBiblePopup = true;
            break;
          case "recog":
            this.showRecogPopup = true;
            break;
          case "note":
            this.showNotePopup = true;
            break;
        }
      } else {
        if (item.title === "健康知识库") {
          common_vendor.wx$1.navigateTo({
            url: "/pages/health/knowledge"
          });
        } else if (item.title === "看懂病历单") {
          common_vendor.wx$1.navigateTo({
            url: "/pages/health/hospital"
          });
        } else if (item.title === "直播指导课") {
          common_vendor.wx$1.navigateTo({
            url: "/pages/health/course"
          });
        } else if (item.title === "专家咨询室") {
          common_vendor.wx$1.navigateTo({
            url: "/pages/health/room"
          });
        } else {
          common_vendor.index.showToast({
            title: `${item.title}功能待开发`,
            icon: "none"
          });
        }
      }
    },
    // 关闭所有弹窗
    closeAllPopups() {
      this.showBiblePopup = false;
      this.showRecogPopup = false;
      this.showNotePopup = false;
    },
    // 保存便签
    saveNote() {
      if (!this.noteContent.trim()) {
        common_vendor.index.showToast({
          title: "请输入笔记内容",
          icon: "none"
        });
        return;
      }
      this.closeAllPopups();
      common_vendor.index.showToast({
        title: "笔记保存成功",
        icon: "none"
      });
    },
    // 推文点击
    ClickTweet(tweet) {
      common_vendor.index.__f__("log", "at pages/home/home.vue:477", "点击推文：", tweet);
      common_vendor.index.showToast({
        title: "查看推文详情",
        icon: "none"
      });
    },
    openMedicine() {
      common_vendor.index.navigateTo({
        url: "/pages/health/medicine"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$2,
    b: common_assets._imports_0$3,
    c: common_vendor.f($data.ImagesList, (image, index, i0) => {
      return {
        a: image,
        b: index
      };
    }),
    d: common_vendor.f($data.functionItems, (functionItem, index, i0) => {
      return {
        a: functionItem.image,
        b: common_vendor.t(functionItem.title),
        c: index,
        d: common_vendor.o(($event) => $options.handleFunctionClick(functionItem), index)
      };
    }),
    e: common_assets._imports_2$3,
    f: $data.activeTab === "tweet" ? 1 : "",
    g: common_vendor.o(($event) => $data.activeTab = "tweet"),
    h: $data.activeTab === "community" ? 1 : "",
    i: common_vendor.o(($event) => $data.activeTab = "community"),
    j: $options.lineLeft,
    k: $options.lineWidth,
    l: $data.activeTab === "tweet"
  }, $data.activeTab === "tweet" ? {
    m: common_vendor.f($data.tweets, (tweet, index, i0) => {
      return {
        a: common_vendor.t(tweet.time),
        b: common_vendor.t(tweet.title),
        c: common_vendor.t(tweet.readCount),
        d: common_vendor.t(tweet.likeCount),
        e: common_vendor.t(tweet.shareCount),
        f: tweet.image,
        g: index,
        h: common_vendor.o(($event) => $options.ClickTweet(tweet), index)
      };
    })
  } : {}, {
    n: $data.showBiblePopup
  }, $data.showBiblePopup ? {
    o: common_vendor.o((...args) => $options.closeAllPopups && $options.closeAllPopups(...args))
  } : {}, {
    p: $data.showBiblePopup
  }, $data.showBiblePopup ? {
    q: common_vendor.o((...args) => $options.closeAllPopups && $options.closeAllPopups(...args)),
    r: $data.activeCategory === "herb" ? 1 : "",
    s: common_vendor.o(($event) => $data.activeCategory = "herb"),
    t: $data.activeCategory === "acupoint" ? 1 : "",
    v: common_vendor.o(($event) => $data.activeCategory = "acupoint"),
    w: $data.activeCategory === "prescription" ? 1 : "",
    x: common_vendor.o(($event) => $data.activeCategory = "prescription"),
    y: common_vendor.f($data.bibleList[$data.activeCategory], (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.desc),
        c: index
      };
    }),
    z: common_vendor.o((...args) => $options.closeAllPopups && $options.closeAllPopups(...args)),
    A: common_vendor.o((...args) => $options.openMedicine && $options.openMedicine(...args))
  } : {}, {
    B: $data.showRecogPopup
  }, $data.showRecogPopup ? {
    C: common_vendor.o((...args) => $options.closeAllPopups && $options.closeAllPopups(...args))
  } : {}, {
    D: $data.showRecogPopup
  }, $data.showRecogPopup ? {
    E: common_vendor.o((...args) => $options.closeAllPopups && $options.closeAllPopups(...args)),
    F: common_vendor.o((...args) => $options.openScan && $options.openScan(...args)),
    G: common_vendor.o((...args) => $options.closeAllPopups && $options.closeAllPopups(...args))
  } : {}, {
    H: $data.showNotePopup
  }, $data.showNotePopup ? {
    I: common_vendor.o((...args) => $options.closeAllPopups && $options.closeAllPopups(...args))
  } : {}, {
    J: $data.showNotePopup
  }, $data.showNotePopup ? {
    K: common_vendor.o((...args) => $options.closeAllPopups && $options.closeAllPopups(...args)),
    L: common_vendor.t($data.currentDate),
    M: $data.noteContent,
    N: common_vendor.o(($event) => $data.noteContent = $event.detail.value),
    O: common_vendor.f($data.noteTags, (tag, k0, i0) => {
      return {
        a: common_vendor.t(tag),
        b: $data.selectedTag === tag ? 1 : "",
        c: common_vendor.o(($event) => $data.selectedTag = tag, tag),
        d: tag
      };
    }),
    P: common_vendor.o((...args) => $options.closeAllPopups && $options.closeAllPopups(...args)),
    Q: common_vendor.o((...args) => $options.saveNote && $options.saveNote(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map
