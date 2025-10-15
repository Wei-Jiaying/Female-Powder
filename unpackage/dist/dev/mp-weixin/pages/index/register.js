"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      agreePrivacy: [],
      // 使用数组来存储勾选的值
      showPassword: false,
      // 控制密码是否可见
      showConfirmPassword: false
      // 控制确认密码是否可见
    };
  },
  methods: {
    onAgreeChange(e) {
      this.agreePrivacy = e.detail.value;
    },
    handleRegister() {
      common_vendor.index.__f__("log", "at pages/index/register.vue:71", "最终提交的表单数据：", {
        username: this.username,
        password: this.password,
        confirmPassword: this.confirmPassword,
        agreePrivacy: 1
        // 直接使用 agreePrivacy
      });
      if (!this.username) {
        common_vendor.index.showToast({
          title: "请输入账号",
          icon: "none"
        });
        return;
      }
      if (!this.password) {
        common_vendor.index.showToast({
          title: "请输入密码",
          icon: "none"
        });
        return;
      }
      if (this.password !== this.confirmPassword) {
        common_vendor.index.showToast({
          title: "两次输入密码不一致",
          icon: "none"
        });
        return;
      }
      if (!this.agreePrivacy.includes("1")) {
        common_vendor.index.showToast({
          title: "请同意隐私协议",
          icon: "none"
        });
        return;
      }
      common_vendor.index.request({
        url: "/api/register",
        method: "POST",
        header: {
          "Content-Type": "application/json"
          // 'X-Bypass-Auth': 'true' 
        },
        data: {
          username: this.username,
          password: this.password,
          confirmpassword: this.confirmPassword,
          agreePrivacy: 1
          // 将协议值传递为 '1' 或 '0'
        },
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/index/register.vue:122", "注册接口返回数据:", res.data);
          if (res.data.code === 1) {
            common_vendor.index.showToast({
              title: "注册成功",
              icon: "success"
            });
            common_vendor.index.navigateTo({
              url: "/pages/Gadget/login"
            });
          } else {
            common_vendor.index.showToast({
              title: res.data.msg || "登录失败",
              icon: "none"
            });
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/index/register.vue:139", "注册请求失败", err);
          common_vendor.index.showToast({
            title: "网络请求失败",
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
    b: common_assets._imports_1,
    c: common_assets._imports_2$2,
    d: $data.username,
    e: common_vendor.o(($event) => $data.username = $event.detail.value),
    f: $data.showPassword ? "/static/Gadget/icon5.png" : "/static/Gadget/icon4.png",
    g: common_vendor.o(($event) => $data.showPassword = !$data.showPassword),
    h: $data.showPassword ? "text" : "password",
    i: $data.password,
    j: common_vendor.o(($event) => $data.password = $event.detail.value),
    k: $data.showConfirmPassword ? "/static/Gadget/icon5.png" : "/static/Gadget/icon4.png",
    l: common_vendor.o(($event) => $data.showConfirmPassword = !$data.showConfirmPassword),
    m: $data.showConfirmPassword ? "text" : "password",
    n: $data.confirmPassword,
    o: common_vendor.o(($event) => $data.confirmPassword = $event.detail.value),
    p: common_vendor.o((...args) => $options.handleRegister && $options.handleRegister(...args)),
    q: common_vendor.o((...args) => $options.onAgreeChange && $options.onAgreeChange(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-224dede7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/register.js.map
