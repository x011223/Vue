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
    * {
      margin: 0;
      padding: 0;
    }
    /* .main-tab {
        background: rgba(7, 17, 27, 0.1);
        text-align: center;
        color: #0080ff;
    }
    .tab-item {       
        display: inline-block;
        text-decoration: none;
        height: 32px;
        width: 20%;
        line-height: 32px;
        font-size: 14px;       
    }
    .router-link-active {
        color: #F24C4C;
        border-bottom: 6px solid #008080;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
    }
    .tab-item:last-child {
        right: 12px;
    } */
    $act-color: #F90;
    .main-tab {
        display: flex;
        height: 44px;
        line-height: 44px;
        font-size: 14px;
    }
    .tab-item {
        flex: 1;
        text-align: center;
        text-decoration: none;
    }
    .router-link-active {
        // color: #F24C4C;
        color: $act-color;
        border-bottom: 6px solid #008080;
        border-radius: 4px;
    }
</style>
