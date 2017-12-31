<template>
    <div id="movies">
        <!-- 正在热映 列表 -->
        <div class="list-hotMovies">
            <div class="list-top">
                <span class="list-top-title">影院热映</span>
                <router-link class="list-top-more" to="moreHot">更多</router-link>
            </div>
            <div class="list-content">
                <list-view :List="HotMovies" :isMovie="true" :isMore="false"></list-view>
            </div>
        </div>
        <!-- 即将上映 列表 -->
        <div class="list-comingMovies">
            <div class="list-top">
                <span class="list-top-title">即将上映</span>
                <router-link class="list-top-more" to="moreComing">更多</router-link>
            </div>
            <div class="list-content">
                <list-view :List="ComingSoonMovies" :isMovie="true"></list-view>
            </div>
        </div>
        <!-- 口碑榜 列表 -->
        <div class="list-Top250">
            <div class="list-top">
                <span class="list-top-title">口碑榜</span>
                <router-link class="list-top-more" to="moreTop">更多</router-link>
            </div>
            <div class="list-content">
                <list-view :List="Top250" :isMovie="true"></list-view>
            </div>
        </div>
        <div class="instersts">
            <p>发现好电影</p>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import ListView from '../../base/listview/listview'
    import { getHoteMovies, getFreeStream, getComingSoon, getTop250 } from '../../api/movie'

    const Count = 9

    export default {
        components: {
            ListView
        },
        data () {
            return {
                // 影院热映
                HotMovies: [],
                // 免费在线观影
                FreeOnlineMovies: [],
                ComingSoonMovies: [],
                Top250: [],
            }
        },
        methods: {
            //  获得 影院热映 列表
            _getHotMovies () {
                getHoteMovies(Count).then((res) => {       
                    this.HotMovies = res.subjects   
                })
            },
            // 获得 即将上映 列表
            _getComingSoon () {
                getComingSoon(Count).then((res) => {
                    this.ComingSoonMovies = res.subjects
                })
            },
            // 获得口碑榜 列表
            _getTop250 () {
                getTop250(Count).then((res) => {
                    this.Top250 = res.subjects
                })
            },
        },
        created () {
            this._getHotMovies()
            this._getComingSoon()
            this._getTop250()
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/sass/style';
    @import '../../assets/sass/mixins';
    #movies {
        position: relative;
        top: 1rem;
        left: 0;
        right: 0;  
        .list-hotMovies {
            @include listLine;
        }
        .list-comingMovies {
            @include listLine;
        }
        .list-Top250 {
            @include listLine;
        }
    }
</style>