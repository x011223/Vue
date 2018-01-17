<template>
    <div id="morebooks">
        <h1>非虚幻类</h1>
        <list-view :List="UnFictionBooks" :isMore="true"></list-view>
    </div>
</template>

<script>
    import { ListMixin } from '../../../assets/js/mixins'

    const Count = 99
    export default {
        mixins: [ ListMixin ],
        created () {
            this._getUnFiction()
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../assets/sass/mixins';
    #morebooks {
        @include MovieAndBookItemPosition;
        h1 {
            font: {
                size: 1rem;
                weight: 700;
            }
        }
    }
</style>
