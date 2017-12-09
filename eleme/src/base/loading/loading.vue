<template>
    <div id="loading">
        <img class="loading-gif" src="./loading.gif">
        <p class="loading-text" v-html="loadingText"></p>
    </div>
</template>

<script>
    export default {
        props: {
            loadingText: {
                type: String,
                default: '正在加载中……'
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/font';
    #loading {
        position: absolute;
        top: 35%;
        left: 0;
        right: 0;
        text-align: center;
        .loading-gif {
            width: 2rem;
            height: 2rem;
        }
        .loading-text {
            margin-top: 0.5rem;
            font: {
                weight: $font-weight-s;
                size: 1rem;
            }
        }
    }
</style>
