"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 导航状态
      activeTab: "living",
      hasLiving: true,
      // 轮播Banner数据
      bannerList: [
        {
          id: 1,
          bgUrl: "https://picsum.photos/750/300?random=50",
          tag: "正在直播",
          title: "孕期40周营养搭配全指南",
          time: "19:30-21:00",
          viewers: 1258,
          status: "live"
        },
        {
          id: 2,
          bgUrl: "https://picsum.photos/750/300?random=51",
          tag: "明日直播",
          title: "产后修复黄金期训练方案",
          time: "15:00-16:30",
          viewers: 896,
          status: "upcoming"
        }
      ],
      // 正在直播课程
      livingCourses: [{
        id: 101,
        cover: "https://picsum.photos/200/200?random=60",
        title: "孕期40周营养搭配全指南：从备孕到分娩的饮食方案",
        teacherAvatar: "https://picsum.photos/60/60?random=70",
        teacherName: "张敏",
        teacherTitle: "妇产科营养师",
        watchers: 1258,
        time: "19:30-21:00"
      }],
      // 即将开始课程
      upcomingCourses: [
        {
          id: 201,
          cover: "https://picsum.photos/200/200?random=61",
          title: "产后修复黄金期训练方案：盆底肌与腹直肌恢复",
          teacherAvatar: "https://picsum.photos/60/60?random=71",
          teacherName: "李婷",
          teacherTitle: "产后康复师",
          date: "6月15日",
          time: "15:00-16:30",
          countdown: "23:45:30"
        },
        {
          id: 202,
          cover: "https://picsum.photos/200/200?random=62",
          title: "备孕必知：提高卵子质量的5个关键因素",
          teacherAvatar: "https://picsum.photos/60/60?random=72",
          teacherName: "王芳",
          teacherTitle: "生殖医学专家",
          date: "6月16日",
          time: "20:00-21:30",
          countdown: "1天1小时"
        }
      ],
      // 回放课程
      recordCourses: [
        {
          id: 301,
          cover: "https://picsum.photos/200/200?random=63",
          title: "自然分娩全过程解析与减痛技巧",
          teacherAvatar: "https://picsum.photos/60/60?random=73",
          teacherName: "赵丽",
          teacherTitle: "产科主任医师",
          watchers: 3562,
          date: "6月10日"
        },
        {
          id: 302,
          cover: "https://picsum.photos/200/200?random=64",
          title: "新生儿护理入门：洗澡、换尿布与睡眠指导",
          teacherAvatar: "https://picsum.photos/60/60?random=74",
          teacherName: "陈静",
          teacherTitle: "儿科护士",
          watchers: 2891,
          date: "6月8日"
        }
      ],
      // 推荐讲师
      recommendedTeachers: [
        {
          avatar: "https://picsum.photos/100/100?random=80",
          name: "张敏",
          title: "妇产科营养师",
          courseCount: 12
        },
        {
          avatar: "https://picsum.photos/100/100?random=81",
          name: "赵丽",
          title: "产科主任医师",
          courseCount: 8
        },
        {
          avatar: "https://picsum.photos/100/100?random=82",
          name: "李婷",
          title: "产后康复师",
          courseCount: 15
        }
      ],
      // 弹窗控制
      showReservePopup: false
    };
  },
  methods: {
    // 返回上一页
    goBack() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    // 分享页面
    sharePage() {
      common_vendor.index.showToast({
        title: "分享成功",
        icon: "none"
      });
    },
    // 进入直播
    enterLive(id) {
      common_vendor.index.showToast({
        title: `进入直播 ${id}`,
        icon: "none"
      });
    },
    // 预约课程
    reserveCourse(id) {
      this.showReservePopup = true;
      common_vendor.index.__f__("log", "at pages/health/course.vue:284", `预约课程 ${id}`);
    },
    // 播放回放
    playRecord(id) {
      common_vendor.index.showToast({
        title: `播放回放 ${id}`,
        icon: "none"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.o((...args) => $options.sharePage && $options.sharePage(...args)),
    c: common_vendor.f($data.bannerList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.tag),
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.time),
        d: common_vendor.t(item.viewers),
        e: common_vendor.t(item.status === "live" ? "进入直播" : "立即预约"),
        f: common_vendor.o(($event) => $options.enterLive(item.id), index),
        g: `url(${item.bgUrl})`,
        h: index
      };
    }),
    d: $data.hasLiving
  }, $data.hasLiving ? {} : {}, {
    e: $data.activeTab === "living" ? 1 : "",
    f: common_vendor.o(($event) => $data.activeTab = "living"),
    g: $data.activeTab === "upcoming" ? 1 : "",
    h: common_vendor.o(($event) => $data.activeTab = "upcoming"),
    i: $data.activeTab === "record" ? 1 : "",
    j: common_vendor.o(($event) => $data.activeTab = "record"),
    k: $data.activeTab === "living"
  }, $data.activeTab === "living" ? {
    l: common_vendor.f($data.livingCourses, (course, index, i0) => {
      return {
        a: course.cover,
        b: common_vendor.t(course.title),
        c: course.teacherAvatar,
        d: common_vendor.t(course.teacherName),
        e: common_vendor.t(course.teacherTitle),
        f: common_vendor.t(course.watchers),
        g: common_vendor.t(course.time),
        h: common_vendor.o(($event) => $options.enterLive(course.id), index),
        i: index
      };
    })
  } : {}, {
    m: $data.activeTab === "upcoming"
  }, $data.activeTab === "upcoming" ? {
    n: common_vendor.f($data.upcomingCourses, (course, index, i0) => {
      return common_vendor.e({
        a: course.cover,
        b: common_vendor.t(course.title),
        c: course.teacherAvatar,
        d: common_vendor.t(course.teacherName),
        e: common_vendor.t(course.teacherTitle),
        f: common_vendor.t(course.date),
        g: common_vendor.t(course.time),
        h: course.countdown
      }, course.countdown ? {
        i: common_vendor.t(course.countdown)
      } : {}, {
        j: common_vendor.o(($event) => $options.reserveCourse(course.id), index),
        k: index
      });
    })
  } : {}, {
    o: $data.activeTab === "record"
  }, $data.activeTab === "record" ? {
    p: common_vendor.f($data.recordCourses, (course, index, i0) => {
      return {
        a: course.cover,
        b: common_vendor.t(course.title),
        c: course.teacherAvatar,
        d: common_vendor.t(course.teacherName),
        e: common_vendor.t(course.teacherTitle),
        f: common_vendor.t(course.watchers),
        g: common_vendor.t(course.date),
        h: common_vendor.o(($event) => $options.playRecord(course.id), index),
        i: index
      };
    })
  } : {}, {
    q: common_vendor.f($data.recommendedTeachers, (teacher, index, i0) => {
      return {
        a: teacher.avatar,
        b: common_vendor.t(teacher.name),
        c: common_vendor.t(teacher.title),
        d: common_vendor.t(teacher.courseCount),
        e: index
      };
    }),
    r: $data.showReservePopup
  }, $data.showReservePopup ? {
    s: common_vendor.o(($event) => $data.showReservePopup = false)
  } : {}, {
    t: $data.showReservePopup
  }, $data.showReservePopup ? {
    v: common_vendor.o(($event) => $data.showReservePopup = false)
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9a0b5a30"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/health/course.js.map
