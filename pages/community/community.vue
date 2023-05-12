<template>
<view class="navBarBox">
			<!-- 状态栏占位 -->
			<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
			<!-- 真正的导航栏内容 -->
			<view class="navBar">
				<uni-nav-bar  right-icon="plusempty" title="互助社区" @clickRight="toadd" />
			</view>
		</view>

				
		
</template>

<script>
	export default {
		data() {
			return {
							// 状态栏高度
							statusBarHeight: 0,
							// 导航栏高度
							navBarHeight: 82+11,
						};
		},
		methods: {
			toadd(){
				uni.navigateTo({
					url:"/pages/addcommunity/addcommunity"
				})
			}
		},
		created() {
					//获取手机状态栏高度
					this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
				},
	}
</script>

<style>
.navBarBox{}
.navBarBox .statusBar {}


</style>

