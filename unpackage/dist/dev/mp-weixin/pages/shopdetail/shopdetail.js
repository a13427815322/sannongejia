"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      shop: []
    };
  },
  methods: {
    back() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
  },
  onLoad(options) {
    console.log(options.id);
    common_vendor.index.request({
      url: "http://127.0.0.1:3001/getshop",
      method: "POST",
      data: {
        id: options.id
      },
      success: (res) => {
        console.log(res);
        this.shop = res.data;
        if (this.shop[0].pingjia != null) {
          this.pingjia = JSON.parse(this.shop[0].pingjia);
          for (var i in this.pingjia) {
            this.pingjia[i].creattime = new Date(this.pingjia[i].creattime).toLocaleDateString();
          }
          console.log(this.pingjia);
        } else {
          this.pingjia = [];
        }
      }
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.shop, (item, index, i0) => {
      return {
        a: common_vendor.o((...args) => $options.back && $options.back(...args), index),
        b: item.changpingimg,
        c: index
      };
    }),
    b: common_vendor.f($data.shop, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.shopname),
        b: common_vendor.t(item.jiage),
        c: common_vendor.t(item.xiaoliang),
        d: common_vendor.t(item.xxjs)
      }, _ctx.pingjia.length != 0 ? {
        e: common_vendor.f(_ctx.pingjia, (item2, index2, i1) => {
          return {
            a: item2.headSculpture,
            b: common_vendor.t(item2.nickname),
            c: common_vendor.t(item2.comment),
            d: common_vendor.t(item2.creattime)
          };
        })
      } : {}, _ctx.pingjia.length == 0 ? {} : {}, {
        f: index
      });
    }),
    c: common_vendor.t(_ctx.pingjia.length),
    d: _ctx.pingjia.length != 0,
    e: _ctx.pingjia.length == 0
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/shopdetail/shopdetail.vue"]]);
wx.createPage(MiniProgramPage);
