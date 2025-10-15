"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 交互状态
      backPressed: false,
      searchFocused: false,
      searchBtnPressed: false,
      clearBtnPressed: false,
      // 清除按钮按压状态
      activeCategory: 0,
      bannerPressed: false,
      pressedTabIndex: -1,
      showCartToast: false,
      activeNav: 0,
      cartCount: 0,
      searchKeyword: "",
      // 搜索关键词
      // 分类数据
      categories: ["全部商品", "孕期必备", "产后恢复", "婴儿用品", "营养保健"],
      // 底部导航数据（无图标）
      navs: [
        {
          name: "首页"
        },
        {
          name: "分类"
        },
        {
          name: "购物车"
        },
        {
          name: "我的"
        }
      ],
      // 商品数据
      products: [
        {
          id: 1,
          name: "孕妇专用叶酸片",
          desc: "孕早期必备，补充叶酸预防胎儿畸形",
          tag: "热销",
          price: 89,
          originalPrice: 129,
          pressed: false,
          cartPressed: false
        },
        {
          id: 2,
          name: "产妇月子护理套装",
          desc: "包含产褥垫、护理巾等6件套，舒适透气",
          tag: "新品",
          price: 159,
          originalPrice: 239,
          pressed: false,
          cartPressed: false
        },
        {
          id: 3,
          name: "婴儿纯棉连体衣",
          desc: "0-6个月宝宝适用，柔软亲肤无荧光剂",
          tag: "特惠",
          price: 69,
          originalPrice: 99,
          pressed: false,
          cartPressed: false
        },
        {
          id: 4,
          name: "电动吸奶器静音款",
          desc: "双边吸奶，低噪音设计，可充电便携",
          tag: "推荐",
          price: 299,
          originalPrice: 459,
          pressed: false,
          cartPressed: false
        },
        {
          id: 5,
          name: "孕妇钙片柠檬酸钙",
          desc: "孕中晚期补钙，易吸收不便秘，添加维生素D",
          tag: "热销",
          price: 109,
          originalPrice: 159,
          pressed: false,
          cartPressed: false
        },
        {
          id: 6,
          name: "婴儿防胀气奶瓶",
          desc: "宽口径设计，防呛奶防胀气，食品级硅胶奶嘴",
          tag: "新品",
          price: 129,
          originalPrice: 189,
          pressed: false,
          cartPressed: false
        },
        {
          id: 7,
          name: "产后收腹带纯棉",
          desc: "顺产剖腹产通用，透气不闷汗，三段式加压",
          tag: "特惠",
          price: 89,
          originalPrice: 139,
          pressed: false,
          cartPressed: false
        },
        {
          id: 8,
          name: "婴儿恒温调奶器",
          desc: "快速加热至45℃，恒温保持，夜灯功能",
          tag: "推荐",
          price: 229,
          originalPrice: 329,
          pressed: false,
          cartPressed: false
        },
        {
          id: 9,
          name: "孕妇孕期DHA藻油",
          desc: "孕妇专用，促进胎儿大脑发育，无鱼腥味",
          tag: "热销",
          price: 169,
          originalPrice: 239,
          pressed: false,
          cartPressed: false
        },
        {
          id: 10,
          name: "婴儿隔尿垫防水",
          desc: "一次性使用，透气不闷，吸收快防漏",
          tag: "平价",
          price: 49,
          originalPrice: 79,
          pressed: false,
          cartPressed: false
        },
        {
          id: 11,
          name: "产后月子鞋软底",
          desc: "防滑软底，保暖透气，魔术贴调节松紧",
          tag: "新品",
          price: 59,
          originalPrice: 99,
          pressed: false,
          cartPressed: false
        },
        {
          id: 12,
          name: "婴儿安抚奶嘴",
          desc: "医用级硅胶，仿母乳设计，防尘收纳盒",
          tag: "特惠",
          price: 39,
          originalPrice: 69,
          pressed: false,
          cartPressed: false
        },
        {
          id: 13,
          name: "孕妇托腹带",
          desc: "减轻腰部负担，透气不勒，可调节松紧",
          tag: "推荐",
          price: 79,
          originalPrice: 119,
          pressed: false,
          cartPressed: false
        },
        {
          id: 14,
          name: "婴儿湿巾大包装",
          desc: "80抽×5包，无酒精无香精，加厚柔软",
          tag: "热销",
          price: 69,
          originalPrice: 99,
          pressed: false,
          cartPressed: false
        },
        {
          id: 15,
          name: "产后哺乳文胸",
          desc: "无钢圈设计，聚拢防下垂，透气舒适",
          tag: "新品",
          price: 89,
          originalPrice: 139,
          pressed: false,
          cartPressed: false
        },
        {
          id: 16,
          name: "婴儿护臀膏",
          desc: "预防红屁屁，天然成分，温和无刺激",
          tag: "平价",
          price: 59,
          originalPrice: 89,
          pressed: false,
          cartPressed: false
        },
        {
          id: 17,
          name: "孕妇防辐射服",
          desc: "银纤维材质，透气轻薄，可水洗",
          tag: "推荐",
          price: 259,
          originalPrice: 359,
          pressed: false,
          cartPressed: false
        },
        {
          id: 18,
          name: "婴儿床围栏",
          desc: "防摔防护，高度可调节，安全锁设计",
          tag: "特惠",
          price: 329,
          originalPrice: 459,
          pressed: false,
          cartPressed: false
        },
        {
          id: 19,
          name: "产后红糖姜茶",
          desc: "独立包装，驱寒暖宫，帮助恶露排出",
          tag: "新品",
          price: 39,
          originalPrice: 69,
          pressed: false,
          cartPressed: false
        },
        {
          id: 20,
          name: "婴儿辅食研磨碗",
          desc: "手动研磨，食品级材质，多件套组合",
          tag: "热销",
          price: 79,
          originalPrice: 119,
          pressed: false,
          cartPressed: false
        }
      ]
    };
  },
  computed: {
    // 筛选后的商品：根据搜索关键词模糊匹配
    filteredProducts() {
      if (!this.searchKeyword.trim()) {
        return this.products;
      }
      const keyword = this.searchKeyword.trim().toLowerCase();
      return this.products.filter(
        (product) => product.name.toLowerCase().includes(keyword) || product.desc.toLowerCase().includes(keyword) || product.tag && product.tag.toLowerCase().includes(keyword)
      );
    }
  },
  methods: {
    // 实时监听搜索输入
    handleSearchInput() {
    },
    // 点击搜索按钮
    handleSearch() {
      this.searchBtnPressed = true;
      setTimeout(() => {
        this.searchBtnPressed = false;
        common_vendor.index.hideKeyboard();
        if (!this.searchKeyword.trim()) {
          common_vendor.index.showToast({
            title: "请输入搜索关键词",
            icon: "none"
          });
        }
      }, 200);
    },
    // 清除搜索关键词
    clearSearch() {
      this.clearBtnPressed = true;
      setTimeout(() => {
        this.clearBtnPressed = false;
        this.searchKeyword = "";
      }, 200);
    },
    // 标签点击效果
    tabPressStart(index) {
      this.pressedTabIndex = index;
    },
    tabPressEnd() {
      this.pressedTabIndex = -1;
    },
    // 商品卡片点击效果
    productPressStart(productId) {
      const product = this.products.find((item) => item.id === productId);
      if (product)
        product.pressed = true;
    },
    productPressEnd(productId) {
      const product = this.products.find((item) => item.id === productId);
      if (product)
        product.pressed = false;
    },
    // 商品点击跳转
    handleProductClick(product) {
      common_vendor.index.navigateTo({
        url: `/pages/product/detail?id=${product.id}`
      });
    },
    // 加入购物车
    addToCart(product) {
      product.cartPressed = true;
      setTimeout(() => {
        product.cartPressed = false;
        this.cartCount++;
        this.showCartToast = true;
        setTimeout(() => {
          this.showCartToast = false;
        }, 1500);
      }, 200);
    },
    // 优惠活动点击
    handlePromotionClick() {
      this.bannerPressed = true;
      setTimeout(() => {
        this.bannerPressed = false;
        common_vendor.index.showToast({
          title: "领取成功，快去购物吧",
          icon: "none"
        });
      }, 200);
    },
    // 查看更多商品
    showMoreProducts() {
      common_vendor.index.showToast({
        title: "更多商品加载中...",
        icon: "none"
      });
    }
  },
  watch: {
    // 底部导航切换
    activeNav(newVal) {
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $data.searchFocused = true),
    b: common_vendor.o(($event) => $data.searchFocused = false),
    c: common_vendor.o([($event) => $data.searchKeyword = $event.detail.value, (...args) => $options.handleSearchInput && $options.handleSearchInput(...args)]),
    d: $data.searchKeyword,
    e: $data.searchKeyword
  }, $data.searchKeyword ? {
    f: common_vendor.o((...args) => $options.clearSearch && $options.clearSearch(...args)),
    g: $data.clearBtnPressed ? 1 : ""
  } : {}, {
    h: common_vendor.o((...args) => $options.handleSearch && $options.handleSearch(...args)),
    i: $data.searchBtnPressed ? 1 : "",
    j: $data.searchFocused ? 1 : "",
    k: common_vendor.f($data.categories, (category, index, i0) => {
      return {
        a: common_vendor.t(category),
        b: $data.activeCategory === index ? 1 : "",
        c: $data.pressedTabIndex === index ? 1 : "",
        d: index,
        e: common_vendor.o(($event) => $data.activeCategory = index, index),
        f: common_vendor.o(($event) => $options.tabPressStart(index), index),
        g: common_vendor.o((...args) => $options.tabPressEnd && $options.tabPressEnd(...args), index)
      };
    }),
    l: common_vendor.o((...args) => $options.handlePromotionClick && $options.handlePromotionClick(...args)),
    m: $data.bannerPressed ? 1 : "",
    n: $data.searchKeyword
  }, $data.searchKeyword ? {
    o: common_vendor.t($options.filteredProducts.length)
  } : {
    p: common_vendor.o((...args) => $options.showMoreProducts && $options.showMoreProducts(...args))
  }, {
    q: $data.searchKeyword && $options.filteredProducts.length === 0
  }, $data.searchKeyword && $options.filteredProducts.length === 0 ? {
    r: common_vendor.t($data.searchKeyword)
  } : {
    s: common_vendor.f($options.filteredProducts, (product, index, i0) => {
      return common_vendor.e({
        a: product.tag
      }, product.tag ? {
        b: common_vendor.t(product.tag)
      } : {}, {
        c: common_vendor.t(product.name),
        d: common_vendor.t(product.desc),
        e: common_vendor.t(product.price),
        f: product.originalPrice
      }, product.originalPrice ? {
        g: common_vendor.t(product.originalPrice)
      } : {}, {
        h: common_vendor.o(($event) => $options.addToCart(product), product.id),
        i: product.cartPressed ? 1 : "",
        j: product.id,
        k: common_vendor.o(($event) => $options.handleProductClick(product), product.id),
        l: product.pressed ? 1 : "",
        m: `card-color-${index % 4}`,
        n: common_vendor.o(($event) => $options.productPressStart(product.id), product.id),
        o: common_vendor.o(($event) => $options.productPressEnd(product.id), product.id)
      });
    })
  }, {
    t: $data.showCartToast
  }, $data.showCartToast ? {
    v: $data.showCartToast ? 1 : ""
  } : {}, {
    w: common_vendor.f($data.navs, (nav, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(nav.name),
        b: index === 2 && $data.cartCount > 0
      }, index === 2 && $data.cartCount > 0 ? {
        c: common_vendor.t($data.cartCount > 99 ? "99+" : $data.cartCount)
      } : {}, {
        d: $data.activeNav === index ? 1 : "",
        e: index,
        f: common_vendor.o(($event) => $data.activeNav = index, index)
      });
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6808f5eb"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mall/mall.js.map
