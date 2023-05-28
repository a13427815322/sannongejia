"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      shop: [],
      // 状态栏高度
      statusBarHeight: 0,
      // 导航栏高度
      navBarHeight: 82 + 11,
      dingdan: [],
      shopid: 0,
      dingdanid: 0,
      dingdanbox: [],
      userinfo: [],
      formData: {
        content: ""
      },
      rules: {
        content: {
          rules: [{
            required: true,
            errorMessage: "发布内容不能为空"
          }]
        }
      },
      pingjia: []
    };
  },
  methods: {
    getshop() {
      common_vendor.index.request({
        url: "http://127.0.0.1:3001/getshop",
        method: "POST",
        data: {
          id: this.shopid
        },
        success: (res) => {
          this.shop = res.data;
          console.log(this.shop);
          if (this.shop[0].pingjia != null) {
            this.pingjia = JSON.parse(this.shop[0].pingjia);
            console.log(this.pingjia);
          } else {
            this.pingjia = [];
          }
        }
      });
    },
    back() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    pinglun(ref) {
      this.$refs[ref].validate().then((res) => {
        this.formData = res;
      });
      var creattime = new Date();
      this.pingjia.push({
        _id: this.userinfo[0]._id,
        headSculpture: this.userinfo[0].headSculpture,
        nickname: this.userinfo[0].nickname,
        comment: this.formData.content,
        creattime
      });
      common_vendor.index.request({
        url: "http://127.0.0.1:3001/pingjia",
        method: "POST",
        data: {
          dingdanid: this.dingdanid,
          shopid: this.shopid,
          pingjia: this.pingjia
        },
        success: (res) => {
          common_vendor.index.navigateBack({
            delta: 1
          });
        }
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
          this.dingdanbox = res.data[0];
          this.dingdan = JSON.parse(res.data[0].shopcart);
          console.log(this.dingdanbox);
          this.getuserinfo();
        }
      });
    },
    getuserinfo() {
      common_vendor.index.request({
        url: "http://127.0.0.1:3001/userinfo",
        method: "POST",
        data: {
          _id: this.dingdanbox._id,
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
  onLoad(option) {
    console.log(option);
    console.log(option.dingdanid);
    this.shopid = option.shopid;
    this.dingdanid = option.dingdanid;
    this.getshop();
    this.getdingdan();
  },
  onShow() {
  },
  created() {
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _component_uni_section = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_nav_bar2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _component_uni_section)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
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
      title: "评价"
    }),
    d: common_vendor.o(($event) => $data.formData.content = $event),
    e: common_vendor.p({
      maxlength: "999",
      autoHeight: true,
      inputBorder: false,
      type: "textarea",
      placeholder: "来说一说你的想法吧",
      modelValue: $data.formData.content
    }),
    f: common_vendor.p({
      name: "content"
    }),
    g: common_vendor.sr("form", "0fb9862f-2,0fb9862f-1"),
    h: common_vendor.p({
      modelValue: $data.formData,
      rules: $data.rules
    }),
    i: common_vendor.p({
      title: "发布问题",
      type: "line"
    }),
    j: common_vendor.o(($event) => $options.pinglun("form"))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/pingjiadetail/pingjiadetail.vue"]]);
wx.createPage(MiniProgramPage);
