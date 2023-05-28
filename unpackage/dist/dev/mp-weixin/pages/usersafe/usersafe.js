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
    zxzh() {
      common_vendor.index.showModal({
        title: "确定要注销账号吗",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.request({
              url: "http://127.0.0.1:3001/deteleuserifo",
              method: "POST",
              data: {
                _id: this._id
              },
              success: (res2) => {
                common_vendor.index.removeStorage({
                  key: "uni-id-pages-userInfo"
                });
                this.userinfo = [];
              }
            });
            setTimeout(() => {
              common_vendor.index.switchTab({
                url: "/pages/me/me"
              });
            }, 500);
          }
        }
      });
    },
    back() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    tousername() {
      common_vendor.index.navigateTo({
        url: "/pages/username/username?id=" + this._id
      });
    },
    tophone() {
      common_vendor.index.navigateTo({
        url: "/pages/phone/phone?id=" + this._id
      });
    }
  },
  onLoad(options) {
    this._id = options.id;
  },
  created() {
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
      title: "账号安全"
    }),
    d: common_vendor.o((...args) => $options.tousername && $options.tousername(...args)),
    e: common_vendor.o(($event) => $options.tophone()),
    f: common_vendor.o((...args) => $options.zxzh && $options.zxzh(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/usersafe/usersafe.vue"]]);
wx.createPage(MiniProgramPage);
