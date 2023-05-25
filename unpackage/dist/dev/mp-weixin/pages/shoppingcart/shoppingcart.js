"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 状态栏高度
      statusBarHeight: 0,
      // 导航栏高度
      navBarHeight: 82 + 11,
      userinfo: [],
      shopcart: [],
      idbox: [],
      shopcartbox: [],
      quanxuan: 0,
      quanxuanbolen: false,
      zhonghe: 0,
      guanli: false,
      shopcartbox1: [],
      windowResizeCallback: "",
      orderwidth: "",
      userinfo: {
        headSculpture: ""
      },
      userinfolen: 0
    };
  },
  methods: {
    getuserinfo() {
      const value = common_vendor.index.getStorageSync("uni-id-pages-userInfo");
      if (value) {
        this.userinfo = value;
        this.userinfo._id = String(this.userinfo._id);
        this.userinfolen = Object.keys(this.userinfo).length;
        common_vendor.index.request({
          url: "http://127.0.0.1:3001/userinfo",
          method: "POST",
          data: {
            _id: this.userinfo._id,
            username: this.userinfo.username,
            nickname: this.userinfo.nickname,
            headSculpture: "https://mp-efbf9779-c0d9-4262-ab16-a6d0746727bb.cdn.bspapp.com/cloudstorage/a5fe2ec3-7bb7-4332-b614-6195c16c590f.png",
            phone: this.userinfo.mobile
          },
          success: (res) => {
            this.userinfo = res.data;
            console.log(this.userinfo);
          }
        });
      }
    },
    guanligwc() {
      this.guanli = !this.guanli;
    },
    checkall() {
      if (this.quanxuanbolen == 0) {
        this.quanxuanbolen = true;
        this.zhonghe = 0;
        for (var i in this.shopcart) {
          this.shopcart[i].check = true;
          this.idbox[i] = this.shopcart[i].shopid;
          this.zhonghe += this.shopcart[i].count * this.shopcart[i].jiage;
        }
      } else {
        this.quanxuanbolen = false;
        this.zhonghe = 0;
        for (var i in this.shopcart) {
          this.shopcart[i].check = false;
          this.idbox = [];
        }
      }
    },
    selected(id) {
      if (!this.idbox.length) {
        this.idbox.push(id);
        for (var i in this.shopcart) {
          if (this.shopcart[i].shopid == id) {
            this.zhonghe += this.shopcart[i].count * this.shopcart[i].jiage;
          }
          if (this.idbox.length == this.shopcart.length) {
            this.quanxuanbolen = true;
          }
        }
      } else {
        var a = 0;
        for (var i in this.idbox) {
          if (this.idbox[i] == id) {
            this.idbox.splice(i, 1);
            a = 1;
            for (var i in this.shopcart) {
              if (this.shopcart[i].shopid == id) {
                this.zhonghe -= this.shopcart[i].count * this.shopcart[i].jiage;
              }
            }
            this.quanxuanbolen = 0;
            for (var j in this.shopcart) {
              if (this.shopcart[j].shopid == id) {
                this.shopcart[j].check = false;
              }
            }
            break;
          } else {
            a = 0;
          }
        }
        if (a == 0) {
          this.idbox.push(id);
          for (var i in this.shopcart) {
            if (this.shopcart[i].shopid == id) {
              this.zhonghe += this.shopcart[i].count * this.shopcart[i].jiage;
            }
          }
          if (this.idbox.length == this.shopcart.length) {
            this.quanxuanbolen = true;
          }
        }
      }
    },
    jieshuang() {
      if (this.idbox.length == 0) {
        common_vendor.index.showToast({
          "title": "你还没有选择商品",
          "icon:": "error"
        });
        if (this.shopcart.length == 0) {
          this.quanxuanbolen = false;
        }
      } else {
        this.shopcartbox = [];
        for (var i in this.shopcart) {
          for (var j in this.idbox) {
            if (this.idbox[j] == this.shopcart[i].shopid) {
              this.shopcartbox.push(this.shopcart[i]);
            }
          }
        }
        for (var k in this.shopcartbox) {
          delete this.shopcartbox[k].check;
        }
        common_vendor.index.request({
          url: "http://127.0.0.1:3001/todingdan",
          method: "POST",
          data: {
            _id: this.userinfo._id,
            shopcart: this.shopcartbox
          },
          success: (res) => {
            common_vendor.index.navigateTo({
              url: "/pages/dingdandetail/dingdandetail?id=" + res.data.insertId
            });
          }
        });
        this.gwcsc();
      }
    },
    gwcsc() {
      if (this.idbox.length == 0) {
        common_vendor.index.showToast({
          "title": "你还没有选择商品",
          "icon:": "error"
        });
        if (this.shopcart.length == 0) {
          this.quanxuanbolen = false;
        }
      } else {
        this.shopcartbox1 = [];
        for (var l in this.shopcart) {
          this.shopcartbox1.push(this.shopcart[l]);
        }
        for (var i in this.shopcartbox1) {
          for (var j in this.idbox) {
            if (this.idbox[j] == this.shopcartbox1[i].shopid) {
              this.zhonghe -= this.shopcartbox1[i].count * this.shopcartbox1[i].jiage;
              this.shopcartbox1.splice(i, 1);
            }
          }
        }
        for (var k in this.shopcartbox1) {
          delete this.shopcartbox1[k].check;
        }
        common_vendor.index.request({
          url: "http://127.0.0.1:3001/deleteshopcard",
          method: "POST",
          data: {
            _id: this.userinfo[0]._id,
            shopcart: this.shopcartbox1
          },
          success: (res) => {
            this.shopcart = JSON.parse(res.data[0].shopcart);
            for (var i2 in this.shopcart) {
              this.shopcart[i2].check = false;
            }
            this.idbox = [];
            if (this.shopcart.length == 0) {
              this.quanxuanbolen = false;
            }
          }
        });
      }
    },
    requestshopcart() {
      const value = common_vendor.index.getStorageSync("uni-id-pages-userInfo");
      this.userinfo = value;
      common_vendor.index.request({
        url: "http://127.0.0.1:3001/getshopcard",
        method: "POST",
        data: {
          _id: this.userinfo._id
        },
        success: (res) => {
          this.shopcart = JSON.parse(res.data[0].shopcart);
          for (var i in this.shopcart) {
            this.shopcart[i].check = false;
          }
        }
      });
    }
  },
  onLoad() {
    common_vendor.index.switchTab({
      url: "/pages/shoppingcart/shoppingcart"
    });
    this.getuserinfo();
    this.requestshopcart();
    common_vendor.index.getSystemInfo({
      success: (res) => {
        console.log(res.windowWidth);
        if (res.windowWidth < 720) {
          this.orderwidth = res.windowWidth * 0.9 - 185;
        } else {
          this.orderwidth = 720 * 0.9 - 185;
        }
      }
    });
  },
  onShow() {
    this.shopcart = [];
    this.requestshopcart();
    this.getuserinfo();
    this.quanxuanbolen = false;
    this.windowResizeCallback = (res) => {
      if (res.size.windowWidth < 720) {
        this.orderwidth = res.size.windowWidth * 0.9 - 185;
      } else {
        this.orderwidth = 720 * 0.9 - 185;
      }
    };
    common_vendor.index.onWindowResize(this.windowResizeCallback);
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.shopcart.length),
    b: !$data.guanli
  }, !$data.guanli ? {
    c: common_vendor.o((...args) => $options.guanligwc && $options.guanligwc(...args))
  } : {}, {
    d: $data.guanli
  }, $data.guanli ? {
    e: common_vendor.o((...args) => $options.guanligwc && $options.guanligwc(...args))
  } : {}, {
    f: common_vendor.f($data.shopcart, (item, index, i0) => {
      return {
        a: item.check,
        b: common_vendor.o(($event) => $options.selected(item.shopid)),
        c: item.changpingimg,
        d: common_vendor.t(item.shopname),
        e: common_vendor.t(item.jiage),
        f: common_vendor.t(item.count)
      };
    }),
    g: $data.orderwidth + "px",
    h: $data.quanxuan,
    i: $data.quanxuanbolen,
    j: common_vendor.o((...args) => $options.checkall && $options.checkall(...args)),
    k: !$data.guanli
  }, !$data.guanli ? {
    l: common_vendor.t($data.zhonghe),
    m: common_vendor.o((...args) => $options.jieshuang && $options.jieshuang(...args))
  } : {}, {
    n: $data.guanli
  }, $data.guanli ? {
    o: common_vendor.o((...args) => $options.gwcsc && $options.gwcsc(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/shoppingcart/shoppingcart.vue"]]);
wx.createPage(MiniProgramPage);
