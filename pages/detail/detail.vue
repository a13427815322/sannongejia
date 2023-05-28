<template>
	<view class="navBarBox">
		<view class="navBar">
			<uni-nav-bar left-icon="back" @click-left="back()" class="navtitle" title="社区正文" />
		</view>
	</view>
	<view class="maxbox">
		<view class="bodybox">
			<view class="vf" v-for="(item,index) in data" :key="index">
				<view class="user" style="width:100%;">
					<image class="userimg" :src="item.headSculpture"></image>
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
				<view class="source" v-for="(item,index) in item.imgurls" v-if="item.imgurls">
					<image class="imgurls" :src="item.fileID" mode="aspectFit"></image>
				</view>
				<view class="sourcevideo" v-for="(item,index) in item.videourls" v-if="item.videourls">
					<view class="videobox">
						<video object-fit="contain" :src="item.fileID"></video>
					</view>
				</view>
				<view class="" style="clear: both;"></view>
				<view class="clickbox">
					<view class="text">
						<image src="../../static/Comment.png"></image>
						<view class="svgtext">
							{{item.comdata.length}}
						</view>
					</view>

					<view class="text">
						<image src="../../static/like.png" @click="dianzan(item.id)" v-if="this.likestatus == 0">
						</image>
						<image src="../../static/Likefill.png" @click="dianzan(item.id)"
							v-else-if="this.likestatus == 1"></image>
						<view class="svgtext">
							{{item.likecount}}
						</view>
					</view>
				</view>
				<view class="" style="clear: both; ">
				</view>

			</view>
		</view>
	</view>

	<view class="combox" style="background-color: #FFFFFF;">
		<view class="comcard" v-for="(item,index) in data" :key="index">
			<!-- 循环 -->
			<view class="plbox" v-for="(item,index) in item.comdata">
				<view class="comer" style="width:100%;">
					<image class="userimg" :src="item.comimg" ></image>
					<view class="username">
						{{item.comname}}
					</view>
				</view>
				<view class="plcom">
					{{item.usercom}}
				</view>
				<view class="time">
					{{item.comtime}}
				</view>
			</view>
		</view>
	</view>
	<view style="height: 50px;"></view>
	<view class="com1box" >
		<input type="text" class="textarea" @input="pl" placeholder="说一说你的想法吧~" placeholder-style="margin-left:10px;">
		<view @click='sure' class="planniu">评论</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				com: '',
				id: 1,
				length: 1,
				comname: '',
				comimg: '',
				comtime:'',
				data: [],
				temp: [],
				temp1: {},
				userinfo: {
					headSculpture: ""
				},
				userinfolen: 0,
				rules: {
					usercom: {
						rules: [{
							required: true,
							errorMessage: '发布内容不能为空',
						}]
					},
				}
			}
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
							//console.log(this.userinfo[0].nickname)
						}
					})
				}

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
						this.requestNewsDetail()
					}
				})
				// //console.log(res)
				// this.requesttopic()
			},
			pl(e) {
				this.comname =this.userinfo[0].nickname
				this.comimg = this.userinfo[0].headSculpture
				this.comtime = new Date
				this.com = e.detail.value
				//console.log(this.com)
			},
			sure() {
				if(this.com.length!=0){
				this.temp.push({
					usercom: this.com,
					comname: this.comname,
					comtime: this.comtime,
					comimg: this.comimg
				})
				}
				if(this.temp.length==this.data[0].comdata.length){
					uni.showToast({
						title:'评论为空',
						icon:'error'
					})
					
				}else{
					
					this.update()
					}
				
			},
			async update() {
				//console.log(this.temp)
				//console.log(this.data[0].comdata)
				
				{
					const res = await uni.request({
						url: 'http://127.0.0.1:3001/update',
						method: 'POST',
						data: {
							id: this.id,
							comdata: this.temp
						}
					})
					this.requestNewsDetail()
				}
			},

			formatDateTime(date) {
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				var h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				var minute = date.getMinutes();
				minute = minute < 10 ? ('0' + minute) : minute;
				var second = date.getSeconds();
				second = second < 10 ? ('0' + second) : second;
				return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
			},
			async requestNewsDetail() {
				const res = await uni.request({
					url: 'http://127.0.0.1:3001/detail',
					method: 'POST',
					data: {
						id: this.id
					}
				})
				res.data.forEach(item => {
					item.imgurls = JSON.parse(item.imgurls)
					item.videourls = JSON.parse(item.videourls)
					if (item.comdata != null) {
						item.comdata = JSON.parse(item.comdata)
						for( var i in item.comdata){
							item.comdata[i].comtime=new Date(item.comdata[i].comtime).toLocaleDateString()
						}
					} else {
						item.comdata = []
					}
					this.likestatus = item.likestatus;
				})
				// //console.log(res.data)
				res.data[0].creattime = new Date(res.data[0].creattime).toLocaleDateString()
				this.data = res.data;
				//console.log(this.likestatus)
				for( var i in res.data[0].comdata){
					this.temp[i] = res.data[0].comdata[i];
				}
				
				if (this.temp == null) {
					this.temp = []
				}
				//console.log(this.temp)
			},
			load(e) {
				this.id = e
				//console.log(this.id)
				this.requestNewsDetail()
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		onLoad(options) {
			//console.log(options);
			this.id = options.id;
			this.load(options.id)
			this.getuserinfo()
		},

	}
</script>

<style>
	@import 'detail.css';
</style>
