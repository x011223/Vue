<template>
    <div id="books">
        <div class="list-fiction">
            <div class="list-top">
                <h2 class="list-top-title">最受关注图书 | 虚构类</h2>
                <span class="list-top-more" @click="moreFiction">更多</span>
            </div>
            <list-view :List="FictionBooks" :isMore="false"></list-view>
        </div>
        <div class="list-unfiction">
            <div class="list-top">
                <h2 class="list-top-title">最受关注图书 | 虚构类</h2>
                <span class="list-top-more" @click="moreUnFiction">更多</span>
            </div>
            <list-view :List="UnFictionBooks" :isMore="false"></list-view>
        </div>
        <div class="book-store">
            <div class="list-top">
                <h2 class="list-top-title">豆瓣书店</h2>
                <span class="list-top-more">更多</span>
            </div>     
            <div class="store-header">
                <!-- <img v-lazy="storeHead.cover.url" alt="" class="header-img"> -->               
                <img v-lazy="'https://img1.doubanio.com/view/freyr_page_photo/raw/public/2337.jpg'" alt="" class="header-img">
                <div class="header-text">
                    <div class="text-above">
                        <span v-html="storeHeader.title" class="above-title"></span>
                        <span v-html="'￥' + storeHeader.price" class="above-price"></span>
                    </div>
                    <span v-html="storeHeader.info" class="text-bottom"></span>
                </div>
            </div>
            <div class="store-list">
                <li v-for="(item, index) in listBookStore" class="list-item">
                    <img v-lazy="listBookStore[index].cover.url" alt="" class="item-img">
                    <span v-html="listBookStore[index].title" class="item-title"></span>
                    <span v-html="'￥' + listBookStore[index].price" class="item-price"></span>
                </li>
            </div>
        </div>
        <in-bottom :ListL="FindBooksL" :ListR="FindBooksR" :ListI="FindGood" :title="title"></in-bottom>
    </div>
</template>

<script>
    import { ListMixin } from '../../assets/js/mixins'
    import {asdd} from '../../api/books'
    export default {
        mixins: [ ListMixin ],
        data () {
            return {
                title: '发现好图书',
                FindBooksL: ['小说','历史','青春','随笔','推理','奇幻'],
                FindBooksR: ['爱情','外国文学','励志','传记','旅行','经管'],
                FindGood: ['小波看书','村上春树周边','我凭名字认定了你','不可饶恕的女人们','爱欲书','他们还写侦探小说','人生识字始忧患','诗歌书店']
            }
        },
        methods: {
            moreFiction () {
                this.setIsMore(true)
                this.$router.push(
                    { path: '/moreFiction' }
                )
            },
            moreUnFiction () {
                this.setIsMore(true)
                this.$router.push(
                    { path: '/moreUnFiction'}
                )
            },         
        },
        created () {
            this._getFiction()
            this._getUnFiction()
            this._getBookStore()
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/sass/style';
    @import '../../assets/sass/mixins';
    @mixin H2 {
        h2 {
            font: {
                size: 1rem;
                weight: 300;
            }
        }   
    }
    #books {
        position: fixed;
        top: 3rem;
        left: 0;
        right: 0; 
        .list-fiction {
            @include H2;
            @include listLine;
        }
        .list-unfiction {
            @include H2;
            @include listLine;
        }
        .book-store {         
            @include listLine;
            .store-header {
                margin: .75rem;
                display: flex;
                .header-img {
                    flex: 1;
                    width: 6.7rem;
                    height: 8.1rem;
                    margin-right: 1rem;
                }
                .header-text {
                    .text-above {
                        .above-title {
                            display: inline-block;
                            flex: 1;
                            width: 70%;
                            height: 2rem;
                            line-height: 2rem;
                            margin: auto;
                            padding-right: 1rem;
                            @include TextFlow;
                        }
                        .above-price {
                            display: inline-block;
                            height: 2rem;
                            line-height: 2rem;
                            color: #E76648;
                            @include TextFlow;
                        }
                    }
                    .text-bottom {
                        @include FontStore;
                    }
                }
            }
            .store-list {
                list-style: none;
                display: flex;              
                overflow: hidden;
                margin-left: 1rem;
                .list-item {
                    flex: 1;
                    text-align: center;                 
                    .item-img {
                        width: 100px;
                        height: 142px;
                    }   
                    .item-title {
                        display: block;
                        width: 5.7rem;
                        font: {
                            size: $font-size-f;
                            weight: $font-weight-s;
                        }
                        @include TextFlow;
                    }
                    .item-price {
                        @include FontStore;
                    }
                }
            }
        }
    }
</style>