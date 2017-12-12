<template>
    <div id="about">
        <div class="about-header">
            <img class="about-header-img" src="../../assets/img/back.svg" @click="back">
            <span class="about-header-title">关于我们</span>
        </div>
        <div class="about-content">
            <h2>公司</h2>
            <h4>上海拉扎斯信息科技有限公司</h4>
            <h2>地址</h2>
            <h4>上海市普陀区金沙江路1518弄近铁城市广场401室</h4>
            <h2>电话</h2>
            <h4>(021)8024-1717</h4>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            back () {
                this.$router.back()
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/color';
    @import '../../assets/scss/mixin';
    @import '../../assets/scss/font';
    #about {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 10;
        background: #fff;
        .about-header {
            height: 2.5rem;
            text-align: center;
            background: $background-color-theme;
            .about-header-img {
                position: absolute;
                top: 0.5rem;
                left: .6rem;
                width: 1.5rem;
                height: 1.5rem;
                vertical-align: center;
                background: $background-color-theme;
            }
            .about-header-title {
                display: inline-block;
                margin-top: .5rem;
                font: {
                    size: 1.2rem;
                    weight: $font-weight-b;
                }
                color: $color-text-title;
                background: $background-color-theme;
            }
        }
        .about-content {
            margin-top: 1rem;
            background: #fff;
            h2, h4 {
                display: block;
                margin-left: 1rem;
                background: #fff;
                }
            }
            h2 {
                margin-bottom: .75rem;
                font: {
                    size: 1rem;
                    weight: $font-weight-a;
                }
                color: #333;
            }
            h4 {
                margin-bottom: 1rem;
                font: {
                    size: .8rem;
                    weight: $font-weight-h;
            }
        }
    }
</style>
