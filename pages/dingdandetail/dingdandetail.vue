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
		<view @click="chooseadd(this.data._id)" class="" style="margin-top: 16px;width: 100%;" v-if="this.id == 0" >
			<view class="" style="text-align: center;height: 40px;background-color: #ffffff;width: 95%;margin: auto;box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.05);border-radius: 8px;">
				<view class="" style="padding-top: 10px;">
					请选择收货地址
				</view>
			</view>
		</view>
		<view class="" style="margin-top: 16px;" v-else>
			<view class="addbox" @click="chooseadd(this.data._id)">
				<view class="" style="float: left;">
					<image src="../../static/localtionb.png" mode=""></image>
				</view>
				<view class="" v-for="(item,index) in adddata" key="index" style="float: left; margin-top: 16px;margin-left: 22px;">
					<view class="">
						<view class="jjrname" style="float:left;">
							{{item.sjr}}
						</view>
						<view class="jjrphone" style="float:left;">
							{{item.phone}}
						</view>
					</view>
					<view class="" style="clear: both;">

					</view>
					<view class="jjraddress">
						{{item.useraddress}}
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
	<view class="paybtn" v-if="this.data.status == 1">
		<view class="" style="margin-top: 16px;">
			<button style="width: 25%;border-radius: 30px;margin-right: 2.5%;border: none;background-color:#24AC6B; color: #ffffff;"  @click="payfinish">付款</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				shopcart:[],
				//该页面默认地址
				total:0,
				index: 0,
				//该页面地址数据
				adddata: [{
					sjr: '',
					phone: '',
					useraddress: '',
					id: 0,
					_id: ''
				}],
				//该页面订单数据
				data: [],
				dingdanid: 0
			}
		},
		methods: {
			async payfinish(){
				const res = await uni.request({
					url: 'http://127.0.0.1:3001/addpaydata',
					method: 'POST',
					data: {
						dingdanid: this.dingdanid,
						phone:this.adddata[0].phone,
						sjr:this.adddata[0].sjr,
						adress:this.adddata[0].useraddress
					},
				})
				uni.showToast({
					title:'付款中',
					icon:'loading'
				})
				setTimeout(()=>{
					uni.navigateTo({
						url: '/pages/dingdan/dingdan?status=2'
					})
				},1000)
			},
			chooseadd(e){
				uni.navigateTo({
					url:'/pages/chooseadd/chooseadd?_id='+e+'&dingdanid='+this.dingdanid
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
					// console.log(this.total)
				}
				this.data = res.data[0]
				console.log(this.data)
			},
			async requestaddress() {
				const res = await uni.request({
					url: 'http://127.0.0.1:3001/payaddress',
					method: 'POST',
					data: {
						id: this.id
					},
				})
				this.adddata = res.data
				console.log(this.adddata)
			}
		},
		onLoad(e) {
			console.log(e)
			console.log(e.dingdanid)
			this.dingdanid = e.dingdanid
			this.id = e.id
			this.requestdingdan()
			this.requestaddress()
		}
	}
</script>

<style>
	@import 'dingdandetail.css';
</style>
