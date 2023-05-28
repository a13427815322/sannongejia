<template>
	<view class="navBarBox">
		<!-- 状态栏占位 -->
		<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
		<!-- 真正的导航栏内容 -->
		<uni-nav-bar dark :fixed="true" background-color="#ffffff" status-bar left-icon="left" left-text=""
			color="black" title="评价" @clickLeft="back" />
	</view>
	<view  v-for="(item,index) in dingdan" :key="index" class="shangpingbox"  >
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
				// 状态栏高度
				statusBarHeight: 0,
				// 导航栏高度
				navBarHeight: 82 + 11,
				dingdanid:18,
				dingdan:[]
			}
		},
		methods: {
			topingjiadetail(shopid,dingdanid){
				console.log(shopid,dingdanid)
				uni.navigateTo({
					url:'../pingjiadetail/pingjiadetail?shopid='+shopid+'&dingdanid='+dingdanid
				})
			}
			,
			getdingdan(){
			uni.request({
				url: 'http://127.0.0.1:3001/dingdandetail',
				method: 'POST',
				data: {
					dingdanid: this.dingdanid
				},
				success: res => {
					
					this.dingdan=JSON.parse(res.data[0].shopcart)
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
		this.dingdanid=optoin.dingdanid
		this.getdingdan()
		},
		onShow() {
			this.dingdan=[]
	this.getdingdan()
		}
	}
</script>

<style>
@import 'pingjia.css';
</style>
