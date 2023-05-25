//只要是未登录状态，想要跳转到名单内的路径时，直接跳到登录页。
// 页面白名单，不受拦截
const whiteList = [
  '/pages/me/me',
  '/',
  '/uni_modules/uni-id-pages/pages/login/login-withpwd'
]
function hasPermission (url) {
var value = uni.getStorageSync('uni-id-pages-userInfo');		
  value =Boolean(value!='');//返回布尔值
    // 在白名单中或有登录判断条件可以直接跳转
	// console.log(url)
    if(whiteList.indexOf(url) !== -1 || value) {
        return true
    }
    return false
}
uni.addInterceptor('navigateTo', {
    // 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转
    invoke (e) {
        if(!hasPermission(e.url)){
            uni.reLaunch({
                url: '/pages/me/me'
            })
			uni.showToast({
				title:'请先登录',
				icon:"error"
			})
            return false
        }
        return true
    },
    success (e) {
    }
})
uni.addInterceptor('switchTab', {
    // tabbar页面跳转前进行拦截
    invoke (e) {
        if(!hasPermission(e.url)){
            uni.reLaunch({
                url: '/pages/me/me'
            })
			uni.showToast({
				title:'请先登录',
				icon:"error"
			})
            return false
        }
        return true
    },
    success (e) {
    }
})