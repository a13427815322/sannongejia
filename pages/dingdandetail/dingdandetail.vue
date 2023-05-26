<template>
	<view class="navBarBox">
		<!-- 状态栏占位 -->
		<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
		<!-- 真正的导航栏内容 -->
		<uni-nav-bar dark :fixed="true" background-color="#ffffff" status-bar left-icon="left" left-text=""
			color="black" title="订单详情" @clickLeft="back" />
	</view>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dingdanid:0
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			async requestdingdan(){
				const res = await uni.request({
					url: 'http://127.0.0.1:3001/dingdandetail',
					method: 'POST',
					data: {
						dingdanid: this.dingdanid
					},
				})
				this.data = res.data
				console.log(this.data)
			}
		},
		onLoad(e){
			console.log(e.dingdanid)
			this.dingdanid = e.dingdanid
			this.requestdingdan()
		}
	}
</script>

<style>

</style>
