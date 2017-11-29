<template>
    <div class="no-result">
        <div class="logo-noresult">
            <img src="./logo-noresult.svg">
        </div>
        <p class="text-noresult" v-html="title"></p>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../sass/style.scss';
    .no-result {
        text-align: center;
        padding: 25%;
        .logo-noresult {
            position: relative;
            margin: 0 auto 20px;
        }
        .text-noresult {
            position: relative;
            font-size: $height-small-s;
            font-weight: $font-weight-b;
            color: $color-text-medium;
        }
    } 
</style>

