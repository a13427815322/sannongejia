"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      dingdanid: 0,
      shopcart: [],
      // 状态栏高度
      statusBarHeight: 0,
      // 导航栏高度
      navBarHeight: 82 + 11,
      dingdan: []
    };
  },
  methods: {
    home() {
      common_vendor.index.switchTab({
        url: "/pages/me/me"
      });
    },
    topingjiadetail(shopid, dingdanid) {
      console.log(shopid, dingdanid);
      common_vendor.index.navigateTo({
        url: "/pages/pingjiadetail/pingjiadetail?dingdanid=" + dingdanid + "&shopid=" + shopid
      });
    },
    getdingdan() {
      common_vendor.index.request({
        url: "http://127.0.0.1:3001/dingdandetail",
        method: "POST",
        data: {
          dingdanid: this.dingdanid
        },
        success: (res) => {
          this.dingdan = JSON.parse(res.data[0].shopcart);
          console.log(this.dingdan);
        }
      });
    }
  },
  created() {
  },
  onLoad(optoin) {
    console.log(optoin);
    this.dingdanid = optoin.dingdanid;
    this.getdingdan();
  },
  onShow() {
    this.dingdan = [];
    this.getdingdan();
    setTimeout(() => {
      console.log(this.dingdan);
      var a = 1;
      for (var i in this.dingdan) {
        if (this.dingdan[i].pinglunzhuantai == 0) {
          a = 0;
        }
      }
      if (a != 0) {
        common_vendor.index.showToast({
          title: "已全部评论",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/me/me"
          });
        }, 500);
      }
      console.log(a);
    }, 500);
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
    b: common_vendor.o($options.home),
    c: common_vendor.p({
      dark: true,
      fixed: true,
      ["background-color"]: "#ffffff",
      ["status-bar"]: true,
      ["left-icon"]: "home",
      ["left-text"]: "",
      color: "black",
      title: "评价"
    }),
    d: common_vendor.f($data.dingdan, (item, index, i0) => {
      return common_vendor.e({
        a: item.pinglunzhuantai == 0
      }, item.pinglunzhuantai == 0 ? {
        b: item.changpingimg,
        c: common_vendor.t(item.shopname),
        d: common_vendor.o(($event) => $options.topingjiadetail(item.shopid, this.dingdanid), index)
      } : {}, {
        e: index
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/pingjia/pingjia.vue"]]);
wx.createPage(MiniProgramPage);
