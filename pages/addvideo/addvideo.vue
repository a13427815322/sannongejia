<template>
	<view class="navBarBox">
		<!-- 状态栏占位 -->
		<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
		<!-- 真正的导航栏内容 -->
		<view class="navBar">
			<uni-nav-bar left-icon="back" @click-left="back()" class="navtitle" title="发布问题" right-text="发布"
				@clickRight="submitFrom('form')" />
		</view>
	</view>
	<view>
		<uni-section title="发布问题" type="line">
			<uni-forms ref="form" :modelValue="formData" :rules="rules">
				<uni-forms-item name="content">
					<uni-easyinput class="textarea" type="textarea" v-model="formData.content"
						placeholder="来说一说你的想法吧" />
				</uni-forms-item>
				<view class="">
					<uni-forms-item style="background-color: #ffffff;" name='video'>
						<uni-file-picker v-model='formData.video' limit="9" file-mediatype="video" :auto-upload='true'>
						</uni-file-picker>
					</uni-forms-item>
				</view>
				<uni-forms-item name="address"  v-model="formData.address">
					<view style="border-bottom: 1px solid rgba(0, 0, 0, 0.05); width: 92%;margin: auto;" class="">
					</view>
				<view class="address">
					<view class="address1">
						<image @click="address" style="float: left;" src="../../static/localtion.png" mode="">
						</image>
						<view id="mr">
							广州软件学院
						</view>
						<view id="uchange">
							{{this.formData.address}}
						</view>
						<image class="img" src="../../static/right.png" mode="" @click="qr"></image>
						<uni-easyinput @input="local" id="dz" v-model="formData.address" type="text"
							placeholder="请输入地址" />
						<view style="clear: both;" class="">
						</view>
					</view>
				</view>
				</uni-forms-item>
			</uni-forms>
		</uni-section>
	</view>

	<!-- tnBbNKKdZ0iibzK0HuvCkcmYanobC02Y -->
</template>

<script>
	export default {
		data() {
			return {
				username: '测试号',
				createtime: "",
				userinfo: {
					headSculpture: ""
				},
				formData: {
					content: "",
					imgs: [],
					address: '广州软件学院',
				},
				rules: {
					content: {
						rules: [{
							required: true,
							errorMessage: '发布内容不能为空',
						}]
					},
					address: {
						rules: [{
							require: true,
							errorMessage: '地址不能为空',
						}]
					},
					video: {
						rules: [{
							required: true,
							errorMessage: '发布内容不能为空',
						}]
					}
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
			address() {
				document.getElementById('dz').style.display = "flex"
				document.getElementById('mr').style.display = "none"
			},
			local(e) {
				this.formData.address = e
			},
			qr() {
				document.getElementById('dz').style.display = "none"
				document.getElementById('uchange').style.display = "flex"
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
			submitFrom(ref) {
				const createtime = new Date()
				this.createtime = this.formatDateTime(createtime)
				// //console.log(this.createtime)
				this.$refs[ref].validate().then(res => {
					this.formData = res
					//console.log(res)

					setTimeout(() => {
						// //console.log(this.formDatavideo.length)

						this.addtopic()
					})
					uni.navigateBack({
						delta: 1
					})
				}).catch(err => {
					//console.log(err)
				})
			},
			async addtopic() {
				uni.request({
					url: 'http://127.0.0.1:3001/addvideo',
					method: 'POST',
					data: {
						likecount: 0,
						likestatus: 0,
						_id: this.userinfo[0]._id,
						nickname: this.userinfo[0].nickname,
						headSculpture: this.userinfo[0].headSculpture,
						content: this.formData.content,
						video: this.formData.video,
						address: this.formData.address
					}
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		onLoad() {
			this.getuserinfo()
		},
		onShow() {
			this.getuserinfo()
		}

	}
</script>
<style>
	@import "addvideo.css";
</style>
