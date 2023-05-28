<template>
	<view class="navBarBox">
		<!-- 状态栏占位 -->
		<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
		<!-- 真正的导航栏内容 -->
		<uni-nav-bar dark :fixed="true" background-color="#ffffff" status-bar left-icon="left" left-text=""
			color="black" title="更改性别" @clickLeft="back" />
	</view>
	<uni-forms :modelValue="userinfo">
		<uni-forms-item label="性别" name="sex" class="sexcheckbox-box">
			<view>
				<uni-data-checkbox v-model="userinfo[0].sex" :localdata="sexs" />
			</view>
		</uni-forms-item>
		<view @click="xgnickname" class="qrxg">确认修改</view>
	</uni-forms>




</template>

<script>
	export default {
		data() {
			return {
				// 状态栏高度
				statusBarHeight: 0,
				// 导航栏高度
				navBarHeight: 82 + 11,
				userinfo: [{
					sex: ''
				}],
				sexs: [{
						text: '男',
						value: '男'
					},
					{
						text: '女',
						value: '女'
					},
					{
						text: '保密',
						value: '保密'
					}
				],

			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			xgnickname() {
				console.log(this.userinfo[0].sex)
				uni.request({
					url: 'http://127.0.0.1:3001/updatesex',
					method: 'POST',
					data: {
						_id: this.userinfo[0]._id,
						sex: this.userinfo[0].sex
					},
					success: res => {
						console.log(res)
						this.userinfo = res.data
						console.log(this.userinfo)
						
					}
				})
				setTimeout(()=>{
					uni.showToast({
						title:'修改成功',
						icon:'success'
					})
					uni.navigateBack({
						delta:1
					})
				},500)
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
					console.log(res)
					this.userinfo = res.data
					console.log(this.userinfo)
					if (this.userinfo[0].sex == 'undefined') {
						this.userinfo[0].sex = ''
					}
				}
			})
		}
	}
</script>

<style>
	.xingxiinput {
		width: 85%;
		margin: 10% auto;
		background-color: #f5f5f5;
		height: 40px;
		line-height: 40px;
		padding-left: 5%;
		border-radius: 4px;

	}

	.qrxg {
		width: 90%;
		position: fixed;
		left: 5%;
		background-color: #24AC6B;
		height: 40px;
		line-height: 40px;
		text-align: center;
		border-radius: 4px;
		color: #ffffff;
		bottom: 5%;
		max-width: 648px;
	}

	.sexcheckbox-box {
		width: 80%;
		margin: 0 auto;
	}

	.sexcheckbox-box view {
		margin-top: 6px;

	}
</style>
