<template>
    <transition name="search">
        <div id="search">
            <img src="../../assets/img/back.svg" @click="back">
            <search-box class="search-box"></search-box>
        </div>
    </transition>
</template>

<script>
    import SearchBox  from '../../base/searchbox/searchbox'
    import { mapGetters} from 'vuex'
    export default {
        components: {
            SearchBox,
        },
        methods: {
            back () {
                this.$router.back()
            }   
        },
        computed: {

        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/color';  
    @import '../../assets/scss/font';
    @import '../../assets/scss/style';
    .search-enter-active, .search-leave-active {
        transition: all .3s;
    }
    .search-enter, .search-leave-to {
        opacity: 1;
    }
    #search {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        background: $background-color-order;
        .search-box {
            background: $background-color-order;
        }
    }
</style>
