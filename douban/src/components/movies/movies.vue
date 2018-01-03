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
        <div class="instersts">
            <p class="instersts-title">发现好电影</p>
            <div class="instersts-btn">
                <a href=""><span>同时入选IDMBTOP250和豆瓣Top250的电影</span></a>
                <a href=""><span>使用APP找电影功能</span></a>
                <a href=""><span>带你进入不正常的世界</span></a>
                <a href=""><span>科幻是未来的钥匙</span></a>
                <a href=""><span>女孩们的故事</span></a>
                <a href=""><span>2017终极期待</span></a>
            </div>
        </div>
        <div class="browsing">
            <p class="browsing-title">分类浏览</p>
            <div class="browsing-btn">
                <div class="btn-left">             
                    <a href=""><span>经典</span></a>               
                    <a href=""><span>豆瓣高分</span></a>           
                    <a href=""><span>喜剧</span></a>            
                    <a href=""><span>悬疑</span></a>        
                    <a href=""><span>科幻</span></a>           
                    <a href=""><span>文艺</span></a>               
                    <a href=""><span>动画</span></a>               
                    <a href=""><span>欧美</span></a>               
                    <a href=""><span>日本</span></a>
                </div>
                <div class="btn-right">
                    <a href=""><span>冷门佳片</span></a>
                    <a href=""><span>动作</span></a>
                    <a href=""><span>爱情</span></a>
                    <a href=""><span>恐怖</span></a>
                    <a href=""><span>治愈</span></a>
                    <a href=""><span>成长</span></a>
                    <a href=""><span>华语</span></a>
                    <a href=""><span>韩国</span></a>
                </div>
            </div>
        </div>
        <router-view></router-view>    
    </div>
</template>

<script>
    import { ListMixin } from '../../assets/js/mixins'

    const Count = 9

    export default {
        mixins: [ ListMixin ],
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
            }
        },
        created () {
            this._getHotMovies()
            this._getFreeMovies()
            this._getNewMovies()
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/sass/style';
    @import '../../assets/sass/mixins';
    @mixin MovA {
        a {
            text-decoration: none;
            display: inline-block;
            padding: .53rem 1rem;
            margin-bottom: .33rem;
            // width: $width;
            border: 1px solid #00bdbd;
            // border-radius: 7px;
        }
    }
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
        .instersts {
            margin-left: 1rem;
            overflow: hidden;
            height: 100%;
            .instersts-title {
                display: block;
                margin-bottom: 1rem;
            }
            .instersts-btn {
                width: 200%;
                height: 100%;                
                a {
                    border-radius: 7px;
                }
                @include MovA;
            }
        }
        .browsing {
            $border-browsing: 1px solid #cacaca;
            margin-left: 1rem;
            overflow: hidden;
            .browsing-title {
                display: block;
                margin-bottom: 1rem;
            }
            .browsing-btn {
                display: flex;
                width: 100%;
                margin: 0;
                padding: 0;
                @mixin BtnA {
                    a {
                        border: none;
                        color: $color-theme;
                        width: 100%;
                        border-bottom: $border-browsing;
                    }  
                }
                .btn-left {
                    flex: 1;
                    border-right: $border-browsing;
                    @include MovA;
                    @include BtnA;       
                }
                .btn-right {
                    flex: 1;
                    @include MovA;
                    @include BtnA;
                    a {
                        span {
                            display: block;
                        }
                    }
                }
            }
        }
    }
</style>