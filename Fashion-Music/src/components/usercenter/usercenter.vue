<template>
    <transition name="userFade">
       <div class="usercenter">
            <div class="user-back" @click="userBack">
                <img src="./back.svg" width="24" height="24">
            </div>
            <div class="user-switch">
                <p class="switch-fav">我的最爱</p>
                <p class="switch-play">曾经鉴赏</p>
            </div>
            <div class="user-play iconfont">
                <i class="icon-bofang"></i>
                <span class="random-play">随机播放全部</span>
            </div>
            <div class="user-list"></div>
        </div>
    </transition>
</template>

<script>
    export default {
        methods: {
            userBack () {
                this.$router.back()
            }
        }
    }
</script>

<style scoped>
    @import '../player/play-icon_font/iconfont.css';
    .userFade-enter-active, .userFade-leave-active {
        transition: all 0.1s ease-in
    }
    .userFade-enter, .userFade-leave-to {
        transform: translateX(100%)
    }
    .usercenter {
        position: fixed;
        width: 100%;
        top: 0;
        bottom: 0;
        text-align: center;
        z-index: 500;
        background: #408080;
    }
    .user-back {
        position: absolute;
        top: 0.9rem;
        left: 0.7rem;
    }
    .user-switch {
        display: flex;
    }
    .switch-fav, .switch-play {
        position: absolute;
        top: 1rem;
    }
    .switch-fav {
        flex: 1;       
        left: 7rem;
    }
    .switch-play {
        right: 7rem;
    }
    .user-play {
        position: absolute;
        top: 80px;
        left: 5rem;
        border: 1px solid #ff0000;
        border-radius: 16px;
        padding: 4px 12px;
        margin: 4px auto;
        width: 180px;
    }
    .icon-bofang {
        font-size: 18px;
    }
    .random-play {
        font-size: 18px;
    }
    .user-list {

    }
    
</style>
