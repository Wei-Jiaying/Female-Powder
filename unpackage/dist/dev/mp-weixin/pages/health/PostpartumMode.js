"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 产后状态
      repairDays: 15,
      woundStatus: "伤口基本愈合，轻微色素沉着",
      woundNotes: "避免剧烈运动，保持清洁干燥",
      // 心情记录
      moodEmojis: ["😀", "😊", "😕", "😟", "😡", "😭", "😤"],
      selectedMood: "",
      // 功能按钮
      functionItems: [
        {
          name: "恶露记录",
          icon: "📝"
        },
        {
          name: "睡眠监测",
          icon: "💤"
        },
        {
          name: "育儿知识",
          icon: "📚"
        },
        {
          name: "体重管理",
          icon: "⚖️"
        },
        {
          name: "乳汁监测",
          icon: "🍼"
        },
        {
          name: "心理疏导",
          icon: "🧘‍♀️"
        }
      ],
      // 营养膳食
      breakfastCompleted: true,
      lunchCompleted: false,
      dinnerCompleted: false,
      proteinValue: 65,
      proteinPercent: "65%",
      fatValue: 25,
      fatPercent: "50%",
      vitaminValue: 80,
      vitaminPercent: "80%",
      calorieValue: 1800,
      caloriePercent: "60%",
      dietTip: "今日蛋白质摄入充足，可适当增加膳食纤维",
      recommendMeals: [
        {
          name: "红枣桂圆粥"
        },
        {
          name: "清蒸鲈鱼"
        },
        {
          name: "西兰花炒虾仁"
        }
      ],
      groceryContent: "红枣、桂圆、鲈鱼、西兰花、虾仁",
      // 运动康复
      exerciseCourses: [
        {
          name: "【产后腰痛缓解】5个瑜伽动作"
        },
        {
          name: "【产后康复操】盆底肌修复"
        },
        {
          name: "【腹式呼吸三部曲】核心训练"
        },
        {
          name: "【产后瘦肚子】早晨10分钟"
        }
      ],
      // 弹窗控制
      showScanPopup: false,
      showNoteForm: false,
      showExercisePlanForm: false,
      // 云备注表单数据
      currentDate: "",
      woundStatusOptions: ["正常愈合", "轻微红肿", "有分泌物", "疼痛加剧"],
      woundStatusIndex: 0,
      noteContent: "",
      isMedicine: false,
      // 运动计划表单数据
      frequencyOptions: ["每周2次", "每周3次", "每周4次", "每周5次以上"],
      frequencyIndex: 1,
      durationOptions: ["10分钟", "20分钟", "30分钟", "40分钟以上"],
      durationIndex: 1,
      exerciseTypeOptions: [
        {
          name: "瑜伽",
          checked: true
        },
        {
          name: "散步",
          checked: true
        },
        {
          name: "盆底肌训练",
          checked: false
        },
        {
          name: "呼吸练习",
          checked: false
        }
      ]
    };
  },
  onLoad() {
    const date = /* @__PURE__ */ new Date();
    this.currentDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
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
    // 产后修复相关
    takePhoto() {
      common_vendor.index.showToast({
        title: "拍照上传功能待开启",
        icon: "none",
        duration: 1500
      });
    },
    // 云备注表单控制
    openNoteForm() {
      this.showNoteForm = true;
    },
    closeNoteForm() {
      this.showNoteForm = false;
    },
    onWoundStatusChange(e) {
      this.woundStatusIndex = e.detail.value;
    },
    setMedicine(flag) {
      this.isMedicine = flag;
    },
    saveNote() {
      this.closeNoteForm();
      common_vendor.index.showToast({
        title: "备注已保存",
        icon: "none",
        duration: 1500
      });
    },
    // 营养膳食相关
    toggleBreakfast() {
      this.breakfastCompleted = !this.breakfastCompleted;
    },
    toggleLunch() {
      this.lunchCompleted = !this.lunchCompleted;
    },
    toggleDinner() {
      this.dinnerCompleted = !this.dinnerCompleted;
    },
    openPhotoIdentify() {
      this.showScanPopup = true;
    },
    closeScanPopup() {
      this.showScanPopup = false;
    },
    handlePhotoIdentify() {
      this.closeScanPopup();
      common_vendor.index.showToast({
        title: "食物鉴定功能待开启",
        icon: "none",
        duration: 1500
      });
    },
    viewMoreMeals() {
      common_vendor.index.showToast({
        title: "查看更多推荐餐食",
        icon: "none"
      });
    },
    openPurchaseForm() {
      common_vendor.index.showToast({
        title: "最近购买点功能待开启",
        icon: "none"
      });
    },
    openTabooForm() {
      common_vendor.index.showToast({
        title: "饮食禁忌功能待开启",
        icon: "none"
      });
    },
    // 运动计划表单控制
    openExercisePlanForm() {
      this.showExercisePlanForm = true;
    },
    closeExercisePlanForm() {
      this.showExercisePlanForm = false;
    },
    onFrequencyChange(e) {
      this.frequencyIndex = e.detail.value;
    },
    onDurationChange(e) {
      this.durationIndex = e.detail.value;
    },
    toggleExerciseType(index) {
      this.exerciseTypeOptions[index].checked = !this.exerciseTypeOptions[index].checked;
    },
    saveExercisePlan() {
      this.closeExercisePlanForm();
      common_vendor.index.showToast({
        title: "运动计划已生成",
        icon: "none",
        duration: 1500
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.repairDays),
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
    d: common_vendor.t($data.woundStatus),
    e: common_vendor.t($data.woundNotes),
    f: common_vendor.o((...args) => $options.takePhoto && $options.takePhoto(...args)),
    g: common_vendor.o((...args) => $options.openNoteForm && $options.openNoteForm(...args)),
    h: $data.breakfastCompleted ? 1 : "",
    i: common_vendor.o((...args) => $options.toggleBreakfast && $options.toggleBreakfast(...args)),
    j: $data.lunchCompleted ? 1 : "",
    k: common_vendor.o((...args) => $options.toggleLunch && $options.toggleLunch(...args)),
    l: $data.dinnerCompleted ? 1 : "",
    m: common_vendor.o((...args) => $options.toggleDinner && $options.toggleDinner(...args)),
    n: common_vendor.o((...args) => $options.openPhotoIdentify && $options.openPhotoIdentify(...args)),
    o: $data.proteinPercent,
    p: common_vendor.t($data.proteinValue),
    q: $data.fatPercent,
    r: common_vendor.t($data.fatValue),
    s: $data.vitaminPercent,
    t: common_vendor.t($data.vitaminValue),
    v: $data.caloriePercent,
    w: common_vendor.t($data.calorieValue),
    x: common_vendor.t($data.dietTip),
    y: common_vendor.f($data.recommendMeals, (meal, index, i0) => {
      return {
        a: common_vendor.t(meal.name),
        b: index
      };
    }),
    z: common_vendor.o((...args) => $options.viewMoreMeals && $options.viewMoreMeals(...args)),
    A: common_vendor.t($data.groceryContent),
    B: common_vendor.o((...args) => $options.openPurchaseForm && $options.openPurchaseForm(...args)),
    C: common_vendor.o((...args) => $options.openTabooForm && $options.openTabooForm(...args)),
    D: common_vendor.o((...args) => $options.openExercisePlanForm && $options.openExercisePlanForm(...args)),
    E: common_vendor.f($data.exerciseCourses, (course, index, i0) => {
      return {
        a: common_vendor.t(course.name),
        b: index
      };
    }),
    F: $data.showScanPopup
  }, $data.showScanPopup ? {
    G: common_vendor.o((...args) => $options.closeScanPopup && $options.closeScanPopup(...args)),
    H: common_vendor.o((...args) => $options.closeScanPopup && $options.closeScanPopup(...args)),
    I: common_vendor.o((...args) => $options.handlePhotoIdentify && $options.handlePhotoIdentify(...args))
  } : {}, {
    J: $data.showNoteForm
  }, $data.showNoteForm ? {
    K: common_vendor.o((...args) => $options.closeNoteForm && $options.closeNoteForm(...args)),
    L: common_vendor.o((...args) => $options.closeNoteForm && $options.closeNoteForm(...args)),
    M: common_vendor.t($data.currentDate),
    N: common_vendor.t($data.woundStatusOptions[$data.woundStatusIndex]),
    O: common_vendor.o((...args) => $options.onWoundStatusChange && $options.onWoundStatusChange(...args)),
    P: $data.woundStatusIndex,
    Q: $data.woundStatusOptions,
    R: $data.noteContent,
    S: common_vendor.o(($event) => $data.noteContent = $event.detail.value),
    T: $data.isMedicine ? 1 : "",
    U: common_vendor.o(($event) => $options.setMedicine(true)),
    V: !$data.isMedicine ? 1 : "",
    W: common_vendor.o(($event) => $options.setMedicine(false)),
    X: common_vendor.o((...args) => $options.closeNoteForm && $options.closeNoteForm(...args)),
    Y: common_vendor.o((...args) => $options.saveNote && $options.saveNote(...args))
  } : {}, {
    Z: $data.showExercisePlanForm
  }, $data.showExercisePlanForm ? {
    aa: common_vendor.o((...args) => $options.closeExercisePlanForm && $options.closeExercisePlanForm(...args)),
    ab: common_vendor.o((...args) => $options.closeExercisePlanForm && $options.closeExercisePlanForm(...args)),
    ac: common_vendor.t($data.frequencyOptions[$data.frequencyIndex]),
    ad: common_vendor.o((...args) => $options.onFrequencyChange && $options.onFrequencyChange(...args)),
    ae: $data.frequencyIndex,
    af: $data.frequencyOptions,
    ag: common_vendor.t($data.durationOptions[$data.durationIndex]),
    ah: common_vendor.o((...args) => $options.onDurationChange && $options.onDurationChange(...args)),
    ai: $data.durationIndex,
    aj: $data.durationOptions,
    ak: common_vendor.f($data.exerciseTypeOptions, (type, index, i0) => {
      return common_vendor.e({
        a: type.checked
      }, type.checked ? {} : {}, {
        b: type.checked ? 1 : "",
        c: common_vendor.t(type.name),
        d: index,
        e: common_vendor.o(($event) => $options.toggleExerciseType(index), index)
      });
    }),
    al: common_vendor.o((...args) => $options.closeExercisePlanForm && $options.closeExercisePlanForm(...args)),
    am: common_vendor.o((...args) => $options.saveExercisePlan && $options.saveExercisePlan(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-91338ebb"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/health/PostpartumMode.js.map
