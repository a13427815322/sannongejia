<template>
	<view>
		<view class="navBarBox">
			<view class="navBar">
				<uni-nav-bar left-icon="back" @click-left="back()" class="navtitle" title="新闻详情" />
			</view>
		</view>
		<view class="title">
			<view class="titlebox">
				{{data.title}}
			</view>
		</view>
		<view class="time">
			<view class="" style="width: 95%; margin: auto;">
				<view class="soure">
					{{data.soure}}
				</view>
				<view class="timebox">
					{{data.datetime}}
				</view>
			</view>
		</view>
		<view class="newsimage">
			<image class="newsimagebox" :src="data.img_url" mode=""></image>
		</view>
		<view class="content" v-for="(item,index) in data.content">
			<view class="contentbox" >
				{{item}}
			</view>
		</view>
		<view class="top-back" @click="topBack" v-if="isShow">
			<button>
				<view class="bttext">返回顶部</view>
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
				id: '',
				isShow: false,
			}
		},
		methods: {
			topBack() {
				uni.pageScrollTo({
					scrollTop: 0, // 滚动到页面的目标位置  这个是滚动到顶部, 0 
					duration: 300 // 滚动动画的时长
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			async requestnews() {
				const res = await uni.request({
					url: 'http://127.0.0.1:3001/newsdetail',
					method: 'POST',
					data: {
						id: this.id
					},
				})
				res.data.forEach(item => {
					item.content = JSON.parse(item.content)
				
					console.log(item.content)
				})
				// console.log(res.data)
				res.data[0].datetime = new Date(res.data[0].datetime).toLocaleDateString()
				this.data = res.data[0];
				// console.log(this.data)
			}
		},
		onLoad(e) {
			// console.log(e.id)
			this.id = e.id
			this.requestnews()
		},
		onPageScroll(e) {
			// console.log('e:', e)
			if (e.scrollTop >= 400) {
				// 显示
				this.isShow = true
			} else {
				// 隐藏
				this.isShow = false
			}
		}
	}
</script>

<style>
	@import 'newsdetail.css';
</style>
