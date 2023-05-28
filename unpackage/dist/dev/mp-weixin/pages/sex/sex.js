"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 状态栏高度
      statusBarHeight: 0,
      // 导航栏高度
      navBarHeight: 82 + 11,
      userinfo: [{
        sex: ""
      }],
      sexs: [
        {
          text: "男",
          value: "男"
        },
        {
          text: "女",
          value: "女"
        },
        {
          text: "保密",
          value: "保密"
        }
      ]
    };
  },
  methods: {
    back() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    xgnickname() {
      common_vendor.index.request({
        url: "http://127.0.0.1:3001/updatesex",
        method: "POST",
        data: {
          _id: this.userinfo[0]._id,
          sex: this.userinfo[0].sex
        },
        success: (res) => {
          this.userinfo = res.data;
        }
      });
      setTimeout(() => {
        common_vendor.index.showToast({
          title: "修改成功",
          icon: "success"
        });
        common_vendor.index.navigateBack({
          delta: 1
        });
      }, 500);
    }
  },
  created() {
  },
  onLoad(optoin) {
    common_vendor.index.request({
      url: "http://127.0.0.1:3001/getuserinfo",
      method: "POST",
      data: {
        _id: optoin.id
      },
      success: (res) => {
        this.userinfo = res.data;
        if (this.userinfo[0].sex == "undefined") {
          this.userinfo[0].sex = "";
        }
      }
    });
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_nav_bar2 + _easycom_uni_data_checkbox2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_data_checkbox + _easycom_uni_forms_item + _easycom_uni_forms)();
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
      title: "更改性别"
    }),
    d: common_vendor.o(($event) => $data.userinfo[0].sex = $event),
    e: common_vendor.p({
      localdata: $data.sexs,
      modelValue: $data.userinfo[0].sex
    }),
    f: common_vendor.p({
      label: "性别",
      name: "sex"
    }),
    g: common_vendor.o((...args) => $options.xgnickname && $options.xgnickname(...args)),
    h: common_vendor.p({
      modelValue: $data.userinfo
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/sex/sex.vue"]]);
wx.createPage(MiniProgramPage);
