<template>
    <div id="app">
        <div id="main-tab">
            <router-link to="miste" class="main-tab iconfont">
                <i class="icon-miste"></i>
                <span class="icon-text">外卖</span> 
            </router-link>
            <router-link to="discover" class="main-tab iconfont">
                <i class="icon-discover"></i>
                <span class="icon-text">发现</span>
            </router-link>
            <router-link to="order" class="main-tab iconfont">
                <i class="icon-order"></i>
                <span class="icon-text">订单</span>
            </router-link>
            <router-link to="profile" class="main-tab iconfont">
                <i class="icon-profile"></i>
                <span class="icon-text">我的</span>
            </router-link>
            <!-- <router-link to="login" class="main-tab iconfont">
                <i class="icon-miste"></i>
                <span class="icon-text">我的</span>
            </router-link> -->
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
    
</template>

<script>
    export default {
        name: 'app',
        components: {

        },
        methods: {
        }
    }
</script>

<style lang="scss">
    @import './assets/scss/color';
    @import './assets/scss/mixin';
    * {
        margin: 0;
        padding: 0;
        background: $background-color-order;
    }
    #app {
        #main-tab {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            height: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-top: 1px solid #b6b6b6;
            background: $color-text-title;
            .main-tab {
                flex: 1;
                text-align: center;
                text-decoration: none;
                color: $color-text-theme;
                background: $color-text-title;
                @include I;
                .icon-miste, .icon-discover, .icon-order, .icon-profile {
                    display: block;
                    background: $color-text-title;
                }
                .icon-text {
                    font-size: 0.75rem;
                    background: $color-text-title;
                }
            }
            .router-link-active {
                color: $background-color-theme;
            }
        }        
    }
</style>
