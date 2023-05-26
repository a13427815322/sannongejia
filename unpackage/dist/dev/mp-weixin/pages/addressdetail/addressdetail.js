"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      _id: "",
      data: []
    };
  },
  methods: {
    toupdate(res) {
      common_vendor.index.navigateTo({
        url: "/pages/updateaddress/updateaddress?id=" + res
      });
    },
    toadd(res) {
      common_vendor.index.navigateTo({
        url: "/pages/addaddress/addaddress?_id=" + res
      });
    },
    back() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    async requestaddress() {
      const res = await common_vendor.index.request({
        url: "http://127.0.0.1:3001/addressdetail",
        method: "POST",
        data: {
          _id: this._id
        }
      });
      this.data = res.data;
      console.log(this.data);
    }
  },
  onLoad(e) {
    this._id = e._id;
    console.log(this._id);
    this.requestaddress();
  },
  onShow() {
    this.requestaddress();
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
    a: _ctx.statusBarHeight + "px",
    b: common_vendor.o($options.back),
    c: common_vendor.p({
      dark: true,
      fixed: true,
      ["background-color"]: "#ffffff",
      ["status-bar"]: true,
      ["left-icon"]: "left",
      ["left-text"]: "",
      color: "black",
      title: "管理收货地址"
    }),
    d: common_vendor.f(this.data, (item, index, i0) => {
      return {
        a: common_vendor.t(item.sjr),
        b: common_vendor.t(item.phone),
        c: common_vendor.t(item.useraddress),
        d: common_vendor.o(($event) => $options.toupdate(item.id))
      };
    }),
    e: common_vendor.o(($event) => $options.toadd(this.data[0]._id))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/addressdetail/addressdetail.vue"]]);
wx.createPage(MiniProgramPage);
