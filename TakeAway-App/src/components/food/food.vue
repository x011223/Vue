<template>
    <transition name="food-fade">    
        <div v-show="showFlag" class="food" ref="fooddetail">

        </div>
    </transition>
</template>

<script>
export default {
    props: {
        food: {
            type: Object
        }
    },
    data () {
        return {
            showFlag: false             
        }
    },
    methods: {
        show () {
            this.showFlag = true;
        }
    }
}
</script>

<style scoped>
    .food {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 48px;
        z-index: 1;
        width: 100%;
        background: #fff;
    }
    .food-fade-enter-active {
        transition: all .5s;
    }
    .food-fade-leave-active {
        transition: all .5s;
    }
    .food-fade-enter, .food-fade-leave-to {
        transform: translate3d(100%, 0, 0);
    }
</style>


