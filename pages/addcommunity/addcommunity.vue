<template>
  <view class="box-bg">
  	<uni-nav-bar dark :fixed="true" shadow background-color="#007AFF" status-bar left-icon="left" left-text="返回"
  		title="自定义导航栏" @clickLeft="back" />
  </view>

</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style>

</style>
