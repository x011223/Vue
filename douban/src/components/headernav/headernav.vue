<template>
    <div id="headerNav">
        <div class="headertab">
            <router-link class="tabItem itemMain" to="main">豆瓣</router-link>
            <div class="itemDetail">
                <router-link class="tabItem movies" to="movies" style="color: #2384E8;">电影</router-link>
                <router-link class="tabItem books" to="books" style="color: #9F7860;">图书</router-link>
                <router-link class="tabItem broadcast" to="broadcast" style="color: #E4A813;">广播</router-link>
                <router-link class="tabItem groups" to="groups" style="color: #2AB8CC;">小组</router-link>  
                <div class="jump-seacrh">
                    <span @click="toSearch">搜索</span>
                </div>
            </div>
        </div>
        <div class="search" v-show="showSearchFlag">
            <div class="close-wrapper">
                <span class="close-text" @click="close">关闭</span>
                <input placeholder="在豆瓣中搜索" class="close-box" type="search">
            </div>
            <div class="suggest-wrapper">
                <div class="suggest-search" v-for="(item, index) in suggest">
                    <div class="style-wrapper">
                        <span v-html="item[0]" :style="{color: item[2]}" class="t"></span>
                        <span v-html="item[1]" class="b"></span>
                    </div>     
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
    export default {
        data () {
            return {
                suggest: [
                    ['电影', '影院热映', 'rgb(35, 132, 232)'],
                    ['电视', '正在热播', 'rgb(122, 106, 219)'],
                    ['图书', '畅销排行', 'rgb(159, 120, 96)'],
                    ['同城', '周末活动', 'rgb(230, 70, 126)'],
                    ['小组', '志趣相投', 'rgb(42, 184, 104)'],
                    ['音乐', '新碟榜', 'rgb(244, 143, 46)'],
                    ['阅读', '电子书', 'rgb(159, 120, 96)'],
                    ['游戏', '虚拟世界', 'rgb(87, 116, 197)'],
                    ['应用', '玩手机', 'rgb(89, 108, 221)'],
                    ['广播', '友邻动态', 'rgb(225, 100, 77)'],
                    ['FM', '红心歌单', 'rgb(64, 207, 169)'],
                    ['市集', '购买原创', 'rgb(66, 189, 86)'],
                ],
                showSearchFlag: false,
            }
        },
        methods: {
            toSearch () {
                this.showSearchFlag = true
            },
            close () {
                this.showSearchFlag = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/sass/style';
    @mixin tabItem {  
        .tabItem {
            height: $height-headernav;
            line-height: $height-headernav;
            font-size: 16px;
            text-decoration: none;
            color: $color-theme;
        }
    }
    $height-headernav: 3rem;
    #headerNav {
        position: relative;        
        width: 100%;
        border-bottom: 1px solid rgba(7, 17, 27, 0.5);
        z-index: 20;
        .headertab {
            display: flex;
            color: $color-theme;
            @include tabItem;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            overflow: hidden;
            background: #fff;
            .itemMain {
                font: {
                    size: $font-size-X;
                    weight: $font-weight-x;
                }
                margin: {
                    left: 1rem;
                    right: 3.3rem;
                }
            }
            .itemDetail {
                flex: 1;   
                @include tabItem;
                .tabItem {
                    padding: 0 .53rem;    
                }
                .jump-seacrh {
                    position: absolute;
                    top: .89rem;
                    // left: 0;
                    left: 5rem;
                }
            }
            .movies {
                color: $color-movie;
            }
        }
        .search {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 50rem;
            background-color: #fff;
            z-index: 50;
            .close-wrapper {
                display: flex;
                align-items: center;
                margin: 1rem 1rem;
                color: $color-theme;
                padding-bottom: 1rem;
                border-bottom: 1px solid #999;
                .close-text {
                    display: inline-block;
                }
                .close-box {
                    display: inline-block;
                    width: 82%;
                    height: 1.67rem;
                    margin-left: 1rem;
                }
            }
            .suggest-wrapper {
                margin-top: 1rem;
                .suggest-search {
                    display: inline-block;
                    width: 33.33%;
                    .style-wrapper {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        margin-bottom: 1rem;
                        .t {
                            font: {
                                size: 2rem;
                                weight: $font-weight-s;
                            }
                        }
                        .b {
                           font: {
                                size: $font-size-f;
                                weight: $font-weight-m;
                            } 
                            color: #999;
                        }
                    }
                }
            }
        }
    }
</style>


