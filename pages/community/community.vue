<template>

	<view class="navBarBox">
		<!-- 状态栏占位 -->
		<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
		<!-- 真正的导航栏内容 -->
		<view class="navBar">
			<uni-nav-bar class="navtitle" title="互助社区" />
		</view>
	</view>
	<uni-forms v-for="(item,index) in community">
		<uni-card>
			<view class="card"  >
				<view class="" @click="todetail(item.id)" >
					<view class="user" style="width:100%;">
						<image :src="item.headSculpture" ></image>
						<view class="username">
							{{item.nickname}}
						</view>
						<view class="time">
							{{item.creattime}}
						</view>
					</view>
					<view class="content">
						{{item.title}}
					</view>
				</view>
				<view @click="todetail(item.id)">
				<view class="source" v-for="(item,index) in item.imgurls" v-if="item.imgurls">
					<image class="imgurls" :src="item.fileID" mode="aspectFit"></image>
				</view></view>
				
				<view class="sourcevideo" v-for="(item,index) in item.videourls" v-if="item.videourls">
					<view class="videobox">
						<video object-fit="contain" :src="item.fileID" ></video>
					</view>
				</view>
				<view class="" style="clear: both;">
				</view>
				<view class="clickbox">
					<view class="address">

						<image src="/static/localtion.png" mode=""></image>
						<view class="addresstext">
							{{item.address}}
						</view>
					</view>
					<view class="text" @click="todetail(item.id)">
						<image src="../../static/Comment.png"></image>
						<view class="svgtext">
							{{item.comdata.length}}
						</view>
					</view>
					<view class="text">
						<image src="../../static/like.png" @click="dianzan(item.id)" v-if="item.likestatus == 0">
						</image>
						<image src="../../static/Likefill.png" @click="dianzan(item.id)"
							v-else-if="item.likestatus == 1"></image>
						<view class="svgtext">
							{{item.likecount}}
						</view>
					</view>
				</view>

				<view class="" style="clear: both; ">
				</view>
			</view>
		</uni-card>
	</uni-forms>
	<view class="" style="padding-bottom: calc(var(--window-bottom));">

	</view>

	<view class="add">
		<image src="../../static/加号.png" class="image" @click="toadd"></image>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				community: [],
				userinfo: {
					headSculpture: ""
				},
				userinfolen: 0,
				cur: 0,
				imgcollection: [],
				// 状态栏高度
				statusBarHeight: 0,
				// 导航栏高度
				navBarHeight: 82 + 11,
				
			};
		},
		methods: {
			getuserinfo() {
				const value = uni.getStorageSync('uni-id-pages-userInfo');
				if (value) {
					this.userinfo = value
					this.userinfo._id = String(this.userinfo._id)
					this.userinfolen = Object.keys(this.userinfo).length
					//console.log(this.userinfo)
					uni.request({
						url: 'http://127.0.0.1:3001/userinfo',
						method: 'POST',
						data: {
							_id: this.userinfo._id,
							username: this.userinfo.username,
							nickname: this.userinfo.nickname,
							headSculpture: 'https://mp-efbf9779-c0d9-4262-ab16-a6d0746727bb.cdn.bspapp.com/cloudstorage/a5fe2ec3-7bb7-4332-b614-6195c16c590f.png',
							phone: this.userinfo.mobile
						},
						success: res => {
							//console.log(res)
							this.userinfo = res.data
							// //console.log(this.userinfo)
						}
					})
				}

			},
			async requesttopic() {
				uni.request({
					url: 'http://127.0.0.1:3001/community',
					method: "POST",
					success: res => {
						// //console.log(res)
						for (let index in res.data) {
							res.data[index].creattime = new Date(res.data[index].creattime)
								.toLocaleDateString();
							// //console.log(res.data[index].content.length)
							// if(res.data[index].content.length>=30){
							// 	res.data[index].content=res.data[index].content.substring(0,30)+"..."
							// }
						}
						res.data.forEach(item => {
							item.imgurls = JSON.parse(item.imgurls)
							item.videourls = JSON.parse(item.videourls)
							if (item.comdata != null) {
								item.comdata = JSON.parse(item.comdata)
							} else {
								item.comdata = []
							}

							// //console.log(item.imgurls)
						})
						// //console.log(res)
						this.community = res.data

					}
				})
			},
			toadd() {
				uni.showActionSheet({
					itemList: ['上传图片', '上传视频'],
					success(res) {
						//console.log(res.tapIndex) //下标0开始
						if (res.tapIndex == 0) {
							uni.navigateTo({
								url: '/pages/addcom/addcom'
							})
						} else {
							uni.navigateTo({
								url: '/pages/addvideo/addvideo'
							})
						}

					},
					fail(res) {
						//console.log(res.errMsg)
					}
				})

			},
			todetail(res) {
				// //console.log(res)
				uni.navigateTo({
					url: '../detail/detail?id=' + res
				})
			},
			dianzan(res) {
				//console.log(res)
				this.id = res
				this.updatelike()
			},
			updatelike() {
				const res = uni.request({
					url: 'http://127.0.0.1:3001/updatelike',
					method: 'POST',
					data: {
						id: this.id
					},
					success: res => {
						this.requesttopic()
					}
				})
				// //console.log(res)
				// this.requesttopic()
			}
		},

		created() {
			//获取手机状态栏高度
			// #ifdef APP-PLUS
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
			// #endif

		},
		onShow() {
			this.community=[]
			this.getuserinfo()
			this.requesttopic()
		},
		onLoad() {
			
			this.getuserinfo()
			this.requesttopic()
		}
	}
</script>

<style>
	@import "community.css";
</style>
