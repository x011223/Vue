<template>
    <transition name="food-fade">    
        <div v-show="showFlag" class="food" ref="food">
            <!-- ref,超过当前高度时，子节点滚动。 -->
            <div class="food-content">
                <div class="image-header">
                    <img class="img-header" :src="selectedFood.image">
                    <div class="food-back" @click="foodBack">
                        <img class="back" src="./返回.png">
                    </div>                          
                </div>                  
                <div class="content">
                    <h1 class="title">{{selectedFood.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{selectedFood.sellCount}}</span>
                        <span class="rating">好评率:{{selectedFood.rating}}%</span>
                    </div>
                    <div class="food-price">
                        <span class="now-price">¥{{selectedFood.price}}</span>
                        <span class="old-price" v-show="selectedFood.oldPrice">¥{{food.oldPrice}}</span>
                    </div>
                </div>
                <div class="cartcontrol-wrapper">
                    <cartControl :food="food"></cartControl>
                </div>
                <transition name="buy-fade">
                    <div class="buy" v-show = "!food.count || food.count === 0" @click="addFirst">
                        加入购物车
                    </div>
                </transition>
            </div>
        </div>
    </transition>
</template>

<script>
    import betterScroll from 'better-scroll';
    import Vue from 'vue'
    import cartControl from '../cartcontrol/cartcontrol.vue';
    export default {
        components: {
            'cartControl': cartControl
        },
        props: {
            food: {
                type: Object
            },
            selectedFood: {
                type: Object
            }
        },
        data () {
            return {
                showFlag: false,             
            }
        },
        methods: {
            show () {
                this.showFlag = true;
                this.$nextTick(() => {
                    // 判断组件是否show,防止多次show
                    if (!this.scroll) {
                        this.scroll = new betterScroll(this.$refs.food, {
                            //滚动,当页面内容超过页面高度
                            click: true,
                        });
                    } else {
                        this.scroll.refresh();
                    }
                })
            },
            foodBack () {
                //food 组件回退。
                this.showFlag = false;
            },
            addFirst (event) {
                if (!event._constructed) {
                    returnl;
                }
                Vue.set(this.food,'count',1);
            }
        }
    }
</script>

<style scoped>
    .food {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 48px;
        z-index: 30;
        width: 100%;
        background: #fff;
    }
    .food-fade-enter-active {
        transition: all .3s;
    }
    .food-fade-leave-active {
        transition: all 1s;
    }
    .food-fade-enter, .food-fade-leave-to {
        transform: translate3d(100%, 0, 0);
    }
    .image-header {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        /* 与宽度一样 */
    }
    .img-header {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .food-back {
        position: absolute;
        left: 0;
        top: 10px;
    }
    .back {
        display: block;
        padding: 10px;
        font-size: 20px;
        color: #fff;
    }
    .content {
        padding: 18px;
    }
    .title {
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(7,17,27);
    }
    .detail {
        position: relative;
        color: rgb(7,17,27);
        background-color: #fff;
        margin-bottom: 18px;
        line-height: 10px;
        font-size: 0;
        height: 10px;
    }
    .sell-count, .rating {
        font-size: 10px;
        color: rgb(147,153,159);
    }
    .sell-count {
        margin-right: 12px;
    }
    .price {
        font-weight: 700;
        line-height: 24px;
    }
    .now-price {
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240, 20, 20);
    }
    .old-price {
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    .cartcontrol-wrapper {
        position: relative;
        right: 36px;
        bottom: 48px;
    }
    .buy {
        position: absolute;
        right: 18px;
        bottom: 18px;
        z-index: 500;
        height: 32px;
        line-height: 32px;
        padding: 0 12px;
        box-sizing: border-box;
        border-radius: 12px;
        font-size: 10px;
        color: #fff;
        background: rgb(0, 160, 220);
    }
    .buy-fade-enter-active {
        transition: all .5s ease-out;
    }
    .buy-fade-leave-active {
        transition: all .3s;
    }
    .buy-fade-enter, .buy-fade-leave-to {
        transform: translateX(10px);
        opacity: 0.4;
    }
</style>


