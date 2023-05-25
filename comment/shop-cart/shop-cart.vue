<template>
<!-- shop-cart.vue -->
<div class="shop-cart">
  <div class="cart">车</div>
  <shop-cart-balls ref="ball"></shop-cart-balls>
</div>
</template>

<script>
// shop-cart.vue
@import ShopCartBalls from "shop-cart-balls.vue" 
export default {
  methods: {
    drop (target) {
      this.$refs.ball.drop(target)
    }
  }
}
</script>

<style>

</style>
