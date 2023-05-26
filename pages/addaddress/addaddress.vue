<template>
	<view class="navBarBox">
		<!-- 状态栏占位 -->
		<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
		<!-- 真正的导航栏内容 -->
		<uni-nav-bar dark :fixed="true" background-color="#ffffff" status-bar left-icon="left" left-text=""
			color="black" title="新增收货地址" @clickLeft="back" />
	</view>
	<view class="" style="width: 100%;">
		<view class="itembox" style="width: 95%;margin: auto;">
			<uni-section title="添加收货地址" type="line">
				<uni-forms ref="form" :modelValue="addressdata" :rules="rules">
					<uni-forms-item label="收货人" name="sjr" required>
						<uni-easyinput v-model="addressdata.sjr" placeholder="名字" />
					</uni-forms-item>
					<uni-forms-item label="手机号码" name="phone" required>
						<uni-easyinput v-model="addressdata.phone" placeholder="手机号" />
					</uni-forms-item>
					<uni-forms-item label="收货地址" name="useradd" required>
						<uni-easyinput v-model="addressdata.useradd" placeholder="省 市 区 街道" />
					</uni-forms-item>

					<view class="" style=" border-radius: 22px;background-color: #24AC6B;height:44px;text-align: center;"@click="submitFrom('form')">
						<view class="" style="font-size: 22px; letter-spacing: 10px;padding: 6px;color: #ffffff;">提交
						</view>
					</view>
				</uni-forms>
			</uni-section>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
				addressdata: {
					sjr: '',
					phone: '',
					useradd: ''
				},
				rules: {
					sjr: {
						rules: [{
							required: true,
							errorMessage: '收货人名字不能为空',
						}]
					},
					phone: {
						rules: [{

							required: true,
							errorMessage: '联系方式不能为空',

						}]
					},
					useradd: {
						rules: [{

							required: true,
							errorMessage: '收货人地址不能为空',

						}]
					}
				}
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			async requestaddress() {
				const res = await uni.request({
					url: 'http://127.0.0.1:3001/addressdetail',
					method: 'POST',
					data: {
						_id: this._id
					},
				})
				this.data = res.data
				console.log(this.data)
			},
			submitFrom(ref) {
				this.$refs[ref].validate().then(res => {
					this.addressdata = res
					console.log(this.addressdata)
					uni.showToast({
						title: "添加中~",
						icon: 'loading'
					})
					setTimeout(() => {
						this.addaddress()
						uni.navigateBack({
							delta: 1
						})
					}, 1000)
				}).catch(err => {
					console.log(err)
				})
			},
			async addaddress() {
				uni.request({
					url: 'http://127.0.0.1:3001/addaddress',
					method: 'POST',
					data: {
						_id: this.data[0]._id,
						sjr: this.addressdata.sjr,
						phone: this.addressdata.phone,
						useraddress: this.addressdata.useradd
					}
				})
			}
		},
		onLoad(e) {
			this._id = e._id
			console.log(this._id)
			this.requestaddress()
		}
	}
</script>

<style>
	/* @import 'addaddress.css'; */
</style>
