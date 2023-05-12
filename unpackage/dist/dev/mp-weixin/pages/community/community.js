"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 状态栏高度
      statusBarHeight: 0,
      // 导航栏高度
      navBarHeight: 82 + 11
    };
  },
  methods: {
    toadd() {
      common_vendor.index.navigateTo({
        url: "/pages/addcommunity/addcommunity"
      });
    }
  },
  created() {
    this.statusBarHeight = common_vendor.index.getSystemInfoSync()["statusBarHeight"];
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
  return {
    a: $data.statusBarHeight + "px",
    b: common_vendor.o($options.toadd),
    c: common_vendor.p({
      ["right-icon"]: "plusempty",
      title: "互助社区"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/community/community.vue"]]);
wx.createPage(MiniProgramPage);
