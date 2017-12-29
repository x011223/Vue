<template>
    <div id="movies">
        <!-- 正在热映 列表 -->
        <div class="list-hotMovies">
            <div class="list-top">
                <span class="list-top-title">影院热映</span>
                <span class="list-top-more">更多</span>
            </div>
            <div class="list-content">
                <list-view :List="HotMovies" :isMovie="true"></list-view>
            </div>
        </div>
        <!-- 即将上映 列表 -->
        <div class="list-comingMovies">
            <div class="list-top">
                <span class="list-top-title">即将上映</span>
                <span class="list-top-more">更多</span>
            </div>
            <div class="list-content">
                <list-view :List="ComingSoonMovies" :isMovie="true"></list-view>
            </div>
        </div>
        <!-- 口碑榜 列表 -->
        <div class="list-Top250">
            <div class="list-top">
                <span class="list-top-title">口碑榜</span>
                <span class="list-top-more">更多</span>
            </div>
            <div class="list-content">
                <list-view :List="Top250" :isMovie="true"></list-view>
            </div>
        </div>
        <!-- <div class="instersts">
            <p>发现好电影</p>
        </div> -->
    </div>
</template>

<script>
    import ListView from '../../base/listview/listview'
    import { getHoteMovies, getFreeStream, getComingSoon, getTop250 } from '../../api/movie'
    import { getquanxian } from '../../api/quanxian'

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
                getHoteMovies().then((res) => {       
                    this.HotMovies = res.subjects   
                })
            },
            // 获得 即将上映 列表
            _getComingSoon () {
                getComingSoon().then((res) => {
                    this.ComingSoonMovies = res.subjects
                    console.log(this.ComingSoonMovies)
                })
            },
            // 获得口碑榜 列表
            _getTop250 () {
                getTop250().then((res) => {
                    this.Top250 = res.subjects
                    console.log(this.Top250)
                })
            }
        },
        created () {
            this._getHotMovies()
            // this._getquanxian()
            // this._getFreeStream()
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
            @include A;
            // .list-content {
            //     overflow: hidden;
            // }
        }
        .list-comingMovies {
            @include A;
            // .list-content {
            //     overflow: hidden;
            // }
        }
        .list-Top250 {
            @include A;
        }
    }
</style>