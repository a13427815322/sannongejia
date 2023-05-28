<template>
	<view class="navBarBox">
		<!-- 状态栏占位 -->
		<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
		<!-- 真正的导航栏内容 -->
		<uni-nav-bar dark :fixed="true" background-color="#ffffff" status-bar left-icon="left" left-text=""
			color="black" title="个人信息" @clickLeft="back" />
	</view>
	
	<view>
		<view v-for="(item,index) in dingdan" :key="index" class="dingdanbox" >
			<view style="margin-left: 16px;">订单号：{{item.dingdanid}}</view>
			<view style="margin-left: 16px;">客户：{{item._id}}</view>
			<view style="margin-left: 16px;">收件人：{{item.sjr}}</view>
			<view style="margin-left: 16px;">发货到：{{item.adress}}</view>
			<view style="margin-left: 16px;">手机号：{{item.phone}}</view>
			<view v-if="item.status==1" class="zhuantai"> 待付款</view>
			<view v-if="item.status==2" class="zhuantai"> 待发货</view>
			<view v-if="item.status==3" class="zhuantai"> 待收获</view>
			<view v-if="item.status==4" class="zhuantai"> 待评价</view>
			<view  v-for="(item1,index) in item.shopcart" :key="index" class="shangpingbox"  >
				<image :src="item1.changpingimg" class="changpingimg" mode="aspectFit"></image>
				<view class="shopname">{{item1.shopname}}</view>
				<view class="count">x{{item1.count}}</view>
				<view style="float: right;" class="jiage">￥{{item1.jiage}}</view>
				<view style="clear: both;"></view>
			</view>
			<view style="clear: both;"></view>
			<view class="zhongji">总计：￥{{item.zongji}}</view>
			<view style="clear: both;"></view>
		
			<view class="gongnenganniu" v-if="item.status==2">
				<view class="qfk" @click="qrfh(item.dingdanid)">确认发件</view>
			</view> 
			
			<view style="clear: both;height: 16px;"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			
				statusBarHeight: 0,
				// 导航栏高度
				navBarHeight: 82 + 11,
				status:2,
				dingdan: []
			}
		},
		methods: {
			qrfh(dingdanid){
				// console.log(dingdanid)
				uni.request({
					url: 'http://127.0.0.1:3001/fahuo',
					method: 'POST',
					data: {
						dingdanid:dingdanid
					},
					success: res => {
						// console.log(res)
						this.getdingdan()
					}
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			
			getdingdan() {
				uni.request({
					url: 'http://127.0.0.1:3001/getadmin',
					method: 'POST',
					data: {
						status:this.status
					},
					success: res => {
						//console.log(res)
						this.dingdan = res.data
						for (var i in this.dingdan) {
							this.dingdan[i].shopcart = JSON.parse(this.dingdan[i].shopcart)

							this.dingdan[i].zongji = 0
						}
						for (var j in this.dingdan) {
							for (var k in this.dingdan[j].shopcart) {
								// console.log(this.dingdan[j].shopcart[k])
								if (this.dingdan[j].shopcart[k].shopname.length > 9) {
									this.dingdan[j].shopcart[k].shopname = this.dingdan[j].shopcart[k].shopname
										.substring(0, 9) + "..."
								}
								this.dingdan[j].zongji += this.dingdan[j].shopcart[k].jiage * this.dingdan[j]
									.shopcart[k].count
							}
						}
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
		onLoad(option) {
			
			this.getdingdan()
		}
	}
</script>

<style >
@import 'gly.css';
</style>
