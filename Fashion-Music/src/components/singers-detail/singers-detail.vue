<template>
    <transition name="singer-slide">
        <div class="singer-detail"></div>
    </transition>
</template>

<script>
    export default {
    
    }
</script>

<style scoped>
    .singer-detail {
        position: fixed;
        z-index: 100;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(7, 17, 27, 0.7);
    }
    .singer-slide-enter-active, .singer-slide-leave-active {
        transition: all 0.3s;
    }
    .singer-slide-enter, .singer-slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }
</style>

