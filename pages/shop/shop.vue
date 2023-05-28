<template>
	<view style="position: fixed;width:100%;height: 100%; background-color: #f5f5f5;">
		<view class="search">
			<image src="../../static/shape.png"></image>
			<input placeholder="请输入要查找的内容" />
		</view>
		<scroll-view scroll-y class="tabs-title"
			style="max-width:207px;width:30%;height:80.5%;display:inline-block;float: left;">
			<view v-for="(item,index) in tabList" :key="index" @click="ontabtap(index)"
				:class=" active===index?'active':''" class="leftarbar">
				<span> {{item.name}}</span>
			</view>
		</scroll-view>
		<scroll-view scroll-y
			style="background-color: #ffffff;width:70%;max-width:495px;height:80%;display:inline-block;float: left;padding-bottom: 100px;">
			<view v-for="(item,index) in shop" :key="index" class="shangpingbox" >
				<image :src="item.changpingimg" class="shanpingtu"  @click="toshopdetail(item.shopid)"></image>
				<view class="shangping">
					<view class="shanpingname"  @click="toshopdetail(item.shopid)">{{item.shopname}}</view>
					<view class="shangpingyishou" @click="toshopdetail(item.shopid)">已售：{{item.xiaoliang}}</view>
					<view class="toshop" >
						<view class="shangpingjiage" @click="toshopdetail(item.shopid)">￥{{item.jiage}}</view>
						<view class="gmbox">
							<view class="gwc">
								<image src="../../static/ShoppingTrolleyfill.png"  @tap="add($event,item.shopid)"></image>
							</view>
							<view class="gm" @click="toshopdetail(item.shopid)">购买</view>
							<view style="clear: both;"></view>
						</view>

						<view style="clear: both;"></view>
					</view>
				</view>
				<view style="clear:both;"></view>
			</view>
		</scroll-view>
	</view>
	<view class="cart" >
		<image id="cart" src="../../static/ShoppingTrolleyfill.png" mode="widthFix"></image>
	</view>
	
	<!-- 只需要绑定购物车位置即可 -->
	<flyInCart ref="inCart" :cartBasketRect="cartBasketRect"></flyInCart>
</template>


<script>
	import flyInCart from '@/comment/flyInCart.vue'
	export default {components:{
			flyInCart
		},
		data() {
			return {
				cartBasketRect:{},
				id:'',
				tabList: [{
					id: "tab01",
					name: '农业用品'
				}, {
					id: "tab02",
					name: '种子'
				}, {
					id: "tab03",
					name: '肥料'
				}, {
					id: "tab04",
					name: '农机具'
				}],
				active: 0,
				shop: []

			}
		},
		methods: {add(e,id){
				this.$refs.inCart.addToCart(e,id);
				console.log(id)
				uni.showToast({
					title:'添加购物车成功',
					icon:'true'
				})
				uni.request({
					url: 'http://127.0.0.1:3001/toshopcart',
					method: 'POST',
					data: {
						id:this.id,
						shopid:id
					},
					success: res => {
						console.log(res)
						// res.data.datetime.substring(0,5)
						
					}
				})
				
			},
			toshopdetail(id){
				uni.navigateTo({
					url:'../shopdetail/shopdetail?id='+id
				})
				
			},
			ontabtap(index) {
				this.active = index
				console.log(this.active)
				this.Requestshop()
			},
			Requestshop() {
				uni.request({
					url: 'http://127.0.0.1:3001/shop',
					method: 'POST',
					data: {
						type: this.active
					},
					success: res => {
						console.log(res)
						// res.data.datetime.substring(0,5)
						this.shop = res.data
					}
				})
			}
		},onPageScroll() {
			//调用是因为 重复使用了点击动画位置 保证不抖动。 不传参调用即清空点击点
			this.$refs.inCart.addToCart();
		},
		onReady() {
			const self = this
		 
			let q = uni.createSelectorQuery()
			//获取购物车位置
			setTimeout(function(){
				q.select('#cart').boundingClientRect(data => {
				 self.cartBasketRect = data
				}).exec();
			},100)
		},
		onLoad() {
			this.Requestshop()
			const value = uni.getStorageSync('uni-id-pages-userInfo');		
			this.id=String(value._id)
			
			uni.switchTab({
				url:'/pages/shop/shop'
			})
			
		}
	}
</script>

<style>
	@import 'shop.css';
	.cart{position:fixed;bottom:-50px;left:68%;}
	#cart{
		width: 28px;
		height: 28px;
	}
</style>
