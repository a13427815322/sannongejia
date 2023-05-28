"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      username: "",
      createtime: "",
      userinfo: {
        headSculpture: ""
      },
      userinfolen: 0,
      formData: {
        content: "",
        imgs: [],
        address: "广州软件学院"
      },
      rules: {
        imgs: {
          rules: [{
            required: true,
            errorMessage: "至少选择一张图片"
          }]
        },
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
      common_vendor.index.showToast({
        title: "上传中",
        icon: "loading"
      });
      const createtime = new Date();
      this.createtime = this.formatDateTime(createtime);
      this.$refs[ref].validate().then((res) => {
        this.formData = res;
        console.log(res);
        for (let i in this.formData.imgs) {
          common_vendor.Es.uploadFile({
            filePath: this.formData.imgs[i].path,
            cloudPath: "pic" + Math.floor(Math.random() * 1e3) + "." + this.formData.imgs[i].extname,
            success: (res2) => {
              this.formData.imgs[i].fileID = res2.fileID;
              console.log(this.formData.imgs);
            }
          });
        }
        setTimeout(() => {
          common_vendor.index.navigateBack({
            delta: 1
          });
          this.addtopic();
        }, 3e3 * this.formData.imgs.length);
      }).catch((err) => {
        console.log(err);
      });
    },
    async addtopic() {
      common_vendor.index.request({
        url: "http://127.0.0.1:3001/addcom",
        method: "POST",
        data: {
          likecount: 0,
          likestatus: 0,
          _id: this.userinfo[0]._id,
          nickname: this.userinfo[0].nickname,
          headSculpture: this.userinfo[0].headSculpture,
          content: this.formData.content,
          imgs: this.formData.imgs,
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
      maxlength: "999",
      autoHeight: true,
      inputBorder: false,
      type: "textarea",
      placeholder: "来说一说你的想法吧",
      modelValue: $data.formData.content
    }),
    g: common_vendor.p({
      name: "content"
    }),
    h: common_vendor.o(($event) => $data.formData.imgs = $event),
    i: common_vendor.p({
      limit: "9",
      ["file-mediatype"]: "image",
      ["auto-upload"]: false,
      modelValue: $data.formData.imgs
    }),
    j: common_vendor.p({
      name: "imgs"
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
    q: common_vendor.p({
      name: "address"
    }),
    r: common_vendor.sr("form", "4a96586b-2,4a96586b-1"),
    s: common_vendor.p({
      modelValue: $data.formData,
      rules: $data.rules
    }),
    t: common_vendor.p({
      title: "发布问题",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/addcom/addcom.vue"]]);
wx.createPage(MiniProgramPage);
