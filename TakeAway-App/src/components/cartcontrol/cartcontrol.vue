<template>
  <div class="cart-control">
      <transition name="dec-fade">
        <div class="cart-decrease" v-show="food.count>0" @click="decCart">
            <img class="cartcontrol-icon" src="./减少.png">
        </div>
      </transition>
      <div class="cart-count"></div>
      <div class="cart-add" @click="addCart">
          <img src="./添加.png">
      </div>
  </div>
</template>

<script>
    import Vue from 'vue';
    export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addCart () {
                if (!this.food.count) {
                    Vue.set(this.food,'count',1)
                } else {
                    this.food.count++;
                }
            },
            decCart () {
                if (!this.food.count) {
                    Vue.set(this.food,'count',1)
                } else {
                    this.food.count--;
                }
            }
        }
    }
</script>

<style>
    .cart-control {
        font-size: 0;
        width: 70px;
    }
    .cart-decrease, .cart-add {
        display: inline-block;
    }
    .cart-count {
        display: inline-block;
        width: 10px;
        height: 10px;
        background-color: #8080ff;
    }
    .cart-decrease {
        display: inline-block;
        position: absolute;
        right: 32px;
    }
    .cart-add {
        display: inline-block;
        position: absolute;
        right: 0;
        /* top: -32px; */
    }
    .dec-fade-enter-active {
		transition: all 0.4s ease-in-out;
	}
	.dec-fade-leave-active {
		transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
	}
	.dec-fade-enter, .dec-fade-leave-to {
	/* .slide-fade-leave-active for below version 2.1.8 */ 
	transform: translateX(10px);
	opacity: 0;
	}
</style>


