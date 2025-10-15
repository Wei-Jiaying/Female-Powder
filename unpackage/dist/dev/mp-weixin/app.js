"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/index/login.js";
  "./pages/index/register.js";
  "./pages/home/home.js";
  "./pages/mall/mall.js";
  "./pages/ai/ai.js";
  "./pages/health/health.js";
  "./pages/index/person.js";
  "./pages/health/medicine.js";
  "./pages/health/knowledge.js";
  "./pages/health/hospital.js";
  "./pages/health/course.js";
  "./pages/health/room.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:4", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:7", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:10", "App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
