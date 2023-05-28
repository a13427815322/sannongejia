"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      id: 0,
      shopcart: [],
      //该页面默认地址
      total: 0,
      index: 0,
      //该页面地址数据
      adddata: [{
        sjr: "",
        phone: "",
        useraddress: "",
        id: 0,
        _id: ""
      }],
      //该页面订单数据
      data: [],
      dingdanid: 0
    };
  },
  methods: {
    deletedingdan(e) {
      common_vendor.index.showModal({
        title: "确定要取消订单吗",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.request({
              url: "http://127.0.0.1:3001/deteledingdan",
              method: "POST",
              data: {
                dingdanid: e
              }
            });
            setTimeout(() => {
              common_vendor.index.navigateTo({
                url: "/pages/dingdan/dingdan?status=" + this.data.status
              });
            }, 100);
          }
        }
      });
    },
    qpj(e) {
      common_vendor.index.navigateTo({
        url: "/pages/pingjia/pingjia?dingdanid=" + e
      });
    },
    async qrsh(e) {
      common_vendor.index.showModal({
        title: "您确认已经收到货吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.request({
              url: "http://127.0.0.1:3001/shouhuo",
              method: "POST",
              data: {
                dingdanid: e
              }
            });
            setTimeout(() => {
              common_vendor.index.showToast({
                title: "收货成功",
                icon: "success"
              });
              common_vendor.index.navigateTo({
                url: "/pages/pingjia/pingjia?dingdanid=" + e
              });
            }, 1e3);
          }
        }
      });
    },
    async payfinish() {
      if (this.id == 0) {
        common_vendor.index.showToast({
          title: "请选择收货地址",
          icon: "error"
        });
      } else {
        await common_vendor.index.request({
          url: "http://127.0.0.1:3001/addpaydata",
          method: "POST",
          data: {
            dingdanid: this.dingdanid,
            phone: this.adddata[0].phone,
            sjr: this.adddata[0].sjr,
            adress: this.adddata[0].useraddress
          }
        });
        common_vendor.index.showToast({
          title: "付款中",
          icon: "loading"
        });
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/me/me"
          });
        }, 1e3);
      }
    },
    chooseadd(e) {
      common_vendor.index.navigateTo({
        url: "/pages/chooseadd/chooseadd?_id=" + e + "&dingdanid=" + this.dingdanid + "&status=" + this.data.status
      });
    },
    back() {
      common_vendor.index.navigateTo({
        url: "/pages/dingdan/dingdan?status=" + this.data.status
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
      }
      this.data = res.data[0];
    },
    async requestaddress() {
      const res = await common_vendor.index.request({
        url: "http://127.0.0.1:3001/payaddress",
        method: "POST",
        data: {
          id: this.id
        }
      });
      this.adddata = res.data;
    }
  },
  onLoad(e) {
    this.dingdanid = e.dingdanid;
    this.id = e.id;
    this.requestdingdan();
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
    n: this.data.status == 5
  }, this.data.status == 5 ? {
    o: common_vendor.o($options.back),
    p: common_vendor.p({
      dark: true,
      fixed: true,
      ["background-color"]: "#ffffff",
      ["status-bar"]: true,
      ["left-icon"]: "left",
      ["left-text"]: "",
      color: "black",
      title: "已完成"
    })
  } : {}, {
    q: this.data.status == 1
  }, this.data.status == 1 ? common_vendor.e({
    r: this.id == 0
  }, this.id == 0 ? {
    s: common_vendor.o(($event) => $options.chooseadd(this.data._id))
  } : {
    t: common_vendor.f($data.adddata, (item, index, i0) => {
      return {
        a: common_vendor.t(item.sjr),
        b: common_vendor.t(item.phone),
        c: common_vendor.t(item.useraddress)
      };
    }),
    v: common_vendor.o(($event) => $options.chooseadd(this.data._id))
  }) : {}, {
    w: this.data.status == 1
  }, this.data.status == 1 ? {
    x: common_vendor.f(this.data.shopcart, (item, index, i0) => {
      return {
        a: item.changpingimg,
        b: common_vendor.t(item.shopname),
        c: common_vendor.t(item.count * item.jiage),
        d: common_vendor.t(item.count)
      };
    }),
    y: common_vendor.t(this.total)
  } : {}, {
    z: this.data.status == 1
  }, this.data.status == 1 ? {
    A: common_vendor.o((...args) => $options.payfinish && $options.payfinish(...args)),
    B: common_vendor.o(($event) => $options.deletedingdan(this.data.dingdanid))
  } : {}, {
    C: this.data.status == 2
  }, this.data.status == 2 ? {
    D: common_vendor.t(this.data.fukuantime),
    E: common_vendor.t(this.data.sjr),
    F: common_vendor.t(this.data.phone),
    G: common_vendor.t(this.data.adress),
    H: common_vendor.o(($event) => $options.chooseadd(this.data._id))
  } : {}, {
    I: this.data.status == 2
  }, this.data.status == 2 ? {
    J: common_vendor.f(this.data.shopcart, (item, index, i0) => {
      return {
        a: item.changpingimg,
        b: common_vendor.t(item.shopname),
        c: common_vendor.t(item.count * item.jiage),
        d: common_vendor.t(item.count)
      };
    }),
    K: common_vendor.t(this.total)
  } : {}, {
    L: this.data.status == 3
  }, this.data.status == 3 ? {
    M: common_vendor.t(this.data.fukuantime),
    N: common_vendor.t(this.data.sjr),
    O: common_vendor.t(this.data.phone),
    P: common_vendor.t(this.data.adress),
    Q: common_vendor.o(($event) => $options.chooseadd(this.data._id))
  } : {}, {
    R: this.data.status == 2
  }, this.data.status == 2 ? {
    S: common_vendor.o(($event) => $options.deletedingdan(this.data.dingdanid))
  } : {}, {
    T: this.data.status == 3
  }, this.data.status == 3 ? {
    U: common_vendor.f(this.data.shopcart, (item, index, i0) => {
      return {
        a: item.changpingimg,
        b: common_vendor.t(item.shopname),
        c: common_vendor.t(item.count * item.jiage),
        d: common_vendor.t(item.count)
      };
    }),
    V: common_vendor.t(this.total)
  } : {}, {
    W: this.data.status == 3
  }, this.data.status == 3 ? {
    X: common_vendor.o(($event) => $options.qrsh(this.data.dingdanid))
  } : {}, {
    Y: this.data.status == 4
  }, this.data.status == 4 ? {
    Z: common_vendor.f(this.data.shopcart, (item, index, i0) => {
      return {
        a: item.changpingimg,
        b: common_vendor.t(item.shopname),
        c: common_vendor.t(item.count * item.jiage),
        d: common_vendor.t(item.count)
      };
    }),
    aa: common_vendor.t(this.total),
    ab: common_vendor.t(this.total),
    ac: common_vendor.t(this.data.sjr),
    ad: common_vendor.t(this.data.phone),
    ae: common_vendor.t(this.data.adress)
  } : {}, {
    af: this.data.status == 4
  }, this.data.status == 4 ? {
    ag: common_vendor.o(($event) => $options.qpj(this.data.dingdanid))
  } : {}, {
    ah: this.data.status == 5
  }, this.data.status == 5 ? {
    ai: common_vendor.f(this.data.shopcart, (item, index, i0) => {
      return {
        a: item.changpingimg,
        b: common_vendor.t(item.shopname),
        c: common_vendor.t(item.count * item.jiage),
        d: common_vendor.t(item.count)
      };
    }),
    aj: common_vendor.t(this.total),
    ak: common_vendor.t(this.total),
    al: common_vendor.t(this.data.sjr),
    am: common_vendor.t(this.data.phone),
    an: common_vendor.t(this.data.adress)
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/dingdandetail/dingdandetail.vue"]]);
wx.createPage(MiniProgramPage);
