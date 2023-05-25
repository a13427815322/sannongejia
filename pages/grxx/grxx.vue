<template>
	<view class="navBarBox">
		<!-- 状态栏占位 -->
		<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
		<!-- 真正的导航栏内容 -->
		<uni-nav-bar dark :fixed="true" background-color="#ffffff" status-bar left-icon="left" left-text=""
			color="black" title="个人信息" @clickLeft="back" />
	</view>
	<view v-for="(item,index) in userinfo" :key="index">
		<view class="ggtx">
			<image :src="item.headSculpture" class="headSculpture" @click="ghtx"></image>
			<view @click="ghtx">更换头像</view>
		</view>
		<view>
			<view class="xingxi">
				<view>账号：</view>
				<view>{{item.username}}</view>
			</view>
			<view class="xingxi">
				<view>昵称：</view>
				<view>{{item.nickname}}</view>
				<image src="../../static/right.png" class="xiugaimz" @click="toxiugai('nickname')"></image>
				<view style="clear: both;"></view>
			</view>
			<view class="xingxi">
				<view>性别：</view>
				<view>{{item.sex}}</view>
				<image src="../../static/right.png" class="xiugaimz" @click="toxiugai('sex')"></image>
				<view style="clear: both;"></view>
			</view>
			<view class="xingxi">
				<view>生日：</view>
				<view>{{item.birthday}}</view>
				<image src="../../static/right.png" class="xiugaimz" @click="toxiugai('birthday')"></image>
				<view style="clear: both;"></view>
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
				userinfo:[{username:'undefined',nickname:'undefined',sex:'undefined',birthday:null}]
			}
		},
		methods: {
		getuserinfo(){
				const value = uni.getStorageSync('uni-id-pages-userInfo');
				this.userinfo = value
				uni.request({
					url: 'http://127.0.0.1:3001/getuserinfo',
					method: 'POST',
					data: {
						_id: this.userinfo._id
					},
					success: res => {
						//console.log(res)
						this.userinfo = res.data
						//console.log(this.userinfo)
						
						if (this.userinfo[0].username == 'undefined') {
							this.userinfo[0].username = '未设置'
						}
						if (this.userinfo[0].nickname == 'undefined') {
							this.userinfo[0].nickname = '未设置'
						}
						if (this.userinfo[0].sex == 'undefined') {
							this.userinfo[0].sex = '未设置'
						}
						if (this.userinfo[0].birthday == null) {
							this.userinfo[0].birthday = '未设置'
						}
					
							this.userinfo[0].birthday=new Date(this.userinfo[0].birthday).toLocaleDateString().replaceAll('/', '-')
						
					}
				})
			},
			toxiugai(type){
				if(type=='nickname'){
					// //console.log('nickname')
					uni.navigateTo({
						url:'/pages/nickname/nickname?id='+this.userinfo[0]._id
					})
				}
				if(type=='sex'){
					// //console.log('sex')
					uni.navigateTo({
						url:'/pages/sex/sex?id='+this.userinfo[0]._id
					})
				}
				if(type=='birthday'){
					// //console.log('birthday')
					uni.navigateTo({
						url:'/pages/birthday/birthday?id='+this.userinfo[0]._id
					})
				}
			}
			,
		
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			ghtx() {
				uni.chooseImage({ // 选择图片
					count: 1,
					success: (res) => { // 图片选择成功的回调（必传），会返回一个对象
						//console.log(res)
						this.userinfo[0].headSculpture = res.tempFilePaths[0]
						uniCloud.uploadFile({
							filePath: res.tempFiles[0].path,
							cloudPath: 'topic' + Math.floor(Math.random() * 1000) + '.png',
							success: res1 => {
								//console.log(res1)
								this.userinfo[0].headSculpture = res1.fileID
								//console.log(this.userinfo[0].headSculpture)
								uni.request({
									url: 'http://127.0.0.1:3001/updeteheadSculpture',
									method: 'POST',
									data: {
										_id: this.userinfo[0]._id,
										headSculpture: this.userinfo[0].headSculpture
									},
									success: res => {
										//console.log(res)
										this.userinfo = res.data
this.userinfo[0].birthday=new Date(this.userinfo[0].birthday).toLocaleDateString().replaceAll('/', '-')

									}
								})
							}
						})
					}
				})

			}
			

		},
		created() {
			//获取手机状态栏高度
			// #ifdef APP
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
			// #endif

		},
		onLoad(optoin) {
			uni.request({
				url: 'http://127.0.0.1:3001/getuserinfo',
				method: 'POST',
				data: {
					_id: optoin.id
				},
				success: res => {
					//console.log(res)
					this.userinfo = res.data
					//console.log(this.userinfo)
	
					if (this.userinfo[0].username == 'undefined') {
						this.userinfo[0].username = '未设置'
					}
					if (this.userinfo[0].nickname == 'undefined') {
						this.userinfo[0].nickname = '未设置'
					}
					if (this.userinfo[0].sex == 'undefined') {
						this.userinfo[0].sex = '未设置'
					}
					if (this.userinfo[0].birthday == null) {
						this.userinfo[0].birthday = '未设置'
					}
					
						this.userinfo[0].birthday=new Date(this.userinfo[0].birthday).toLocaleDateString().replaceAll('/', '-')
					
					//console.log(this.userinfo)

				}
			})
		},
		onShow() {
			
			
		this.getuserinfo()
		}
	}
</script>

<style>
	@import 'grxx.css';
</style>
