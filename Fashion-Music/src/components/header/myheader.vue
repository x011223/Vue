<template>
    <div class="my-header">
        <h1 class="header-text">XuanRan Music</h1>
    </div>
</template>

<style lang="scss" scoped>
    @import '../../sass/style.scss';
    .my-header {
        $line-height: 36px;
        position: relative;
        height: 36px;
        line-height: $line-height;
        // background-color: #31c27c;
        background-color: $background-color-theme;
        text-align: center;    
        .header-text {
            font-size: 18px;
            display: inline-block;
            vertical-align: top;
            line-height: $line-height;     
            color: $color-text-title-dark;     
        };
    }     
</style>

<script>
    export default {
    
    }
</script>

