"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "TraditionalChineseMedicinePage",
  data() {
    return {
      swiperList: [
        {
          bgColor: "linear-gradient(135deg, #F0E6D0 0%, #E0D0B0 50%, #D0BC90 100%)",
          lineColor: "rgba(136,90,30,0.4)",
          icon: "🧑⚕️",
          title: "中医体质辨识",
          desc: "专属体质分析，定制养生方案"
        },
        {
          bgColor: "linear-gradient(135deg, #D0E8E0 0%, #B0D8C8 50%, #90C8B0 100%)",
          lineColor: "rgba(60,120,80,0.4)",
          icon: "📅",
          title: "节气养生指南",
          desc: "顺应时节变化，调理身心状态"
        },
        {
          bgColor: "linear-gradient(135deg, #D0D8E8 0%, #B0BCC8 50%, #909CB0 100%)",
          lineColor: "rgba(60,80,120,0.4)",
          icon: "🗺️",
          title: "经络穴位查询",
          desc: "专业穴位图解，在家轻松按摩"
        }
      ],
      functionItems: [
        {
          title: "膳食养生",
          icon: "🍲",
          iconBg: "linear-gradient(135deg, #FFE0C0 0%, #FFD0A0 100%)",
          iconShadow: "0 3rpx 6rpx rgba(240,150,80,0.2)"
        },
        {
          title: "中药养生",
          icon: "🌿",
          iconBg: "linear-gradient(135deg, #D0E8D0 0%, #B0D8B0 100%)",
          iconShadow: "0 3rpx 6rpx rgba(80,160,100,0.2)"
        },
        {
          title: "中医听诊",
          icon: "🔊",
          iconBg: "linear-gradient(135deg, #D0D8E8 0%, #B0BCE0 100%)",
          iconShadow: "0 3rpx 6rpx rgba(80,120,180,0.2)"
        },
        {
          title: "经络医学",
          icon: "🗺️",
          iconBg: "linear-gradient(135deg, #E8E0D0 0%, #D0C8B0 100%)",
          iconShadow: "0 3rpx 6rpx rgba(160,140,80,0.2)"
        },
        {
          title: "在线开方",
          icon: "📝",
          iconBg: "linear-gradient(135deg, #E8D0E0 0%, #D0B0D0 100%)",
          iconShadow: "0 3rpx 6rpx rgba(160,80,160,0.2)"
        },
        {
          title: "中医古籍",
          icon: "📚",
          iconBg: "linear-gradient(135deg, #D0E8E8 0%, #B0D0D8 100%)",
          iconShadow: "0 3rpx 6rpx rgba(80,160,180,0.2)"
        },
        {
          title: "诀窍常识",
          icon: "💡",
          iconBg: "linear-gradient(135deg, #E8D8D0 0%, #D0C0B0 100%)",
          iconShadow: "0 3rpx 6rpx rgba(180,120,80,0.2)"
        }
      ],
      // 推荐数据：新增标签背景色，丰富视觉
      recommendList: [
        {
          title: "秋季润燥汤谱",
          desc: "3款经典润燥食疗方，缓解秋燥口干、皮肤干痒等不适，适合全家饮用",
          icon: "🍂",
          headerBg: "linear-gradient(135deg, #FFDFC0 0%, #FFCFA0 100%)",
          tagBg: "rgba(240,150,80,0.2)"
        },
        {
          title: "肩颈经络疏通",
          desc: "5分钟穴位按摩法，针对风池、肩井、天宗等穴位，改善办公族肩颈僵硬",
          icon: "🙌",
          headerBg: "linear-gradient(135deg, #D0DCE8 0%, #B0C0E0 100%)",
          tagBg: "rgba(80,120,180,0.2)"
        },
        {
          title: "气虚体质调理",
          desc: '日常养生小妙招：晨起喝黄芪水、做八段锦"两手托天理三焦"式，补气效果佳',
          icon: "🌬️",
          headerBg: "linear-gradient(135deg, #D0E8D8 0%, #B0D0C0 100%)",
          tagBg: "rgba(80,160,100,0.2)"
        },
        {
          title: "睡前助眠功法",
          desc: "简单太极小动作：仰卧抱膝、按揉涌泉穴，配合腹式呼吸，助你快速入眠",
          icon: "😴",
          headerBg: "linear-gradient(135deg, #E8D0E0 0%, #D0B0D0 100%)",
          tagBg: "rgba(160,80,160,0.2)"
        }
      ]
    };
  },
  methods: {
    ClickFunctionItem(title) {
      common_vendor.index.showToast({
        title: `${title}功能待开启`,
        icon: "none",
        duration: 1500
      });
    },
    ClickRecommend(title) {
      common_vendor.index.showToast({
        title: `查看《${title}》`,
        icon: "none",
        duration: 1500
      });
    },
    showMoreRecommend() {
      common_vendor.index.showToast({
        title: "更多推荐待更新",
        icon: "none",
        duration: 1500
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.swiperList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.icon),
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.desc),
        d: item.lineColor,
        e: item.bgColor,
        f: index
      };
    }),
    b: common_vendor.f($data.functionItems, (item, index, i0) => {
      return {
        a: common_vendor.t(item.icon),
        b: item.iconBg,
        c: item.iconShadow,
        d: common_vendor.t(item.title),
        e: index,
        f: common_vendor.o(($event) => $options.ClickFunctionItem(item.title), index)
      };
    }),
    c: common_vendor.o((...args) => $options.showMoreRecommend && $options.showMoreRecommend(...args)),
    d: common_vendor.f($data.recommendList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.icon),
        b: item.headerBg,
        c: common_vendor.t(item.title),
        d: common_vendor.t(item.desc),
        e: item.tagBg,
        f: index,
        g: common_vendor.o(($event) => $options.ClickRecommend(item.title), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-828798c4"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/health/medicine.js.map
