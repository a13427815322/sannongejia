<template>
	<view class="navBarBox">
		<!-- 状态栏占位 -->
		<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
		<!-- 真正的导航栏内容 -->
		<uni-nav-bar dark :fixed="true" background-color="#ffffff" status-bar left-icon="left" left-text=""
			color="black" title="个人信息" @clickLeft="back" />
	</view>
	<scroll-view scroll-x class="tabs-title" style="white-space: nowrap">
		<view v-for="(item,index) in tabList" :key="index" @click="ontabtap(index)">
			<span :class="status==index?'active':''"> {{item.name}}</span>
		</view>
	</scroll-view>
	<view>
		<view v-for="(item,index) in dingdan" :key="index" class="dingdanbox" @click="tospdetail(item.dingdanid)">
			<view v-if="item.status==1" class="zhuantai"> 待付款</view>
			<view v-if="item.status==2" class="zhuantai"> 待发货</view>
			<view v-if="item.status==3" class="zhuantai"> 待收获</view>
			<view v-if="item.status==4" class="zhuantai"> 待评价</view>
			<view v-for="(item,index) in item.shopcart" :key="index" class="shangpingbox">
				<image :src="item.changpingimg" class="changpingimg" mode="aspectFit"></image>
				<view class="shopname">{{item.shopname}}</view>
				<view class="count">x{{item.count}}</view>
				<view style="float: right;" class="jiage">￥{{item.jiage}}</view>
				<view style="clear: both;"></view>
			</view>
			<view style="clear: both;"></view>
			<view class="zhongji">总计：￥{{item.zongji}}</view>
			<view style="clear: both;"></view>
			<view class="gongnenganniu" v-if="item.status==1">
				<view class="qxdd">取消订单</view>
				<view class="qfk">去付款</view>
			</view>
			<view class="gongnenganniu" v-if="item.status==2">
				<view class="qxdd">取消订单</view>
				<view class="qfk">查看订单</view>
			</view> 
			<view class="gongnenganniu" v-if="item.status==3">
				<view class="qfk">确认收货</view>
			</view>
			<view class="gongnenganniu" v-if="item.status==4">

				<view class="qfk">去评价</view>
			</view>
			<view style="clear: both;height: 16px;"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [{
					id: "tab01",
					name: '全部'
				}, {
					id: "tab02",
					name: '待付款'
				}, {
					id: "tab03",
					name: '待发货'
				}, {
					id: "tab04",
					name: '待收货'
				}, {
					id: "tab05",
					name: '待评价'
				}],
				statusBarHeight: 0,
				// 导航栏高度
				navBarHeight: 82 + 11,
				status: 0,
				dingdan: []
			}
		},
		methods: {
			tospdetail(e){
				uni.navigateTo({
					url:'/pages/dingdandetail/dingdandetail?dingdanid='+e
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			ontabtap(index) {
				this.status = index
				console.log(index)
				this.getdingdan()
			},
			getdingdan() {
				uni.request({
					url: 'http://127.0.0.1:3001/getdingdan',
					method: 'POST',
					data: {
						_id: this.userinfo._id,
						status: this.status
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
			const value = uni.getStorageSync('uni-id-pages-userInfo');
			this.userinfo = value
			this.status = option.status
			this.userinfo._id = String(this.userinfo._id)
			this.getdingdan()
		}
	}
</script>

<style>
	@import 'dingdan.css';
</style>
