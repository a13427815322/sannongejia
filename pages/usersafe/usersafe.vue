<template>
	<view class="navBarBox">
		<!-- 状态栏占位 -->
		<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
		<!-- 真正的导航栏内容 -->
		<uni-nav-bar dark :fixed="true" background-color="#ffffff" status-bar left-icon="left" left-text=""
			color="black" title="账号安全" @clickLeft="back" />
	</view>
	<view class="address" >
		<view class="adddetail">
			<view class="addtext">
				账号设置
			</view>
			<view class="">
				<image  src="../../static/right.png" mode=""></image>
			</view>
		</view>
	</view>
	<view class="address" >
		<view class="adddetail">
			<view class="addtext">
				手机号
			</view>
			<view class="">
				<image  src="../../static/right.png" mode=""></image>
			</view>
		</view>
	</view>
	<view class="address" >
		<view class="adddetail">
			<view class="addtext">
				注销账号
			</view>
			<view class="">
				<image  src="../../static/right.png" mode=""></image>
			</view>
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
				navBarHeight: 82 + 11,
				userinfo: []
			};
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
		},
		onLoad(options) {
			console.log(options.id)
		},
		created() {
			//获取手机状态栏高度
			// #ifdef APP
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
			// #endif

		},
	}
</script>

<style>
@import 'usersafe.css';
</style>
