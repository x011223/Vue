<template>
    <div id="profile">
        <div class="profile-top">
            <img class="profile-icon" @click="back" src="../../assets/img/back.svg">
            <span class="profile-title">我的</span>         
        </div>
        <div class="profile-middle">
            <div class="profile-login iconfont" @click="logIn">
                <i class="icon-login"></i>
                <div class="login-content">
                    <div class="desc">
                        <span class="profile-login-title">登录/注册</span>
                        <span class="profile-login-text">登录后享受更多特权</span>
                    </div>
                    <img class="login-to" src="../../assets/img/back.svg" alt="">
                </div>
            </div>
            <div class="profile-huodong iconfont">
                <div class="youhui">
                    <i class="icon-count"></i>
                    <span class="profile-middle-text">优惠</span>
                </div>
                <div class="jinbi">
                    <i class="icon-gold"></i>
                    <span class="profile-middle-text">金币</span>
                </div>   
            </div>
            
        </div>
        <div class="profile-bottom">
            <div class="bottom-add iconfont">
                <i class="icon-address"></i>
                <span>我的地址</span>
                <img src="../../assets/img/back.svg">
            </div>
            <div class="bottom-add iconfont">
                <i class="icon-gold"></i>
                <span>金币商城</span>
                <img src="../../assets/img/back.svg">
                <i class="icon-count"></i>
                <span>分享拿5元现金</span>
                <img src="../../assets/img/back.svg">
            </div>
            <div class="bottom-add iconfont">
                <i class="icon-kefu"></i>
                <span>我的客服</span>
                <img src="../../assets/img/back.svg">
                <i class="icon-logo"></i>
                <span>下载饿了么APP</span>
                <img src="../../assets/img/back.svg">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            back () {
                this.$router.back()
            },
            logIn () {
                this.$router.push('login')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/color';
    @import '../../assets/scss/font';
    @import '../../assets/scss/style';
    @import '../../assets/scss/mixin';
    #profile {
        @include I;
        white-space: nowrap;
        background: $color-text-title;
        .profile-top {        
            text-align: center;
            height: 2.5rem;
            background: $background-color-theme;
            .profile-icon {
                position: absolute;
                top: 0.4rem;
                left: .6rem;
                width: 1.75rem;
                height: 1.75rem;
                background: $background-color-theme;
            }
            .profile-title {
                display: inline-block;
                margin-top: .6rem;
                font: {
                    size: 1rem;
                    weight: 700;
                }
                color: $color-text-title;
                background: $background-color-theme;
            }     
        }
        .profile-middle {
            .profile-login {
                @include Center;
                flex-direction: row;
                color: $color-text-title;
                background: $background-color-theme;
                .icon-login {
                    font-size: 5rem;
                    display: inline-block;
                    margin-left: .6rem;
                    background: $background-color-theme;
                }
                .login-content {
                    display: inline-block;
                    position: absolute;
                    top: 3.75rem;
                    left: 6rem;
                    background: $background-color-theme;
                    .desc {
                        @include Center;
                        .profile-login-title {
                            font: {
                                size: 1rem;
                                weight: $font-weight-a;
                            }
                            background: $background-color-theme;
                        }
                        .profile-login-text {
                            font-size: .75rem;
                            background: $background-color-theme;
                        }
                    }
                    .login-to {
                        position: absolute;
                        top: .4rem;
                        right: -5rem;
                        width: 2rem;
                        height: 2rem;
                        transform: rotate(180deg);
                        background: $background-color-theme;
                    }
                }

            }
        }
        .profile-huodong {
            display: flex;
            font-size: 2rem;
            height: 7rem;
            background: $color-text-title;
            .youhui, .jinbi {
                @include Center;
                flex: 1;
                justify-content: center;
                background: $color-text-title;
            }
            .profile-middle-text {
                color: $color-text-theme;
                font-size: 1rem;
                background: $color-text-title;
            }
            .youhui {
                border-right: 1px solid #e9e9e9;
                .icon-count {
                    color: #ff8000;
                    background: $color-text-title;
                }
            }
            .jinbi {
                .icon-gold {
                    color: gold;
                    background: $color-text-title;
                }
            }
        }
    }
</style>
