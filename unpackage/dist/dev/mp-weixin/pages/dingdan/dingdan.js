"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      tabList: [{
        id: "tab01",
        name: "全部"
      }, {
        id: "tab02",
        name: "待付款"
      }, {
        id: "tab03",
        name: "待发货"
      }, {
        id: "tab04",
        name: "待收货"
      }, {
        id: "tab05",
        name: "待评价"
      }],
      statusBarHeight: 0,
      // 导航栏高度
      navBarHeight: 82 + 11,
      status: 0,
      dingdan: []
    };
  },
  methods: {
    tospdetail(e) {
      common_vendor.index.navigateTo({
        url: "/pages/dingdandetail/dingdandetail?dingdanid=" + e
      });
    },
    back() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    ontabtap(index) {
      this.status = index;
      console.log(index);
      this.getdingdan();
    },
    getdingdan() {
      common_vendor.index.request({
        url: "http://127.0.0.1:3001/getdingdan",
        method: "POST",
        data: {
          _id: this.userinfo._id,
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
    const value = common_vendor.index.getStorageSync("uni-id-pages-userInfo");
    this.userinfo = value;
    this.status = option.status;
    this.userinfo._id = String(this.userinfo._id);
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
    d: common_vendor.f($data.tabList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.n($data.status == index ? "active" : ""),
        c: index,
        d: common_vendor.o(($event) => $options.ontabtap(index), index)
      };
    }),
    e: common_vendor.f($data.dingdan, (item, index, i0) => {
      return common_vendor.e({
        a: item.status == 1
      }, item.status == 1 ? {} : {}, {
        b: item.status == 2
      }, item.status == 2 ? {} : {}, {
        c: item.status == 3
      }, item.status == 3 ? {} : {}, {
        d: item.status == 4
      }, item.status == 4 ? {} : {}, {
        e: common_vendor.f(item.shopcart, (item1, index2, i1) => {
          return {
            a: item1.changpingimg,
            b: common_vendor.t(item1.shopname),
            c: common_vendor.t(item1.count),
            d: common_vendor.t(item1.jiage),
            e: index2,
            f: common_vendor.o(($event) => $options.tospdetail(item.dingdanid), index2)
          };
        }),
        f: common_vendor.t(item.zongji),
        g: item.status == 1
      }, item.status == 1 ? {} : {}, {
        h: item.status == 2
      }, item.status == 2 ? {} : {}, {
        i: item.status == 3
      }, item.status == 3 ? {} : {}, {
        j: item.status == 4
      }, item.status == 4 ? {} : {}, {
        k: index
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/dingdan/dingdan.vue"]]);
wx.createPage(MiniProgramPage);
