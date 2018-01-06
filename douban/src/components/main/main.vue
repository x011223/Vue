<template>
    <div id="main" ref="Main" @touchstart.prevent="touchstart" @touchmove.prevent="touchenter" @touchend="touchleave">
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
        <div class="main-recommend" ref="Recommend">
            <li v-for="(item, index) in RecommendFeed" class="list-item" ref="Item">
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
        <div class="recommend-before" v-if="moreFlag">
            <div class="recommend-date">
                <span v-html="this.listDate"></span>
            </div>
            <li v-for="(item, index) in this.ArrayRecommend" class="list-item">
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
    import { ListMixin } from '../../assets/js/mixins'
    import { getRecommendBefore } from '../../api/main'

    export default {
        mixins: [ ListMixin ],
        data () {
            return {
                moreFlag: false,
                recommendBefore: [],
                arrayRecommend: [],
                list: [],
                deltaY: 0,
                listDate: [],
            }
        },
        methods: {
            touchstart (e) {
                this.touch.initiated = true
                const touch = e.touches[0]
                this.touch.startY = touch.pageY
            },
            touchenter (e) {
                if (!this.touch.initiated) {
                    return
                }
                const touch = e.touches[0]
                this.deltaY = touch.pageY - this.touch.startY    
                // let recommendBottom = window.getComputedStyle(this.$refs.Recommend, ":last-child").bottom 
                //                   + window.getComputedStyle(this.$refs.Recommend, ":last-child").top
                // console.log(window.getComputedStyle(this.$refs.Recommend, ":last-child").bottom)
            },
            touchleave (e) {      
                if (this.deltaY < -180) {
                    clearTimeout(timer)
                    let timer = setTimeout(() => {
                        getRecommendBefore(this.recommendDate).then((res) => {
                            this.recommendBefore = res.recommend_feeds
                            this.getRecommendBefore(this.recommendBefore)
                            this.arrayRecommend = this.arrayRecommend.concat(this.RecommendBefore)
                            this.recommendDate = res.date
                            this.listDate.push(this.recommendDate)
                            console.log(this.recommendDate) 
                            console.log(this.listDate)
                            this.setRecommendDate(this.recommendDate)
                            this.getArrayRecommend(this.arrayRecommend)                               
                            return
                        })   
                        // return                       
                    }, 1000)
                    // return
                } else {
                    return
                }  
                this.moreFlag = true      
                this.touch.initiated = false        
            }
        },
        created () {
            this._getRecommend()   
            this.touch = {}
        },
    };
</script>

<style lang="scss" scoped>
    @import '../../assets/sass/style';
    @import '../../assets/sass/mixins';
    @mixin Span {
        text-align: center;
        margin: 1.67rem 1rem;
        overflow: hidden;
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
    @mixin RecommendItem {
        .list-item {
                margin: 0 1rem 1.67rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid #dbdbdb;
                .list-item-above {
                    display: flex;
                    padding-bottom: 1rem;
                    .aboveImg {
                        width: 5.7rem;
                        height: 5.7rem;
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
    #main {
        width: 100%;
        .main-nav {
            @include Span;          
        }
        .main-recommend {
            // margin-top: 1rem;
            list-style: none;
            @include RecommendItem;
        }
        .recommend-before {
            .recommend-date {
                margin-top: -.5rem;
                padding-bottom: 1rem;
                text-align: center;
                border-bottom: $border-browsing;
            }
            list-style: none;
            @include RecommendItem;
            .list-item {
                margin-top: 1rem;
            }
        }
    }
</style>