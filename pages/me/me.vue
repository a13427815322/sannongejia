<template>
	<view class="userbackground">
		<!-- <button @click="zhuang" v-if="userinfolen===0">anwo</button> -->
		<view v-if="userinfolen==0" @click="zhuang()">
			<view  class="userinfobox">
				<image :src='headSculpture' class="headSculpture"></image>
				<view class="userinformation">
					<view class="username">
						未登录
					</view>
					<view class="nickname">账号：未登录</view>
				</view>
				<view class="setting" >
					<image src="../../static/Setting.png"></image>
					<view>设置</view>
				</view>
				<view style="clear: both;"></view>
			</view>
			<!-- <button @click="tuichu">退出登录</button> -->
		</view>
		<view v-if="userinfolen!==0">
			<view v-for="(item,index) in userinfo" :key="index" class="userinfobox">
				<image :src="item.headSculpture" class="headSculpture"></image>
				<view class="userinformation">
					<view class="username">
						{{item.nickname}}
					</view>
					<view class="nickname">账号：{{item.username}}</view>
				</view>
				<view class="setting" @click="tosetting">
					<image src="../../static/Setting.png"></image>
					<view>设置</view>
				</view>
				<view style="clear: both;"></view>
			</view>
			<!-- <button @click="tuichu">退出登录</button> -->
		</view>
	</view>
	<view class="wddd">
		<view class="dingdantext">
			<view class="dingdangleft">我的订单</view>
			<view class="dingdangright" @click="todingdan(0)">
				<view>全部</view>
				<image src="../../static/right.png" class="qb"></image>
				<view style="clear: both;"></view>
			</view>
			<view style="clear: both;"></view>
		</view>
		<view class="ddztbox">
			<view class="ddzt" @click="todingdan(1)">
				<image src="../../static/pay.png"></image>
				<view>待付款</view>
			</view>
			<view class="ddzt" @click="todingdan(2)">
				<image src="../../static/fahuo.png"></image>
				<view>待发货</view>
			</view>
			<view class="ddzt" @click="todingdan(3)">
				<image src="../../static/shouhuo.png"></image>
				<view>待收货</view>
			</view>
			<view class="ddzt" @click="todingdan(4)">
				<image src="../../static/pingjia.png"></image>
				<view>待评价</view>
			</view>
		</view>
	</view>
	<view v-for="(item,index) in userinfo" :key="index" class="userinfobox">
		<view v-if="item.role=='admin'" class="gonneng" @click="toadmin">
		<image src="../../static/admin.png"></image><view>管理员</view>
			<view style="clear: both;"></view>
		</view>
	</view>
	<!-- 	<view v-if="userifo[0].role=='admin'" >
		管理员
	</view> -->
</template>

<script>
	export default {
		data() {
			return {
				userinfo: {
					headSculpture: ""
				},
				userinfolen: 0,
				headSculpture:'https://mp-efbf9779-c0d9-4262-ab16-a6d0746727bb.cdn.bspapp.com/cloudstorage/a5fe2ec3-7bb7-4332-b614-6195c16c590f.png'
			}
		},
		methods: {
			toadmin(){
				uni.navigateTo({
					url:'../gly/gly'
				})
			},
			todingdan(e) {
				uni.navigateTo({
					url: "/pages/dingdan/dingdan?status=" + e
				})
			},
			getuserinfo() {
				const value = uni.getStorageSync('uni-id-pages-userInfo');
				if (value) {
					this.userinfo = value
					this.userinfo._id = String(this.userinfo._id)
					this.userinfolen = Object.keys(this.userinfo).length
					//console.log(this.userinfo)
					uni.request({
						url: 'http://127.0.0.1:3001/userinfo',
						method: 'POST',
						data: {
							_id: this.userinfo._id,
							username: this.userinfo.username,
							nickname: this.userinfo.nickname,
							headSculpture: 'https://mp-efbf9779-c0d9-4262-ab16-a6d0746727bb.cdn.bspapp.com/cloudstorage/a5fe2ec3-7bb7-4332-b614-6195c16c590f.png',
							phone: this.userinfo.mobile
						},
						success: res => {
							// console.log(res)
							this.userinfo = res.data
							console.log(this.userinfo)
						}
					})
				}

			},
			zhuang() {
				uni.navigateTo({
					url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
				})
			},
			tosetting() {
				uni.navigateTo({
					url: '/pages/setting/setting'
				})
			},
			tuichu() {
				uni.removeStorage({
					key: 'uni-id-pages-userInfo'
				})
				this.userinfo = ''
				this.userinfolen = this.userinfo.length
				//console.log(this.userinfo)
			}

		},
		onLoad() {
			this.getuserinfo()

		},
		onShow() {
			this.userinfo = {}
			this.userinfolen = 0
			this.getuserinfo()
		}

	}
</script>

<style>
	@import "me.css";
</style>
