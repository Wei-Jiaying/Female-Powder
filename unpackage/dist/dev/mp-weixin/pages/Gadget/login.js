"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      username: "",
      // 绑定账号输入框
      password: ""
      // 绑定密码输入框
    };
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    handleLogin() {
      if (!this.username || !this.password) {
        common_vendor.index.showToast({
          title: "账号或密码不能为空",
          icon: "none"
        });
        return;
      }
      common_vendor.index.request({
        url: "/api/common/login",
        // 登录接口地址
        method: "POST",
        header: {
          "Content-Type": "application/json"
        },
        data: {
          username: this.username,
          password: this.password,
          agreePrivacy: 1
          // 根据接口要求补充参数
        },
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/Gadget/login.vue:87", "登录接口响应", res.data);
          if (res.data.code === 1) {
            const { token, username: userName } = res.data.data;
            common_vendor.index.setStorageSync("userToken", token);
            common_vendor.index.setStorageSync("userName", userName);
            common_vendor.index.showToast({ title: "登录成功", icon: "success" });
            common_vendor.index.navigateTo({ url: "/pages/Gadget/personCenter" });
          } else {
            common_vendor.index.showToast({
              title: res.data.msg || "登录失败",
              icon: "none"
            });
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/Gadget/login.vue:107", "登录接口请求失败", err);
          common_vendor.index.showToast({
            title: "网络请求失败，请检查网络",
            icon: "none"
          });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$1,
    b: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    c: common_assets._imports_0,
    d: common_assets._imports_2$1,
    e: common_assets._imports_3$1,
    f: common_assets._imports_4$1,
    g: $data.username,
    h: common_vendor.o(($event) => $data.username = $event.detail.value),
    i: common_assets._imports_5$2,
    j: $data.password,
    k: common_vendor.o(($event) => $data.password = $event.detail.value),
    l: common_assets._imports_6$2,
    m: common_assets._imports_7$2,
    n: common_vendor.o((...args) => $options.handleLogin && $options.handleLogin(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7726c180"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/Gadget/login.js.map
