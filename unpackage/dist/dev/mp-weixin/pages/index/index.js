"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  onLoad() {
  },
  methods: {
    handleRegister() {
      common_vendor.index.navigateTo({
        url: "register"
      });
    },
    handleLogin() {
      common_vendor.index.navigateTo({
        url: "login"
      });
    },
    // 新增：游客模式跳转逻辑
    handleGuestEnter() {
      common_vendor.index.switchTab({
        url: "/pages/home/home"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_assets._imports_1,
    c: common_assets._imports_2,
    d: common_assets._imports_3,
    e: common_assets._imports_4,
    f: common_assets._imports_5,
    g: common_assets._imports_6,
    h: common_vendor.o((...args) => $options.handleLogin && $options.handleLogin(...args)),
    i: common_assets._imports_7,
    j: common_assets._imports_8,
    k: common_assets._imports_9,
    l: common_vendor.o((...args) => $options.handleRegister && $options.handleRegister(...args)),
    m: common_vendor.o((...args) => $options.handleGuestEnter && $options.handleGuestEnter(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
