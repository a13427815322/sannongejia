"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      data: [],
      id: "",
      isShow: false
    };
  },
  methods: {
    topBack() {
      common_vendor.index.pageScrollTo({
        scrollTop: 0,
        // 滚动到页面的目标位置  这个是滚动到顶部, 0 
        duration: 300
        // 滚动动画的时长
      });
    },
    back() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    async requestnews() {
      const res = await common_vendor.index.request({
        url: "http://127.0.0.1:3001/newsdetail",
        method: "POST",
        data: {
          id: this.id
        }
      });
      res.data.forEach((item) => {
        item.content = JSON.parse(item.content);
      });
      res.data[0].datetime = new Date(res.data[0].datetime).toLocaleDateString();
      this.data = res.data[0];
    }
  },
  onLoad(e) {
    this.id = e.id;
    this.requestnews();
  },
  onPageScroll(e) {
    if (e.scrollTop >= 400) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  _easycom_uni_nav_bar2();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
if (!Math) {
  _easycom_uni_nav_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $options.back()),
    b: common_vendor.p({
      ["left-icon"]: "back",
      title: "新闻详情"
    }),
    c: common_vendor.t($data.data.title),
    d: common_vendor.t($data.data.soure),
    e: common_vendor.t($data.data.datetime),
    f: $data.data.img_url,
    g: common_vendor.f($data.data.content, (item, index, i0) => {
      return {
        a: common_vendor.t(item)
      };
    }),
    h: $data.isShow
  }, $data.isShow ? {
    i: common_vendor.o((...args) => $options.topBack && $options.topBack(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/newsdetail/newsdetail.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
