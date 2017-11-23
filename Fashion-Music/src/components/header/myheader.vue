<template>
    <div class="my-header">
        <div class="header-ico">
            <img class="header-img" src="./header_ico.svg" alt="">
        </div>
        <h1 class="header-text">xuanran Music</h1>
        <router-link to="/user" class="mine" tag="div">
            <img src="../usercenter/user.svg" width="16" height="16">
        </router-link>
    </div>
</template>

<style scoped>
    .my-header {
        position: relative;
        height: 36px;
        line-height: 36px;
        background-color: #31c27c;
        text-align: center;       
    }
    .mine {
        position: absolute;
        top: 0.1rem;
        right: 0.8rem;
        height: 100%;
    }
    .header-ico {
        display: inline-block;
        line-height: 36px;
        margin-top: 2px;
        margin-right: 12px;
        vertical-align: middle;
    }
    .header-text {
        display: inline-block;
        vertical-align: top;
        line-height: 36px;
        font-size: 18px;
        color: #ffffff;     
    }
    .router-link-active {
        border: none;
    }
</style>

<script>
    export default {
    
    }
</script>

