<template>
    <div id="movies">
        <!-- 正在热映 列表 -->
        <div class="list-hotMovies">
            <div class="list-top">
                <span class="list-top-title">影院热映</span>
                <span class="list-top-more" @click="moreHot">更多</span>
            </div>
            <div class="list-content">
                <list-view :List="HotMovies" :isMore="false"></list-view>
            </div>
        </div>
        <div class="list-freeMovies">
            <div class="list-top">
                <span class="list-top-title">免费在线观影</span>
                <span class="list-top-more" @click="moreFree">更多</span>
            </div>
            <div class="list-content">
                <list-view :List="FreeMovies" :isMore="false"></list-view>
            </div>
        </div>
        <div class="list-newMovies">
            <div class="list-top">
                <span class="list-top-title">新片速递</span>
                <span class="list-top-more" @click="moreNew">更多</span>
            </div>
            <div class="list-content">
                <list-view :List="NewMovies" :isMore="false"></list-view>
            </div>
        </div>
        <in-bottom :ListL="FindMoviesL" :ListR="FindMoviesR" :ListI="FindGood" :title="title"></in-bottom>
        <router-view></router-view>    
    </div>
</template>

<script>
    import { ListMixin } from '../../assets/js/mixins'
    const Count = 9

    export default {
        mixins: [ ListMixin ],
        data () {
            return {
                title: '发现好电影',
                FindMoviesL: ['经典','豆瓣高分','喜剧','悬疑','科幻','文艺','动画','欧美','日本'],
                FindMoviesR: ['冷门佳片','动作','爱情','恐怖','治愈','成长','华语','韩国','香港'],
                FindGood: ['同时入选IDMBTOP250和豆瓣Top250的电影','使用APP找电影功能','带你进入不正常的世界','科幻是未来的钥匙','女孩们的故事','2017终极期待']
            }
        },
        methods: {
            moreHot () {
                this.setIsMore(true)
                this.$router.push(
                    { path: '/moreHot'}
                )
            },
            moreFree () {
                this.setIsMore(true)
                this.$router.push(
                    { path: '/moreFree'}
                )
            },
            moreNew () {
                this.setIsMore(true)
                this.$router.push(
                    { path: '/moreNew'}
                )
            },
        },
        created () {
            this._getHotMovies()
            this._getFreeMovies()
            this._getNewMovies()
        },
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
        .list-freeMovies {
            @include listLine;
        }
        .list-newMovies {
            @include listLine;
        }
    }
</style>