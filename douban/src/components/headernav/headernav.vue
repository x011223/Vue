<template>
    <div id="headerNav">
        <div class="headertab">
            <router-link class="tabItem itemMain" to="main">豆瓣</router-link>
            <div class="itemDetail">
                <router-link class="tabItem movies" to="movies" style="color: #2384E8;">电影</router-link>
                <router-link class="tabItem books" to="books" style="color: #9F7860;">图书</router-link>
                <router-link class="tabItem broadcast" to="broadcast" style="color: #E4A813;">广播</router-link>
                <router-link class="tabItem groups" to="groups" style="color: #2AB8CC;">小组</router-link>       
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
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
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        border-bottom: 1px solid rgba(7, 17, 27, 0.5);
        .headertab {
            display: flex;
            color: $color-theme;
            @include tabItem;
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
            }
            .movies {
                color: $color-movie;
            }
        }
    }
</style>


