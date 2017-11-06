<template>
    <div class="loading">
        <img src="./loading.gif" width="24" height="24">
        <p class="loading-title">{{title}}</p>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: '正在加载中......'
            },
        },
    }
</script>

<style scoped>
    .loading {
        width: 100%;
        text-align: center;
    }
    .loading-title {
        line-height: 20px;
        top: 8px;
        font-size: 12px;
        color: #0080ff;
    }
</style>


