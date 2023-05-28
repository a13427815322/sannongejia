<template>
	<view class="navBarBox">
		<!-- 状态栏占位 -->
		<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
		<!-- 真正的导航栏内容 -->
		<uni-nav-bar dark :fixed="true" background-color="#ffffff" status-bar left-icon="left" left-text=""
			color="black" title="账号安全" @clickLeft="back" />
	</view>
	<view class="address"  @click="tousername">
		<view class="adddetail">
			<view class="addtext">
				账号设置
			</view>
			<view class="">
				<image  src="../../static/right.png" mode=""></image>
			</view>
		</view>
	</view>
	<view class="address" @click="tophone()" >
		<view class="adddetail">
			<view class="addtext">
				手机号
			</view>
			<view class="">
				<image  src="../../static/right.png" mode=""></image>
			</view>
		</view>
	</view>
	<view class="address" @click="zxzh">
		<view class="adddetail">
			<view class="addtext">
				注销账号
			</view>
			<view class="">
				<image  src="../../static/right.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 状态栏高度
				statusBarHeight: 0,
				// 导航栏高度
				navBarHeight: 82 + 11,
				userinfo: []
			};
		},
		methods: {
			zxzh(){
				uni.showModal({
					title: '确定要注销账号吗',
					success: (res) => {
						if (res.confirm) {
							console.log(this._id)
							uni.request({
								url: 'http://127.0.0.1:3001/deteleuserifo',
								method: 'POST',
								data: {
									_id:this._id
								},
								success:res => {
									console.log(res)
									uni.removeStorage({
										key: 'uni-id-pages-userInfo'
									})
									this.userinfo =[]
									console.log(uni.getStorageSync('uni-id-pages-userInfo'))
								}
							})
							
							setTimeout(() => {
								uni.switchTab({
									url:'/pages/me/me'
								})
							}, 500)
						} else {
							// console.log('cancel') //点击取消之后执行的代码
						}
					}
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			tousername(){
				uni.navigateTo({
					url:'/pages/username/username?id='+this._id
				})
			},
			tophone(){
				uni.navigateTo({
					url:'/pages/phone/phone?id='+this._id
				})
			}
		},
		onLoad(options) {
			console.log(options.id)
			this._id=options.id
		},
		created() {
			//获取手机状态栏高度
			// #ifdef APP
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
			// #endif

		},
	}
</script>

<style>
@import 'usersafe.css';
</style>
