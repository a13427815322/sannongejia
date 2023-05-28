<template>
	<view class="shangpingimgbox" v-for="(item,index) in shop" :key="index">
		<image src="../../static/left.png" class="leftshape" @click="back"></image>
		<image :src="item.changpingimg" style="width: 100%;"></image>
	</view>
	<view style="padding-top:257px;">
	</view>
	<view v-for="(item,index) in shop" :key="index">
		<view class="shop">
			<view class="shopname">{{item.shopname}}</view>
			<view class="shopjiage">￥{{item.jiage}}</view>
			<view class="shopxiaoliang">已售：{{item.xiaoliang}}</view>
			<view style="clear: both;height: 10px;"></view>
		</view>
		<view class="shop" style="margin-top: 15px;">
			<view class="spxq">商品详情</view>
			<view class="xxjs">{{item.xxjs}}</view>
		</view>
		<view class="shop" style="margin-top: 15px;">
			<view class="pingjiacount">评论（ {{pingjia.length}} ）</view>
			<view v-for="(item,index) in pingjia" v-if="pingjia.length!=0" class="pingjiabox">
				<view class="userinfobox">
					<image :src="item.headSculpture" class="headSculpture"></image>
					<view>{{item.nickname}}</view>
					<view style="clear: both;"></view>
				</view>
				<view style="clear: both;"></view>
				<view class="comment">{{item.comment}}</view>
				<view class="creattime">{{item.creattime}}</view>
			</view>
			<view  v-if="pingjia.length==0" class="pingjiabox">
				</view>
		</view>
		<view style="height: 60px;"></view>
	</view>
	<view class="bottom">
		<view class="customerservice">
			<image src="../../static/customerservice.png"></image><span>客服</span>
		</view>
		<view class="collect">
			<image src="../../static/collect.png"></image><span>收藏</span>
		</view>
		<view class="gmbox">
			<view class="jrgwc" @click="add()">加入购物车</view>
			<view class="ljgm" @click="topay">立即购买</view>
		</view>
	</view>
</template>



<script>
	export default {
		data() {
			return {
				id:0,
				shopcart:[],
				shop: [],
				_id:''
			}
		},
		methods: {
			add(){
				uni.showToast({
					title:'添加购物车成功',
					icon:'true'
				})
				uni.request({
					url: 'http://127.0.0.1:3001/toshopcart',
					method: 'POST',
					data: {
						id:this._id,
						shopid:this.id
					},
					success: res => {
						
					}
				})
				
			},
			topay(){
				uni.request({
					url:'http://127.0.0.1:3001/payone',
					method: 'POST',
					data:{
						_id:this._id,
						shopcart:this.shopcart
					},
					success:(res)=> {
						uni.navigateTo({
							url: '/pages/dingdandetail/dingdandetail?dingdanid=' + res.data.insertId +'&id=0'
						})
					}
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			async getshopcart(){
				uni.request({
					url: 'http://127.0.0.1:3001/getshop',
					method: 'POST',
					data: {
						id: this.id
					},
					success: res => {
						console.log(res)
						// res.data.datetime.substring(0,5)
						this.shop = res.data
						console.log(this.shop[0])
						this.shopcart.push({
							count:1,
							jiage: this.shop[0].jiage,
							shopid:this.shop[0].shopid,
							shopname : this.shop[0].shopname,
							changpingimg: this.shop[0].changpingimg,
							pinglunzhuantai: 0
						})
						console.log(this.shopcart)
						if (this.shop[0].pingjia != null) {
							this.pingjia = JSON.parse(this.shop[0].pingjia)
							for( var i in this.pingjia){
								this.pingjia[i].creattime=	new Date(this.pingjia[i].creattime).toLocaleDateString()
							}
							console.log(this.pingjia)
						} else {
							this.pingjia = []
						}
					}
				
				})
			}
		},
		onLoad(options) {
			this.id =options.id
			const value = uni.getStorageSync('uni-id-pages-userInfo');
			this._id = value._id
			console.log(this._id)
			this.getshopcart()
		}
	}
</script>

<style>
	@import 'shopdetail.css';
</style>
