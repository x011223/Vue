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
                    <div class="cartcontrol-wrapper">
                        <cartControl :food="food"></cartControl>
                    </div>
                    <transition name="buy-fade">
                        <div class="buy" v-show = "!food.count || food.count === 0" @click.stop.prevent="addFirst">
                            加入购物车
                        </div>
                    </transition>
                </div>   
                <!-- 分隔栏 Split组件 -->
                <Split v-show="selectedFood.info"></Split>
                <div class="info" v-show="selectedFood.info">
                    <h1 class="info-title">商品信息</h1>
                    <p class="info-text">{{selectedFood.info}}</p>
                </div>
                <Split></Split>
                <div class="rating-wrapper">
                    <h1 class="rating-title">商品评价</h1>
                    <ratingSelect class="rating-select" :ratings="food.ratings" :only-content="onlyContent" :select-type="selectType" :desc="desc"></ratingSelect>
                </div>
            </div>                                                      
        </div>
    </transition>
</template>

<script>
    import betterScroll from 'better-scroll';
    import Vue from 'vue';
    import cartControl from '../cartcontrol/cartcontrol.vue';
    import Split from '../split/split.vue';
    import ratingSelect from '../ratingselect/ratingselect.vue';

    const All = 0;
    const Positive = 1;
    const Negative = 2; 

    export default {
        components: {
            'cartControl': cartControl,
            'Split': Split,
            'ratingSelect': ratingSelect,
        },
        props: {
            food: {
                type: Object
            },
            selectedFood: {
                type: Object
            },
        },
        data () {
            return {
                showFlag: false,
                selectType: All,
                onlyContent: false,
                desc: {
                    all: '全部',
                    positive: '满意',
                    negative: '吐槽'
                },                          
           }          
        },
        methods: {
            show () {
                this.showFlag = true;
                this.selectType = All;
                this.onlyContent = true;
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
                //添加到购物车置 1
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
        position: relative;
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
        position: absolute;
        right: -150px;
        bottom: 42px;
    }
    .buy {
        position: absolute;
        right: -162px;
        bottom: 12px;
        z-index: 10;
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
    .info {
        padding: 18px;
        position: relative;
    }
    .info-title {
        line-height: 14px;
        font-size: 14px;
        margin-bottom: 6px;
        color: rgb(7, 17, 27);
    }
    .info-text {
        padding: 0 4px;
        line-height: 24px;
        font-size: 12px;
        color: rgb(77, 85, 93);
    }
    .rating-wrapper {
        padding-top: 18px;
        margin-left: 18px;
    }
    .rating-title {
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }
</style>


