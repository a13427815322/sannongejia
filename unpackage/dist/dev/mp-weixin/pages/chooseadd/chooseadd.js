"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      status: 0,
      dingdanid: 0,
      _id: "",
      data: []
    };
  },
  methods: {
    topay(res) {
      common_vendor.index.navigateTo({
        url: "/pages/dingdandetail/dingdandetail?id=" + res + "&_id=" + this._id + "&dingdanid=" + this.dingdanid
      });
    },
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
    }
  },
  onLoad(e) {
    this._id = e._id;
    this.dingdanid = e.dingdanid;
    this.requestaddress();
    this.status = e.status;
  },
  onShow() {
    this.data = [];
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
  return common_vendor.e({
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
      title: "选择收货地址"
    }),
    d: common_vendor.f(this.data, (item, index, i0) => {
      return {
        a: common_vendor.t(item.sjr),
        b: common_vendor.t(item.phone),
        c: common_vendor.t(item.useraddress),
        d: common_vendor.o(($event) => $options.topay(item.id)),
        e: common_vendor.o(($event) => $options.toupdate(item.id))
      };
    }),
    e: this.status == 2
  }, this.status == 2 ? {} : {}, {
    f: common_vendor.o(($event) => $options.toadd(this._id))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/chooseadd/chooseadd.vue"]]);
wx.createPage(MiniProgramPage);
