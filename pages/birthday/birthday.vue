<template>
	<view class="navBarBox">
		<!-- 状态栏占位 -->
		<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
		<!-- 真正的导航栏内容 -->
		<uni-nav-bar dark :fixed="true" background-color="#ffffff" status-bar left-icon="left" left-text=""
			color="black" title="更改生日" @clickLeft="back"  />
	</view>

	<picker mode="date" :value="userinfo[0].birthday"  @change="oninput" class="xingxiinput" :start="startDate" :end="endDate">
		<view>{{userinfo[0].birthday}}</view>
	</picker>
	<view></view>
	<view @click="xgnickname" class="qrxg">确认修改
</view>

</template>

<script>
	export default {
		data() {
			return {
			// 状态栏高度
			statusBarHeight: 0,
			// 导航栏高度
			navBarHeight: 82 + 11,
			userinfo: [{birthday:null}],
			
			}
		},
		methods: {oninput(e){
			this.userinfo[0].birthday=e.detail.value
			
		},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			xgnickname(){
				uni.request({
					url: 'http://127.0.0.1:3001/updatebirthday',
					method: 'POST',
					data: {
						_id:this.userinfo[0]._id,
						birthday:this.userinfo[0].birthday
					},
					success: res => {
						console.log(res)
						this.userinfo = res.data
						console.log(this.userinfo)
						uni.navigateBack({
							delta:1
						})
					}
				})
			}
		},created() {
			//获取手机状态栏高度
			// #ifdef APP
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
			// #endif

		},
		onLoad(optoin) {
		uni.request({
			url: 'http://127.0.0.1:3001/getuserinfo',
			method: 'POST',
			data: {
				_id: optoin.id
			},
			success: res => {
				console.log(res)
				this.userinfo = res.data
				console.log(this.userinfo)
			
					this.userinfo[0].birthday=new Date(this.userinfo[0].birthday).toLocaleDateString().replaceAll('/', '-')
				
				if(this.userinfo[0].birthday==null){
				this.userinfo[0].birthday='请选择你的生日'
				console.log(this.userinfo[0].birthday)
								}
			}
		})
		}
	}
</script>

<style>
.xingxiinput{
	width: 85%;
	margin: 10% auto;
	background-color: #f5f5f5;
	height: 40px;
	line-height: 40px;
	padding-left: 5%;
	border-radius: 4px;
	
}
.qrxg{
	width: 90%;
	position: fixed;
	left: 5%;
	background-color:#24AC6B;
	height: 40px;
	line-height: 40px;
	text-align: center;
	border-radius: 4px;
	color: #ffffff;
	bottom: 5%;
	max-width: 648px;
}
</style>
