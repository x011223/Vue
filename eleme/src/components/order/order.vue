<template>
    <div id="order">
        <div class="order-header">
            <img class="order-header-back" @click="back" src="../../assets/img/back.svg">
            <span class="order-header-title" :title="title"></span>
        </div>
        <div class="order-content">
            <img class="order-content-img" src="//fuss10.elemecdn.com/f/18/9fb04779371b5b162b41032baf5f3gif.gif">
            <h3 class="order-content-title" v-show="isOrder">请登录后查看外卖订单</h3>
            <h3 class="order-content-title" v-show="!isOrder">你还没登录哦</h3>
            <h5 v-show="!isOrder">登录后邀请好友可活动奖励</h5>
            <router-link to="login" class="order-content-login">
                <span class="order-content-login-text">立即登录</span>
            </router-link>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                isOrder: true,
                title: '我的'
            }
        },
        methods: {
            back () {
                this.$router.back()
            },
            logIn () {
                this.$router.push('login')
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/color';
    @import '../../assets/scss/font';
    @import '../../assets/scss/style';
    #order {
        background: $background-color-order;
        .order-header { 
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 2.5rem;
            align-items: center;
            justify-content: center;
            background: $background-color-theme;    
            .order-header-back {
                position: absolute;
                top: 0;
                left: 0.5rem;
                width: 1.5rem;
                height: 1.5rem;
                margin-top: 0.5rem;
                background: $background-color-theme;    
            }
            .order-header-title {
                flex: 1;
                position: absolute;
                top: 0;
                left: 45%;
                max-width: 50%;
                font: {
                    weight: $font-weight-b;
                    size: 1.2rem;
                }
                margin-top: 0.5rem;
                color: $color-text-title;
                background: $background-color-theme;
            }
        }
        .order-content {
            position: fixed;
            top: 20%;
            left: 0;
            right: 0;
            text-align: center;
            margin: auto;
            .order-content-img {
                width: 13.3rem;
                height: 13.3rem;
            }
            .order-content-title {
                color: #6a6a6a;
                font: {
                    size: 1rem;
                    weight: $font-weight-s;
                }
            }
            .order-content-login {
                display: inline-block;
                width: 7rem;
                height: 2rem;
                min-width: 5.5rem;
                padding: 0.27rem;
                margin-top: 0.5rem;
                border: none;
                font-family: inherit;
                text-decoration: none;
                color: $color-text-title;
                background: $background-color-login;
                .order-content-login-text {
                    display: block;
                    margin-top: .4rem;
                    background: $background-color-login;
                }
            }
        }
    }
</style>
