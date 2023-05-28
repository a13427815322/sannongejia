<template>
	<view class="navBarBox">
		<!-- 状态栏占位 -->
		<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
		<!-- 真正的导航栏内容 -->
		<uni-nav-bar dark :fixed="true" background-color="#ffffff" status-bar left-icon="home" left-text=""
			color="black" title="评价" @clickLeft="home" />
	</view>
	<view v-for="(item,index) in dingdan" :key="index" class="shangpingbox">
		<view v-if="item.pinglunzhuantai==0">
			<image :src="item.changpingimg" class="changpingimg" mode="aspectFit"></image>
			<view class="shopname">{{item.shopname}}</view>
			<view class="qfk" @click="topingjiadetail(item.shopid,this.dingdanid)">评价</view>
			<view style="clear: both;"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dingdanid: 0,
				shopcart: [],
				// 状态栏高度
				statusBarHeight: 0,
				// 导航栏高度
				navBarHeight: 82 + 11,
				dingdanid: 18,
				dingdan: [],
			
			}
		},
		methods: {
			home() {
				uni.switchTab({
					url: '/pages/me/me'
				})
			},
			topingjiadetail(shopid, dingdanid) {
				console.log(shopid, dingdanid)
				uni.navigateTo({
					url: '/pages/dingdandetail/dingdandetail?dingdanid=' + res.data.insertId +'&id=0'
				})
			},
			getdingdan() {
				uni.request({
					url: 'http://127.0.0.1:3001/dingdandetail',
					method: 'POST',
					data: {
						dingdanid: this.dingdanid
					},
					success: res => {
						this.dingdan = JSON.parse(res.data[0].shopcart)
						console.log(this.dingdan)
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
		onLoad(optoin) {
			console.log(optoin)
			this.dingdanid = optoin.dingdanid
			this.getdingdan()
		},
		onShow() {
			this.dingdan = []
			this.getdingdan()
		}
	}
</script>

<style>
	@import 'pingjia.css';
</style>
