<template>
	<scroll-view scroll-x class="tabs-title" style="white-space: nowrap">
		<view :class="active===index?'active':''" v-for="(item,index) in tabList" :key="index" @click="ontabtap(index)">
				{{item.name}}
		</view>		</scroll-view>
		<view v-for="(item,index) in news" >
			<view>
				<view class="newleft">
					<view>{{item.title}}</view>
					<view><view>{{item.soure}}</view><view>{{item.datetime}}</view></view>
				</view>
				<view class="newimg"><image :src="item.img_url" mode="aspectFill"></image></view>
				
			</view>
			<view style="clear: both;"></view>
		</view>
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
						for(let index in res.data){
							res.data[index].datetime=new Date(res.data[index].datetime).toLocaleDateString();
							
						}
						// res.data.datetime.substring(0,5)
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
	.newleft{
		display: inline-block;
		width:50%;
		float: left;
	}

	.tabs-title .active {
		color: #000000;
	}
	.newimg{
		width:120rpx;
		height:120rpx;
		display: inline-block;
		float: right;
	}
	.newimg image{
		width: 100%;
		height: 100%;
	}
</style>
