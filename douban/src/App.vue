<template>
    <div id="app">
        <header-nav></header-nav>
        <p @click="showLogTip">登录</p>
        <!-- <log-tip v-show="TipFlag"></log-tip> -->
        <router-view></router-view>
    </div>   
</template>

<script>
    import LogTip from '@/base/logtip/logtip'
    import HeaderNav from '@/components/headernav/headernav'
    export default {
        name: 'app',
        data () {
            return {
                TipFlag: false,
            }
        },
        components: {
            HeaderNav,
            LogTip,
        },
        methods: {
            showLogTip () {
                this.TipFlag = true
            }
        }
    }
</script>

<style lang="scss">
    * {
        padding: 0;
        margin: 0;
    }
</style>
