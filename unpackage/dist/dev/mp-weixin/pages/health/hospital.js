"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 模式切换：upload-上传解读，manual-手动查询
      currentMode: "upload",
      // 搜索相关
      searchKeyword: "",
      searchResult: [],
      hotTags: ["白细胞", "红细胞", "血糖", "肌酐", "转氨酶", "血小板"],
      // 示例血常规指标
      bloodIndex: [
        {
          name: "白细胞（WBC）",
          result: "10.2×10⁹/L",
          range: "4-10×10⁹/L",
          desc: "略高，可能存在炎症",
          abnormal: true
        },
        {
          name: "红细胞（RBC）",
          result: "4.8×10¹²/L",
          range: "3.8-5.1×10¹²/L",
          desc: "正常",
          abnormal: false
        },
        {
          name: "血红蛋白（Hb）",
          result: "145g/L",
          range: "115-150g/L",
          desc: "正常",
          abnormal: false
        },
        {
          name: "血小板（PLT）",
          result: "230×10⁹/L",
          range: "125-350×10⁹/L",
          desc: "正常",
          abnormal: false
        }
      ],
      // 检查指标数据库（用于模拟查询）
      indexDatabase: [
        {
          name: "白细胞（WBC）",
          range: "成人4-10×10⁹/L，儿童5-12×10⁹/L",
          meaning: "白细胞是免疫系统的重要组成部分，帮助身体抵抗感染",
          abnormalHint: "升高：可能提示感染、炎症或应激；降低：可能提示免疫功能低下、药物影响"
        },
        {
          name: "血糖（GLU）",
          range: "空腹3.9-6.1mmol/L，餐后2小时<7.8mmol/L",
          meaning: "血液中的葡萄糖浓度，是身体能量的主要来源",
          abnormalHint: "升高：可能提示糖尿病、糖耐量异常；降低：可能提示低血糖、营养不良"
        },
        {
          name: "红细胞（RBC）",
          range: "女性3.8-5.1×10¹²/L，男性4.3-5.8×10¹²/L",
          meaning: "携带氧气至身体各组织的血细胞",
          abnormalHint: "升高：可能提示脱水、高原适应；降低：可能提示贫血"
        }
      ],
      // 帮助弹窗控制
      showHelpPopup: false
    };
  },
  methods: {
    // 返回上一页
    goBack() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    // 显示帮助弹窗
    showHelp() {
      this.showHelpPopup = true;
    },
    // 切换模式
    switchToManual() {
      this.currentMode = "manual";
      this.searchResult = [];
    },
    // 上传病历单
    uploadRecord() {
      common_vendor.index.showToast({
        title: "请选择照片上传",
        icon: "none"
      });
    },
    // 搜索指标
    searchIndex() {
      if (!this.searchKeyword.trim()) {
        common_vendor.index.showToast({
          title: "请输入查询项目",
          icon: "none"
        });
        return;
      }
      const results = this.indexDatabase.filter(
        (item) => item.name.includes(this.searchKeyword)
      );
      this.searchResult = results;
      if (results.length === 0) {
        common_vendor.index.showToast({
          title: "未找到相关指标",
          icon: "none"
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.o((...args) => $options.showHelp && $options.showHelp(...args)),
    c: common_vendor.o((...args) => $options.uploadRecord && $options.uploadRecord(...args)),
    d: common_vendor.o((...args) => $options.switchToManual && $options.switchToManual(...args)),
    e: $data.currentMode === "upload"
  }, $data.currentMode === "upload" ? {
    f: common_vendor.f($data.bloodIndex, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.result),
        c: item.abnormal ? 1 : "",
        d: common_vendor.t(item.range),
        e: common_vendor.t(item.desc),
        f: index
      };
    })
  } : {}, {
    g: $data.currentMode === "manual"
  }, $data.currentMode === "manual" ? common_vendor.e({
    h: $data.searchKeyword,
    i: common_vendor.o(($event) => $data.searchKeyword = $event.detail.value),
    j: common_vendor.o((...args) => $options.searchIndex && $options.searchIndex(...args)),
    k: $data.searchResult.length > 0
  }, $data.searchResult.length > 0 ? {
    l: common_vendor.f($data.searchResult, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.range),
        c: common_vendor.t(item.meaning),
        d: common_vendor.t(item.abnormalHint),
        e: index
      };
    })
  } : {}, {
    m: $data.searchResult.length === 0
  }, $data.searchResult.length === 0 ? {
    n: common_vendor.f($data.hotTags, (tag, index, i0) => {
      return {
        a: common_vendor.t(tag),
        b: common_vendor.o(($event) => {
          $data.searchKeyword = tag;
          $options.searchIndex();
        }, index),
        c: index
      };
    })
  } : {}) : {}, {
    o: $data.showHelpPopup
  }, $data.showHelpPopup ? {
    p: common_vendor.o(($event) => $data.showHelpPopup = false)
  } : {}, {
    q: $data.showHelpPopup
  }, $data.showHelpPopup ? {
    r: common_vendor.o(($event) => $data.showHelpPopup = false)
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-592fc685"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/health/hospital.js.map
