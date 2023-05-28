<template>
	<view class="navBarBox">
		<!-- 状态栏占位 -->
		<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
		<!-- 真正的导航栏内容 -->
		<uni-nav-bar dark :fixed="true" background-color="#ffffff" status-bar left-icon="left" left-text=""
			color="black" title="设置" @clickLeft="back" />
	</view>
	<view class="userbackground">
		<view v-for="(item,index) in userinfo" :key="index" class="userinfobox">
			<image :src="item.headSculpture" class="headSculpture"></image>
			<view class="userinformation">
				<view class="username">
					{{item.nickname}}
				</view>
				<view class="nickname">账号：{{item.username}}</view>
			</view>
			<view class="xiugaimz" @click="togrxx">
				<image src="../../static/right.png"></image>
			</view>
			<view style="clear: both;"></view>
		</view>
	</view>
	<view class="address" @click="tosetaddress(this.userinfo[0]._id)">
		<view class="adddetail">
			<view class="addtext">
				管理收货地址
			</view>
			<view class="">
				<image  src="../../static/right.png" mode=""></image>
			</view>
		</view>
	</view>
	<view class="address" @click="tousersafe(this.userinfo[0]._id)">
		<view class="adddetail">
			<view class="addtext">
				账号安全
			</view>
			<view class="">
				<image  src="../../static/right.png" mode=""></image>
			</view>
		</view>
	</view>
	<view @click="tuichu" class="tuichu">退出登录</view>
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
			tosetaddress(res){
				//console.log(res)
				uni.navigateTo({
					url:'/pages/addressdetail/addressdetail?_id='+res
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			tuichu() {
				uni.removeStorage({
					key: 'uni-id-pages-userInfo'
				})
				this.userinfo =[]
				//console.log(this.userinfo)
				uni.navigateBack({
					delta: 1
				})
			},
			togrxx(){
				// //console.log(this.userinfo[0]._id)
				uni.navigateTo({
					url:'/pages/grxx/grxx?id='+this.userinfo[0]._id
				})
			},
			tousersafe(){
				uni.navigateTo({
					url:'/pages/usersafe/usersafe?id='+this.userinfo[0]._id
				})
			},
			getuserinfo(){
				const value = uni.getStorageSync('uni-id-pages-userInfo');
				this.userinfo = value
				uni.request({
					url: 'http://127.0.0.1:3001/getuserinfo',
					method: 'POST',
					data: {
						_id: this.userinfo._id
					},
					success: res => {
						//console.log(res)
						this.userinfo = res.data
						//console.log(this.userinfo)
					}
				})
			}

		},
		created() {
			//获取手机状态栏高度
			// #ifdef APP
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
			// #endif

		},
		onLoad() {
			this.getuserinfo()

		},
		onShow() {
			this.userinfo=[]
			this.getuserinfo()
		}
	}
</script>

<style>
	@import "setting.css";
</style>
