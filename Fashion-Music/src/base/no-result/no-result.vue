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

<style scoped>
    .no-result {
        text-align: center;
        padding: 25%;
    }
    .logo-noresult {
        position: relative;
        margin: 0 auto 20px;
    }
    .text-noresult {
        position: relative;
        font-size: 16px;
        font-weight: 700;
        color: rgba(7, 7, 7, 0.4);
    }
</style>

