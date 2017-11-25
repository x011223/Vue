<template>
    <div id="app">
        <my-header></my-header>
        <div class="main-tab">
            <router-link  class="tab-item" to="/recommend">推荐</router-link>
            <router-link  class="tab-item" to="/singer">歌手</router-link>
            <router-link  class="tab-item" to="/user">Mine</router-link>
            <router-link  class="tab-item" to="/rank">排行</router-link>
            <router-link  class="tab-item" to="/search">搜索</router-link>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <player></player>
    </div>
</template>

<script>
    import MyHeader from './components/header/myheader'
    import Player from './components/player/player'

    export default {
        name: 'app',
        components: {
            MyHeader,
            Player,
        },
    }
</script>

<style lang="scss">
    @import './sass/style.scss';
    @import './sass/mixin.scss';
    * {
      margin: 0;
      padding: 0;
    }
    .main-tab {
        display: flex;
        height: 44px;
        line-height: 44px;
        font-size: 16px;
        .tab-item {
            flex: 1;
            color: $color-text-title;
            text-align: center;
            text-decoration: none;
        }
        @include routerLinkActive;
    }   
</style>
