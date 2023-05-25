"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 状态栏高度
      statusBarHeight: 0,
      // 导航栏高度
      navBarHeight: 82 + 11,
      userinfo: [{ username: "undefined", nickname: "undefined", sex: "undefined", birthday: null }]
    };
  },
  methods: {
    getuserinfo() {
      const value = common_vendor.index.getStorageSync("uni-id-pages-userInfo");
      this.userinfo = value;
      common_vendor.index.request({
        url: "http://127.0.0.1:3001/getuserinfo",
        method: "POST",
        data: {
          _id: this.userinfo._id
        },
        success: (res) => {
          this.userinfo = res.data;
          if (this.userinfo[0].username == "undefined") {
            this.userinfo[0].username = "未设置";
          }
          if (this.userinfo[0].nickname == "undefined") {
            this.userinfo[0].nickname = "未设置";
          }
          if (this.userinfo[0].sex == "undefined") {
            this.userinfo[0].sex = "未设置";
          }
          if (this.userinfo[0].birthday == null) {
            this.userinfo[0].birthday = "未设置";
          }
          this.userinfo[0].birthday = new Date(this.userinfo[0].birthday).toLocaleDateString().replaceAll("/", "-");
        }
      });
    },
    toxiugai(type) {
      if (type == "nickname") {
        common_vendor.index.navigateTo({
          url: "/pages/nickname/nickname?id=" + this.userinfo[0]._id
        });
      }
      if (type == "sex") {
        common_vendor.index.navigateTo({
          url: "/pages/sex/sex?id=" + this.userinfo[0]._id
        });
      }
      if (type == "birthday") {
        common_vendor.index.navigateTo({
          url: "/pages/birthday/birthday?id=" + this.userinfo[0]._id
        });
      }
    },
    back() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    ghtx() {
      common_vendor.index.chooseImage({
        // 选择图片
        count: 1,
        success: (res) => {
          this.userinfo[0].headSculpture = res.tempFilePaths[0];
          common_vendor.Es.uploadFile({
            filePath: res.tempFiles[0].path,
            cloudPath: "topic" + Math.floor(Math.random() * 1e3) + ".png",
            success: (res1) => {
              this.userinfo[0].headSculpture = res1.fileID;
              common_vendor.index.request({
                url: "http://127.0.0.1:3001/updeteheadSculpture",
                method: "POST",
                data: {
                  _id: this.userinfo[0]._id,
                  headSculpture: this.userinfo[0].headSculpture
                },
                success: (res2) => {
                  this.userinfo = res2.data;
                  this.userinfo[0].birthday = new Date(this.userinfo[0].birthday).toLocaleDateString().replaceAll("/", "-");
                }
              });
            }
          });
        }
      });
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
        if (this.userinfo[0].username == "undefined") {
          this.userinfo[0].username = "未设置";
        }
        if (this.userinfo[0].nickname == "undefined") {
          this.userinfo[0].nickname = "未设置";
        }
        if (this.userinfo[0].sex == "undefined") {
          this.userinfo[0].sex = "未设置";
        }
        if (this.userinfo[0].birthday == null) {
          this.userinfo[0].birthday = "未设置";
        }
        this.userinfo[0].birthday = new Date(this.userinfo[0].birthday).toLocaleDateString().replaceAll("/", "-");
      }
    });
  },
  onShow() {
    this.getuserinfo();
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  _easycom_uni_nav_bar2();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
if (!Math) {
  _easycom_uni_nav_bar();
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
      title: "个人信息"
    }),
    d: common_vendor.f($data.userinfo, (item, index, i0) => {
      return {
        a: item.headSculpture,
        b: common_vendor.o((...args) => $options.ghtx && $options.ghtx(...args), index),
        c: common_vendor.o((...args) => $options.ghtx && $options.ghtx(...args), index),
        d: common_vendor.t(item.username),
        e: common_vendor.t(item.nickname),
        f: common_vendor.o(($event) => $options.toxiugai("nickname"), index),
        g: common_vendor.t(item.sex),
        h: common_vendor.o(($event) => $options.toxiugai("sex"), index),
        i: common_vendor.t(item.birthday),
        j: common_vendor.o(($event) => $options.toxiugai("birthday"), index),
        k: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/grxx/grxx.vue"]]);
wx.createPage(MiniProgramPage);
