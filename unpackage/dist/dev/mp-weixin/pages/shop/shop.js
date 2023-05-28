"use strict";
const common_vendor = require("../../common/vendor.js");
const flyInCart = () => "../../comment/flyInCart.js";
const _sfc_main = {
  components: {
    flyInCart
  },
  data() {
    return {
      cartBasketRect: {},
      id: "",
      tabList: [{
        id: "tab01",
        name: "农业用品"
      }, {
        id: "tab02",
        name: "种子"
      }, {
        id: "tab03",
        name: "肥料"
      }, {
        id: "tab04",
        name: "农机具"
      }],
      active: 0,
      shop: []
    };
  },
  methods: {
    add(e, id) {
      this.$refs.inCart.addToCart(e, id);
      common_vendor.index.showToast({
        title: "添加购物车成功",
        icon: "true"
      });
      common_vendor.index.request({
        url: "http://127.0.0.1:3001/toshopcart",
        method: "POST",
        data: {
          id: this.id,
          shopid: id
        },
        success: (res) => {
        }
      });
    },
    toshopdetail(id) {
      common_vendor.index.navigateTo({
        url: "../shopdetail/shopdetail?id=" + id
      });
    },
    ontabtap(index) {
      this.active = index;
      this.Requestshop();
    },
    Requestshop() {
      common_vendor.index.request({
        url: "http://127.0.0.1:3001/shop",
        method: "POST",
        data: {
          type: this.active
        },
        success: (res) => {
          this.shop = res.data;
        }
      });
    }
  },
  onPageScroll() {
    this.$refs.inCart.addToCart();
  },
  onReady() {
    const self = this;
    let q = common_vendor.index.createSelectorQuery();
    setTimeout(function() {
      q.select("#cart").boundingClientRect((data) => {
        self.cartBasketRect = data;
      }).exec();
    }, 100);
  },
  onLoad() {
    this.Requestshop();
    const value = common_vendor.index.getStorageSync("uni-id-pages-userInfo");
    this.id = String(value._id);
    common_vendor.index.switchTab({
      url: "/pages/shop/shop"
    });
  }
};
if (!Array) {
  const _component_flyInCart = common_vendor.resolveComponent("flyInCart");
  _component_flyInCart();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.tabList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: index,
        c: common_vendor.o(($event) => $options.ontabtap(index), index),
        d: common_vendor.n($data.active === index ? "active" : "")
      };
    }),
    b: common_vendor.f($data.shop, (item, index, i0) => {
      return {
        a: item.changpingimg,
        b: common_vendor.o(($event) => $options.toshopdetail(item.shopid), index),
        c: common_vendor.t(item.shopname),
        d: common_vendor.o(($event) => $options.toshopdetail(item.shopid), index),
        e: common_vendor.t(item.xiaoliang),
        f: common_vendor.o(($event) => $options.toshopdetail(item.shopid), index),
        g: common_vendor.t(item.jiage),
        h: common_vendor.o(($event) => $options.toshopdetail(item.shopid), index),
        i: common_vendor.o(($event) => $options.add($event, item.shopid), index),
        j: common_vendor.o(($event) => $options.toshopdetail(item.shopid), index),
        k: index
      };
    }),
    c: common_vendor.sr("inCart", "190fa82a-0"),
    d: common_vendor.p({
      cartBasketRect: $data.cartBasketRect
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/shop/shop.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
