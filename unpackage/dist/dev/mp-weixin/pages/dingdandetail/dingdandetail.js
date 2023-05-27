"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      shopcart: [],
      //该页面默认地址
      total: 0,
      index: 0,
      //该页面地址数据
      adddata: [{
        sjr: "",
        phone: "",
        useraddress: "",
        id: "",
        _id: ""
      }],
      //该页面订单数据
      data: [],
      dingdanid: 0
    };
  },
  methods: {
    chooseadd(e) {
      common_vendor.index.navigateTo({
        url: "/pages/chooseadd/chooseadd?_id=" + e
      });
    },
    back() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    async requestdingdan() {
      const res = await common_vendor.index.request({
        url: "http://127.0.0.1:3001/dingdandetail",
        method: "POST",
        data: {
          dingdanid: this.dingdanid
        }
      });
      res.data.forEach((item) => {
        item.shopcart = JSON.parse(item.shopcart);
      });
      for (var i in res.data[0].shopcart) {
        this.total += res.data[0].shopcart[i].count * res.data[0].shopcart[i].jiage;
        console.log(this.total);
      }
      this.data = res.data[0];
      console.log(this.data);
      this.requestaddress();
    },
    async requestaddress() {
      const res = await common_vendor.index.request({
        url: "http://127.0.0.1:3001/addressdetail",
        method: "POST",
        data: {
          _id: this.data._id
        }
      });
      this.adddata = res.data;
      console.log(this.adddata);
    }
  },
  onLoad(e) {
    console.log(e.dingdanid);
    this.dingdanid = e.dingdanid;
    this.requestdingdan();
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
    b: this.data.status == 1
  }, this.data.status == 1 ? {
    c: common_vendor.o($options.back),
    d: common_vendor.p({
      dark: true,
      fixed: true,
      ["background-color"]: "#ffffff",
      ["status-bar"]: true,
      ["left-icon"]: "left",
      ["left-text"]: "",
      color: "black",
      title: "待付款"
    })
  } : {}, {
    e: this.data.status == 2
  }, this.data.status == 2 ? {
    f: common_vendor.o($options.back),
    g: common_vendor.p({
      dark: true,
      fixed: true,
      ["background-color"]: "#ffffff",
      ["status-bar"]: true,
      ["left-icon"]: "left",
      ["left-text"]: "",
      color: "black",
      title: "待发货"
    })
  } : {}, {
    h: this.data.status == 3
  }, this.data.status == 3 ? {
    i: common_vendor.o($options.back),
    j: common_vendor.p({
      dark: true,
      fixed: true,
      ["background-color"]: "#ffffff",
      ["status-bar"]: true,
      ["left-icon"]: "left",
      ["left-text"]: "",
      color: "black",
      title: "待收货"
    })
  } : {}, {
    k: this.data.status == 4
  }, this.data.status == 4 ? {
    l: common_vendor.o($options.back),
    m: common_vendor.p({
      dark: true,
      fixed: true,
      ["background-color"]: "#ffffff",
      ["status-bar"]: true,
      ["left-icon"]: "left",
      ["left-text"]: "",
      color: "black",
      title: "待评价"
    })
  } : {}, {
    n: this.data.status == 1
  }, this.data.status == 1 ? {
    o: common_vendor.t(this.adddata[this.index].sjr),
    p: common_vendor.t(this.adddata[this.index].phone),
    q: common_vendor.t(this.adddata[this.index].useraddress),
    r: common_vendor.o(($event) => $options.chooseadd(this.data._id))
  } : {}, {
    s: this.data.status == 1
  }, this.data.status == 1 ? {
    t: common_vendor.f(this.data.shopcart, (item, index, i0) => {
      return {
        a: item.changpingimg,
        b: common_vendor.t(item.shopname),
        c: common_vendor.t(item.count * item.jiage),
        d: common_vendor.t(item.count)
      };
    }),
    v: common_vendor.t(this.total)
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/dingdandetail/dingdandetail.vue"]]);
wx.createPage(MiniProgramPage);
