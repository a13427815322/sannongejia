<template>

		<!-- list.vue -->
		<ul class="main">
		  <li class="item" v-for="(item in commonityList)" :key="item.id">
		    <span @click="addToShopCart($event, item)">点击添加</span>
		  </li>
		</ul>

</template>

<script>
	// list.vue
	export default {
	  methods: {
	    addToShopCart (event, item) {
	      // 通知后台，回调成功后执行下面的函数
	      this.$emit('add-to-cart', event.target)
	    }
	  }
	}
</script>

<style>

</style>
