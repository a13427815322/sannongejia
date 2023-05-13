<template>
	<view>
		<swiper class="newswiper">
			<swiper-item v-for="(item,index) in banner" ><image :src="item.url" mode="scaleToFill" ></image></swiper-item>
		</swiper>
	</view>
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
	@import "index.css";
</style>
