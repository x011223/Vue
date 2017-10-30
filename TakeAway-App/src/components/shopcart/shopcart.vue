<template>
    <div class="shopcart">
        <!-- <router-link :to="{name:'cartList'}" class="cart-list"> -->
        <div class="cart-content" @click="toggleList">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight':totalCount>0}">
                        <img src="./购物车.png" class="icon-shopping_cart" width="44px" height="44px">
                    </div>
                    <div class="food-count" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="cart-price" :class="{'highlight':totalCount>0}">¥{{totalPrice}}</div>
                <div class="cart-desc">另需配送费¥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
                <div class="cart-count" :class="payClass">{{payDesc}}</div>
            </div>
        </div>
        <transition name="list-fade">
            <div class="shopcart-list" v-show="listshow">
                <div class="list-header">
                    <h1 class="list-title">购物车</h1>
                    <span class="list-empty">清空</span>
                </div>
                <div class="list-content">
                    <ul>
                        <li class="food-list" v-for="food in selectFoods">
                            <span class="name">{{food.name}}</span>
                            <div class="price">
                                <span class="">¥{{food.price*food.count}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <cartControl :food="food"></cartControl>
                            </div>
                        </li> 
                    </ul>
                </div>
            </div>
        </transition>
        <!-- </router-link>
        <router-view></router-view> -->
    </div>    
</template>
    
<style type="text/css" scoped>
    .shopcart {
        position: fixed;
        z-index: 50;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 48px;
        list-style: none;
    }
    .cart-content {
        display: flex;
        background: #474747;
        height: 100%;
        font-size: 0;
    }
    .content-left {
        flex: 1;
        color: rgba(255, 255, 255,0.4);
    }
    .logo-wrapper {
        background-color: #808080;
        display: inline-block;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        vertical-align: top;
        border-radius: 50%;
    }
    .food-count {
        position: absolute;
        top: 0;
        right: 0;
        width: 24px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        font-size: 9px;
        font-weight: 700;
        color: #fff;
        border-radius: 16px;
        background: rgb(240, 20, 20);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)

    }
    .logo {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        text-align: center;
    }
    .logo-wrapper>.highlight {
        background-color: #0080ff;
    }
    .icon-shopping_cart {
        line-height: 44px;
        font-size: 24px;       
    }
    .icon-shopping_cart .higherlight {
        color: #fff;
    }
    .cart-price {
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        line-height: 24px;
        font-size: 16px;
        font-weight: 700;
        padding-right: 12px;
        box-sizing: border-box;
        border-right: 1px solid rgba(255,255,255,0.1);
    }
    .content-left>.highlight {
        color: #fff;
    }
    .cart-desc {
        display: inline-block;
        vertical-align: top;  
        margin: 12px 0 0 12px;
        line-height: 24px;
        color: rgba(255 , 255, 255, 0.4);
        font-size: 12px;
    }
    .content-right {
        flex: 0 0 105px;
        width: 105px;
        color: rgba(225, 225, 225, 0.4);
    }
    .cart-count {
        width: 100%;
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        background-color: #2b333b;
    }
    .not-enough {
        background: #2b333b;
    }
    .enough {
        background: #00b43c;
        color: #fff;
    }
    .shopcart-list {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: -1;
    }
    .list-fade-enter-active {
        transition: 5.5s;
	}
	.list-fade-leave-active {
        transition: 5.5s;
	}
    .list-fade-enter, .list-fade-leave-to {
        transform: translate3d(0, -100%, 0);
    }
    .list-header {
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgb(7, 17, 27,0.1);
    }
    .list-title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27)
    }
    .list-empty {
        float: right;
        font-size: 14px;
        color: rgb(0, 160, 120)
    }
    .list-content {
        padding: 0 18px;
        height: 217px;
        overflow: hidden;
        background: #fff;
    }
    .cartcontrol-wrapper {
        position: relative;
        right: 6px;
        top: 0;
    }
    .price {
        position: relative;
        display: inline;
        left: 12px;
    }
</style>

<script>
    import cartControl from '../cartcontrol/cartcontrol.vue';
    export default {
        data () {
            return {
                'fold': false,
            }
        },
        components: {
            'cartControl': cartControl,
		},
        props: {
            selectFoods: {
                type: Array,
                default () {
                    return [];
                }
            },
            deliveryPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            }
        },
        computed: {
            listshow () {
                if (this.totalCount < 1) {
                    this.fold = false;
                    return;
                } else {
                    this.fold = true;
                }
            },
            totalPrice () {
                let countPrice = 0;
                this.selectFoods.forEach((food) => {
                    countPrice += food.price * food.count;
                });
                return countPrice;
            },
            totalCount () {
                let totalCount = 0;
                this.selectFoods.forEach((food) => {
                    totalCount += food.count;
                });
                return totalCount;
            },
            payDesc () {
                if (this.totalPrice === 0) {
                    return `¥${this.minPrice}元起送`;
                }
                else if (this.totalPrice < this.minPrice) {
                    let diff = this.minPrice - this.totalPrice;
                    return `还差¥${diff}元起送`;
                }
                else {
                    return '去结算';
                }
            },
            payClass () {
                if (this.totalPrice < this.minPrice) {
                    return 'not-enough';
                } else {
                    return 'enough';
                }
            },   
        },
        methods: {
            toggleList () {
                if (this.totalCount < 1) {
                    this.fold = false;
                    return;
                } else {
                    this.fold = true;
                }
            }
        }
    }
</script>