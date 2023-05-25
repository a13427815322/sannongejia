<script>
	import uniIdPageInit from '@/uni_modules/uni-id-pages/init.js';
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">

 /*#ifdef H5 */
checkbox .uni-checkbox-input{
	border-radius:50% ;
	background-color: #f5f5f5;
}

checkbox .uni-checkbox-input.uni-checkbox-input-checked{
	border: 1px solid #ff4500;
	background-color: #ff4500;
	color: #ff4500 !important;
}
checkbox .uni-checkbox-input .uni-checkbox-input-checked:before{
	font-size: 18px;

}
/* #endif */
/* #ifdef APP-PLUS || MP-WEIXIN */
.checkbox .uni-checkbox-input{
	border-radius:50% ;
}
checkbox .wx-checkbox-input.wxcheckbox-input-checked{	
	border: 1px solid #ff4500;
	background-color: #ff4500;
	color: #fff !important;}
checkbox .wx-checkbox-input.wxcheckbox-input-checked::before{
	font-size: 18px;
}

/* #endif */

	
</style>
