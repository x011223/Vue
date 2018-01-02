<template>
    <div id="main">
        <div class="main-nav">
            <span>
                <router-link class="main-nav-text" to="moreHot">影院热映</router-link>
            </span>
            <span>
                <router-link class="main-nav-text" to="moreHot">豆瓣日历</router-link> 
            </span>
            <span> 
                <router-link class="main-nav-text" to="moreHot">豆瓣时间</router-link>
            </span>
            <span>
                <router-link class="main-nav-text" to="moreHot">使用豆瓣APP</router-link>
            </span>
        </div>
        <div class="main-recommend">
            <li v-for="(item, index) in listRecommend" class="list-item">
                <div class="list-item-above">
                    <div class="above-text">
                        <h2 v-html="item.title" class="item-title"></h2>
                        <p v-html="item.target.desc" class="item-desc"></p>
                    </div>
                    <img :class="item.target.cover_url ? 'aboveImg' : ''" :src="item.target.cover_url" alt="">
                </div>
                <div class="list-item-bottom">
                    <span v-html="'by ' + item.target.author.name" class="item-authorname"></span>
                    <span v-html="item.source_cn" class="item-source"></span>
                </div>             
            </li>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import { getRecommend } from '../../api/main'

    const Count = 99

    export default {
        data () {
            return {
                listRecommend: [],
            }
        },
        methods: {
            _getRecommend () {
                getRecommend(Count).then((res) => {
                    this.listRecommend = res.recommend_feeds
                })
            }
        },
        created () {
            this._getRecommend()
        }
    };
</script>

<style lang="scss" scoped>
    @import '../../assets/sass/style';
    @import '../../assets/sass/mixins';
    @mixin Span {
        width: 90%;
        text-align: center;
        margin: 1.67rem auto 0;
        span {             
            float: left;
            width: 50%;
            padding: 3px;
            box-sizing: border-box;
            font-size: 15px;
            .main-nav-text {
                padding: 1rem;
                color: $color-main-text;
                background-color: $background-color-text;
                text-decoration: none;
                display: block;
                text-align: center;
                line-height: $font-size-x;
                padding: .75rem .25rem;
                border-radius: .25rem;
                max-width: 100%;
                @include TextFlow;
            }
        }
    }
    #main {
        width: 100%;
        .main-nav {
            @include Span;          
        }
        .main-recommend {
            position: absolute;
            top: 13rem;
            left: 0;
            right: 0;
            width: 100%;
            list-style: none;
            .list-item {
                margin: 0 1rem 1.67rem;
                overflow: hidden;
                padding-bottom: 1rem;
                border-bottom: 1px solid #dbdbdb;
                .list-item-above {
                    display: flex;
                    padding-bottom: 1rem;
                    .aboveImg {
                        width: 5.7rem;
                        height: 5.7rem;
                        // padding-left: .63rem;
                    }
                    .above-text {
                        flex: 1;
                        width: 75%; 
                        $color-text: #aaa;
                        .item-title {
                            display: block;
                            text-align: justify;
                            padding-bottom: 1rem;
                            color: $color-text;
                            width: 92%;
                            font: {
                                size: $font-size-f;
                                weight: $font-weight-s;
                            }
                            line-height: 1.5;                  
                            text-align: justify;
                            color: #494949;
                        }
                        .item-desc {
                            display: block;
                            height: 3.3rem;
                            width: 92%;
                            font: {
                                size: $font-size-s;
                                weight: $font-weight-m;
                            }
                            -webkit-line-clamp: 3;
                            -webkit-box-orient: vertical;
                            line-height: 1.5;
                            text-align: justify;
                            color: $color-text;
                            font-size: 12px;
                            line-height: 1.5;
                            display: -webkit-box;
                            overflow: hidden;
                        }
                    }
                }
                .list-item-bottom {
                    display: flex;
                    .item-authorname {
                        flex: 1;
                        font: {
                            size: $font-size-s;
                            weight: $font-weight-m;
                        }
                    }
                    .item-source {
                        font: {
                            size: $font-size-s;
                            weight: $font-weight-m;
                        }
                    }
                }
            }
        }
    }
</style>