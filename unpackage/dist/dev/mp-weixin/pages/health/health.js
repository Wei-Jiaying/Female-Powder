"use strict";
const common_vendor = require("../../common/vendor.js");
const PrepareMode = () => "./PrepareMode.js";
const PregnancyMode = () => "./PregnancyMode.js";
const PostpartumMode = () => "./PostpartumMode.js";
const _sfc_main = {
  components: {
    PrepareMode,
    PregnancyMode,
    PostpartumMode
  },
  data() {
    return {
      modeList: [
        {
          name: "备孕",
          value: "prepare",
          color: "#8ab4f8",
          emoji: "🌸"
        },
        {
          name: "孕期",
          value: "pregnancy",
          color: "#c199f6",
          emoji: "🤰"
        },
        {
          name: "产后",
          value: "postpartum",
          color: "#ff9a9e",
          emoji: "👩‍🍼"
        }
      ],
      currentMode: ""
    };
  },
  // 新增：页面加载时接收参数并自动匹配模式
  onLoad(options) {
    const targetMode = options.mode;
    if (!targetMode)
      return;
    const isValidMode = this.modeList.some((item) => item.value === targetMode);
    if (isValidMode) {
      this.currentMode = targetMode;
    }
  },
  methods: {
    switchMode(modeValue) {
      this.currentMode = modeValue;
      common_vendor.index.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    }
  }
};
if (!Array) {
  const _component_prepare_mode = common_vendor.resolveComponent("prepare-mode");
  const _component_pregnancy_mode = common_vendor.resolveComponent("pregnancy-mode");
  const _component_postpartum_mode = common_vendor.resolveComponent("postpartum-mode");
  (_component_prepare_mode + _component_pregnancy_mode + _component_postpartum_mode)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.modeList, (mode, index, i0) => {
      return {
        a: common_vendor.t(mode.emoji),
        b: mode.color,
        c: common_vendor.t(mode.name),
        d: index,
        e: common_vendor.n($data.currentMode === mode.value ? "mode-active" : ""),
        f: common_vendor.o(($event) => $options.switchMode(mode.value), index)
      };
    }),
    b: $data.currentMode === "prepare"
  }, $data.currentMode === "prepare" ? {} : $data.currentMode === "pregnancy" ? {} : $data.currentMode === "postpartum" ? {} : {}, {
    c: $data.currentMode === "pregnancy",
    d: $data.currentMode === "postpartum"
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-04910d43"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/health/health.js.map
