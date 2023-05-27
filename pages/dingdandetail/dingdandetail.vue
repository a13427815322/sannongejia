<template>
	<view class="navBarBox">
		<!-- 状态栏占位 -->
		<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
		<!-- 真正的导航栏内容 -->
		<uni-nav-bar dark :fixed="true" background-color="#ffffff" status-bar left-icon="left" left-text=""
			color="black" title="待付款" @clickLeft="back" v-if="this.data.status == 1" />
		<uni-nav-bar dark :fixed="true" background-color="#ffffff" status-bar left-icon="left" left-text=""
			color="black" title="待发货" @clickLeft="back" v-if="this.data.status == 2" />
		<uni-nav-bar dark :fixed="true" background-color="#ffffff" status-bar left-icon="left" left-text=""
			color="black" title="待收货" @clickLeft="back" v-if="this.data.status == 3" />
		<uni-nav-bar dark :fixed="true" background-color="#ffffff" status-bar left-icon="left" left-text=""
			color="black" title="待评价" @clickLeft="back" v-if="this.data.status == 4" />
	</view>
	<view class="statusbox1" v-if="this.data.status == 1" style="width: 100%;">
		<view class="" style="margin-top: 16px;">
			<view class="addbox" @click="chooseadd(this.data._id)">
				<view class="" style="float: left;">
					<image src="../../static/localtionb.png" mode=""></image>
				</view>
				<view class="" style="float: left; margin-top: 16px;margin-left: 22px;">
					<view class="">
						<view class="jjrname" style="float:left;">
							{{this.adddata[this.index].sjr}}
						</view>
						<view class="jjrphone" style="float:left;">
							{{this.adddata[this.index].phone}}
						</view>
					</view>
					<view class="" style="clear: both;">

					</view>
					<view class="jjraddress">
						{{this.adddata[this.index].useraddress}}
					</view>
				</view>
			</view>
		</view>
	</view>

	<view class="dingdanbox1" v-if="this.data.status == 1">
		<view class="" style="padding-top: 16px;"></view>
		<view class="ddbox" v-for="(item,index) in this.data.shopcart">
			<view class="shopbox">
				<image :src="item.changpingimg" mode=""></image>
			</view>
			<view class="shopname">
				{{item.shopname}}

			</view>
			<view class="shopmoney" style="float: right;">
				<view class="" style="margin-right: 8px;">
					¥{{item.count*item.jiage}}
				</view>
				<view class="shopcount">
					x{{item.count}}
				</view>
			</view>

			<view class="">
			</view>
			<view class="" style="clear: both;">

			</view>
		</view>
		<view class="total" style="float: right;">
			总计：¥{{this.total}}
		</view>
		<view class="" style="clear: both;">
		
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopcart:[],
				//该页面默认地址
				total:0,
				index: 0,
				//该页面地址数据
				adddata: [{
					sjr: '',
					phone: '',
					useraddress: '',
					id: '',
					_id: ''
				}],
				//该页面订单数据
				data: [],
				dingdanid: 0
			}
		},
		methods: {
			chooseadd(e){
				uni.navigateTo({
					url:'/pages/chooseadd/chooseadd?_id='+e
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			async requestdingdan() {
				const res = await uni.request({
					url: 'http://127.0.0.1:3001/dingdandetail',
					method: 'POST',
					data: {
						dingdanid: this.dingdanid
					},
				})
				res.data.forEach(item => {
					item.shopcart = JSON.parse(item.shopcart)
				})
				for(var i in res.data[0].shopcart){
					this.total += (res.data[0].shopcart[i].count*res.data[0].shopcart[i].jiage)
					console.log(this.total)
				}
				
				this.data = res.data[0]
				console.log(this.data)
				this.requestaddress()
			},
			async requestaddress() {
				const res = await uni.request({
					url: 'http://127.0.0.1:3001/addressdetail',
					method: 'POST',
					data: {
						_id: this.data._id
					},
				})
				this.adddata = res.data
				console.log(this.adddata)
			}
		},
		onLoad(e) {
			console.log(e.dingdanid)
			this.dingdanid = e.dingdanid
			this.requestdingdan()
		}
	}
</script>

<style>
	@import 'dingdandetail.css';
</style>
