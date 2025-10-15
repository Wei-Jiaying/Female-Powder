"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  name: "FertilityKnowledgePage",
  data() {
    return {
      // 当前激活的阶段
      activeStage: "prepare",
      // 备孕阶段知识数据
      prepareKnowledge: [
        {
          title: "备孕前3个月必做的5项检查",
          desc: "全面了解备孕检查项目，排查健康隐患，为优质受孕做准备",
          cover: "https://picsum.photos/200/140?random=10",
          viewCount: "2.3万",
          date: "2024-03-15"
        },
        {
          title: "备孕饮食黄金搭配：补充叶酸的正确方式",
          desc: "不止叶酸！备孕期间蛋白质、维生素的科学摄入方案",
          cover: "https://picsum.photos/200/140?random=11",
          viewCount: "1.8万",
          date: "2024-02-28"
        },
        {
          title: "备孕期间如何调整作息：远离这些不良习惯",
          desc: "熬夜、久坐、压力大对备孕的影响及改善方法",
          cover: "https://picsum.photos/200/140?random=12",
          viewCount: "1.5万",
          date: "2024-01-20"
        }
      ],
      // 备孕常见问题
      prepareFaq: [
        {
          question: "备孕多久没成功需要去医院检查？",
          answer: "一般情况下，若夫妻双方无避孕措施、规律性生活，年轻夫妻（25-30岁）超过1年未受孕，30岁以上夫妻超过6个月未受孕，建议到医院进行生育相关检查，排查是否存在排卵异常、输卵管堵塞、精子质量等问题。",
          showAnswer: false
        },
        {
          question: "男性备孕需要补充哪些营养？",
          answer: "男性备孕需重点补充锌、硒、维生素E和蛋白质：锌可提升精子活力（多吃牡蛎、瘦肉），硒能减少精子畸形率（多吃坚果、深海鱼），维生素E保护精子细胞膜（多吃菠菜、杏仁），同时避免烟酒、高温环境（如蒸桑拿）影响精子质量。",
          showAnswer: false
        }
      ],
      // 孕期阶段知识
      pregnancyKnowledge: [
        {
          title: "孕期40周产检时间表：每个阶段重点项目",
          desc: "详解孕早期、中期、晚期必做产检，提前了解检查目的和注意事项",
          cover: "https://picsum.photos/200/140?random=20",
          viewCount: "3.5万",
          date: "2024-03-20"
        },
        {
          title: "孕期水肿缓解指南：3个简单有效方法",
          desc: "区分生理性与病理性水肿，通过饮食、姿势、运动改善孕期水肿",
          cover: "https://picsum.photos/200/140?random=21",
          viewCount: "2.7万",
          date: "2024-02-15"
        }
      ],
      // 孕期常见问题
      pregnancyFaq: [{
        question: "孕期可以吃火锅、烧烤吗？",
        answer: "孕期可少量食用，但需注意：1. 确保食材完全煮熟（避免寄生虫、细菌感染）；2. 避免辛辣刺激锅底（减少便秘、痔疮风险）；3. 控制频率（每月1-2次为宜），避免高油高盐饮食影响孕期健康，同时避免食用生鱼片、未熟透的肉类等高危食物。",
        showAnswer: false
      }],
      // 产后阶段知识
      postpartumKnowledge: [
        {
          title: "产后恶露排净时间表：正常vs异常判断",
          desc: "详解恶露不同阶段变化，教你识别异常情况（如持续出血、异味）",
          cover: "https://picsum.photos/200/140?random=30",
          viewCount: "4.2万",
          date: "2024-03-10"
        },
        {
          title: "产后盆底肌修复：黄金期与训练方法",
          desc: "产后42天-6个月是修复关键期，3个在家就能做的凯格尔运动教程",
          cover: "https://picsum.photos/200/140?random=31",
          viewCount: "3.8万",
          date: "2024-02-05"
        }
      ],
      // 产后常见问题
      postpartumFaq: [{
        question: "产后多久可以开始运动？",
        answer: "需根据分娩方式和恢复情况判断：1. 顺产无撕裂/侧切：产后1-2周可做简单散步、腹式呼吸；2. 顺产有撕裂/侧切：伤口愈合后（约2-3周）再开始轻度运动；3. 剖腹产：产后4-6周，伤口完全愈合后，从散步、产后瑜伽等低强度运动开始，避免过早做腹部用力、跳跃等运动，防止腹压过高影响恢复。",
        showAnswer: false
      }]
    };
  },
  methods: {
    // 返回上一页
    goBack() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    // 搜索功能
    handleSearch() {
      common_vendor.index.showToast({
        title: "搜索功能待开启",
        icon: "none"
      });
    },
    // 跳转知识详情页
    goToDetail(item) {
      common_vendor.index.showToast({
        title: `查看《${item.title}》详情`,
        icon: "none"
      });
    },
    // 显示/隐藏FAQ答案
    showFaqAnswer(index, stage = "prepare") {
      switch (stage) {
        case "prepare":
          this.prepareFaq[index].showAnswer = !this.prepareFaq[index].showAnswer;
          break;
        case "pregnancy":
          this.pregnancyFaq[index].showAnswer = !this.pregnancyFaq[index].showAnswer;
          break;
        case "postpartum":
          this.postpartumFaq[index].showAnswer = !this.postpartumFaq[index].showAnswer;
          break;
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_assets._imports_0$3,
    c: common_vendor.o((...args) => $options.handleSearch && $options.handleSearch(...args)),
    d: $data.activeStage === "prepare" ? 1 : "",
    e: common_vendor.o(($event) => $data.activeStage = "prepare"),
    f: $data.activeStage === "pregnancy" ? 1 : "",
    g: common_vendor.o(($event) => $data.activeStage = "pregnancy"),
    h: $data.activeStage === "postpartum" ? 1 : "",
    i: common_vendor.o(($event) => $data.activeStage = "postpartum"),
    j: $data.activeStage === "prepare"
  }, $data.activeStage === "prepare" ? {
    k: common_vendor.f($data.prepareKnowledge, (item, index, i0) => {
      return {
        a: item.cover,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.desc),
        d: common_vendor.t(item.viewCount),
        e: common_vendor.t(item.date),
        f: index,
        g: common_vendor.o(($event) => $options.goToDetail(item), index)
      };
    }),
    l: common_vendor.f($data.prepareFaq, (faq, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(faq.question),
        b: faq.showAnswer ? 1 : "",
        c: faq.showAnswer
      }, faq.showAnswer ? {
        d: common_vendor.t(faq.answer)
      } : {}, {
        e: index,
        f: common_vendor.o(($event) => $options.showFaqAnswer(index), index)
      });
    })
  } : $data.activeStage === "pregnancy" ? {
    n: common_vendor.f($data.pregnancyKnowledge, (item, index, i0) => {
      return {
        a: item.cover,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.desc),
        d: common_vendor.t(item.viewCount),
        e: common_vendor.t(item.date),
        f: index,
        g: common_vendor.o(($event) => $options.goToDetail(item), index)
      };
    }),
    o: common_vendor.f($data.pregnancyFaq, (faq, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(faq.question),
        b: faq.showAnswer ? 1 : "",
        c: faq.showAnswer
      }, faq.showAnswer ? {
        d: common_vendor.t(faq.answer)
      } : {}, {
        e: index,
        f: common_vendor.o(($event) => $options.showFaqAnswer(index, "pregnancy"), index)
      });
    })
  } : $data.activeStage === "postpartum" ? {
    q: common_vendor.f($data.postpartumKnowledge, (item, index, i0) => {
      return {
        a: item.cover,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.desc),
        d: common_vendor.t(item.viewCount),
        e: common_vendor.t(item.date),
        f: index,
        g: common_vendor.o(($event) => $options.goToDetail(item), index)
      };
    }),
    r: common_vendor.f($data.postpartumFaq, (faq, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(faq.question),
        b: faq.showAnswer ? 1 : "",
        c: faq.showAnswer
      }, faq.showAnswer ? {
        d: common_vendor.t(faq.answer)
      } : {}, {
        e: index,
        f: common_vendor.o(($event) => $options.showFaqAnswer(index, "postpartum"), index)
      });
    })
  } : {}, {
    m: $data.activeStage === "pregnancy",
    p: $data.activeStage === "postpartum"
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fbf9e847"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/health/knowledge.js.map
