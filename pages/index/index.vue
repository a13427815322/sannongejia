<template>
	<scroll-view scroll-x class="tabs-title" style="white-space: nowrap">
		<view :class="active===index?'active':''" v-for="(item,index) in tabList" :key="index" @click="ontabtap(index)">
				{{item.name}}
		</view>		</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [{
					id: "tab01",
					name: '三农政策'
				}, {
					id: "tab02",
					name: '农业科技'
				}],
				active: 0,
				news: []
			}
		},
		onLoad() {
			this.requestindex()
		},
		methods: {
			ontabtap(index) {
				this.active = index

				this.requestindex()
			},
			requestindex() {

				uni.request({
					url: 'http://127.0.0.1:3001/index',
					method: 'POST',
					data: {
						type: this.active
					},
					success: res => {
						console.log(res)

						this.news = res.data
					}
				})
			}
		}
	}
</script>

<style>
	.tabs {
		height: 100%;
	}

	.tabs-title {
		white-space: nowrap;
		width: 730rpx;
		height: 100rpx;

	}

	.tabs-title view {
		padding-left: 5px;
		padding-right: 5px;
		display: inline-block;
		height: 60px;
		line-height: 60px;
		color: #666666;
		text-align: center;
	}

	.tabs-title .active {

		color: #000000;
	}
</style>
