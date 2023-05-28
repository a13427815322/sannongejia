"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      username: "测试号",
      createtime: "",
      userinfo: {
        headSculpture: ""
      },
      formData: {
        content: "",
        imgs: [],
        address: "广州软件学院"
      },
      rules: {
        content: {
          rules: [{
            required: true,
            errorMessage: "发布内容不能为空"
          }]
        },
        address: {
          rules: [{
            require: true,
            errorMessage: "地址不能为空"
          }]
        },
        video: {
          rules: [{
            required: true,
            errorMessage: "发布内容不能为空"
          }]
        }
      }
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
            console.log(this.userinfo[0].nickname);
          }
        });
      }
    },
    address() {
      document.getElementById("dz").style.display = "flex";
      document.getElementById("mr").style.display = "none";
    },
    local(e) {
      this.formData.address = e;
    },
    qr() {
      document.getElementById("dz").style.display = "none";
      document.getElementById("uchange").style.display = "flex";
    },
    formatDateTime(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    },
    submitFrom(ref) {
      const createtime = new Date();
      this.createtime = this.formatDateTime(createtime);
      this.$refs[ref].validate().then((res) => {
        this.formData = res;
        console.log(res);
        setTimeout(() => {
          this.addtopic();
        });
        common_vendor.index.navigateBack({
          delta: 1
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    async addtopic() {
      common_vendor.index.request({
        url: "http://127.0.0.1:3001/addvideo",
        method: "POST",
        data: {
          likecount: 0,
          likestatus: 0,
          _id: this.userinfo[0]._id,
          nickname: this.userinfo[0].nickname,
          headSculpture: this.userinfo[0].headSculpture,
          content: this.formData.content,
          video: this.formData.video,
          address: this.formData.address
        }
      });
    },
    back() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
  },
  onLoad() {
    this.getuserinfo();
  },
  onShow() {
    this.getuserinfo();
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _component_uni_section = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_nav_bar2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_file_picker2 + _easycom_uni_forms2 + _component_uni_section)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_file_picker + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.statusBarHeight + "px",
    b: common_vendor.o(($event) => $options.back()),
    c: common_vendor.o(($event) => $options.submitFrom("form")),
    d: common_vendor.p({
      ["left-icon"]: "back",
      title: "发布问题",
      ["right-text"]: "发布"
    }),
    e: common_vendor.o(($event) => $data.formData.content = $event),
    f: common_vendor.p({
      type: "textarea",
      placeholder: "来说一说你的想法吧",
      modelValue: $data.formData.content
    }),
    g: common_vendor.p({
      name: "content"
    }),
    h: common_vendor.o(($event) => $data.formData.video = $event),
    i: common_vendor.p({
      limit: "9",
      ["file-mediatype"]: "video",
      ["auto-upload"]: true,
      modelValue: $data.formData.video
    }),
    j: common_vendor.p({
      name: "video"
    }),
    k: common_vendor.o((...args) => $options.address && $options.address(...args)),
    l: common_vendor.t(this.formData.address),
    m: common_vendor.o((...args) => $options.qr && $options.qr(...args)),
    n: common_vendor.o($options.local),
    o: common_vendor.o(($event) => $data.formData.address = $event),
    p: common_vendor.p({
      id: "dz",
      type: "text",
      placeholder: "请输入地址",
      modelValue: $data.formData.address
    }),
    q: common_vendor.o(($event) => $data.formData.address = $event),
    r: common_vendor.p({
      name: "address",
      modelValue: $data.formData.address
    }),
    s: common_vendor.sr("form", "1aabd02a-2,1aabd02a-1"),
    t: common_vendor.p({
      modelValue: $data.formData,
      rules: $data.rules
    }),
    v: common_vendor.p({
      title: "发布问题",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/addvideo/addvideo.vue"]]);
wx.createPage(MiniProgramPage);
