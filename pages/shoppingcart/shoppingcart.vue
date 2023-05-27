<template>
	<form>
		<view>

			<view class="nav">
				<view class="navleft">
					购物车 <span>({{shopcart.length}})</span>
				</view>
				<view class="navright" v-if="!guanli" @click="guanligwc">
					管理
				</view>
				<view class="navright" v-if="guanli" @click="guanligwc">
					退出管理
				</view>
				<view style="clear: both;"></view>
			</view>
			<view class="orderbox">
				<!-- 商品展示循环 -->
				<view class="orderdata" v-for="(item,index) in shopcart" key="index">
					<!-- 商品展示卡片 -->
					<view class="ordercard">
						<!-- 商品的选择框 -->

						<checkbox-group @change="selected(item.shopid)">
							<view class="checkbox">
								<label>
									<checkbox :checked="item.check" />
								</label>
							</view>
						</checkbox-group>



						<image :src="item.changpingimg"></image>
						<view class="ordername" :style="{width: orderwidth+'px'}">
							<view class="shopname">{{item.shopname}}</view>
							<view>
								<view class="jiage">
									¥{{item.jiage}}
								</view>
								<view class="count">
									x{{item.count}}
								</view>
								<view style="clear: both;"></view>
							</view>
						</view>


						<view class="" style="clear: both;">
						</view>
					</view>
				</view>
				<view style="height:50px;"></view>
			</view>

			<!-- 绝对定位做结算栏 -->
			<view class="bottom">
				<checkbox-group class="quanxuan" @change="checkall">
					<checkbox class="quanxuantext" color="#24AC6B" :value="quanxuan" :checked="quanxuanbolen">全选
					</checkbox>
				</checkbox-group>
				<view class="tjddbox" v-if="!guanli">
					<view class="zhongji">合计：<span class="zhongjiqian">￥{{zhonghe}}</span></view>
					<button @click="jieshuang" class="tjdd" form-type="reset">提交订单</button>
				</view>
				<view class="tjddbox" v-if="guanli">
					<button class="sc" @click="gwcsc" form-type="reset">删除</button>
				</view>
			</view>
		</view>
	</form>
</template>

