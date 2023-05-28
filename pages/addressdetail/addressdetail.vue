<template>
	<view class="navBarBox">
		<!-- 状态栏占位 -->
		<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
		<!-- 真正的导航栏内容 -->
		<uni-nav-bar dark :fixed="true" background-color="#ffffff" status-bar left-icon="left" left-text=""
			color="black" title="管理收货地址" @clickLeft="back" />
	</view>
	<view class="address" v-for="(item,index) in this.data" >
		<view class="addressscard"   key="index" style="background-color: #ffffff;height: 84px;margin-top: 16px;">
			<view class="" style="line-height: 84px; float: left;margin-left: 16px;" >
				<image src="../../static/地址.png" mode=""></image>
			</view>
			<view class="" style="float: left; margin-top: 16px;margin-left: 22px;">
				<view class="">
					<view class="jjrname"  style="float:left;" >
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
			<view class="" style="float: right;margin-right: 16px;line-height: 84px;">
				<image  @click="toupdate(item.id)" src="../../static/修改.png" mode=""></image>
			</view>
		</view>
	</view>
	<view class="add">
		<image src="../../static/加号.png" class="image" @click="toadd(this._id)"></image>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				_id: '',
				data: []
			}
		},
		methods: {
			toupdate(res){
				uni.navigateTo({
					url: '/pages/updateaddress/updateaddress?id='+res
				})
			},
			toadd(res){
				uni.navigateTo({
					url: '/pages/addaddress/addaddress?_id='+res
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			async requestaddress() {
				const res = await uni.request({
					url: 'http://127.0.0.1:3001/addressdetail',
					method: 'POST',
					data: {
						_id: this._id
					},
				})
				this.data = res.data
				//console.log(this.data)
			}
		},
		onLoad(e) {
			this._id = e._id
			//console.log(this._id)
			this.requestaddress()
		},
		onShow() {
			this.data=[]
			this.requestaddress()
		}
	}
</script>

<style>
	@import 'addressdetail.css';
</style>
