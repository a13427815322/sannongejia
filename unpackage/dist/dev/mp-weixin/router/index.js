"use strict";
const common_vendor = require("../common/vendor.js");
const whiteList = [
  "/pages/me/me",
  "/",
  "/uni_modules/uni-id-pages/pages/login/login-withpwd",
  "/uni_modules/uni-id-pages/pages/register/register",
  "/uni_modules/uni-id-pages/pages/login/login-withoutpwd",
  "/uni_modules/uni-id-pages/pages/login/login-smscode"
];
function hasPermission(url) {
  var value = common_vendor.index.getStorageSync("uni-id-pages-userInfo");
  value = Boolean(value != "");
  if (url.indexOf("?") != -1) {
    url = url.substring(0, url.indexOf("?"));
  }
  console.log(url);
  if (whiteList.indexOf(url) !== -1 || value) {
    return true;
  }
  return false;
}
common_vendor.index.addInterceptor("navigateTo", {
  // 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转
  invoke(e) {
    if (!hasPermission(e.url)) {
      common_vendor.index.reLaunch({
        url: "/pages/me/me"
      });
      common_vendor.index.showToast({
        title: "请先登录",
        icon: "error"
      });
      return false;
    }
    return true;
  },
  success(e) {
  }
});
common_vendor.index.addInterceptor("switchTab", {
  // tabbar页面跳转前进行拦截
  invoke(e) {
    if (!hasPermission(e.url)) {
      common_vendor.index.reLaunch({
        url: "/pages/me/me"
      });
      common_vendor.index.showToast({
        title: "请先登录",
        icon: "error"
      });
      return false;
    }
    return true;
  },
  success(e) {
  }
});
