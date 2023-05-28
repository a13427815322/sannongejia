"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      com: "",
      id: 1,
      length: 1,
      comname: "",
      comimg: "",
      comtime: "",
      data: [],
      temp: [],
      temp1: {},
      userinfo: {
        headSculpture: ""
      },
      userinfolen: 0,
      rules: {
        usercom: {
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
          }
        });
      }
    },
    dianzan(res) {
      this.id = res;
      this.updatelike();
    },
    updatelike() {
      common_vendor.index.request({
        url: "http://127.0.0.1:3001/updatelike",
        method: "POST",
        data: {
          id: this.id
        },
        success: (res) => {
          this.requestNewsDetail();
        }
      });
    },
    pl(e) {
      this.comname = this.userinfo[0].nickname;
      this.comimg = this.userinfo[0].headSculpture;
      this.comtime = new Date();
      this.com = e.detail.value;
    },
    sure() {
      if (this.com.length != 0) {
        this.temp.push({
          usercom: this.com,
          comname: this.comname,
          comtime: this.comtime,
          comimg: this.comimg
        });
      }
      if (this.temp.length == this.data[0].comdata.length) {
        common_vendor.index.showToast({
          title: "评论为空",
          icon: "error"
        });
      } else {
        this.update();
      }
    },
    async update() {
      {
        await common_vendor.index.request({
          url: "http://127.0.0.1:3001/update",
          method: "POST",
          data: {
            id: this.id,
            comdata: this.temp
          }
        });
        this.requestNewsDetail();
      }
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
    async requestNewsDetail() {
      const res = await common_vendor.index.request({
        url: "http://127.0.0.1:3001/detail",
        method: "POST",
        data: {
          id: this.id
        }
      });
      res.data.forEach((item) => {
        item.imgurls = JSON.parse(item.imgurls);
        item.videourls = JSON.parse(item.videourls);
        if (item.comdata != null) {
          item.comdata = JSON.parse(item.comdata);
          for (var i2 in item.comdata) {
            item.comdata[i2].comtime = new Date(item.comdata[i2].comtime).toLocaleDateString();
          }
        } else {
          item.comdata = [];
        }
        this.likestatus = item.likestatus;
      });
      res.data[0].creattime = new Date(res.data[0].creattime).toLocaleDateString();
      this.data = res.data;
      for (var i in res.data[0].comdata) {
        this.temp[i] = res.data[0].comdata[i];
      }
      if (this.temp == null) {
        this.temp = [];
      }
    },
    load(e) {
      this.id = e;
      this.requestNewsDetail();
    },
    back() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
  },
  onLoad(options) {
    this.id = options.id;
    this.load(options.id);
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
    a: common_vendor.o(($event) => $options.back()),
    b: common_vendor.p({
      ["left-icon"]: "back",
      title: "社区正文"
    }),
    c: common_vendor.f($data.data, (item, index, i0) => {
      return common_vendor.e({
        a: item.headSculpture,
        b: common_vendor.t(item.nickname),
        c: common_vendor.t(item.creattime),
        d: common_vendor.t(item.title),
        e: item.imgurls
      }, item.imgurls ? {
        f: common_vendor.f(item.imgurls, (item2, index2, i1) => {
          return {
            a: item2.fileID
          };
        })
      } : {}, {
        g: item.videourls
      }, item.videourls ? {
        h: common_vendor.f(item.videourls, (item2, index2, i1) => {
          return {
            a: item2.fileID
          };
        })
      } : {}, {
        i: common_vendor.t(item.comdata.length)
      }, this.likestatus == 0 ? {
        j: common_vendor.o(($event) => $options.dianzan(item.id), index)
      } : this.likestatus == 1 ? {
        k: common_vendor.o(($event) => $options.dianzan(item.id), index)
      } : {}, {
        l: common_vendor.t(item.likecount),
        m: index
      });
    }),
    d: this.likestatus == 0,
    e: this.likestatus == 1,
    f: common_vendor.f($data.data, (item, index, i0) => {
      return {
        a: common_vendor.f(item.comdata, (item2, index2, i1) => {
          return {
            a: item2.comimg,
            b: common_vendor.t(item2.comname),
            c: common_vendor.t(item2.usercom),
            d: common_vendor.t(item2.comtime)
          };
        }),
        b: index
      };
    }),
    g: common_vendor.o((...args) => $options.pl && $options.pl(...args)),
    h: common_vendor.o((...args) => $options.sure && $options.sure(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
