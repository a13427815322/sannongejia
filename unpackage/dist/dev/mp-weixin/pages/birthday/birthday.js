"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 状态栏高度
      statusBarHeight: 0,
      // 导航栏高度
      navBarHeight: 82 + 11,
      userinfo: [{ birthday: null }]
    };
  },
  methods: {
    oninput(e) {
      this.userinfo[0].birthday = e.detail.value;
    },
    back() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    xgnickname() {
      common_vendor.index.request({
        url: "http://127.0.0.1:3001/updatebirthday",
        method: "POST",
        data: {
          _id: this.userinfo[0]._id,
          birthday: this.userinfo[0].birthday
        },
        success: (res) => {
          console.log(res);
          this.userinfo = res.data;
          console.log(this.userinfo);
          common_vendor.index.navigateBack({
            delta: 1
          });
        }
      });
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
        console.log(res);
        this.userinfo = res.data;
        console.log(this.userinfo);
        this.userinfo[0].birthday = new Date(this.userinfo[0].birthday).toLocaleDateString().replaceAll("/", "-");
        if (this.userinfo[0].birthday == null) {
          this.userinfo[0].birthday = "请选择你的生日";
          console.log(this.userinfo[0].birthday);
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
      title: "更改生日"
    }),
    d: common_vendor.t($data.userinfo[0].birthday),
    e: $data.userinfo[0].birthday,
    f: common_vendor.o((...args) => $options.oninput && $options.oninput(...args)),
    g: _ctx.startDate,
    h: _ctx.endDate,
    i: common_vendor.o((...args) => $options.xgnickname && $options.xgnickname(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/birthday/birthday.vue"]]);
wx.createPage(MiniProgramPage);
