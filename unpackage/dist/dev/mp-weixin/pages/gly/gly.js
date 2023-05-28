"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      statusBarHeight: 0,
      // 导航栏高度
      navBarHeight: 82 + 11,
      status: 2,
      dingdan: []
    };
  },
  methods: {
    qrfh(dingdanid) {
      common_vendor.index.request({
        url: "http://127.0.0.1:3001/fahuo",
        method: "POST",
        data: {
          dingdanid
        },
        success: (res) => {
          this.getdingdan();
        }
      });
    },
    back() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    getdingdan() {
      common_vendor.index.request({
        url: "http://127.0.0.1:3001/getadmin",
        method: "POST",
        data: {
          status: this.status
        },
        success: (res) => {
          this.dingdan = res.data;
          for (var i in this.dingdan) {
            this.dingdan[i].shopcart = JSON.parse(this.dingdan[i].shopcart);
            this.dingdan[i].zongji = 0;
          }
          for (var j in this.dingdan) {
            for (var k in this.dingdan[j].shopcart) {
              if (this.dingdan[j].shopcart[k].shopname.length > 9) {
                this.dingdan[j].shopcart[k].shopname = this.dingdan[j].shopcart[k].shopname.substring(0, 9) + "...";
              }
              this.dingdan[j].zongji += this.dingdan[j].shopcart[k].jiage * this.dingdan[j].shopcart[k].count;
            }
          }
          console.log(this.dingdan);
        }
      });
    }
  },
  created() {
  },
  onLoad(option) {
    this.getdingdan();
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
      title: "个人信息"
    }),
    d: common_vendor.f($data.dingdan, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.dingdanid),
        b: common_vendor.t(item._id),
        c: common_vendor.t(item.sjr),
        d: common_vendor.t(item.adress),
        e: common_vendor.t(item.phone),
        f: item.status == 1
      }, item.status == 1 ? {} : {}, {
        g: item.status == 2
      }, item.status == 2 ? {} : {}, {
        h: item.status == 3
      }, item.status == 3 ? {} : {}, {
        i: item.status == 4
      }, item.status == 4 ? {} : {}, {
        j: common_vendor.f(item.shopcart, (item1, index2, i1) => {
          return {
            a: item1.changpingimg,
            b: common_vendor.t(item1.shopname),
            c: common_vendor.t(item1.count),
            d: common_vendor.t(item1.jiage),
            e: index2
          };
        }),
        k: common_vendor.t(item.zongji),
        l: item.status == 2
      }, item.status == 2 ? {
        m: common_vendor.o(($event) => $options.qrfh(item.dingdanid), index)
      } : {}, {
        n: index
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/gly/gly.vue"]]);
wx.createPage(MiniProgramPage);
