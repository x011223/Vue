<template>
    <div id="moremovies">
        <h1>榜单250</h1>
        <list-view :List="NewMovies" :isMovie="true" :isMore="true"></list-view>
    </div>
</template>

<script>
    import { ListMixin } from '../../../assets/js/mixins'

    const Count = 99
    export default {
        mixins: [ ListMixin ],
        created () {
            this._getNewMovies()
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
