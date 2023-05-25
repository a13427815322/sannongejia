"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      community: [],
      userinfo: {
        headSculpture: ""
      },
      userinfolen: 0,
      cur: 0,
      imgcollection: [],
      // 状态栏高度
      statusBarHeight: 0,
      // 导航栏高度
      navBarHeight: 82 + 11
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
    async requesttopic() {
      common_vendor.index.request({
        url: "http://127.0.0.1:3001/community",
        method: "POST",
        success: (res) => {
          for (let index in res.data) {
            res.data[index].creattime = new Date(res.data[index].creattime).toLocaleDateString();
          }
          res.data.forEach((item) => {
            item.imgurls = JSON.parse(item.imgurls);
            item.videourls = JSON.parse(item.videourls);
            if (item.comdata != null) {
              item.comdata = JSON.parse(item.comdata);
            } else {
              item.comdata = [];
            }
          });
          this.community = res.data;
        }
      });
    },
    toadd() {
      common_vendor.index.showActionSheet({
        itemList: ["上传图片", "上传视频"],
        success(res) {
          console.log(res.tapIndex);
          if (res.tapIndex == 0) {
            common_vendor.index.navigateTo({
              url: "/pages/addcom/addcom"
            });
          } else {
            common_vendor.index.navigateTo({
              url: "/pages/addvideo/addvideo"
            });
          }
        },
        fail(res) {
          console.log(res.errMsg);
        }
      });
    },
    todetail(res) {
      common_vendor.index.navigateTo({
        url: "../detail/detail?id=" + res
      });
    },
    dianzan(res) {
      console.log(res);
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
          this.requesttopic();
        }
      });
    }
  },
  created() {
  },
  onShow() {
    this.community = [];
    this.getuserinfo();
    this.requesttopic();
  },
  onLoad() {
    this.getuserinfo();
    this.requesttopic();
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _component_uni_card = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_nav_bar2 + _component_uni_card + _easycom_uni_forms2)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.statusBarHeight + "px",
    b: common_vendor.p({
      title: "互助社区"
    }),
    c: common_vendor.f($data.community, (item, index, i0) => {
      return common_vendor.e({
        a: item.headSculpture,
        b: common_vendor.t(item.nickname),
        c: common_vendor.t(item.creattime),
        d: common_vendor.t(item.title),
        e: common_vendor.o(($event) => $options.todetail(item.id)),
        f: item.imgurls
      }, item.imgurls ? {
        g: common_vendor.f(item.imgurls, (item2, index2, i1) => {
          return {
            a: item2.fileID
          };
        })
      } : {}, {
        h: common_vendor.o(($event) => $options.todetail(item.id)),
        i: item.videourls
      }, item.videourls ? {
        j: common_vendor.f(item.videourls, (item2, index2, i1) => {
          return {
            a: item2.fileID
          };
        })
      } : {}, {
        k: common_vendor.t(item.address),
        l: common_vendor.t(item.comdata.length),
        m: common_vendor.o(($event) => $options.todetail(item.id)),
        n: item.likestatus == 0
      }, item.likestatus == 0 ? {
        o: common_vendor.o(($event) => $options.dianzan(item.id))
      } : item.likestatus == 1 ? {
        q: common_vendor.o(($event) => $options.dianzan(item.id))
      } : {}, {
        p: item.likestatus == 1,
        r: common_vendor.t(item.likecount),
        s: "266a4fbf-2-" + i0 + "," + ("266a4fbf-1-" + i0),
        t: "266a4fbf-1-" + i0
      });
    }),
    d: common_vendor.o((...args) => $options.toadd && $options.toadd(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/community/community.vue"]]);
wx.createPage(MiniProgramPage);
