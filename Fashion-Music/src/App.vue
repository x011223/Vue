<template>
    <div id="app">
        <my-header></my-header>
        <div class="main-tab">
            <router-link to="/recommend">推荐</router-link>
            <router-link to="/singer">歌手</router-link>
            <router-link to="/rank">推荐</router-link>
            <router-link to="/search">推荐</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import MyHeader from './components/header/myheader';

    export default {
        name: 'app',
        components: {
            MyHeader,
        },
    }
</script>

<style>
    * {
      margin: 0;
      padding: 0;
    }
</style>
