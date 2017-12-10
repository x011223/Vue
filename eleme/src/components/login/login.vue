<template>
    <div id="login">
        <div class="login-top iconfont">
            <i class="icon-miste">饿了么</i>
            <span class="icon-desc">Make Everything 30'</span>
        </div>
        <div class="login-middle">
            <span class="login-middle-message" @click="showMsg" :class="this.showMessage ? 'active': ''">短信登录</span>
            <span class="login-middle-password" @click="showPass" :class="this.showPassword ? 'active' : ''">密码登录</span>
        </div>
        <div class="login-message" v-show="showMessage">
            <input type="number" placeholder="手机号" v-model="phoneNumber">
            <span class="yanzhengma">获取验证码</span>
            <input type="number" placeholder="验证码" :class="getVerification">
            <p class="login-tip">温馨提示: 未注册饿了么账号的手机号，登录时将自动注册，且代表您已同意<a href="https://h5.ele.me/service/agreement/">《用户服务协议》</a></p>
            <input type="button" value="登录" class="login-btn" @click="logIn">
            <router-link to="about" class="about">关于我们</router-link>
        </div>
        <div class="login-password" v-show="showPassword">
            <input type="text" placeholder="手机/邮箱/用户名">
            <input type="password" placeholder="密码">
            <input type="button" value="登录" class="login-btn" @click="logIn">
            <router-link to="about" class="about">关于我们</router-link>
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
                showPassword: false,
                showMessage: true,
                phoneNumber: '',
            }
        },
        methods: {
            showMsg () {
                this.showPassword = false
                this.showMessage = true
                console.log(typeof parseInt(this.phoneNumber))
            },
            showPass () {
                this.showPassword = true
                this.showMessage = false
            },
            // 判断手机号输入长度是否正确
            getVerification () {
                if ((typeof this.phoneNumber) !== Number && this.phoneNumber.length > 11) {
                    console.log(typeof this.phoneNumber)
                    return 'getVerification' 
                } else {
                    alert('请输入正确的手机号')
                }
            },
            // 登录操作
            logIn () {

            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/color';
    @import '../../assets/scss/mixin';
    @import '../../assets/scss/font';
    #login {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 5;
        background: $color-text-title;
        .login-top {
            @include I;
            @include Center;
            width: 80%;
            position: absolute;
            left: 10%;
            right: 10%;
            margin-top: 2.5rem;
            color: $background-color-theme;
            .icon-miste { 
                font: {
                    size: 2.3rem;
                    weight: $font-weight-s;
                }
                background: $color-text-title;
            }
            .icon-desc {
                font-weight: $font-weight-s;
                background: $color-text-title;
            }   
        }
        .login-middle {
            display: flex;
            text-align: center;
            position: absolute;
            left: 20%;
            right: 20%;
            top: 10rem;  
            .login-middle-message {
                flex: 1;
                background: $color-text-title;
            }
            .login-middle-password {
                flex: 1;
                background: $color-text-title;
            }
            .active {
                padding-bottom: 0.3rem;
                font-weight: $font-weight-b;
                color: $background-color-theme;
                border-bottom: 2px solid $background-color-theme;
            }
        }
        .login-message, .login-password {
            @include Center;
            position: absolute;
            top: 35%;
            left: 10%;
            right: 10%;
            background: $color-text-title;
            border: none; 
            .login-btn {
                background: $background-color-login;
            }  
            .about {
                color: #999;
                background: $color-text-title;
                text-decoration: none;
                font: {
                    size: 1rem;
                    weight: $font-weight-s;
                }
            }        
        }
        .login-message {
            .yanzhengma {
                position: absolute;
                top: .75rem;
                right: .75rem;
                font: {
                    size: .8rem;
                    weight: $font-weight-s;
                }
            }
            .getVerification {
                color: $background-color-theme;
            } 
            .login-tip {
                font-size: .85rem;
                padding-bottom: 1rem;
                color: #999;
                background: $color-text-title;                
                a {
                    color: $background-color-theme;
                    background: $color-text-title;
                    text-decoration: none;
                }
            }
        }
        input {
            height: 2.5rem;
            text-indent: 1rem;
            margin-bottom: 1.5rem;
            border: 1px solid $color-text-title;
            border-radius: 9px;
        }
    }
</style>
