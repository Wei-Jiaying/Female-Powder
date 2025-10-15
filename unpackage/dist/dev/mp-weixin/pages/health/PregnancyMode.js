"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 孕期状态
      currentTrimester: "孕中期",
      currentWeek: 18,
      currentDay: 3,
      daysToDue: 152,
      // 心情记录
      moodEmojis: ["😀", "😊", "😕", "😟", "😡", "😭"],
      selectedMood: "",
      // 功能按钮
      functionItems: [
        { name: "产检记录", icon: "📋" },
        { name: "营养建议", icon: "🥗" },
        { name: "胎动计数", icon: "📱" },
        { name: "体重曲线", icon: "📈" },
        { name: "孕期知识", icon: "📚" },
        { name: "家属指南", icon: "👪" }
      ],
      // 胎儿信息
      fetalWeight: "200g",
      fetalLength: "14cm",
      heartRateStatus: "145次/分（正常）",
      checkupReminder: true,
      // 妈妈健康数据
      showHealthData: false,
      weight: 58,
      bloodPressure: "125/80",
      bloodSugar: 5.1,
      // 运动指导
      exerciseTypes: ["孕妇瑜伽", "温和散步", "盆底肌训练", "呼吸练习"],
      exerciseTypeIndex: 0,
      exerciseDuration: "20-30分钟",
      exerciseNote: "避免平躺动作，感到不适立即停止",
      exerciseEnv: "室内常温环境，铺防滑垫",
      // 环境与提示（新增省份选择相关）
      envStats: [
        { name: "温度", value: "24℃", status: "normal" },
        { name: "湿度", value: "55%", status: "normal" },
        { name: "空气质量", value: "优", status: "good" },
        { name: "紫外线", value: "中等", status: "warning" }
      ],
      dailyTip: "今日宜补充钙质，建议晒太阳15分钟促进吸收，避免正午暴晒。",
      // 省份选择数据
      provinces: [
        "北京市",
        "天津市",
        "河北省",
        "山西省",
        "内蒙古自治区",
        "辽宁省",
        "吉林省",
        "黑龙江省",
        "上海市",
        "江苏省",
        "浙江省",
        "安徽省",
        "福建省",
        "江西省",
        "山东省",
        "河南省",
        "湖北省",
        "湖南省",
        "广东省",
        "广西壮族自治区",
        "海南省",
        "重庆市",
        "四川省",
        "贵州省",
        "云南省",
        "西藏自治区",
        "陕西省",
        "甘肃省",
        "青海省",
        "宁夏回族自治区",
        "新疆维吾尔自治区",
        "台湾省",
        "香港特别行政区",
        "澳门特别行政区"
      ],
      selectedProvince: "北京市",
      showProvincePopup: false,
      provinceSearch: ""
    };
  },
  computed: {
    // 过滤省份列表
    filteredProvinces() {
      if (!this.provinceSearch)
        return this.provinces;
      return this.provinces.filter(
        (province) => province.includes(this.provinceSearch)
      );
    }
  },
  methods: {
    // 心情记录
    setMood(emoji) {
      this.selectedMood = emoji;
      common_vendor.index.showToast({
        title: `已记录心情：${emoji}`,
        icon: "none",
        duration: 1200
      });
    },
    // 功能按钮点击
    handleFunctionClick(item) {
      common_vendor.index.showToast({
        title: `${item.name}功能待开启`,
        icon: "none",
        duration: 1500
      });
    },
    // 产检提醒开关
    toggleCheckupReminder() {
      this.checkupReminder = !this.checkupReminder;
    },
    // 健康数据显示切换
    toggleDataDisplay() {
      this.showHealthData = !this.showHealthData;
    },
    // 健康数据状态判断
    getWeightStatusClass() {
      const gain = this.weight - 50;
      if (gain < 3)
        return "status-low";
      if (gain > 7)
        return "status-high";
      return "status-normal";
    },
    getWeightStatusText() {
      const gain = this.weight - 50;
      if (gain < 3)
        return "（增长偏慢）";
      if (gain > 7)
        return "（增长偏快）";
      return "（正常）";
    },
    getPressureStatusClass() {
      const sys = parseInt(this.bloodPressure.split("/")[0]);
      return sys > 130 ? "status-high" : "status-normal";
    },
    getPressureStatusText() {
      const sys = parseInt(this.bloodPressure.split("/")[0]);
      return sys > 130 ? "（轻度升高）" : "（正常）";
    },
    getSugarStatusClass() {
      return this.bloodSugar > 5.1 ? "status-high" : "status-normal";
    },
    getSugarStatusText() {
      return this.bloodSugar > 5.1 ? "（略高）" : "（正常）";
    },
    // 运动类型切换
    changeExerciseType(e) {
      this.exerciseTypeIndex = e.detail.value;
      switch (this.exerciseTypeIndex) {
        case 0:
          this.exerciseDuration = "20-30分钟";
          this.exerciseNote = "避免平躺动作，感到不适立即停止";
          this.exerciseEnv = "室内常温环境，铺防滑垫";
          break;
        case 1:
          this.exerciseDuration = "15-40分钟";
          this.exerciseNote = "选择平坦路面，穿防滑鞋";
          this.exerciseEnv = "公园等空气清新处，避开早晚高峰";
          break;
        case 2:
          this.exerciseDuration = "每组10分钟，每日3组";
          this.exerciseNote = "保持呼吸均匀，避免过度用力";
          this.exerciseEnv = "舒适坐姿或卧姿，放松状态下进行";
          break;
        case 3:
          this.exerciseDuration = "每次5-10分钟";
          this.exerciseNote = "缓慢深呼吸，为分娩做准备";
          this.exerciseEnv = "安静室内，可配合轻音乐";
          break;
      }
    },
    // 开始运动
    startExercise() {
      common_vendor.index.showToast({
        title: `开始${this.exerciseTypes[this.exerciseTypeIndex]}`,
        icon: "none",
        duration: 1500
      });
    },
    // 省份选择弹窗控制
    openProvincePopup() {
      this.showProvincePopup = true;
      this.provinceSearch = "";
    },
    closeProvincePopup() {
      this.showProvincePopup = false;
    },
    // 选择省份
    selectProvince(province) {
      this.selectedProvince = province;
      this.closeProvincePopup();
      common_vendor.index.showToast({
        title: `已选择：${province}`,
        icon: "none",
        duration: 1200
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.currentTrimester),
    b: common_vendor.f($data.functionItems, (item, index, i0) => {
      return {
        a: common_vendor.t(item.icon),
        b: common_vendor.t(item.name),
        c: index,
        d: common_vendor.o(($event) => $options.handleFunctionClick(item), index)
      };
    }),
    c: common_vendor.f($data.moodEmojis, (emoji, index, i0) => {
      return {
        a: common_vendor.t(emoji),
        b: common_vendor.o(($event) => $options.setMood(emoji), index),
        c: $data.selectedMood === emoji ? 1 : "",
        d: index
      };
    }),
    d: common_vendor.t($data.currentWeek),
    e: common_vendor.t($data.currentDay),
    f: common_vendor.t($data.daysToDue),
    g: common_vendor.t($data.fetalWeight),
    h: common_vendor.t($data.fetalLength),
    i: common_vendor.t($data.heartRateStatus),
    j: $data.checkupReminder ? 1 : "",
    k: $data.checkupReminder ? 1 : "",
    l: common_vendor.o((...args) => $options.toggleCheckupReminder && $options.toggleCheckupReminder(...args)),
    m: common_vendor.t($data.showHealthData ? "隐藏" : "显示"),
    n: common_vendor.o((...args) => $options.toggleDataDisplay && $options.toggleDataDisplay(...args)),
    o: $data.showHealthData
  }, $data.showHealthData ? {
    p: common_vendor.t($data.weight),
    q: common_vendor.t($options.getWeightStatusText()),
    r: common_vendor.n($options.getWeightStatusClass()),
    s: common_vendor.t($data.bloodPressure),
    t: common_vendor.t($options.getPressureStatusText()),
    v: common_vendor.n($options.getPressureStatusClass()),
    w: common_vendor.t($data.bloodSugar),
    x: common_vendor.t($options.getSugarStatusText()),
    y: common_vendor.n($options.getSugarStatusClass())
  } : {}, {
    z: $data.showHealthData
  }, $data.showHealthData ? {} : {}, {
    A: common_vendor.t($data.exerciseTypes[$data.exerciseTypeIndex]),
    B: common_vendor.o((...args) => $options.changeExerciseType && $options.changeExerciseType(...args)),
    C: $data.exerciseTypeIndex,
    D: $data.exerciseTypes,
    E: common_vendor.t($data.exerciseDuration),
    F: common_vendor.t($data.exerciseNote),
    G: common_vendor.t($data.exerciseEnv),
    H: common_vendor.o((...args) => $options.startExercise && $options.startExercise(...args)),
    I: common_vendor.t($data.selectedProvince),
    J: common_vendor.o((...args) => $options.openProvincePopup && $options.openProvincePopup(...args)),
    K: common_vendor.f($data.envStats, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.value),
        c: common_vendor.n(item.status),
        d: index
      };
    }),
    L: common_vendor.t($data.dailyTip),
    M: $data.showProvincePopup
  }, $data.showProvincePopup ? {
    N: common_vendor.o((...args) => $options.closeProvincePopup && $options.closeProvincePopup(...args)),
    O: common_vendor.o((...args) => $options.closeProvincePopup && $options.closeProvincePopup(...args)),
    P: $data.provinceSearch,
    Q: common_vendor.o(($event) => $data.provinceSearch = $event.detail.value),
    R: common_vendor.f($options.filteredProvinces, (province, index, i0) => {
      return {
        a: common_vendor.t(province),
        b: index,
        c: common_vendor.o(($event) => $options.selectProvince(province), index)
      };
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-79c1c25e"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/health/PregnancyMode.js.map
