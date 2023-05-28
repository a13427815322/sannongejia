"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      data: [],
      addressdata: {
        sjr: "",
        phone: "",
        useradd: ""
      },
      rules: {
        sjr: {
          rules: [{
            required: true,
            errorMessage: "收货人名字不能为空"
          }]
        },
        phone: {
          rules: [{
            required: true,
            errorMessage: "联系方式不能为空"
          }]
        },
        useradd: {
          rules: [{
            required: true,
            errorMessage: "收货人地址不能为空"
          }]
        }
      }
    };
  },
  methods: {
    back() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    async requestaddress() {
      const res = await common_vendor.index.request({
        url: "http://127.0.0.1:3001/addressdetail",
        method: "POST",
        data: {
          _id: this._id
        }
      });
      this.data = res.data;
    },
    submitFrom(ref) {
      this.$refs[ref].validate().then((res) => {
        this.addressdata = res;
        common_vendor.index.showToast({
          title: "添加中~",
          icon: "loading"
        });
        setTimeout(() => {
          this.addaddress();
          common_vendor.index.navigateBack({
            delta: 1
          });
        }, 1e3);
      }).catch((err) => {
      });
    },
    async addaddress() {
      common_vendor.index.request({
        url: "http://127.0.0.1:3001/addaddress",
        method: "POST",
        data: {
          _id: this._id,
          sjr: this.addressdata.sjr,
          phone: this.addressdata.phone,
          useraddress: this.addressdata.useradd
        }
      });
    }
  },
  onLoad(e) {
    this._id = e._id;
    this.requestaddress();
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
    a: _ctx.statusBarHeight + "px",
    b: common_vendor.o($options.back),
    c: common_vendor.p({
      dark: true,
      fixed: true,
      ["background-color"]: "#ffffff",
      ["status-bar"]: true,
      ["left-icon"]: "left",
      ["left-text"]: "",
      color: "black",
      title: "新增收货地址"
    }),
    d: common_vendor.o(($event) => $data.addressdata.sjr = $event),
    e: common_vendor.p({
      placeholder: "名字",
      modelValue: $data.addressdata.sjr
    }),
    f: common_vendor.p({
      label: "收货人",
      name: "sjr",
      required: true
    }),
    g: common_vendor.o(($event) => $data.addressdata.phone = $event),
    h: common_vendor.p({
      placeholder: "手机号",
      modelValue: $data.addressdata.phone
    }),
    i: common_vendor.p({
      label: "手机号码",
      name: "phone",
      required: true
    }),
    j: common_vendor.o(($event) => $data.addressdata.useradd = $event),
    k: common_vendor.p({
      placeholder: "省 市 区 街道",
      modelValue: $data.addressdata.useradd
    }),
    l: common_vendor.p({
      label: "收货地址",
      name: "useradd",
      required: true
    }),
    m: common_vendor.o(($event) => $options.submitFrom("form")),
    n: common_vendor.sr("form", "7870af0b-2,7870af0b-1"),
    o: common_vendor.p({
      modelValue: $data.addressdata,
      rules: $data.rules
    }),
    p: common_vendor.p({
      title: "添加收货地址",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/addaddress/addaddress.vue"]]);
wx.createPage(MiniProgramPage);
