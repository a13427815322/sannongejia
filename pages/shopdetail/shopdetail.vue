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
			<view class="jrgwc">加入购物车</view>
			<view class="ljgm">立即购买</view>
		</view>
	</view>
</template>



<script>
	export default {
		data() {
			return {
				shop: [],

			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		},

		onLoad(options) {
			console.log(options.id)
			uni.request({
				url: 'http://127.0.0.1:3001/getshop',
				method: 'POST',
				data: {
					id: options.id
				},
				success: res => {
					console.log(res)
					// res.data.datetime.substring(0,5)

					this.shop = res.data
					if (this.shop[0].pingjia != null) {
						this.pingjia = JSON.parse(this.shop[0].pingjia)
						console.log(this.pingjia)
					} else {
						this.pingjia = []
					}
				}

			})
		}
	}
</script>

<style>
	@import 'shopdetail.css';
</style>
