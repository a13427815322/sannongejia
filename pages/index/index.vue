<template>
	<view class="search">
<image src="../../static/saerch.svg" ></image>
				<input placeholder="请输入要查找的内容"/>
</view>
	<view >
		<swiper class="newswiper" indicator-dots="true" indicator-color="#FFFFFF" indicator-active-color="#24AC6B" autoplay="true" interval="3000" circular="true" >
			<swiper-item v-for="(item,index) in banner" ><image :src="item.url" mode="scaleToFill" ></image></swiper-item>
		</swiper>
	</view>
	<view class="newsbox">
	<view class="xgzx">相关资讯</view>
	<scroll-view scroll-x class="tabs-title" style="white-space: nowrap"   >
		<view  v-for="(item,index) in tabList" :key="index" @click="ontabtap(index)">
			<span :class="active===index?'active':''">	{{item.name}}</span>
		</view>		</scroll-view>
		<view v-for="(item,index) in news" >
			<view class="itembox">
				<view class="newleft">
					<view class="newtitle">{{item.title}}</view>
					<view><view class="newsoure">{{item.soure}}</view><view class="newdatetime">{{item.datetime}}</view></view>
				</view>
				<view class="newimg"><image :src="item.img_url" mode="aspectFit"></image></view>
				<view style="clear: both;"></view>
			</view>
			<view style="clear: both;"></view>
		</view>
		</view>
</template>

<script >
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
				news: [],
				banner:[
					{url:"https://mp-efbf9779-c0d9-4262-ab16-a6d0746727bb.cdn.bspapp.com/cloudstorage/3eedbd9a-fb96-4c48-9886-38c79bc2288a.jpg"},
					{url:"https://mp-efbf9779-c0d9-4262-ab16-a6d0746727bb.cdn.bspapp.com/cloudstorage/4da7c448-5a4d-4ab2-97ea-7a4e07d0909f.jpg"},
					{url:"https://mp-efbf9779-c0d9-4262-ab16-a6d0746727bb.cdn.bspapp.com/cloudstorage/11b941cb-cb2e-45f5-ae17-de9c7268fbb1.jpg"}
					
				]
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
							console.log(res.data[index].title.length)
							if(res.data[index].title.length>=30){
								res.data[index].title=res.data[index].title.substring(0,30)+"..."
							}
						}
						// res.data.datetime.substring(0,5)
						this.news = res.data
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "index.css";
	
</style>