<script>
	export default {
		data() {
			return {
				// 状态栏高度
				statusBarHeight: 0,
				// 导航栏高度
				navBarHeight: 82 + 11,
				userinfo: [],
				shopcart: [],
				idbox: [],
				shopcartbox: [],
				quanxuan: 0,
				quanxuanbolen: false,
				zhonghe: 0,
				guanli: false,
				shopcartbox1: [],
				windowResizeCallback: '',
				orderwidth: '',
				userinfo: {
					headSculpture: ""
				},
				userinfolen: 0

			}
		},
		methods: {
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
							//console.log(res)
							this.userinfo = res.data
							console.log(this.userinfo)
						}
					})
				}

			},
			guanligwc() {
				this.guanli = !this.guanli
			},
			checkall() {
				if (this.quanxuanbolen == 0) {
					this.quanxuanbolen = true
					this.zhonghe = 0
					for (var i in this.shopcart) {
						this.shopcart[i].check = true
						this.idbox[i] = this.shopcart[i].shopid
						this.zhonghe += this.shopcart[i].count * this.shopcart[i].jiage
					}
					//console.log(this.shopcart)
					// //console.log(this.quanxuanbolen)
				} else {
					this.quanxuanbolen = false
					this.zhonghe = 0
					//console.log(this.quanxuanbolen)
					for (var i in this.shopcart) {
						this.shopcart[i].check = false
						this.idbox = []
					}
				}

			},
			selected(id) {
				if (!this.idbox.length) {
					this.idbox.push(id)
					for (var i in this.shopcart) {
						if (this.shopcart[i].shopid == id) {
							this.zhonghe += this.shopcart[i].count * this.shopcart[i].jiage
						}
						if (this.idbox.length == this.shopcart.length) {
							this.quanxuanbolen = true
						}
					}
				} else {
					var a = 0
					for (var i in this.idbox) {
						if (this.idbox[i] == id) {
							//console.log(i)
							this.idbox.splice(i, 1)
							a = 1
							//console.log(this.idbox)
							for (var i in this.shopcart) {
								if (this.shopcart[i].shopid == id) {
									this.zhonghe -= this.shopcart[i].count * this.shopcart[i].jiage
								}
							}
							this.quanxuanbolen = 0
							for (var j in this.shopcart) {
								if (this.shopcart[j].shopid == id) {
									this.shopcart[j].check = false
								}
							}
							break
						} else {
							a = 0
						}
					}
					if (a == 0) {
						this.idbox.push(id)
						for (var i in this.shopcart) {
							if (this.shopcart[i].shopid == id) {
								this.zhonghe += this.shopcart[i].count * this.shopcart[i].jiage
							}
						}

						if (this.idbox.length == this.shopcart.length) {
							this.quanxuanbolen = true
						}
						//console.log(this.quanxuanbolen)
					}
				}
			},
			jieshuang() {
				if (this.idbox.length == 0) {
					uni.showToast({
						'title': "你还没有选择商品",
						'icon:': 'error'
					})
					if (this.shopcart.length == 0) {
						this.quanxuanbolen = false
					}
				} else {
					this.shopcartbox = []
					for (var i in this.shopcart) {
						for (var j in this.idbox) {
							if (this.idbox[j] == this.shopcart[i].shopid) {
								this.shopcartbox.push(this.shopcart[i])
							}
						}
					}
					for (var k in this.shopcartbox) {
						delete this.shopcartbox[k].check
					}
					//console.log(this.shopcartbox)
					uni.request({
						url: 'http://127.0.0.1:3001/todingdan',
						method: 'POST',
						data: {
							_id: this.userinfo[0]._id,
							shopcart: this.shopcartbox
						},
						success: res => {
							//console.log(res.data.insertId)
							uni.navigateTo({
								url: '/pages/dingdandetail/dingdandetail?dingdanid=' + res.data.insertId
							})
						}
					})
					this.gwcsc()
				}
			},
			gwcsc() {
				if (this.idbox.length == 0) {
					uni.showToast({
						'title': "你还没有选择商品",
						'icon:': 'error'
					})
					if (this.shopcart.length == 0) {
						this.quanxuanbolen = false
					}
				} else {
					this.shopcartbox1 = []
					for (var l in this.shopcart) {
						this.shopcartbox1.push(this.shopcart[l])
					}
					//console.log(this.shopcartbox1)
					for (var i in this.shopcartbox1) {
						for (var j in this.idbox) {
							if (this.idbox[j] == this.shopcartbox1[i].shopid) {
								this.zhonghe -= this.shopcartbox1[i].count * this.shopcartbox1[i].jiage
								this.shopcartbox1.splice(i, 1)
							}
						}
					}
					for (var k in this.shopcartbox1) {
						delete this.shopcartbox1[k].check
					}
					//console.log(this.shopcartbox1)

					uni.request({
						url: 'http://127.0.0.1:3001/deleteshopcard',
						method: 'POST',
						data: {
							_id:this.userinfo[0]._id,
							shopcart: this.shopcartbox1
						},
						success: res => {
							this.shopcart = JSON.parse(res.data[0].shopcart)
							for (var i in this.shopcart) {
								this.shopcart[i].check = false
							}
							//console.log(this.shopcart)
							this.idbox = []
							if (this.shopcart.length == 0) {
								this.quanxuanbolen = false
							}

						}
					})

				}
			},
			requestshopcart() {
				const value = uni.getStorageSync('uni-id-pages-userInfo');
				this.userinfo = value
				uni.request({
					url: 'http://127.0.0.1:3001/getshopcard',
					method: 'POST',
					data: {
						_id: this.userinfo._id
					},
					success: res => {
						this.shopcart = JSON.parse(res.data[0].shopcart)
						for (var i in this.shopcart) {
							this.shopcart[i].check = false
						}
						//console.log(this.shopcart)
					}

				})
			},
		},
		onLoad() {
			uni.switchTab({
				url: '/pages/shoppingcart/shoppingcart'
			})
			this.getuserinfo()
			this.requestshopcart()
			uni.getSystemInfo({
				success: res => {
					console.log(res.windowWidth)
					if (res.windowWidth < 720) {
						this.orderwidth = res.windowWidth * 0.9 - 185 //console.log(this.orderwidth)
					} else {
						this.orderwidth = 720 * 0.9 - 185
					}
				}
			})

		},
		onShow() {
			this.shopcart = []
			this.requestshopcart()
			this.getuserinfo()
			this.quanxuanbolen = false

			this.windowResizeCallback = (res) => {

				// //console.log('onWindowResize', res.size.windowWidth);
				if (res.size.windowWidth < 720) {
					this.orderwidth = res.size.windowWidth * 0.9 - 185
					//console.log(this.orderwidth)
				} else {
					this.orderwidth = 720 * 0.9 - 185
				}
			}
			uni.onWindowResize(this.windowResizeCallback);


		}
	}
</script>

<style lang="scss">
	@import 'shoppingcart.css';

	/* #ifdef H5 */
	.bottom {

		bottom: 50px;

	}

	/* #endif */
</style>
