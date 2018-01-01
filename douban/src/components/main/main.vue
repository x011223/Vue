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
            <li v-for="(item, index) in listRecommend">
                <h2 v-html="item.title"></h2>
                <p v-html="item.target.desc"></p>
                <span v-html="'by ' + item.target.author.name"></span>
                <span v-html="item.source_cn"></span>
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
                    console.log(this.listRecommend)
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
        .main-nav {
            @include Span;          
        }
        .main-recommend {
            list-style: none;
        }
    }
</style>