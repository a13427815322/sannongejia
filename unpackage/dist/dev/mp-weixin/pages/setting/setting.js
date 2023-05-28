"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 状态栏高度
      statusBarHeight: 0,
      // 导航栏高度
      navBarHeight: 82 + 11,
      userinfo: []
    };
  },
  methods: {
    tosetaddress(res) {
      console.log(res);
      common_vendor.index.navigateTo({
        url: "/pages/addressdetail/addressdetail?_id=" + res
      });
    },
    back() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    tuichu() {
      common_vendor.index.removeStorage({
        key: "uni-id-pages-userInfo"
      });
      this.userinfo = [];
      console.log(this.userinfo);
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    togrxx() {
      common_vendor.index.navigateTo({
        url: "/pages/grxx/grxx?id=" + this.userinfo[0]._id
      });
    },
    tousersafe() {
      common_vendor.index.navigateTo({
        url: "/pages/usersafe/usersafe?id=" + this.userinfo[0]._id
      });
    },
    getuserinfo() {
      const value = common_vendor.index.getStorageSync("uni-id-pages-userInfo");
      this.userinfo = value;
      common_vendor.index.request({
        url: "http://127.0.0.1:3001/getuserinfo",
        method: "POST",
        data: {
          _id: this.userinfo._id
        },
        success: (res) => {
          console.log(res);
          this.userinfo = res.data;
          console.log(this.userinfo);
        }
      });
    }
  },
  created() {
  },
  onLoad() {
    this.getuserinfo();
  },
  onShow() {
    this.userinfo = [];
    this.getuserinfo();
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
    b: common_vendor.o($options.back),
    c: common_vendor.p({
      dark: true,
      fixed: true,
      ["background-color"]: "#ffffff",
      ["status-bar"]: true,
      ["left-icon"]: "left",
      ["left-text"]: "",
      color: "black",
      title: "设置"
    }),
    d: common_vendor.f($data.userinfo, (item, index, i0) => {
      return {
        a: item.headSculpture,
        b: common_vendor.t(item.nickname),
        c: common_vendor.t(item.username),
        d: common_vendor.o((...args) => $options.togrxx && $options.togrxx(...args), index),
        e: index
      };
    }),
    e: common_vendor.o(($event) => $options.tosetaddress(this.userinfo[0]._id)),
    f: common_vendor.o(($event) => $options.tousersafe(this.userinfo[0]._id)),
    g: common_vendor.o((...args) => $options.tuichu && $options.tuichu(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/setting/setting.vue"]]);
wx.createPage(MiniProgramPage);
