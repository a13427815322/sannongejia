"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      tabList: [{
        id: "tab01",
        name: "三农政策"
      }, {
        id: "tab02",
        name: "农业科技"
      }],
      active: 0,
      news: [],
      banner: [
        { url: "https://mp-efbf9779-c0d9-4262-ab16-a6d0746727bb.cdn.bspapp.com/cloudstorage/3eedbd9a-fb96-4c48-9886-38c79bc2288a.jpg" },
        { url: "https://mp-efbf9779-c0d9-4262-ab16-a6d0746727bb.cdn.bspapp.com/cloudstorage/4da7c448-5a4d-4ab2-97ea-7a4e07d0909f.jpg" },
        { url: "https://mp-efbf9779-c0d9-4262-ab16-a6d0746727bb.cdn.bspapp.com/cloudstorage/11b941cb-cb2e-45f5-ae17-de9c7268fbb1.jpg" }
      ]
    };
  },
  onLoad() {
    this.requestindex();
    const value = common_vendor.index.getStorageSync("uni-id-pages-userInfo");
    if (value) {
      console.log(value);
    }
  },
  methods: {
    toNewsdetail(id) {
      common_vendor.index.navigateTo({
        url: "../newsdetail/newsdetail?id=" + id
      });
    },
    ontabtap(index) {
      this.active = index;
      this.requestindex();
    },
    requestindex() {
      common_vendor.index.request({
        url: "http://127.0.0.1:3001/index",
        method: "POST",
        data: {
          type: this.active
        },
        success: (res) => {
          console.log(res);
          for (let index in res.data) {
            res.data[index].datetime = new Date(res.data[index].datetime).toLocaleDateString();
            if (res.data[index].title.length >= 25) {
              res.data[index].title = res.data[index].title.substring(0, 25) + "...";
            }
          }
          this.news = res.data;
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.banner, (item, index, i0) => {
      return {
        a: item.url
      };
    }),
    b: common_vendor.f($data.tabList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.n($data.active === index ? "active" : ""),
        c: index,
        d: common_vendor.o(($event) => $options.ontabtap(index), index)
      };
    }),
    c: common_vendor.f($data.news, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.t(item.soure),
        c: common_vendor.t(item.datetime),
        d: item.img_url,
        e: common_vendor.o(($event) => $options.toNewsdetail(item.id))
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Y:/mui原型/三农e家/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
