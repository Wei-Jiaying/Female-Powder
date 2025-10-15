"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 筛选类型
      activeType: "all",
      // 专家数据
      experts: [
        {
          id: 1,
          avatar: "https://picsum.photos/100/100?random=90",
          name: "陈丽",
          title: "主任医师",
          hospital: "市妇幼保健院",
          department: "生殖科",
          tags: ["备孕指导", "排卵监测", "不孕咨询"],
          rating: 4.9,
          consultCount: 1280,
          responseTime: "平均5分钟",
          online: true,
          type: "prepare"
        },
        {
          id: 2,
          avatar: "https://picsum.photos/100/100?random=91",
          name: "王敏",
          title: "副主任医师",
          hospital: "省人民医院",
          department: "产科",
          tags: ["孕期护理", "产检解读", "分娩指导"],
          rating: 4.8,
          consultCount: 960,
          responseTime: "平均8分钟",
          online: true,
          type: "pregnancy"
        },
        {
          id: 3,
          avatar: "https://picsum.photos/100/100?random=92",
          name: "李娟",
          title: "康复师",
          hospital: "产后康复中心",
          department: "产后康复科",
          tags: ["盆底肌修复", "月子护理", "母乳指导"],
          rating: 4.7,
          consultCount: 750,
          responseTime: "平均10分钟",
          online: false,
          type: "postpartum"
        },
        {
          id: 4,
          avatar: "https://picsum.photos/100/100?random=93",
          name: "赵华",
          title: "主治医师",
          hospital: "市第一医院",
          department: "妇科",
          tags: ["备孕调理", "孕期营养", "产后恢复"],
          rating: 4.9,
          consultCount: 1120,
          responseTime: "平均6分钟",
          online: true,
          type: "all"
        }
      ],
      // 常见问题
      commonFaq: [
        "备孕多久没成功需要就医？",
        "孕期可以吃哪些保健品？",
        "产后多久可以恢复运动？",
        "孕期失眠怎么缓解？",
        "母乳不足怎么办？",
        "排卵期怎么准确计算？"
      ],
      // 弹窗相关
      showPopup: false,
      currentExpert: {},
      consultTypes: ["图文咨询", "语音咨询", "视频咨询"],
      selectedConsultType: "图文咨询",
      availableTimes: ["今天 15:00-16:00", "今天 19:00-20:00", "明天 10:00-11:00"],
      selectedTime: "今天 15:00-16:00",
      problemDesc: "",
      showSuccessPopup: false
    };
  },
  computed: {
    // 筛选后的专家列表
    filteredExperts() {
      if (this.activeType === "all") {
        return this.experts;
      }
      return this.experts.filter((expert) => expert.type === this.activeType || expert.type === "all");
    },
    // 类型标题
    typeTitle() {
      const titleMap = {
        all: "全部生育专家",
        prepare: "备孕咨询专家",
        pregnancy: "孕期指导专家",
        postpartum: "产后恢复专家"
      };
      return titleMap[this.activeType];
    }
  },
  methods: {
    // 返回上一页
    goBack() {
      common_vendor.index.navigateBack({ delta: 1 });
    },
    // 快速咨询
    quickConsult() {
      common_vendor.index.showToast({ title: "正在匹配在线专家...", icon: "none" });
    },
    // 显示预约弹窗
    showReservePopup(expert) {
      this.currentExpert = expert;
      this.showPopup = true;
    },
    // 关闭预约弹窗
    closePopup() {
      this.showPopup = false;
    },
    // 提交预约
    submitReserve() {
      if (!this.problemDesc.trim()) {
        common_vendor.index.showToast({ title: "请简要描述您的问题", icon: "none" });
        return;
      }
      this.closePopup();
      this.showSuccessPopup = true;
    },
    // 前往常见问题详情
    goToFaqDetail(question) {
      common_vendor.index.showToast({ title: `查看《${question}》详情`, icon: "none" });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: $data.activeType === "all" ? 1 : "",
    c: common_vendor.o(($event) => $data.activeType = "all"),
    d: $data.activeType === "prepare" ? 1 : "",
    e: common_vendor.o(($event) => $data.activeType = "prepare"),
    f: $data.activeType === "pregnancy" ? 1 : "",
    g: common_vendor.o(($event) => $data.activeType = "pregnancy"),
    h: $data.activeType === "postpartum" ? 1 : "",
    i: common_vendor.o(($event) => $data.activeType = "postpartum"),
    j: common_vendor.o((...args) => $options.quickConsult && $options.quickConsult(...args)),
    k: common_vendor.t($options.typeTitle),
    l: common_vendor.t($options.filteredExperts.length),
    m: common_vendor.f($options.filteredExperts, (expert, index, i0) => {
      return common_vendor.e({
        a: expert.avatar,
        b: common_vendor.t(expert.name),
        c: common_vendor.t(expert.title),
        d: expert.online
      }, expert.online ? {} : {}, {
        e: common_vendor.t(expert.hospital),
        f: common_vendor.t(expert.department),
        g: common_vendor.f(expert.tags, (tag, idx, i1) => {
          return {
            a: common_vendor.t(tag),
            b: idx
          };
        }),
        h: common_vendor.t(expert.rating),
        i: common_vendor.t(expert.consultCount),
        j: common_vendor.t(expert.responseTime),
        k: common_vendor.o(($event) => $options.showReservePopup(expert), index),
        l: index
      });
    }),
    n: common_vendor.f($data.commonFaq, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.o(($event) => $options.goToFaqDetail(item), index),
        c: index
      };
    }),
    o: $data.showPopup
  }, $data.showPopup ? {
    p: common_vendor.o((...args) => $options.closePopup && $options.closePopup(...args))
  } : {}, {
    q: $data.showPopup
  }, $data.showPopup ? {
    r: common_vendor.t($data.currentExpert.name),
    s: common_vendor.o((...args) => $options.closePopup && $options.closePopup(...args)),
    t: $data.currentExpert.avatar,
    v: common_vendor.t($data.currentExpert.name),
    w: common_vendor.t($data.currentExpert.title),
    x: common_vendor.t($data.currentExpert.hospital),
    y: common_vendor.t($data.currentExpert.department),
    z: common_vendor.f($data.consultTypes, (type, idx, i0) => {
      return {
        a: common_vendor.t(type),
        b: $data.selectedConsultType === type ? 1 : "",
        c: idx,
        d: common_vendor.o(($event) => $data.selectedConsultType = type, idx)
      };
    }),
    A: common_vendor.f($data.availableTimes, (time, idx, i0) => {
      return {
        a: common_vendor.t(time),
        b: $data.selectedTime === time ? 1 : "",
        c: idx,
        d: common_vendor.o(($event) => $data.selectedTime = time, idx)
      };
    }),
    B: $data.problemDesc,
    C: common_vendor.o(($event) => $data.problemDesc = $event.detail.value),
    D: common_vendor.o((...args) => $options.closePopup && $options.closePopup(...args)),
    E: common_vendor.o((...args) => $options.submitReserve && $options.submitReserve(...args))
  } : {}, {
    F: $data.showSuccessPopup
  }, $data.showSuccessPopup ? {
    G: common_vendor.o(($event) => $data.showSuccessPopup = false)
  } : {}, {
    H: $data.showSuccessPopup
  }, $data.showSuccessPopup ? {
    I: common_vendor.t($data.selectedTime),
    J: common_vendor.o(($event) => $data.showSuccessPopup = false)
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fc47d1f9"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/health/room.js.map
