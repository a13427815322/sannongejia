"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      id: 0,
      data: [],
      addressdata: {
        sjr: "",
        phone: "",
        useraddress: ""
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
        url: "http://127.0.0.1:3001/updateadddetail",
        method: "POST",
        data: {
          id: this.id
        }
      });
      this.data = res.data[0];
    },
    submitFrom(ref) {
      this.$refs[ref].validate().then((res) => {
        this.addressdata = res;
        if (this.addressdata.sjr == "") {
          this.addressdata.sjr = this.data.sjr;
        }
        if (this.addressdata.phone == "") {
          this.addressdata.phone = this.data.phone;
        }
        if (this.addressdata.useraddress == "") {
          this.addressdata.useraddress = this.data.useraddress;
        }
        common_vendor.index.showToast({
          title: "修改中~",
          icon: "loading"
        });
        setTimeout(() => {
          this.updateaddress();
          common_vendor.index.navigateBack({ delta: 1 });
        }, 1e3);
      }).catch((err) => {
      });
    },
    async updateaddress() {
      common_vendor.index.request({
        url: "http://127.0.0.1:3001/updateaddress",
        method: "POST",
        data: {
          id: this.data.id,
          sjr: this.addressdata.sjr,
          phone: this.addressdata.phone,
          useraddress: this.addressdata.useraddress
        }
      });
    }
  },
  onLoad(e) {
    this.id = e.id;
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
      title: "修改收货地址"
    }),
    d: common_vendor.o(($event) => $data.addressdata.sjr = $event),
    e: common_vendor.p({
      placeholder: this.data.sjr,
      modelValue: $data.addressdata.sjr
    }),
    f: common_vendor.p({
      label: "收货人",
      name: "sjr"
    }),
    g: common_vendor.o(($event) => $data.addressdata.phone = $event),
    h: common_vendor.p({
      placeholder: this.data.phone,
      modelValue: $data.addressdata.phone
    }),
    i: common_vendor.p({
      label: "手机号码",
      name: "phone"
    }),
    j: common_vendor.o(($event) => $data.addressdata.useraddress = $event),
    k: common_vendor.p({
      placeholder: this.data.useraddress,
      modelValue: $data.addressdata.useraddress
    }),
    l: common_vendor.p({
      label: "收货地址",
      name: "useraddress"
    }),
    m: common_vendor.o(($event) => $options.submitFrom("form")),
    n: common_vendor.sr("form", "c872b0fa-2,c872b0fa-1"),
    o: common_vendor.p({
      modelValue: $data.addressdata
    }),
    p: common_vendor.p({
      title: "修改收货地址",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/updateaddress/updateaddress.vue"]]);
wx.createPage(MiniProgramPage);
