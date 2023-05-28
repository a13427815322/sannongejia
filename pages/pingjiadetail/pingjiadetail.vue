<template>
	<view class="navBarBox">
		<!-- 状态栏占位 -->
		<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
		<!-- 真正的导航栏内容 -->
		<uni-nav-bar dark :fixed="true" background-color="#ffffff" status-bar left-icon="left" left-text=""
			color="black" title="评价" @clickLeft="back" />
	</view>
	<uni-section title="发布问题" type="line">
		<uni-forms ref="form" :modelValue="formData" :rules="rules">
			<uni-forms-item name="content" style="width: 100%;">
				<uni-easyinput maxlength="999" style="background-color: aqua;" autoHeight :inputBorder="false"
					class="textarea" type="textarea" v-model="formData.content" placeholder="来说一说你的想法吧" />
			</uni-forms-item>
		</uni-forms>
	</uni-section>
	<view @click="pinglun('form')" class="fbpl">发表评论</view>
</template>

<script>
	export default {
		data() {
			return {shop: [],
				// 状态栏高度
				statusBarHeight: 0,
				// 导航栏高度
				navBarHeight: 82 + 11,
				dingdan: [],
				shopid: 0,
				dingdanid:0,
				dingdanbox: [],
				userinfo: [],
				formData: {
					content: ""
				},
				rules: {
					content: {
						rules: [{
							required: true,
							errorMessage: '发布内容不能为空',

						}]
					}
				},
				pingjia:[]
			}
		},
		methods: {
			getshop(){
				uni.request({
					url: 'http://127.0.0.1:3001/getshop',
					method: 'POST',
					data: {
						id: this.shopid
					},
					success: res => {
						
						// res.data.datetime.substring(0,5)
						this.shop = res.data
						//console.log(this.shop)
						if (this.shop[0].pingjia != null) {
							this.pingjia = JSON.parse(this.shop[0].pingjia)
							//console.log(this.pingjia)
						} else {
							this.pingjia = []
						}
					}
				
				})
			}
			,
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			pinglun(ref) {
				this.$refs[ref].validate().then(res => {
					this.formData = res
				})
				var creattime=new Date
				// //console.log(this.formData.content)
				this.pingjia.push({
					_id:this.userinfo[0]._id,
					headSculpture:this.userinfo[0].headSculpture,
					nickname:this.userinfo[0].nickname,
					comment:this.formData.content,
					creattime:creattime
				})
				// //console.log(this.pingjia)
			uni.request({
				url: 'http://127.0.0.1:3001/pingjia',
				method: 'POST',
				data: {
					dingdanid: this.dingdanid,
					shopid:this.shopid,
					pingjia:this.pingjia
				},
				success: res => {
					uni.navigateBack({
						delta:1
					})
				}
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
						this.dingdanbox = res.data[0]
						this.dingdan = JSON.parse(res.data[0].shopcart)
						//console.log(this.dingdanbox)
						this.getuserinfo()
					}
				})
			},
			getuserinfo() {
				////console.log(this.userinfo)
				uni.request({
					url: 'http://127.0.0.1:3001/userinfo',
					method: 'POST',
					data: {
						_id: this.dingdanbox._id,
						username: this.userinfo.username,
						nickname: this.userinfo.nickname,
						headSculpture: 'https://mp-efbf9779-c0d9-4262-ab16-a6d0746727bb.cdn.bspapp.com/cloudstorage/a5fe2ec3-7bb7-4332-b614-6195c16c590f.png',
						phone: this.userinfo.mobile
					},
					success: res => {
						////console.log(res)
						this.userinfo = res.data
						//console.log(this.userinfo)
					}
				})
			},
		},
		onLoad(option) {
			//console.log(option)
			//console.log(option.dingdanid)
			this.shopid = option.shopid
			this.dingdanid = option.dingdanid
			this.getshop()
			this.getdingdan()
		},
		onShow() {
			
		}
		,
		created() {
			//获取手机状态栏高度
			// #ifdef APP
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
			// #endif

		},
	}
</script>

<style>
@import 'pingjiadetail.css';
</style>
