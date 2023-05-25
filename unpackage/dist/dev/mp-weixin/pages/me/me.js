"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
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
          }
        });
      }
    },
    zhuang() {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
      });
    },
    tosetting() {
      common_vendor.index.navigateTo({
        url: "/pages/setting/setting"
      });
    },
    tuichu() {
      common_vendor.index.removeStorage({
        key: "uni-id-pages-userInfo"
      });
      this.userinfo = "";
      this.userinfolen = this.userinfo.length;
    }
  },
  onLoad() {
    this.getuserinfo();
  },
  onShow() {
    this.userinfo = {};
    this.userinfolen = 0;
    this.getuserinfo();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.userinfolen === 0
  }, $data.userinfolen === 0 ? {
    b: common_vendor.o((...args) => $options.zhuang && $options.zhuang(...args))
  } : {}, {
    c: $data.userinfolen !== 0
  }, $data.userinfolen !== 0 ? {
    d: common_vendor.f($data.userinfo, (item, index, i0) => {
      return {
        a: item.headSculpture,
        b: common_vendor.t(item.nickname),
        c: common_vendor.t(item.username),
        d: common_vendor.o((...args) => $options.tosetting && $options.tosetting(...args), index),
        e: index
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/me/me.vue"]]);
wx.createPage(MiniProgramPage);
