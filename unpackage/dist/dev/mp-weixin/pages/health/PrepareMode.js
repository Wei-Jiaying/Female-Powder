"use strict";
const common_vendor = require("../../common/vendor.js");
const uniPopup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
const uniPopupDialog = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup-dialog/uni-popup-dialog.js";
const _sfc_main = {
  components: {
    uniPopup,
    uniPopupDialog
  },
  data() {
    return {
      selectedMood: "",
      // 日历相关
      selectedYear: (/* @__PURE__ */ new Date()).getFullYear(),
      selectedMonth: (/* @__PURE__ */ new Date()).getMonth() + 1,
      yearList: [],
      monthList: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      yearIndex: 0,
      daysInMonth: [],
      currentPhase: "",
      selectedDay: (/* @__PURE__ */ new Date()).getDate(),
      // 健康体检新增数据
      genderList: ["女", "男"],
      // 默认为备孕女性，保留男性选项适配更多场景
      genderIndex: 0,
      age: "",
      waist: "",
      bmi: "",
      fatRate: "",
      adviceList: [],
      // 体检历史记录（存储在本地缓存）
      healthHistory: [],
      // 原有健康数据
      weight: "",
      height: "",
      isHealthy: false,
      // 运动计划相关
      exerciseTypeList: ["跑步", "跳绳", "瑜伽"],
      selectedExerciseType: "跑步",
      exerciseTypeIndex: 0,
      exerciseTime: 30,
      exerciseCalorie: 240,
      exerciseDistance: 3
    };
  },
  onLoad() {
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      this.yearList.push(i + "");
    }
    this.yearIndex = this.yearList.indexOf(this.selectedYear + "");
    this.generateFullCalendar();
    this.loadHealthHistory();
  },
  methods: {
    // 心情记录
    setMood(mood) {
      this.selectedMood = mood;
      common_vendor.index.showToast({
        title: `已记录心情：${mood}`,
        icon: "none",
        duration: 1200
      });
    },
    // 日历相关方法（保持不变）
    generateFullCalendar() {
      const year = this.selectedYear;
      const month = this.selectedMonth;
      const daysInMonth = new Date(year, month, 0).getDate();
      const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
      const totalCells = 42;
      const calendarDays = [];
      for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDays.push({
          date: "",
          phase: ""
        });
      }
      for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push({
          date: i,
          phase: this.getPhase(i)
        });
      }
      const remainingCells = totalCells - calendarDays.length;
      for (let i = 0; i < remainingCells; i++) {
        calendarDays.push({
          date: "",
          phase: ""
        });
      }
      this.daysInMonth = calendarDays;
      if (month === (/* @__PURE__ */ new Date()).getMonth() + 1 && year === (/* @__PURE__ */ new Date()).getFullYear()) {
        this.currentPhase = this.getPhase(this.selectedDay);
      }
    },
    getPhase(day) {
      if (day >= 1 && day <= 5)
        return "luteal";
      if (day >= 6 && day <= 10)
        return "menstrual";
      if (day >= 11 && day <= 16)
        return "ovulation";
      if (day === 17)
        return "ovulation-day";
      if (day === 20)
        return "intercourse";
      return "";
    },
    getPhaseText(phase) {
      const phaseMap = {
        "luteal": "黄体期",
        "menstrual": "月经期",
        "ovulation": "排卵期",
        "ovulation-day": "排卵日",
        "intercourse": "同房日",
        "": "未记录"
      };
      return phaseMap[phase] || "未记录";
    },
    changeYear(e) {
      common_vendor.index.showToast({
        title: "改功能有待进一步完善",
        icon: "none",
        duration: 1500
      });
    },
    changeMonth(e) {
      this.selectedMonth = parseInt(this.monthList[e.detail.value]);
      this.generateFullCalendar();
    },
    selectDay(day) {
      if (day.date) {
        this.selectedDay = day.date;
        this.currentPhase = day.phase;
      }
    },
    goToMenstrualSetting() {
      common_vendor.index.showToast({
        title: "经期设置页面待跳转",
        icon: "none",
        duration: 1500
      });
    },
    // 新增：健康数据计算（BMI+体脂率+建议）
    calculateHealthData() {
      if (!this.weight || !this.height || this.height <= 0) {
        this.bmi = "";
        this.fatRate = "";
        this.adviceList = [];
        return;
      }
      const heightM = this.height / 100;
      const bmiValue = (this.weight / (heightM * heightM)).toFixed(1);
      this.bmi = bmiValue;
      this.isHealthy = bmiValue >= 18.5 && bmiValue <= 24;
      let fatRateValue = 0;
      if (this.genderIndex === 0) {
        if (this.age && this.waist) {
          fatRateValue = (163.205 * Math.log10(this.waist - heightM * 21) - 97.684 * Math.log10(heightM) - 78.387).toFixed(1);
        } else {
          fatRateValue = (1.2 * bmiValue + 0.23 * (this.age || 28) - 5.4).toFixed(1);
        }
      } else {
        fatRateValue = (1.2 * bmiValue + 0.23 * (this.age || 30) - 16.2).toFixed(1);
      }
      if (fatRateValue < 5)
        fatRateValue = 5;
      if (fatRateValue > 50)
        fatRateValue = 50;
      this.fatRate = fatRateValue;
      this.generateAdvice();
    },
    // 新增：生成备孕健康建议
    generateAdvice() {
      const advice = [];
      const bmiNum = parseFloat(this.bmi);
      const fatRateNum = parseFloat(this.fatRate);
      if (bmiNum < 18.5) {
        advice.push("BMI偏低，建议增加优质蛋白摄入（如鸡蛋、牛奶、瘦肉），避免过度节食");
        advice.push("可适当进行力量训练（如瑜伽、弹力带训练），增加肌肉量");
      } else if (bmiNum > 24) {
        advice.push("BMI偏高，建议控制总热量摄入，减少高糖高油食物");
        advice.push("推荐低强度有氧运动（如快走、游泳），每周3-5次，每次30分钟");
      } else {
        advice.push("BMI处于健康范围，继续保持均衡饮食，确保叶酸、铁、钙等营养素摄入");
      }
      if (fatRateNum < 20) {
        advice.push("体脂率偏低，可能影响激素平衡，建议适当增加健康脂肪（如坚果、牛油果）");
      } else if (fatRateNum > 28) {
        advice.push("体脂率偏高，建议减少精制碳水（如白米饭、甜点），增加膳食纤维（如蔬菜、全谷物）");
      } else {
        advice.push("体脂率处于备孕理想范围，注意保持规律作息，避免熬夜和过度压力");
      }
      advice.push("每日补充0.4mg叶酸，避免接触烟酒、化学品和辐射环境");
      this.adviceList = advice;
    },
    // 新增：获取BMI状态样式（颜色区分）
    getBMIStatusClass() {
      if (!this.bmi)
        return "";
      const bmiNum = parseFloat(this.bmi);
      if (bmiNum < 18.5)
        return "status-low";
      if (bmiNum > 24)
        return "status-high";
      return "status-normal";
    },
    // 新增：获取BMI状态文本
    getBMIStatusText() {
      if (!this.bmi)
        return "";
      const bmiNum = parseFloat(this.bmi);
      if (bmiNum < 18.5)
        return "（偏瘦）";
      if (bmiNum >= 18.5 && bmiNum <= 24)
        return "（正常）";
      if (bmiNum > 24 && bmiNum <= 28)
        return "（超重）";
      return "（肥胖）";
    },
    // 新增：获取体脂率状态样式（颜色区分）
    getFatRateStatusClass() {
      if (!this.fatRate)
        return "";
      const fatRateNum = parseFloat(this.fatRate);
      if (this.genderIndex === 0) {
        if (fatRateNum < 20)
          return "status-low";
        if (fatRateNum > 28)
          return "status-high";
      } else {
        if (fatRateNum < 10)
          return "status-low";
        if (fatRateNum > 20)
          return "status-high";
      }
      return "status-normal";
    },
    // 新增：获取体脂率状态文本
    getFatRateStatusText() {
      if (!this.fatRate)
        return "";
      const fatRateNum = parseFloat(this.fatRate);
      if (this.genderIndex === 0) {
        if (fatRateNum < 20)
          return "（偏低）";
        if (fatRateNum >= 20 && fatRateNum <= 28)
          return "（理想）";
        return "（偏高）";
      } else {
        if (fatRateNum < 10)
          return "（偏低）";
        if (fatRateNum >= 10 && fatRateNum <= 20)
          return "（理想）";
        return "（偏高）";
      }
    },
    // 新增：加载本地体检历史记录
    loadHealthHistory() {
      const history = common_vendor.index.getStorageSync("healthHistory");
      this.healthHistory = history ? JSON.parse(history) : [];
    },
    // 新增：保存体检记录到本地缓存
    saveHealthRecord() {
      const date = (/* @__PURE__ */ new Date()).toLocaleDateString().replace(/\//g, "-");
      const record = {
        date,
        bmi: this.bmi,
        fatRate: this.fatRate,
        weight: this.weight,
        height: this.height,
        waist: this.waist || "--"
      };
      this.healthHistory.unshift(record);
      if (this.healthHistory.length > 30) {
        this.healthHistory.pop();
      }
      common_vendor.index.setStorageSync("healthHistory", JSON.stringify(this.healthHistory));
      common_vendor.index.showToast({
        title: "体检记录保存成功",
        icon: "success",
        duration: 1200
      });
    },
    // 新增：显示历史记录弹窗
    showHistory() {
      this.$refs.historyPopup.open();
    },
    // 性别选择
    changeGender(e) {
      this.genderIndex = e.detail.value;
      this.calculateHealthData();
    },
    // 运动计划相关方法（保持不变）
    changeExerciseType(e) {
      this.exerciseTypeIndex = e.detail.value;
      this.selectedExerciseType = this.exerciseTypeList[this.exerciseTypeIndex];
      switch (this.selectedExerciseType) {
        case "跑步":
          this.exerciseTime = 30;
          this.exerciseCalorie = 240;
          this.exerciseDistance = 3;
          break;
        case "跳绳":
          this.exerciseTime = 20;
          this.exerciseCalorie = 280;
          this.exerciseDistance = "";
          break;
        case "瑜伽":
          this.exerciseTime = 45;
          this.exerciseCalorie = 180;
          this.exerciseDistance = "";
          break;
      }
    },
    startExercise() {
      common_vendor.index.showToast({
        title: `开始${this.selectedExerciseType}，加油！`,
        icon: "none",
        duration: 1500
      });
    }
  }
};
if (!Array) {
  const _component_uni_popup = common_vendor.resolveComponent("uni-popup");
  _component_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $options.setMood("😀")),
    b: $data.selectedMood === "😀" ? 1 : "",
    c: common_vendor.o(($event) => $options.setMood("😊")),
    d: $data.selectedMood === "😊" ? 1 : "",
    e: common_vendor.o(($event) => $options.setMood("😕")),
    f: $data.selectedMood === "😕" ? 1 : "",
    g: common_vendor.o(($event) => $options.setMood("😟")),
    h: $data.selectedMood === "😟" ? 1 : "",
    i: common_vendor.o(($event) => $options.setMood("😡")),
    j: $data.selectedMood === "😡" ? 1 : "",
    k: common_vendor.o(($event) => $options.setMood("😭")),
    l: $data.selectedMood === "😭" ? 1 : "",
    m: common_vendor.t($data.selectedYear),
    n: common_vendor.o((...args) => $options.changeYear && $options.changeYear(...args)),
    o: $data.yearIndex,
    p: $data.yearList,
    q: common_vendor.t($data.selectedMonth),
    r: common_vendor.o((...args) => $options.changeMonth && $options.changeMonth(...args)),
    s: $data.selectedMonth - 1,
    t: $data.monthList,
    v: common_vendor.f($data.daysInMonth, (day, index, i0) => {
      return {
        a: common_vendor.t(day.date || ""),
        b: index,
        c: day.phase === "luteal" ? 1 : "",
        d: day.phase === "menstrual" ? 1 : "",
        e: day.phase === "ovulation" ? 1 : "",
        f: day.phase === "ovulation-day" ? 1 : "",
        g: day.phase === "intercourse" ? 1 : "",
        h: $data.selectedDay === day.date ? 1 : "",
        i: !day.date ? 1 : "",
        j: common_vendor.o(($event) => $options.selectDay(day), index)
      };
    }),
    w: common_vendor.t($options.getPhaseText($data.currentPhase)),
    x: common_vendor.o((...args) => $options.goToMenstrualSetting && $options.goToMenstrualSetting(...args)),
    y: common_vendor.o((...args) => $options.showHistory && $options.showHistory(...args)),
    z: common_vendor.t($data.genderList[$data.genderIndex]),
    A: common_vendor.o((...args) => $options.changeGender && $options.changeGender(...args)),
    B: $data.genderIndex,
    C: $data.genderList,
    D: $data.age,
    E: common_vendor.o(($event) => $data.age = $event.detail.value),
    F: common_vendor.o([($event) => $data.weight = $event.detail.value, (...args) => $options.calculateHealthData && $options.calculateHealthData(...args)]),
    G: $data.weight,
    H: common_vendor.o([($event) => $data.height = $event.detail.value, (...args) => $options.calculateHealthData && $options.calculateHealthData(...args)]),
    I: $data.height,
    J: common_vendor.o([($event) => $data.waist = $event.detail.value, (...args) => $options.calculateHealthData && $options.calculateHealthData(...args)]),
    K: $data.waist,
    L: common_vendor.t($data.bmi || "--"),
    M: common_vendor.n($options.getBMIStatusClass()),
    N: common_vendor.t($options.getBMIStatusText()),
    O: common_vendor.t($data.fatRate || "--"),
    P: common_vendor.n($options.getFatRateStatusClass()),
    Q: common_vendor.t($options.getFatRateStatusText()),
    R: $data.bmi && $data.fatRate
  }, $data.bmi && $data.fatRate ? {
    S: common_vendor.f($data.adviceList, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    })
  } : {}, {
    T: common_vendor.o((...args) => $options.saveHealthRecord && $options.saveHealthRecord(...args)),
    U: !$data.bmi || !$data.fatRate,
    V: common_vendor.t($data.selectedExerciseType),
    W: common_vendor.o((...args) => $options.changeExerciseType && $options.changeExerciseType(...args)),
    X: $data.exerciseTypeIndex,
    Y: $data.exerciseTypeList,
    Z: common_vendor.t($data.exerciseTime),
    aa: common_vendor.t($data.exerciseCalorie),
    ab: common_vendor.t($data.exerciseDistance),
    ac: common_vendor.o((...args) => $options.startExercise && $options.startExercise(...args)),
    ad: common_vendor.o(($event) => _ctx.$refs.historyPopup.close()),
    ae: $data.healthHistory.length
  }, $data.healthHistory.length ? {
    af: common_vendor.f($data.healthHistory, (item, index, i0) => {
      return {
        a: common_vendor.t(item.date),
        b: common_vendor.t(item.bmi),
        c: common_vendor.t(item.fatRate),
        d: index
      };
    })
  } : {}, {
    ag: common_vendor.sr("historyPopup", "66d07bc8-0"),
    ah: common_vendor.p({
      type: "bottom",
      mask: true
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-66d07bc8"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/health/PrepareMode.js.map
