"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 状态栏高度
      statusBarHeight: 0,
      // 导航栏高度
      navBarHeight: 82 + 11,
      userinfo: [{ nickname: "" }]
    };
  },
  methods: {
    oninput(e) {
      this.userinfo[0].nickname = e.detail.value;
    },
    back() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    xgnickname() {
      common_vendor.index.request({
        url: "http://127.0.0.1:3001/updatenickname",
        method: "POST",
        data: {
          _id: this.userinfo[0]._id,
          nickname: this.userinfo[0].nickname
        },
        success: (res) => {
          this.userinfo = res.data;
        }
      });
      setTimeout(() => {
        common_vendor.index.showToast({
          title: "修改成功",
          icon: "success"
        });
        common_vendor.index.navigateBack({
          delta: 1
        });
      }, 500);
    }
  },
  created() {
  },
  onLoad(optoin) {
    common_vendor.index.request({
      url: "http://127.0.0.1:3001/getuserinfo",
      method: "POST",
      data: {
        _id: optoin.id
      },
      success: (res) => {
        this.userinfo = res.data;
        if (this.userinfo[0].nickname == "undefined") {
          this.userinfo[0].nickname = "";
        }
      }
    });
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
      title: "更改昵称"
    }),
    d: common_vendor.o([($event) => $data.userinfo[0].nickname = $event.detail.value, (...args) => $options.oninput && $options.oninput(...args)]),
    e: $data.userinfo[0].nickname,
    f: common_vendor.o((...args) => $options.xgnickname && $options.xgnickname(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/nickname/nickname.vue"]]);
wx.createPage(MiniProgramPage);
