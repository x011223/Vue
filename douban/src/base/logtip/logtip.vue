<template>
    <div id="logIn" @click.stop="back">
        <transition name="LogTip">
            <div class="login">
                <h1 class="login-title">继续操作需要登录豆瓣账号</h1>
                <button class="login-btn">
                    <span>登录</span>
                </button>
                <button class="login-openapp">
                    <span>打开APP</span>
                </button>
                <h4 class="zhuce">注册豆瓣账号</h4>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props: {
            TipFlag: false,
        },
        methods: {
            back () {
                this.TipFlag = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/sass/style';
    .LogTip-enter-active, 
    .LogTip-leave-active {
        transition: all .5s ease-in;
    }
    .LogTip-enter,
    .LogTip-leave-to {
        transform: translate3d(0, 100%, 0);
    }
    #logIn {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 3;
        text-align: center;
        background-color: rgba(7, 17, 27, 0.5);
        .login {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 50%;
            width: 92%;
            margin: 0 auto;
            background-color: #ffffff;
            .login-title {
                font: {
                    size: $font-size-b;
                    weight: $font-weight-b;
                }
            }
        }
    }
</style>
