"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  props: {
    cartBasketRect: Object
    // 购物车篮的rect信息
  },
  data() {
    return {
      offsetX: 0,
      offsetY: 0,
      ballX: 0,
      ballY: 0,
      balls: {},
      //避免抖动
      lastEvent: "",
      lastId: ""
    };
  },
  created() {
    let balls2 = [];
    for (let i = 0; i < 5; i++) {
      balls2.push({ inited: false });
    }
    this.balls = balls2;
  },
  methods: {
    getBalls() {
      return balls;
    },
    addToCart(e, id) {
      if (!id) {
        this.lastId = "";
        return;
      }
      const self = this;
      if (this.lastId == id) {
        e = this.lastEvent;
      } else {
        this.lastId = id;
        this.lastEvent = e;
      }
      let ballX = e.touches[0].clientX - 10;
      let ballY = e.touches[0].clientY - 9;
      this.offsetX = -Math.abs(this.cartBasketRect.left - ballX + 10);
      this.offsetY = Math.abs(this.cartBasketRect.top - ballY + this.cartBasketRect.height / 1.5);
      this.ballX = ballX;
      this.ballY = ballY;
      for (let i = 0; i < 5; i++) {
        if (!this.balls[i].inited) {
          this.balls[i].inited = true;
          setTimeout(() => {
            self.balls[i].inited = false;
          }, 500);
          break;
        }
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.balls, (d, i, i0) => {
      return {
        a: common_vendor.s(d.inited ? "transition: transform .5s linear; transform: translate3d( " + $data.offsetX + "px,0,0); left: " + $data.ballX + "px; opacity: 1;" : ""),
        b: i,
        c: common_vendor.s(d.inited ? "transition: transform .5s ease-in; transform: translate3d(0, " + $data.offsetY + "px,0); top: " + $data.ballY + "px;" : "")
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-65b6610f"], ["__file", "Y:/mui原型/三农e家/comment/flyInCart.vue"]]);
wx.createComponent(Component);
