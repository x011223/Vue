<template>
    <div id="moremovies">
        <h1>影院热映</h1>
        <list-view :List="HotMovies" :isMore="true"></list-view>
        <router-view></router-view>
    </div>
</template>

<script>
    import { ListMixin } from '../../../assets/js/mixins'

    export default {
        mixins: [ ListMixin ],
        created () {
            this._getHotMovies()
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../assets/sass/mixins';
    #moremovies {
        @include MovieAndBookItemPosition;
        h1 {
            font: {
                size: 1rem;
                weight: 700;
            }
        }
    }
</style>

