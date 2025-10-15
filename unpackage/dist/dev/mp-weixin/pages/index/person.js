"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      username: "晴晴",
      userId: "123456789"
    };
  },
  methods: {
    goToHealthPage(mode) {
      common_vendor.wx$1.reLaunch({
        url: `/pages/health/health?mode=${mode}`
        // 这里的参数会被正确传递
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.username.slice(0, 1)),
    b: common_vendor.t($data.username),
    c: common_vendor.t($data.userId),
    d: common_vendor.o(($event) => $options.goToHealthPage("prepare")),
    e: common_vendor.o(($event) => $options.goToHealthPage("pregnancy")),
    f: common_vendor.o(($event) => $options.goToHealthPage("postpartum"))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-56074cfc"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/person.js.map
