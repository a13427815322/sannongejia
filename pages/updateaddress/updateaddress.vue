<template>
	<view class="navBarBox">
		<!-- 状态栏占位 -->
		<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
		<!-- 真正的导航栏内容 -->
		<uni-nav-bar dark :fixed="true" background-color="#ffffff" status-bar left-icon="left" left-text=""
			color="black" title="修改收货地址" @clickLeft="back" />
	</view>
	<view class="" style="width: 100%;">
		<view class="itembox" style="width: 95%;margin: auto;">
			<uni-section title="修改收货地址" type="line">
				<uni-forms ref="form" :modelValue="addressdata">
					<uni-forms-item label="收货人" name="sjr" >
						<uni-easyinput v-model="addressdata.sjr" :placeholder="this.data.sjr" />
					</uni-forms-item>
					<uni-forms-item label="手机号码" name="phone" >
						<uni-easyinput v-model="addressdata.phone" :placeholder="this.data.phone" />
					</uni-forms-item>
					<uni-forms-item label="收货地址" name="useraddress" >
						<uni-easyinput v-model="addressdata.useraddress" :placeholder="this.data.useraddress" />
					</uni-forms-item>
					<view class="" style=" border-radius: 22px;background-color: #24AC6B;height:44px;text-align: center;" @click="submitFrom('form')"> <view class="" style="font-size: 22px; letter-spacing: 10px;padding: 6px;color: #ffffff;">提交</view></view>
				</uni-forms>
			</uni-section>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				data:[],
				addressdata:{
					sjr:'',
					phone:'',
					useraddress:''
				},
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
					url: 'http://127.0.0.1:3001/updateadddetail',
					method: 'POST',
					data: {
						id: this.id
					},
				})
				this.data = res.data[0]
				console.log(this.data)
			},
			submitFrom(ref) {
				this.$refs[ref].validate().then(res => {
					this.addressdata = res
					console.log(this.addressdata)
					if(this.addressdata.sjr == ''){
						this.addressdata.sjr = this.data.sjr
					}
					if(this.addressdata.phone == ''){
						this.addressdata.phone = this.data.phone
					}
					if(this.addressdata.useraddress == ''){
						this.addressdata.useraddress = this.data.useraddress
					}
					uni.showToast({
						title:"修改中~",
						icon:'loading'
					})
					setTimeout(() => {
						this.updateaddress()
						uni.navigateBack({delta: 1})
					}, 1000)
				}).catch(err => {
					console.log(err)
				})
			},
			async updateaddress(){
				uni.request({
					url: 'http://127.0.0.1:3001/updateaddress',
					method: 'POST',
					data: {
						id: this.data.id,
						sjr: this.addressdata.sjr,
						phone:this.addressdata.phone,
						useraddress:this.addressdata.useraddress
					}
				})
			}
		},
		onLoad(e) {
			this.id = e.id
			console.log(this.id)
			this.requestaddress()
		}
	}
</script>

<style>
</style>
