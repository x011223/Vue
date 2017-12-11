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
            <div class="bottom-dizhi iconfont">
                <i class="icon-address"></i>
                <span>我的地址</span>
                <i class="icon-to"></i>
            </div>
            <div class="bottom-huodong iconfont">
                <div class="huodong1">
                    <i class="icon-gold"></i>
                    <span>金币商城</span>
                    <i class="icon-to"></i>
                </div>
                <div class="huodong2">
                    <i class="icon-count"></i>
                    <span>分享拿5元现金</span>
                    <i class="icon-to"></i>
                </div>
            </div>
            <div class="bottom-fuwu iconfont">
                <div class="fuwu1">
                    <i class="icon-kefu"></i>
                    <span>我的客服</span>
                    <i class="icon-to"></i>
                </div>
                <div class="fuwu2">
                    <i class="icon-logo"></i>
                    <span><a href="https://h5.faas.ele.me/download/">下载饿了么APP</a></span>
                    <i class="icon-to"></i>
                </div>
            </div>
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
                isOrder: false,
                title: "推荐有奖",
            }
        },
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
        .profile-bottom {
            @mixin lineAuto {
                @include iconTo;
                position: relative;
                margin-top: 1rem;
                background: $color-text-title;
            }
            span {
                font: {
                    size: 1rem;
                    weight: $font-weight-h;
                }
                color: $color-text-theme;
                background: $color-text-title;
                a {
                    text-decoration: none;
                    color: $color-text-theme;
                    background: $color-text-title;
                }
            }
            .iconfont {
                font-size: 1.25rem;
                padding-left: 1rem;
            }
            .bottom-dizhi {
                @include lineAuto;
                height: 2.5rem;
                line-height: 2.5rem;
                .icon-address {
                    color: $background-color-theme;
                    background: $color-text-title;
                }              
            }
            .bottom-huodong {
                @include lineAuto;
                .huodong1, .huodong2 {
                    background: $color-text-title;
                    height: 2.5rem;
                    line-height: 2.5rem;
                }
                .huodong1 {
                    .icon-gold {
                        color: gold;
                        background: $color-text-title;
                    }
                }
                .huodong2 {
                    .icon-count {
                        color: #ff8000;
                        background: $color-text-title;
                    }
                }
            }
            .bottom-fuwu {
                @include lineAuto;
                .fuwu1, .fuwu2 {
                    @include iconTo;
                    background: $color-text-title;
                    height: 2.5rem;
                    line-height: 2.5rem;
                }
                .fuwu1 {
                    .icon-kefu {
                        color: $background-color-theme;
                        background: $color-text-title;
                    }
                }
                .fuwu2 {
                    .icon-logo {
                        color: $background-color-theme;
                        background: $color-text-title;
                    }
                }
            }
        }
    }
</style>
